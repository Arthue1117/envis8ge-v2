"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { duration, easing } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Generic accordion, promoted from the Blog's article template
 * (docs/06-blog-plan.md Section 3.6) once the Contact page needed the
 * same pattern — not blog-specific, hence living in `components/ui/`
 * per the reuse rule in docs/PROJECT_ARCHITECTURE.md Section 6. Height/
 * opacity transition per Design System Section 20, respects reduced
 * motion globally via root MotionConfig.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-heading text-foreground font-semibold">
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "text-muted-foreground size-5 shrink-0 transition-transform duration-[220ms]",
                    open && "rotate-180"
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: duration.base,
                    ease: easing.standard,
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground pb-4 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
