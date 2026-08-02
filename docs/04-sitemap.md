# Sitemap

> **How to read this document.** Same convention as prior locked documents:
> - **Confirmed** — page/route exists on the live site today (https://envis8ge.com, verified 2026-08-02).
> - **Approved addition** — new page/route not on the current site, but explicitly requested and approved in this project's direction (Blog, Portfolio Detail template).
> - **Proposed** — a structural recommendation not yet explicitly requested or confirmed.
> - **To be confirmed** — open question for the client.
>
> This sitemap defines the full route structure for the rebuild. It preserves the current site's structure and adds only what has been explicitly approved.

---

## 1. Current Site Structure (Confirmed)

The live site today is effectively a single long-scroll homepage plus two secondary pages:

```
/                    (Home — single-page scroll: Hero, As Seen On, Services,
                      Portfolio teaser, 8 Step Process, Testimonials, CTA, Footer)
/portfolio           (Portfolio — client work overview)
/contact-us          (Contact Us)
/privacy-policy      (Privacy Policy — linked from footer; content not audited)
```

Header navigation (Confirmed): logo (links home) + "Portfolio" + "Contact Us."
Footer (Confirmed): contact details, copyright, "Envis8ge Pte Ltd," Privacy Policy link.

---

## 2. Rebuilt Site Structure

```
/                              Home
/portfolio                     Portfolio (index/grid)
/portfolio/[slug]               Portfolio Detail (dynamic, one per project)
/blog                           Blog (index — listing, categories, search, featured)
/blog/[slug]                    Blog Article (dynamic)
/blog/category/[category]       Blog category archive
/contact-us                     Contact Us
/privacy-policy                 Privacy Policy
```

### 2.1 Home — `/`
**Status: Structure Confirmed; "Latest Articles" section is an Approved addition**

Preserves the current section order exactly, per Brand Guidelines Section 1:

1. Header/Nav (Confirmed structure + Blog item — Approved addition)
2. Hero (Confirmed)
3. "As Seen On" strip (Confirmed)
4. Our Services — 6 categories (Confirmed)
5. Portfolio teaser / "Our Work Speaks for Itself" (Confirmed)
6. 8 Step Process (Confirmed)
7. Customer Testimonials (Confirmed)
8. **Latest Articles** — Blog preview section, links to `/blog` (**Approved addition**, per your request)
9. "Ready to get STARTED?" CTA (Confirmed)
10. Footer (Confirmed)

The Latest Articles section is inserted after Testimonials and before the final CTA, so the page still ends on the existing conversion-focused close ("Ready to get STARTED?") rather than disrupting the confirmed closing flow.

**To be confirmed:** Exact number of posts to feature in Latest Articles (proposing 3, pending confirmation).

### 2.2 Portfolio — `/portfolio`
**Status: Confirmed to exist; internal structure Proposed**

Grid of portfolio/case study cards (Design System Section 14), each linking to its own Portfolio Detail page. Preserves the current page's role as a client-work showcase.

### 2.3 Portfolio Detail — `/portfolio/[slug]`
**Status: Approved addition — new dynamic route per your requirements**

One reusable template, one page per project, URL pattern `/portfolio/project-name`. Per your specification, each page includes:

- Hero Banner
- Featured Image
- Client
- Industry
- Services
- Challenge
- Solution
- Results
- Gallery
- Call-to-Action
- Previous / Next Project
- Related Projects

**To be confirmed:** Source content for Challenge/Solution/Results per existing client (e.g. VivoCity, Kipling, Barry M) — this narrative detail is not published on the current site and will need to come from the client, not be invented (see [07-portfolio-plan.md](07-portfolio-plan.md)).

### 2.4 Blog — `/blog`
**Status: Approved addition**

Index/listing page supporting, per your requirements: categories, search, featured posts, pagination. Full spec in [06-blog-plan.md](06-blog-plan.md).

### 2.5 Blog Article — `/blog/[slug]`
**Status: Approved addition**

Dynamic article template supporting: reading time, author, related posts, SEO metadata, per your requirements. Full spec in [06-blog-plan.md](06-blog-plan.md).

### 2.6 Blog Category Archive — `/blog/category/[category]`
**Status: Proposed**

Standard pattern to support the requested "Categories" feature with a real, linkable/shareable URL rather than client-side-only filtering. **To be confirmed:** whether category browsing should be a dedicated route (proposed) or an in-page filter on `/blog` only.

### 2.7 Contact Us — `/contact-us`
**Status: Confirmed to exist; exact field content to be confirmed**

Preserves current page. **To be confirmed:** current form field set (see Design System Section 9).

### 2.8 Privacy Policy — `/privacy-policy`
**Status: Confirmed to exist**

Preserved as-is; content migration only, no redesign implied.

---

## 3. Navigation Summary

**Header (Confirmed + one Approved addition):**
Logo · Portfolio · **Blog** (Approved addition) · Contact Us

**Footer (Confirmed content, per Design System Section 12):**
Contact details · Copyright · Privacy Policy link

---

## 4. Out of Scope / Not Included

Per the locked Project Brief, the following are **not** included in this sitemap because they are not confirmed as in scope:

- E-commerce / checkout flows
- Client login or portal
- Multi-language routes
- Individual landing pages per service (not requested; services remain a homepage section, not separate pages) — **to be confirmed** if this should change

---

**Sources:** Confirmed routes and structure verified directly on https://envis8ge.com on 2026-08-02. Approved additions (Blog, Portfolio Detail) reflect your explicit project direction earlier in this conversation. No new pages beyond what is confirmed or explicitly approved have been added.
