# Blog Plan

> **How to read this document.** Same convention as prior locked documents:
> - **Approved** — explicitly requested by you in this conversation.
> - **Proposed** — a recommendation to fill a gap not explicitly specified, requiring sign-off.
> - **To be confirmed** — an open question, most often "who provides this content."
>
> The Blog is entirely new — there is no existing blog on the live site (per [01-project-brief.md](01-project-brief.md)) — so this plan defines a system from scratch, styled to match the locked Brand Guidelines and Design System so it "feels like it has always been part of the Envis8ge website," per your instruction.
>
> **Revision note:** This document supersedes the previously locked version. The Article Template Structure (Section 3) has been expanded to the full 13-part premium structure you specified, and Sections 4–5 have been updated to reflect the confirmed first article's category and author. This version is the finalized Blog Plan.

---

## 1. Purpose & Goals

Per [03-design-system.md](03-design-system.md) and the approved project direction, the Blog exists to:
- Support SEO (organic content for target service + geography terms — see [08-seo-strategy.md](08-seo-strategy.md))
- Establish thought leadership consistent with the agency's existing "holistic marketing" positioning (Brand Guidelines Section 3)
- Feed the Home page "Latest Articles" section (Sitemap Section 2.1)
- Provide a reusable content channel independent of one-off portfolio updates

---

## 2. Blog Listing Page (`/blog`)
**Status: Approved**

| Feature | Spec |
|---|---|
| Featured Article | One prominent post (editorially pinned or most recent), larger card at the top of the listing |
| Latest Articles | Reverse-chronological grid of remaining posts, using the Blog Card spec (Design System Section 15) |
| Categories | Filterable by category (Section 4 below); each category also resolves to `/blog/category/[category]` per Sitemap Section 2.6 |
| Search | Client-side search across title/excerpt/category — **Proposed**, given a static/SSG blog corpus; **to be confirmed** if heavier server-side search is expected at scale |
| Pagination | Standard numbered or "load more" pagination once post count exceeds one page (**to be confirmed** page size; proposing 9 posts/page for a 3-column grid) |

---

## 3. Article Template Structure (`/blog/[slug]`)
**Status: Approved — finalized 13-part master layout, applies to every future post**

### 3.1 Hero Section
- Featured Image (16:9)
- Category Badge (linked to `/blog/category/[category]`)
- Article Title (`text-display`/`text-h1` scale)
- Subtitle (supporting one-line summary, `text-body-lg`)
- Publish Date
- Last Updated Date (shown only when different from Publish Date)
- Reading Time (Section 6)
- Author (name + avatar, links to Author Bio anchor — Section 3.10)
- Social Share Buttons (Section 12)

### 3.2 Sticky Table of Contents
Auto-generated from the article's H2/H3 headings. Sticky on desktop (follows scroll within the content column); collapses to a top-of-article expandable list on mobile. The active section is automatically highlighted as the reader scrolls (scrollspy behavior, via IntersectionObserver per Design System Section 20.9's performance rules — not scroll-event polling).

### 3.3 Introduction
Opening paragraph(s) before any structured content, sets up the article's premise.

### 3.4 Key Takeaways
A highlighted summary box (**Proposed spec**: `color-primary-tint` or `color-bg-secondary` background, `radius-md`, left accent border in `color-primary`) containing 4–6 bullet points summarizing the article's core conclusions, placed after the Introduction and before Main Content.

### 3.5 Main Content — Supported Content Blocks
The body supports the following reusable block types, all styled from Design System tokens rather than one-off styling:

| Block | Spec |
|---|---|
| Images | Standard in-article image, `radius-md`, with caption support |
| Comparison Tables | Table spec (Design System Section 16) |
| Case Study Cards | Compact card (extends base Card, Design System Section 10) summarizing a real client result, linking to the relevant Portfolio Detail page (Sitemap Section 2.3) — **content depends on approved Portfolio Detail case studies existing**, see [05-content-plan.md](05-content-plan.md) Section 4 |
| Callout Boxes | Neutral highlight box, same base treatment as Key Takeaways but for in-line emphasis |
| Pro Tips | Callout variant using `color-primary-tint` accent, labeled "Pro Tip" |
| Warning Boxes | Callout variant using `color-warning` accent (Design System Section 1), labeled "Note" or "Caution" |
| Statistics | Large-number highlight component (bold display figure + short label), used only for figures actually sourced/cited — never illustrative/invented numbers |
| Pull Quotes | Large-format quote styled in Montserrat, `color-primary` accent mark, used for emphasis on a key sentence from the article or a real client quote |
| Numbered Lists | Standard ordered list, `text-body` |
| Bullet Lists | Standard unordered list, `text-body` |

### 3.6 FAQ Accordion
Expand/collapse Q&A block, placed after Main Content. Animation per Design System Section 20 (smooth height/opacity transition, `duration-base`, respects reduced motion).

