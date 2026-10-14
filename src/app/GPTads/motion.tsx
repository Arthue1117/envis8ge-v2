"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./page.module.css";

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades `[data-reveal]` cards up the first time they scroll into view.
 * The hidden starting state only applies once this has set
 * `data-motion="on"` on the page, so content stays visible without JS
 * or under prefers-reduced-motion.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (reducedMotion()) return;
    const page = document.querySelector<HTMLElement>(`.${styles.page}`);
    if (!page) return;
    const items = page.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((item) => observer.observe(item));
    page.dataset.motion = "on";
    return () => observer.disconnect();
  }, []);
  return null;
}

/** Counts a stat such as "$7.08", "1,500+" or "32.4X" up once when seen. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);
  useEffect(() => {
    const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
    const el = ref.current;
    if (!match || !el || reducedMotion()) return;
    const [, prefix, raw, suffix] = match;
    const target = Number(raw.replace(/,/g, ""));
    const format = new Intl.NumberFormat("en-SG", {
      minimumFractionDigits: raw.split(".")[1]?.length ?? 0,
      maximumFractionDigits: raw.split(".")[1]?.length ?? 0,
      useGrouping: raw.includes(","),
    });
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / 1400, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setText(prefix + format.format(target * eased) + suffix);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    setText(prefix + format.format(0) + suffix);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{text}</span>
    </span>
  );
}

/**
 * Mobile-only call to action that slides up once the hero has scrolled
 * away, and hides again while the consultation form is on screen.
 */
export function MobileCta() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("gptads-hero");
    const form = document.getElementById("consultation");
    if (!hero || !form) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === form) setFormVisible(entry.isIntersecting);
      }
    });
    observer.observe(hero);
    observer.observe(form);
    return () => observer.disconnect();
  }, []);
  const visible = !heroVisible && !formVisible;
  return (
    <a
      href="#consultation"
      className={styles.mobileCta}
      data-visible={visible}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
    >
      Check if ChatGPT Ads will work for you
      <ArrowUpRight size={18} aria-hidden />
    </a>
  );
}
