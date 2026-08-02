import { AlertTriangle, Check, Lightbulb, ImageOff } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { ContentBlock } from "../_data/types";

/**
 * Blog Plan Section 3.4/3.5 — Key Takeaways, Callout/Warning/Pro-Tip
 * boxes, Case Study Cards, Comparison Tables, Statistics, Pull Quotes.
 * All styled from Design System tokens; each wrapped in `FadeIn` for the
 * scroll-reveal requirement.
 */

export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <FadeIn>
      <div className="bg-primary-tint/40 border-primary rounded-md border-l-4 p-6">
        <h2 className="font-heading text-foreground text-lg font-semibold">
          Key Takeaways
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm">
              <Check
                aria-hidden
                className="text-primary mt-0.5 size-4 shrink-0"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

const calloutToneStyles = {
  neutral: {
    icon: Check,
    box: "bg-muted border-l-4 border-neutral-300",
    iconColor: "text-neutral-600",
  },
  warning: {
    icon: AlertTriangle,
    box: "bg-warning/10 border-l-4 border-warning",
    iconColor: "text-warning",
  },
  tip: {
    icon: Lightbulb,
    box: "bg-primary-tint/40 border-l-4 border-primary",
    iconColor: "text-primary",
  },
} as const;

export function CalloutBox({
  tone,
  title,
  items,
}: Extract<ContentBlock, { type: "calloutBox" }>) {
  const style = calloutToneStyles[tone];
  const Icon = style.icon;

  return (
    <FadeIn className={cn("rounded-md p-6", style.box)}>
      <div className="flex items-center gap-2">
        <Icon aria-hidden className={cn("size-5", style.iconColor)} />
        <span className="font-heading text-foreground font-semibold">
          {title}
        </span>
      </div>
      {items.length === 1 ? (
        <p className="text-muted-foreground mt-2 text-sm">{items[0]}</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-2 text-sm">
          {items.map((item) => (
            <li key={item} className="text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>
      )}
    </FadeIn>
  );
}

export function CaseStudyCard({
  fields,
}: Extract<ContentBlock, { type: "caseStudyCard" }>) {
  return (
    <FadeIn>
      <Card className="border-primary/20 border p-6">
        <span className="text-primary text-xs font-semibold tracking-wide uppercase">
          Case Study
        </span>
        <dl className="mt-3 flex flex-col gap-2">
          {Object.entries(fields).map(([label, value]) => (
            <div key={label}>
              <dt className="font-heading text-foreground inline text-sm font-semibold">
                {label}:{" "}
              </dt>
              <dd className="text-muted-foreground inline text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </FadeIn>
  );
}

export function PullQuote({ quote }: { quote: string }) {
  return (
    <FadeIn>
      <blockquote className="border-primary font-heading text-foreground tablet:text-2xl border-l-4 py-2 pl-6 text-xl font-semibold italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </FadeIn>
  );
}

export function ComparisonTable({
  headers,
  rows,
}: Extract<ContentBlock, { type: "comparisonTable" }>) {
  return (
    <FadeIn className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="bg-muted border-b border-neutral-200 p-3 text-left"></th>
            {headers.map((h) => (
              <th
                key={h}
                className="font-heading bg-muted text-foreground border-b border-neutral-200 p-3 text-left"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th
                scope="row"
                className="text-foreground border-b border-neutral-200 p-3 text-left align-top font-semibold"
              >
                {row.label}
              </th>
              {row.values.map((value, i) => (
                <td
                  key={i}
                  className="text-muted-foreground border-b border-neutral-200 p-3 align-top"
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </FadeIn>
  );
}

export function Statistics({
  items,
}: Extract<ContentBlock, { type: "statistics" }>) {
  return (
    <div className="tablet:grid-cols-4 grid grid-cols-2 gap-4">
      {items.map((item, i) => (
        <FadeIn key={item.figure} delay={i * 0.03}>
          <Card className="h-full p-4 text-center">
            <div className="font-heading text-primary tablet:text-2xl text-xl font-bold">
              {item.figure}
            </div>
            <div className="text-muted-foreground mt-1 text-xs">
              {item.context}
            </div>
          </Card>
        </FadeIn>
      ))}
    </div>
  );
}

export function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div className="bg-muted flex aspect-video flex-col items-center justify-center gap-2 rounded-md text-center">
      <ImageOff aria-hidden className="size-8 text-neutral-400" />
      <p className="text-muted-foreground max-w-xs px-4 text-xs">{caption}</p>
    </div>
  );
}
