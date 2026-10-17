"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/motion/fade-in";

import { ContactForm } from "../contact-us/_components/contact-form";

/**
 * Home showreel below the hero. Recreated from the version deployed to
 * envis8ge.com on 2026-10-16 (Cloudflare version 6490d308) so the video
 * and the /GPTads landing page can ship together. Starts muted and
 * autoplays; the centre play button shows whenever the video is paused.
 *
 * The contact form sits to the right of the video on desktop and below
 * it on smaller screens (2026-10-17). It is the same Resend-backed form
 * as /contact-us, in its compact layout.
 */
export function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <Section background="band">
      <div className="desktop:grid-cols-[minmax(0,13fr)_minmax(0,7fr)] grid grid-cols-1 items-center gap-10">
        <FadeIn>
          <div className="relative overflow-hidden rounded-md bg-black shadow-lg">
            <video
              ref={videoRef}
              src="/Video/envis8ge.mp4#t=0.1"
              controls
              autoPlay
              muted
              playsInline
              preload="auto"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              className="block h-auto w-full"
            >
              Your browser does not support the video tag.
            </video>
            {!playing && (
              <button
                type="button"
                aria-label="Play video"
                onClick={() => videoRef.current?.play()}
                className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <Play className="ml-1 size-7 fill-current" aria-hidden />
              </button>
            )}
          </div>
        </FadeIn>

        <div>
          <h2 className="font-heading text-foreground mb-4 text-2xl font-bold">
            Contact Us
          </h2>
          <ContactForm compact />
        </div>
      </div>
    </Section>
  );
}
