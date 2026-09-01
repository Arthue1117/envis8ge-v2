import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

import {
  sendContactAcknowledgementEmail,
  sendInternalLeadNotification,
  upsertResendContact,
} from "@/lib/resend";

interface ContactPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.firstName === "string" &&
    b.firstName.trim().length > 0 &&
    typeof b.lastName === "string" &&
    b.lastName.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.email === "string" &&
    EMAIL_PATTERN.test(b.email) &&
    typeof b.service === "string" &&
    typeof b.message === "string"
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

    await upsertResendContact({
      apiKey,
      segmentId,
      firstName,
      lastName,
      phone,
      email,
      service,
      message,
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
    });

    // Email 1, Contact Form branch (docs/nurture-sequence-export/
    // envis8ge-nurture-sequence-v2.md §6) — the only automated email
    // this submitter ever receives. Also best effort, same reasoning.
    await sendContactAcknowledgementEmail({
      apiKey,
      firstName,
      email,
      service,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend contact submission failed:", error);
    return NextResponse.json(
      {
        error:
          "Something went wrong sending your message. Please try again.",
      },
      { status: 502 }
    );
  }
}
