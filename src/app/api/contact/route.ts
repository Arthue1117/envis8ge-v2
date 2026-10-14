import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import {
  isGptAdsEventId,
  sendGptAdsConversion,
} from "@/lib/gptads-conversions";

import {
  sendInternalLeadNotification,
  triggerResendEvent,
  upsertResendContact,
} from "@/lib/resend";

interface ContactPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  newsletterOptIn?: boolean;
  gptAdsEventId?: string;
  gptAdsOppref?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b.lastName === "string" &&
    (b.lastName.trim().length > 0 ||
      b.service === "ChatGPT Ads consultation") &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.email === "string" &&
    EMAIL_PATTERN.test(b.email) &&
    typeof b.service === "string" &&
    typeof b.message === "string" &&
    (b.newsletterOptIn === undefined ||
      typeof b.newsletterOptIn === "boolean") &&
    (b.gptAdsEventId === undefined || isGptAdsEventId(b.gptAdsEventId)) &&
    (b.gptAdsOppref === undefined ||
      (typeof b.gptAdsOppref === "string" && b.gptAdsOppref.length <= 2048))
  );
}

/**
 * Server-side only — RESEND_API_KEY is read from the Cloudflare Worker
 * environment (a secret, set via `wrangler secret put`) and never sent
 * to the client. This is the sole integration point with Resend; the
 * GHL embed no longer handles submissions on this site.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Please fill in all required fields with valid values." },
      { status: 400 }
    );
  }

  const { env } = getCloudflareContext();
  const apiKey = env.RESEND_API_KEY;
  const segmentId = env.RESEND_SEGMENT_ID;

  if (!apiKey || !segmentId) {
    console.error(
      "Resend is not configured: missing RESEND_API_KEY or RESEND_SEGMENT_ID."
    );
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const firstName = body.firstName.trim();
    const lastName = body.lastName.trim();
    const phone = body.phone.trim();
    const email = body.email.trim();
    const service = body.service.trim();
    const message = body.message.trim();
    const isGptAds = service === "ChatGPT Ads consultation";

    await upsertResendContact({
      apiKey,
      segmentId,
      firstName,
      lastName,
      email,
    });

    // Best effort — the contact above is already saved, so a failure
    // here (logged inside sendInternalLeadNotification) must not turn
    // a successful submission into an error response.
    await sendInternalLeadNotification({
      apiKey,
      firstName,
      lastName,
      phone,
      email,
      service,
      message,
      ...(isGptAds
        ? {
            recipients: ["shawn@envis8ge.com"],
            subject: `New ChatGPT Ads enquiry: ${[firstName, lastName].filter(Boolean).join(" ")}`,
            requireDelivery: true,
          }
        : {}),
    });

    // Fire the two Resend custom events. Best effort — the contact is
    // already saved above, and a DISABLED automation ignores its
    // trigger event, so a failure here must not turn a successful
    // submission into an error response.
    //
    // 1 -> "Contact Form Welcome" automation -> instant welcome email.
    await triggerResendEvent({
      apiKey,
      event: "contact_form_submitted",
      email,
      payload: { first_name: firstName, service },
    });
    // 2 -> "Shared Newsletter" automation -> 4-day delay -> Newsletter
    //      #1 ... #30. Firing this on submission (rather than after the
    //      welcome) is fine: the newsletter automation's own first step
    //      is the 4-day delay.
    // Existing contact forms keep their current behaviour. The GPT Ads
    // form supplies consent through its visible submission notice.
    if (body.newsletterOptIn !== false) {
      await triggerResendEvent({
        apiKey,
        event: "shared_newsletter_entry",
        email,
      });
    }

    if (isGptAds && body.gptAdsEventId) {
      let isLandingPage = false;
      try {
        const referrer = new URL(request.headers.get("referer") || "");
        isLandingPage =
          referrer.pathname === "/GPTads" &&
          referrer.origin === new URL(request.url).origin;
      } catch {
        /* Other contact-form submissions are never measured. */
      }
      if (isLandingPage)
        await sendGptAdsConversion({
          apiKey: env.OPENAI_ADS_CAPI_KEY,
          eventId: body.gptAdsEventId,
          type: "lead_created",
          request,
          oppref: body.gptAdsOppref,
        });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend contact submission failed:", error);
    return NextResponse.json(
      {
        error: "Something went wrong sending your message. Please try again.",
      },
      { status: 502 }
    );
  }
}
