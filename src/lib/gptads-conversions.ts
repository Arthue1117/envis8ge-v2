export const GPTADS_PIXEL_ID = "AgEMrYuCyboP1vUabv4Y9A";
const EVENT_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isGptAdsEventId(value: unknown): value is string {
  return typeof value === "string" && EVENT_ID.test(value);
}

function cookieValue(request: Request, name: string): string | undefined {
  const value = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
  if (!value) return undefined;
  try {
    return decodeURIComponent(value);
  } catch {
    return undefined;
  }
}

export async function sendGptAdsConversion({
  apiKey,
  eventId,
  type,
  request,
  oppref,
}: {
  apiKey?: string;
  eventId: string;
  type: "contents_viewed" | "lead_created";
  request: Request;
  oppref?: string;
}): Promise<boolean> {
  if (!apiKey) return false;
  if (!isGptAdsEventId(eventId)) return false;
  const clickRef = oppref || cookieValue(request, "__oppref");
  const browserRef = cookieValue(request, "__obref");
  const event = {
    id: eventId,
    type,
    timestamp_ms: Date.now(),
    source_url: "https://envis8ge.com/GPTads",
    action_source: "web",
    ...(clickRef && clickRef.length <= 2048 ? { oppref: clickRef } : {}),
    ...(browserRef && isGptAdsEventId(browserRef)
      ? { user: { obref: browserRef } }
      : {}),
    data:
      type === "lead_created"
        ? { type: "customer_action" }
        : {
            type: "contents",
            contents: [
              {
                id: "envis8ge-gptads",
                name: "ChatGPT Ads for Singapore Businesses",
                content_type: "page",
              },
            ],
          },
  };
  try {
    const response = await fetch(
      `https://bzr.openai.com/v1/events?pid=${GPTADS_PIXEL_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          validate_only: false,
          integration_source: "envis8ge_gptads",
          events: [event],
        }),
        signal: AbortSignal.timeout(5000),
      }
    );
    if (!response.ok) {
      console.error("GPT Ads conversion rejected", {
        type,
        status: response.status,
      });
      return false;
    }
    return true;
  } catch {
    console.error("GPT Ads conversion delivery failed", { type });
    return false;
  }
}