### 3.7 Related Articles
2–3 posts by shared category (Section 4), most recent first; falls back to most-recent-overall if too few category matches exist. Blog Card spec (Design System Section 15).

### 3.8 Strong Call-To-Action
Full-width CTA block before the footer, matching the Home page CTA styling/tone (Content Plan Section 2) — reuses the confirmed "Ready to get STARTED?" visual language rather than inventing a new CTA style.

### 3.9 Previous / Next Article Navigation
Chronological navigation, placed after the CTA.

### 3.10 Author Bio
Dedicated author block (name, avatar/logo, short bio) near the end of the article, separate from the compact hero byline (Section 3.1). Content depends on Section 5 (Author System) below.

### 3.11 Breadcrumbs
`Home / Blog / [Category] / [Article Title]`, placed at the top of the page above the Hero Section.

### 3.12 Social Sharing
Share buttons appear in both the Hero Section (Section 3.1) and again near the end of the article (Section 12 below for channel list).

### 3.13 Newsletter Signup (placeholder)
A visually complete signup block (email field + submit button, styled per Design System Section 9) placed near the end of the article, before or alongside the footer. **Status: placeholder only** — no email service provider, list, or backend is selected yet. **To be confirmed:** which ESP (e.g. Mailchimp, Klaviyo, or the client's existing tool, if any) this should eventually connect to; until then the form should be visually present but not wired to a live integration.

Animation treatment for all of the above follows the Animation System Foundation (Design System Section 20) — fade/scroll reveals, image reveal on the featured image, hover states on cards/buttons/share icons, smooth TOC scrollspy transitions, smooth accordion open/close; nothing bespoke to the blog.

---

## 4. Categories
**Status: First category Approved (confirmed via first article); remaining taxonomy Proposed**

- **Social Media Marketing** — **Approved**, confirmed as the category for the first article, covering both organic and paid social content (supersedes the earlier finer Strategy/Paid split in this document's prior draft)
- Content & Community — Proposed
- Email Marketing — Proposed
- Web & Landing Pages — Proposed
- Video & Photography — Proposed

Mapped to the 6 confirmed service areas (Brand Guidelines Section 1) so the blog reinforces existing service positioning. **To be confirmed:** final taxonomy beyond the confirmed first category.

---

## 5. Author System
**Status: Approved default — brand-level byline**

**Approved:** The first article's author is **"Envis8ge"** (the agency itself, not a named individual) — consistent with the current site's first-person-plural voice ("we," "our clients") and the fact that no individual team member names are published (Project Brief Section 1).

Author Bio (Section 3.10) for the "Envis8ge" byline uses agency-level bio copy drawn from confirmed positioning language already established in Brand Guidelines Section 3 (fuss-free, transparent, data-driven, boutique regional team since 2013) — not new invented bio content.

**To be confirmed:** Whether individual team members should be credited by name on future articles (requires names, roles, and headshots/bios from the client — none exist today).

---

## 6. Reading Time
**Status: Proposed**

Calculated automatically at build time from article word count, using a standard 200–238 words-per-minute average reading speed, displayed as "X min read." No manual entry required per article.

---

## 7. Related Articles Logic
**Status: Proposed** — see Section 3.7.

---

## 8. Social Sharing Channels
**Status: Proposed**

LinkedIn, Facebook, WhatsApp, X (Twitter), and "Copy Link" — chosen for relevance to the confirmed Singapore/APAC B2B audience. **To be confirmed:** final channel list.

---

## 9. SEO Requirements
**Status: Approved; full strategy in [08-seo-strategy.md](08-seo-strategy.md)**

Each article requires: unique meta title/description, canonical URL, `BlogPosting` schema, `FAQPage` schema (when an FAQ block is present), `BreadcrumbList` schema, Open Graph tags, Twitter Card tags, and descriptive image alt text. See the metadata package prepared for the first article.

---

## 10. Editorial Workflow & Cadence
**Status: To be confirmed** — see upcoming [09-development-roadmap.md](09-development-roadmap.md) for CMS/content-authoring approach.

---

## 11. First Article — Master Layout Pilot
**Status: Approved**

**Title:** *Organic vs Paid Social Media in Singapore: What Actually Works (And When to Use Both)*
**Slug:** `/blog/organic-vs-paid-social-media-singapore`
**Category:** Social Media Marketing (Section 4)
**Author:** Envis8ge (Section 5)

This article is built against the full 13-part template in Section 3 and serves as the reference implementation for every future post. Its featured-image creative brief is locked at [content/blog/organic-vs-paid-social-media-singapore/featured-image-brief.md](../content/blog/organic-vs-paid-social-media-singapore/featured-image-brief.md).

---

**Sources:** Structural requirements per your explicit instructions in this conversation. Category taxonomy (beyond the confirmed first category), author system beyond the "Envis8ge" default, search approach, and social channels remain Proposed/To be confirmed since no blog currently exists to source them from — none are presented as existing facts.
