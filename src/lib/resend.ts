const RESEND_CONTACTS_URL = "https://api.resend.com/contacts";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const RESEND_EVENTS_URL = "https://api.resend.com/events/send";

const INTERNAL_LEAD_NOTIFICATION_FROM = "Envis8ge Website <from@envis8ge.com>";
const INTERNAL_LEAD_NOTIFICATION_RECIPIENTS = [
  "arthur@envis8ge.com",
  "shawn@envis8ge.com",
];

interface UpsertResendContactInput {
  apiKey: string;
  segmentId: string;
  firstName: string;
  lastName: string;
  email: string;
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
 * This function only creates/updates the contact and assigns the
 * "website leads" segment — it sends no email and fires no event. The
 * route handler (src/app/api/contact/route.ts) fires the
 * `contact_form_submitted` and `shared_newsletter_entry` events after
 * this resolves; those drive the (currently disabled) Welcome and
 * Shared Newsletter automations.
 *
 * No `properties` field is sent here: confirmed live (2026-09-02) that
 * this Resend account's Contacts API rejects any `properties` object
 * with a 422 "One or more properties do not exist" — a real Resend
 * contact record only has `email`/`first_name`/`last_name`/
 * `unsubscribed`, nothing custom is defined for this audience, and
 * there's no API to define one (dashboard-only, if it exists at all).
 * Sending it made contact creation fail 100% of the time. Phone,
 * service, message, and the "contact_form" source tag are NOT lost —
 * they're still recorded in full on every submission via
 * `sendInternalLeadNotification`'s email body below. If phone/service/
 * message/source ever need to live on the Resend contact itself, that
 * requires first defining those as custom contact properties in the
 * Resend dashboard for the "website leads" audience
 * (62d0fb84-cdd0-4b02-b211-4be31c3f7006) — an account-side change, not
 * a code change.
 */
export async function upsertResendContact({
  apiKey,
  segmentId,
  firstName,
  lastName,
  email,
}: UpsertResendContactInput): Promise<void> {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

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
  recipients?: string[];
  subject?: string;
  requireDelivery?: boolean;
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
  recipients = INTERNAL_LEAD_NOTIFICATION_RECIPIENTS,
  subject,
  requireDelivery = false,
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
        to: recipients,
        reply_to: email,
        subject:
          subject ?? `New contact form lead: ${firstName} ${lastName}`.trim(),
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
      if (requireDelivery)
        throw new Error(
          "Lead notification was not accepted by the email provider."
        );
    }
  } catch (error) {
    console.error("Failed to send internal lead notification:", error);
    if (requireDelivery) throw error;
  }
}

interface TriggerResendEventInput {
  apiKey: string;
  event: string;
  email: string;
  payload?: Record<string, string>;
}

/**
 * Fires a Resend custom event (POST /events/send) to trigger a matching
 * automation. Best effort: the contact is already saved by the time
 * this runs, and a DISABLED automation simply ignores the event, so a
 * failure here is logged rather than surfaced as a form error.
 *
 * Safe to ship before the "Contact Form Welcome" / "Shared Newsletter"
 * automations are enabled — Resend records the event (auto-registering
 * the name on first use) and it has no effect until an automation that
 * listens on it is turned on.
 */
export async function triggerResendEvent({
  apiKey,
  event,
  email,
  payload,
}: TriggerResendEventInput): Promise<void> {
  try {
    const response = await fetch(RESEND_EVENTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        payload ? { event, email, payload } : { event, email }
      ),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `Resend event "${event}" failed (${response.status}): ${detail.slice(0, 500)}`
      );
    }
  } catch (error) {
    console.error(`Resend event "${event}" threw:`, error);
  }
}
