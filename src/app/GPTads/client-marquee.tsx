"use client";

import Image from "next/image";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { brandLogos } from "../_sections/data";
import styles from "./page.module.css";

export function ClientMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={styles.logoSection}>
      <div
        className={styles.marquee}
        role="region"
        aria-label="Brands we’ve worked with"
        tabIndex={0}
      >
        <div
          className={styles.logoTrack}
          style={{ animationPlayState: paused ? "paused" : undefined }}
        >
          {[0, 1].map((copy) => (
            <div
              className={styles.logoGroup}
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {brandLogos.map((logo) => (
                <div className={styles.logoCard} key={logo.src}>
                  <Image
                    src={logo.src}
                    alt={copy === 1 ? "" : logo.alt}
                    width={160}
                    height={70}
                    className={styles.brandLogo}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className={styles.marqueeControl}
        type="button"
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
      >
        {paused ? (
          <Play size={14} aria-hidden />
        ) : (
          <Pause size={14} aria-hidden />
        )}
        {paused ? "Resume logos" : "Pause logos"}
      </button>
    </div>
  );
}
