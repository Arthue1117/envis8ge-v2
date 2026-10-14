"use client";

import { useEffect, useRef } from "react";

const PIXEL_ID = "AgEMrYuCyboP1vUabv4Y9A";
type PixelCommand = (...args: unknown[]) => void;
type PixelQueue = PixelCommand & { q?: unknown[][] };
declare global {
  interface Window {
    oaiq?: PixelQueue;
  }
}

export function measureGptAdsLead(eventId: string) {
  if (window.location.pathname !== "/GPTads") return;
  try {
    window.oaiq?.(
      "measure",
      "lead_created",
      { type: "customer_action" },
      { event_id: eventId }
    );
  } catch {
    /* Tracking failures must not turn an accepted enquiry into a form error. */
  }
}

export function getGptAdsAttribution() {
  return new URLSearchParams(window.location.search).get("oppref") || undefined;
}

export function GptAdsPixel() {
  const viewSent = useRef(false);
  useEffect(() => {
    if (window.location.pathname !== "/GPTads") return;
    if (!window.oaiq) {
      const queue: PixelQueue = (...args) => {
        queue.q?.push(args);
      };
      queue.q = [];
      window.oaiq = queue;
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
      script.dataset.envis8geGptads = "true";
      document.head.appendChild(script);
    }
    window.oaiq("consent", true);
    window.oaiq("init", { pixelId: PIXEL_ID });
    if (!viewSent.current) {
      viewSent.current = true;
      const eventId = crypto.randomUUID();
      window.oaiq(
        "measure",
        "contents_viewed",
        {
          type: "contents",
          contents: [
            {
              id: "envis8ge-gptads",
              name: "ChatGPT Ads for Singapore Businesses",
              content_type: "page",
            },
          ],
        },
        { event_id: eventId }
      );
      void fetch("/api/gptads/content-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, oppref: getGptAdsAttribution() }),
        keepalive: true,
      }).catch(() => {
        /* Browser measurement remains available if server delivery fails. */
      });
    }
    // Disable this pixel when a client-side navigation leaves the landing page.
    return () => {
      window.oaiq?.("consent", false);
    };
  }, []);
  return null;
}
