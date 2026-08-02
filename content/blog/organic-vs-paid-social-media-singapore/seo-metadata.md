# SEO Metadata — First Blog Article

**Article:** Organic vs Paid Social Media in Singapore: What Actually Works (And When to Use Both)
**Status:** Metadata fields below are as provided/approved by you. `FAQPage` schema is a structural placeholder only — it cannot be populated with real questions/answers until the article's FAQ content (Section 3.6 of [06-blog-plan.md](../../../docs/06-blog-plan.md)) is actually written; see the note at the end of this document.

---

## 1. Core Metadata

```
title: Organic vs Paid Social Media in Singapore: What Actually Works (And When to Use Both)
seoTitle: Organic vs Paid Social Media Singapore | Envis8ge
slug: organic-vs-paid-social-media-singapore
canonical: /blog/organic-vs-paid-social-media-singapore
description: Should Singapore brands run organic content, paid ads, or both? 13 years of campaign data shows what actually works—and why the choice isn't either/or.
author: Envis8ge
category: Social Media Marketing
keywords:
  - Organic Social Media Singapore
  - Paid Social Media Singapore
  - Meta Ads Singapore
  - Facebook Marketing Singapore
  - Social Media Agency Singapore
featuredImage: /images/blog/organic-vs-paid-social-media-singapore/hero.jpg
ogImage: /images/blog/organic-vs-paid-social-media-singapore/hero.jpg
publishedAt: (to be filled upon publication)
lastUpdated: (to be filled upon publication)
readingTime: (auto-calculated at build time, per Blog Plan Section 6)
locale: en-SG
```

---

## 2. Open Graph Metadata

```html
<meta property="og:type" content="article" />
<meta property="og:title" content="Organic vs Paid Social Media in Singapore: What Actually Works (And When to Use Both)" />
<meta property="og:description" content="Should Singapore brands run organic content, paid ads, or both? 13 years of campaign data shows what actually works—and why the choice isn't either/or." />
<meta property="og:url" content="https://envis8ge.com/blog/organic-vs-paid-social-media-singapore" />
<meta property="og:image" content="https://envis8ge.com/images/blog/organic-vs-paid-social-media-singapore/hero.jpg" />
<meta property="og:image:width" content="1600" />
<meta property="og:image:height" content="900" />
<meta property="og:site_name" content="Envis8ge" />
<meta property="og:locale" content="en_SG" />
<meta property="article:author" content="Envis8ge" />
<meta property="article:section" content="Social Media Marketing" />
```

**Note:** `og:url` and `article:author` assume the domain `envis8ge.com` and brand-level authorship per Blog Plan Section 5 — both consistent with confirmed project facts, not new claims.

---

## 3. Twitter Card Metadata

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Organic vs Paid Social Media Singapore | Envis8ge" />
<meta name="twitter:description" content="Should Singapore brands run organic content, paid ads, or both? 13 years of campaign data shows what actually works—and why the choice isn't either/or." />
<meta name="twitter:image" content="https://envis8ge.com/images/blog/organic-vs-paid-social-media-singapore/hero.jpg" />
```

**To be confirmed:** Whether Envis8ge has an official X/Twitter handle to include via `twitter:site`/`twitter:creator` — none is published on the current live site.

---

## 4. Article Schema (JSON-LD — `BlogPosting`)

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Organic vs Paid Social Media in Singapore: What Actually Works (And When to Use Both)",
  "description": "Should Singapore brands run organic content, paid ads, or both? 13 years of campaign data shows what actually works—and why the choice isn't either/or.",
  "image": "https://envis8ge.com/images/blog/organic-vs-paid-social-media-singapore/hero.jpg",
  "author": {
    "@type": "Organization",
    "name": "Envis8ge",
    "url": "https://envis8ge.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Envis8ge Pte Ltd",
    "logo": {
      "@type": "ImageObject",
      "url": "https://envis8ge.com/logo.png"
    }
  },
  "datePublished": "TO_BE_FILLED_ON_PUBLICATION",
  "dateModified": "TO_BE_FILLED_ON_PUBLICATION",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://envis8ge.com/blog/organic-vs-paid-social-media-singapore"
  },
  "articleSection": "Social Media Marketing",
  "keywords": [
    "Organic Social Media Singapore",
    "Paid Social Media Singapore",
    "Meta Ads Singapore",
    "Facebook Marketing Singapore",
    "Social Media Agency Singapore"
  ],
  "inLanguage": "en-SG"
}
```

Author is typed as `Organization` (not `Person`), matching the Approved brand-level byline in Blog Plan Section 5 — this should switch to a `Person` type only if/when named individual authors are confirmed.

---

## 5. Breadcrumb Schema (JSON-LD — `BreadcrumbList`)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://envis8ge.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://envis8ge.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Social Media Marketing",
      "item": "https://envis8ge.com/blog/category/social-media-marketing"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Organic vs Paid Social Media in Singapore: What Actually Works (And When to Use Both)",
      "item": "https://envis8ge.com/blog/organic-vs-paid-social-media-singapore"
    }
  ]
}
```

---

## 6. FAQ Schema (JSON-LD — `FAQPage`)

**Status: Structural placeholder only — cannot be completed yet.**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "PENDING — populate from the article's actual FAQ Accordion content once written",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PENDING"
      }
    }
  ]
}
```

`FAQPage` schema must mirror the real, on-page FAQ Accordion content exactly (Google's structured data guidelines require this, and it would also mean inventing Q&A content — which this project's standing rule prohibits). This will be generated from the actual FAQ block once the article body is written.

---

## Open Item

This metadata package is complete and ready. **The article body itself (Introduction, Key Takeaways, Main Content, FAQ content, statistics, conclusions) has not yet been supplied in this conversation** — see the accompanying message for details. Nothing in this file depends on or assumes that content.
