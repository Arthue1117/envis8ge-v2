import type { Article } from "../_data/types";

/**
 * Concatenates every text-bearing field of an article for reading-time
 * calculation (Blog Plan Section 6 — auto-calculated, not entered
 * manually). Structured content blocks (tables, stats, case study
 * fields) are included since a reader does read that content.
 */
export function articleWordCount(article: Article): string {
  const parts: string[] = [
    article.introduction.join(" "),
    article.keyTakeaways.join(" "),
    article.verdict.paragraphs.join(" "),
    article.verdict.pullQuote,
    article.faq.map((f) => `${f.question} ${f.answer}`).join(" "),
  ];

  for (const block of article.body) {
    switch (block.type) {
      case "paragraph":
      case "heading":
        parts.push(block.text);
        break;
      case "pullQuote":
        parts.push(block.quote);
        break;
      case "calloutBox":
        parts.push(block.title, block.items.join(" "));
        break;
      case "caseStudyCard":
        parts.push(Object.values(block.fields).join(" "));
        break;
      case "comparisonTable":
        parts.push(
          block.headers.join(" "),
          block.rows.map((r) => `${r.label} ${r.values.join(" ")}`).join(" ")
        );
        break;
      case "statistics":
        parts.push(
          block.items.map((s) => `${s.figure} ${s.context}`).join(" ")
        );
        break;
      case "imagePlaceholder":
        break;
    }
  }

  return parts.join(" ");
}
