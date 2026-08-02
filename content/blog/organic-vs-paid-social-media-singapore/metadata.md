# Metadata — Organic vs Paid Social Media in Singapore

**Status: Locked.** Production source metadata. `articleSchema` and `faqSchema` JSON-LD live in their own files ([article-schema.json](article-schema.json), [faq-schema.json](faq-schema.json)) so they can be imported directly at build time.

> **URL structure (confirmed permanent):** `/blog/[slug]` is the canonical structure for all blog articles, per your explicit confirmation. This article's slug parameter is `organic-vs-paid-social-media-singapore` and its full canonical path is `/blog/organic-vs-paid-social-media-singapore`. All metadata, Open Graph, Twitter Card, and schema fields below already conform to this structure.

---

## Core Metadata

```yaml
title: "Organic vs Paid Social Media in Singapore: What Actually Works (And When to Use Both)"
seoTitle: "Organic vs Paid Social Media Singapore | Envis8ge"
slug: organic-vs-paid-social-media-singapore
path: /blog/organic-vs-paid-social-media-singapore
canonical: /blog/organic-vs-paid-social-media-singapore
description: "Should Singapore brands run organic content, paid ads, or both? 13 years of campaign data shows what actually works—and why the choice isn't either/or."
author: Envis8ge
authorType: Organization
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
readingTime: "auto-calculated at build time (~8 min, per Blog Plan Section 6)"
locale: en-SG
```

---

## Open Graph Metadata

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

---

## Twitter Card Metadata

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Organic vs Paid Social Media Singapore | Envis8ge" />
<meta name="twitter:description" content="Should Singapore brands run organic content, paid ads, or both? 13 years of campaign data shows what actually works—and why the choice isn't either/or." />
<meta name="twitter:image" content="https://envis8ge.com/images/blog/organic-vs-paid-social-media-singapore/hero.jpg" />
```

**To be confirmed:** No official X/Twitter handle is published on the current live site, so `twitter:site`/`twitter:creator` are omitted rather than invented.

---

## Breadcrumb Schema (JSON-LD — `BreadcrumbList`)

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
