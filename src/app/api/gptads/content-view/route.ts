import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  isGptAdsEventId,
  sendGptAdsConversion,
} from "@/lib/gptads-conversions";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  if (request.headers.get("origin") !== origin)
    return new Response(null, { status: 403 });
  try {
    const referrer = new URL(request.headers.get("referer") || "");
    if (referrer.origin !== origin || referrer.pathname !== "/GPTads")
      return new Response(null, { status: 403 });
  } catch {
    return new Response(null, { status: 403 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  if (!body || typeof body !== "object")
    return new Response(null, { status: 400 });
  const data = body as Record<string, unknown>;
  if (
    !isGptAdsEventId(data.eventId) ||
    (data.oppref !== undefined &&
      (typeof data.oppref !== "string" || data.oppref.length > 2048))
  )
    return new Response(null, { status: 400 });
  const apiKey = getCloudflareContext().env.OPENAI_ADS_CAPI_KEY;
  if (!apiKey) return new Response(null, { status: 503 });
  const accepted = await sendGptAdsConversion({
    apiKey,
    eventId: data.eventId,
    type: "contents_viewed",
    request,
    oppref: data.oppref as string | undefined,
  });
  return new Response(null, { status: accepted ? 204 : 502 });
}
