const RESEND_CONTACTS_URL = "https://api.resend.com/contacts";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";

const INTERNAL_LEAD_NOTIFICATION_FROM = "Envis8ge Website <from@envis8ge.com>";
const INTERNAL_LEAD_NOTIFICATION_RECIPIENTS = [
  "arthur@envis8ge.com",
  "shawn@envis8ge.com",
];

const CONTACT_ACKNOWLEDGEMENT_FROM = "Shawn Yeo <shawn@envis8ge.com>";

/**
 * Service dropdown values that don't name a real service and shouldn't
 * be echoed back to the submitter (docs/nurture-sequence-export/
 * envis8ge-nurture-sequence-v2.md §5's `{{service}}` fallback rule).
 */
const GENERIC_SERVICE_VALUES = new Set(["", "others"]);

interface UpsertResendContactInput {
  apiKey: string;
  segmentId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface ResendContactRecord {
  id?: string;
  [key: string]: unknown;
}

interface ResendApiResult {
  ok: boolean;
  status: number;
  body: ResendContactRecord | null;
}

/**
 * Reads a Resend Contacts API response once and logs operation name +
 * HTTP status + a truncated body — never the API key — so a "successful"
 * form submission can't silently mask a failed Resend call in the tail.
 */
async function readAndLogResendResponse(
  operation: string,
  response: Response
): Promise<ResendApiResult> {
  const raw = await response.text().catch(() => "");
  const sanitized = raw.slice(0, 500);
  const log = response.ok ? console.log : console.error;
  log(
    `Resend contacts: ${operation} ${response.ok ? "succeeded" : "failed"} (${response.status}). ${sanitized}`
  );

  let body: ResendContactRecord | null = null;
  try {
    body = raw ? (JSON.parse(raw) as ResendContactRecord) : null;
  } catch {
    body = null;
  }

  return { ok: response.ok, status: response.status, body };
}

/**
 * Creates a Resend contact and assigns it to the configured segment. If
 * the email already has a contact, Resend's create call fails — in that
 * case this falls back to updating the existing contact by email
 * (instead of surfacing an error to the visitor). Either path must yield
 * the contact's actual Resend id: the segment-assignment endpoint is
 * keyed by contact id, not email.
 *
 * Does not trigger any follow-up automation — per
 * docs/nurture-sequence-export/envis8ge-nurture-sequence-v2.md §3, a
 * Contact Form lead gets exactly one email (sent separately by
 * `sendContactAcknowledgementEmail`) and nothing after it. `source:
 * "contact_form"` is stored as a contact property so a future Lead
 * Magnet integration can distinguish the two entry paths without
 * touching this function.
 */
export async function upsertResendContact({
  apiKey,
  segmentId,
  firstName,
  lastName,
  phone,
  email,
  service,
  message,
}: UpsertResendContactInput): Promise<void> {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Resend contacts have no native `phone` field — phone, the selected
  // service, the message/details text, and the entry-source tag are
  // preserved as custom contact properties.
  const properties = { phone, service, message, source: "contact_form" };

  const createResult = await readAndLogResendResponse(
    "create contact",
    await fetch(RESEND_CONTACTS_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        unsubscribed: false,
        properties,
        segments: [{ id: segmentId }],
      }),
    })
  );

  let contactId: string | undefined;

  if (createResult.ok) {
    contactId = createResult.body?.id;
  } else {
    const updateResult = await readAndLogResendResponse(
      "update existing contact",
      await fetch(
        `https://api.resend.com/contacts/${encodeURIComponent(email)}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            unsubscribed: false,
            properties,
          }),
        }
      )
    );

    if (!updateResult.ok) {
      throw new Error(
        `Resend contact create failed (${createResult.status}) and update fallback also failed (${updateResult.status}).`
      );
    }

    contactId = updateResult.body?.id;
  }

  if (!contactId) {
    throw new Error(
      "Resend contact operation succeeded but returned no contact id — cannot assign segment."
    );
  }

  const segmentResult = await readAndLogResendResponse(
    "assign website leads segment",
    await fetch(
      `https://api.resend.com/contacts/${contactId}/segments/${segmentId}`,
      { method: "POST", headers }
    )
  );

  if (!segmentResult.ok) {
    throw new Error(
      `Resend contact saved but segment assignment failed (${segmentResult.status}).`
    );
  }
}

interface SendInternalLeadNotificationInput {
  apiKey: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

/**
 * Notifies the Envis8ge team (never the form submitter) by email that a
 * new lead came in. Best effort: the contact is already saved in Resend
 * by the time this is called, so a failure here is logged rather than
 * surfaced as a form error. reply_to is set to the submitter's address
 * purely so Arthur or Shawn can reply directly from their inbox.
 */
export async function sendInternalLeadNotification({
  apiKey,
  firstName,
  lastName,
  phone,
  email,
  service,
  message,
}: SendInternalLeadNotificationInput): Promise<void> {
  try {
    const response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: INTERNAL_LEAD_NOTIFICATION_FROM,
        to: INTERNAL_LEAD_NOTIFICATION_RECIPIENTS,
        reply_to: email,
        subject: `New contact form lead: ${firstName} ${lastName}`,
        text: [
          `Name: ${firstName} ${lastName}`,
          `Email: ${email}`,
          `Phone: ${phone}`,
          `Service / Inquiry: ${service || "(not specified)"}`,
          `Message / Details: ${message || "(none provided)"}`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `Failed to send internal lead notification (${response.status}): ${detail}`
      );
    }
  } catch (error) {
    console.error("Failed to send internal lead notification:", error);
  }
}

interface SendContactAcknowledgementEmailInput {
  apiKey: string;
  firstName: string;
  email: string;
  service: string;
}

/**
 * Contact Form immediate acknowledgement —
 * docs/nurture-sequence-export/envis8ge-nurture-sequence-v3.md §6. Per
 * the boss's latest feedback, this is a short, purely transactional
 * acknowledgement only — no sales copy, no CTA, no newsletter content.
 * The Contact Form lead's entry into the shared newsletter (§7) is a
 * separate, not-yet-built step, not part of this email. Best effort:
 * the contact is already saved and the internal team already notified
 * by the time this runs, so a failure here is logged rather than
 * surfaced as a form error.
 */
export async function sendContactAcknowledgementEmail({
  apiKey,
  email,
  service,
}: SendContactAcknowledgementEmailInput): Promise<void> {
  const normalizedService = service.trim().toLowerCase();
  const hasNamedService = !GENERIC_SERVICE_VALUES.has(normalizedService);

  const subject = "Thank you for your message";

  const openingLine = hasNamedService
    ? `Thank you for your message on ${service.trim()}.`
    : "Thank you for your message.";

  const text = [
    openingLine,
    "",
    "Your email is being routed to our relevant team and we'll get back to you soon!",
  ].join("\n");

  try {
    const response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_ACKNOWLEDGEMENT_FROM,
        to: email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `Failed to send contact acknowledgement email (${response.status}): ${detail.slice(0, 500)}`
      );
    }
  } catch (error) {
    console.error("Failed to send contact acknowledgement email:", error);
  }
}
