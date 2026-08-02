import { FadeIn } from "@/components/motion/fade-in";

import type { ContentBlock } from "../_data/types";
import {
  CalloutBox,
  CaseStudyCard,
  ComparisonTable,
  ImagePlaceholder,
  PullQuote,
  Statistics,
} from "./content-blocks";

/**
 * Maps the approved article's `ContentBlock[]` (Blog Plan Section 3.5)
 * to the right rendering component, in the exact order transcribed from
 * the locked article.md.
 */
export function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                id={block.id}
                className="font-heading text-foreground tablet:text-3xl scroll-mt-24 text-2xl font-bold"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <FadeIn key={i}>
                <p className="text-foreground leading-relaxed">{block.text}</p>
              </FadeIn>
            );
          case "caseStudyCard":
            return (
              <CaseStudyCard
                key={i}
                type="caseStudyCard"
                fields={block.fields}
              />
            );
          case "calloutBox":
            return (
              <CalloutBox
                key={i}
                type="calloutBox"
                tone={block.tone}
                title={block.title}
                items={block.items}
              />
            );
          case "pullQuote":
            return <PullQuote key={i} quote={block.quote} />;
          case "comparisonTable":
            return (
              <ComparisonTable
                key={i}
                type="comparisonTable"
                headers={block.headers}
                rows={block.rows}
              />
            );
          case "statistics":
            return <Statistics key={i} type="statistics" items={block.items} />;
          case "imagePlaceholder":
            return <ImagePlaceholder key={i} caption={block.caption} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
