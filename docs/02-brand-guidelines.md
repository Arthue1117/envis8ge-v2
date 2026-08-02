# Brand Guidelines

> **How to read this document.** Every statement is labeled by status:
> - **Confirmed** — observed directly on the live site (https://envis8ge.com) via rendered content and computed CSS, captured 2026-08-02.
> - **Proposed** — a recommendation for the rebuild, not a documented brand rule. Requires client sign-off.
> - **To be confirmed** — unknown; not observable from the live site and not yet answered by the client.
>
> **Purpose of this document:** this is the source of truth for preserving Envis8ge's existing brand identity in the rebuilt site. Nothing here proposes a new visual direction — where the current site does not document something explicitly (e.g. logo clear space rules), a sensible, conservative recommendation is offered and clearly marked as such, not invented as fact.

---

## 1. Brand Overview
**Status: Confirmed**

Envis8ge Pte Ltd is a Singapore-based boutique social media and digital marketing agency, founded in 2013, serving brands across Singapore and the Asia-Pacific region. The current live site (envis8ge.com) is a single long-scroll page plus two secondary pages (`/portfolio`, `/contact-us`), built and hosted on a funnel/website-builder platform (page assets are served from `leadconnectorhq.com` / `filesafe.space` / `msgsndr` domains, consistent with GoHighLevel). This is noted here because it explains some of the technical texture of the current design (e.g. limited semantic HTML, page-builder-style component patterns) that the rebuild should reproduce visually while modernizing the underlying code.

The current page structure, top to bottom, is:

1. Header — logo + "Portfolio" / "Contact Us" links
2. Hero — "Trusted by brands since 2013" statement
3. "As Seen On" strip
4. Our Services (6 service categories)
5. "Our Work Speaks for Itself" — portfolio teaser / brands worked with
6. 8 Step Process
7. Customer Testimonials
8. "Ready to get STARTED?" call-to-action
9. Footer — contact details, copyright, Privacy Policy link

This structure is the baseline the rebuild should preserve (see [04-sitemap.md](04-sitemap.md) for the formal sitemap).

---

## 2. Brand Personality
**Status: Confirmed, drawn directly from site copy**

- **Fuss-free and transparent** — the company's own recurring description of its approach
- **Boutique and relationship-led** — "boutique social media agency with a regional team"
- **Practical and results-oriented** — "enabling businesses grow and succeed with practical strategies and solutions"
- **Holistic strategist, not a narrow vendor** — "We see Social Media as part of a holistic marketing plan with each part interdependent on each other"
- **Experienced and established** — repeated emphasis on "since 2013" and long client relationships

---

## 3. Mission & Positioning
**Status: Confirmed facts, with recommendations marked separately**

**Confirmed (direct or near-direct quotes from the site):**
- "Our clients love us for our fuss-free and transparent approach towards Social Media Marketing."
- "A boutique social media agency with a regional team, we've partnered with brands and organizations across different industries since 2013."
- "We combine creativity with data-driven insights to craft compelling content that captivates audiences and drives results."
- Positioning against competitors: "Many agencies tend to see Social Media as a disparate part of marketing that functions in isolation. We see Social Media as part of a holistic marketing plan with each part interdependent on each other."

**Proposed positioning statement for the rebuild** *(recommendation only, not an existing claim)*:

> Envis8ge is the fuss-free, senior-partner alternative to both DIY social media and impersonal large agencies — combining a boutique agency's transparency and responsiveness with a data-driven, full-funnel process.

**To be confirmed:** Any formal mission/vision statement, positioning against named competitors, or brand narrative beyond what is published.

---

## 4. Voice & Tone
**Status: Confirmed patterns from existing copy, with blog tone proposed**

**Website tone** (Confirmed): Direct, confident, and warm rather than corporate. Short declarative sentences mixed with the occasional rhetorical question (e.g. "What's their emotional why?"). First-person plural ("we") throughout.

**Sales/service tone** (Confirmed): Benefit-led and outcome-focused, e.g. "A great product and offer has greater opportunity to scale," "Offers make your product look good... A good offer can do wonders in increasing your sales." Confident without being aggressive; leans on process and expertise rather than hype.

**CTA tone** (Confirmed): Low-pressure and friendly. Example, verbatim: *"Ready to get STARTED?"* / *"Drop us an email with details and we'll get back to you as soon as we can!"* / *"Contact Us!"* — casual punctuation (exclamation marks), simple asks, no aggressive urgency or scarcity tactics.

**Blog tone** (**Proposed** — no blog currently exists on the live site): Recommend extending the same voice — direct, practical, first-person-plural, benefit-led — into long-form educational content (how social media strategy connects to the existing 8-Step Process). This is a recommendation for consistency, not a documented existing tone.

---

## 5. Target Audience
**Status: Confirmed segments only; others marked Recommended per instruction**

Based strictly on the client roster and copy published on the live site:

| Segment | Status | Evidence |
|---|---|---|
| SMEs / independent brands | **Confirmed** | Clients such as LOVE, NILS; Browstation; 7th Mile Coffee Shop; Vecua Honey |
| Corporate / institutional | **Confirmed** | Maybank, VSTECS, e2i (Employment and Employability Institute) |
| Education & training | **Confirmed** | HCSA Academy, Stag Match Institute / SMET, My Chinese Steps |
| Retail / malls | **Confirmed** | VivoCity, HarbourFront Centre, i12 Katong, Jurong Point, Alexandra Retail Centre |
| F&B | **Confirmed** | Don Quijote, Tokyo Soba, AmiYaki, 7th Mile Coffee Shop |
| Travel | **Confirmed** | U China Travel |
| Beauty & fashion | **Confirmed** | Sothys, Barry M, Kipling, Lady Jayne |
| Startups | **Recommended** | Not evidenced in the published client list |
| Healthcare | **Recommended** | Not evidenced in the published client list |
| Hospitality (hotels/resorts) | **Recommended** | Only adjacent evidence exists (F&B, travel) — not confirmed as a distinct served vertical |
| E-commerce | **Recommended** | Client brands appear to sell retail products, but e-commerce is not stated as a distinct service focus |

**To be confirmed:** Whether the client wants to formally position the agency toward any of the "Recommended" segments in the rebuild.

---

## 6. Logo Usage
**Status: Confirmed asset details; usage rules are Recommended**

**Confirmed:**
- The logo is served as an image (`alt="Brand Logo"`) via an image CDN, delivered as `.webp`, sourced from a `.png` master.
- Rendered header height on the live site: **40px**.
- No SVG/vector source, brand book, or logo usage documentation is published on the current site.

**Recommended (no existing documented rules — propose these as sensible defaults, pending a vector master file from the client):**
- **Clear space:** maintain minimum padding equal to the logo's own cap-height on all sides; do not let text or other elements enter this zone.
- **Minimum size:** do not render below ~32px height in digital contexts, to preserve legibility.
- **On dark backgrounds:** if a light/reversed logo variant does not exist, request one before use — do not place the current logo on dark backgrounds without contrast-checking against the confirmed palette (Section 7).
- **On light backgrounds:** current usage (white/light header) is the confirmed, safe default.
- **Incorrect usage to avoid:** do not stretch, recolor, rotate, add drop shadows/outlines, or place over busy imagery without a scrim.

**To be confirmed:** Whether an official vector logo file and brand book exist internally (recommended to obtain before final implementation).

---

## 7. Color Palette
**Status: Confirmed hex values, extracted directly from the live site's rendered CSS**

| Role | Hex | Confirmed usage on live site |
|---|---|---|
| **Primary** | `#02BAF9` | Primary CTA button background ("Contact Us!"), link/accent highlights |
| **Secondary** | `#000000` | Body/heading text, some button backgrounds, footer text |
| **Accent (tint)** | `#9FE7FF` | Light accent tint (decorative use observed alongside primary) |
| **Background (primary)** | `#FFFFFF` | Main page background |
| **Background (secondary)** | `#FAFAFA` | Alternate section background |
| **Text (primary)** | `#000000` | Headings, primary body copy |
| **Text (secondary)** | `#484848` | Secondary/supporting copy |
| **Text (tertiary)** | `#1B1B1B` | Near-black text variant observed in select elements |

**Not present on the current site — Proposed additions**, needed for a modern UI but with no existing precedent to preserve. Proposed values stay close to the confirmed neutral/primary palette rather than introducing new brand hues:

| Role | Proposed Hex | Rationale |
|---|---|---|
| Success | `#1FA971` | Standard accessible green; not derived from brand palette since none exists on-site |
| Warning | `#E0A400` | Standard accessible amber |
| Error | `#D64545` | Standard accessible red |
| Neutral scale | `#FFFFFF` → `#FAFAFA` → `#E5E5E5` → `#9E9E9E` → `#484848` → `#1B1B1B` → `#000000` | Extends the confirmed neutrals into a full scale for UI states (borders, disabled, hover, etc.) |

**To be confirmed:** Whether the client has an internal style guide with official hex values that supersede what was extracted from the rendered page.

---

## 8. Typography
**Status: Confirmed font families and observed usage; sizing system is partly Proposed**

**Confirmed — fonts loaded and used on the live site:**
- **Montserrat** — used for headings and the large hero statement (weights observed: 600–700)
- **Poppins** — used on buttons/CTAs (weight observed: 400, `text-transform: capitalize`)
- **Lato** — loaded on the page (family available for body copy)

**Confirmed observed sizes:**

| Element | Font | Size | Weight | Line-height |
|---|---|---|---|---|
| Hero statement | Montserrat | 60px | 700 | 78px |
| H1 (section heading) | Montserrat | 32px | 700 | 41.6px |
| H2 (sub-heading) | Montserrat | 21px | 600 | 27.3px |
| Button label | Poppins | ~12–16px | 400 | — |

**Proposed system** (to fill gaps not observable/standardized on the current page-builder site):

| Role | Font | Proposed size |
|---|---|---|
| Headings (H1–H3) | Montserrat, 600–700 | Responsive scale anchored to confirmed 60/32/21px |
| Subheadings | Montserrat, 500–600 | Between H2 and body |
| Body | Lato, 400 | 16px base |
| Buttons | Poppins, 500 | 14–16px, capitalize |
| Captions/fine print | Lato, 400 | 12–13px |

**Fallback fonts (Proposed):** the current site declares no explicit fallback stack at the body level (it falls back to the browser default serif when fonts fail to load, which is very unlikely intentional). Recommend a standard sans-serif fallback stack for the rebuild:
`Montserrat, "Segoe UI", -apple-system, sans-serif` (headings) and `Lato, "Segoe UI", -apple-system, sans-serif` (body).

**To be confirmed:** Whether Montserrat/Lato/Poppins are the client's officially intended typefaces, or simply the page-builder's defaults.

---

## 9. Photography Style
**Status: To be confirmed / Proposed**

The current site's published service list references "Product & Lifestyle shots" and "Event coverage" as an existing service offering, confirming photography is part of the brand's output. However, the specific visual style (color grading, framing, subject treatment) of the current site's own imagery could not be reliably assessed from rendered CSS/DOM alone.

**Proposed (for consistency, pending client confirmation):** Bright, clean, natural lighting; authentic candid moments over stock-photo staging; consistent color grading aligned to the confirmed cyan (`#02BAF9`) accent where used in overlays or UI framing.

**To be confirmed:** Access to the client's actual photo library and any existing internal photography direction.

---

## 10. Illustration Style
**Status: To be confirmed**

No illustration elements were identified on the current live site. Nothing to preserve.

**To be confirmed:** Whether illustration is desired at all in the rebuild; if so, style direction must be defined from scratch as a new addition, not a preserved brand element.

---

## 11. Iconography
**Status: To be confirmed**

No consistent icon system was identified in the page structure extracted from the live site.

**Proposed (if icons are introduced in the rebuild):** A single consistent line-icon set (e.g. one open-source icon library) at consistent stroke width, colored using the confirmed primary (`#02BAF9`) or text-secondary (`#484848`) palette — rather than introducing a new visual language.

---

## 12. UI Style
**Status: Confirmed button styling; other components Proposed**

**Buttons (Confirmed):** Primary CTA button — background `#02BAF9`, text `#ffffff`, **fully pill-shaped** (`border-radius: 50px`), padding `15px 30px`, Poppins 400, `text-transform: capitalize`.

**Cards, Inputs, Navigation, Forms — not reliably extractable from the current page-builder markup (Proposed for the rebuild, styled to match the confirmed palette/typography/button language):**

| Component | Proposal |
|---|---|
| Cards (services/portfolio/blog) | Rounded corners (12–16px) consistent with the pill-button language, soft shadow on hover, white/`#fafafa` background |
| Inputs | Rounded corners (8–12px), `#484848` placeholder text, `#02BAF9` focus outline |
| Navigation | Preserve confirmed structure: logo left, "Portfolio" / "Contact Us" (plus new "Blog") right, sticky on scroll |
| Forms | Match input style above; primary submit button uses the confirmed pill-button style |

**To be confirmed:** Any existing design file (Figma, etc.) that documents card/input/form styling more precisely than what's inferable from the live page.

---

## 13. Motion Principles
**Status: Proposed — the current site has no meaningful custom motion to preserve**

No custom scroll animation, parallax, or transition system was detected on the current live site beyond default page-builder behavior. This means the animation layer is a **new addition** on top of preserved visuals, not something being carried over. Per your direction, it should read as premium and understated — in the register of Apple, Stripe, Linear, and Vercel — rather than introducing a new visual identity.

**Proposed principles:**
- Smooth, elegant, and premium — never flashy or attention-seeking
- Fast: target 60fps, short durations (150–400ms typical), easing curves over linear motion
- Purposeful only: every animation clarifies hierarchy, state change, or spatial relationship — never decoration for its own sake
- Performance-first: animate `transform`/`opacity` only where possible; avoid layout-triggering properties
- Mobile-friendly: reduced/simplified motion on smaller viewports where it aids performance
- Respect `prefers-reduced-motion`: all non-essential motion must be disabled or reduced when requested

**To be confirmed:** None — this section is explicitly proposed per your stated direction and should be treated as approved guidance for the implementation plan once you sign off on this document.

---

## 14. Accessibility
**Status: To be confirmed / Proposed baseline**

The current live site's accessibility (contrast ratios, font sizing, touch targets, keyboard navigation, reduced-motion handling) has not been formally audited as part of this document.

**Proposed baseline for the rebuild:**
- **Contrast:** minimum WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text/UI components). Note: confirmed primary `#02BAF9` on white should be spot-checked against this ratio for text use versus decorative/button use.
- **Font sizes:** minimum 16px base body text; avoid sub-14px for essential content.
- **Touch targets:** minimum 44×44px per WCAG/mobile guidance, consistent with the confirmed pill-button padding.
- **Keyboard navigation:** all interactive elements (nav, cards, forms, blog filters) must be reachable and operable via keyboard, with visible focus states.
- **Reduced motion:** honor `prefers-reduced-motion` per Section 13.

**To be confirmed:** Whether the client has a specific compliance target (e.g. WCAG AA vs AAA) or legal requirement.

---

## 15. Brand Do's and Don'ts
**Status: Derived from confirmed identity + project direction**

**Do:**
- Keep the confirmed color palette, fonts (Montserrat/Poppins/Lato), pill-shaped buttons, and page structure intact
- Preserve the existing voice: direct, warm, first-person-plural, low-pressure CTAs
- Use real client names/testimonials/results exactly as published — never fabricate new ones
- Introduce motion and polish that feels like a quality upgrade, not a redesign

**Don't:**
- Don't introduce a new color palette, new primary typefaces, or a new logo
- Don't change the core page structure/order without client approval
- Don't invent case study details, statistics, or client outcomes not already published
- Don't add flashy, distracting, or gimmicky animation
- Don't let new sections (Blog) visually diverge from the rest of the site

---

## 16. Future Brand Recommendations
**Status: Proposed — separate from confirmed guidelines above**

- Commission a proper vector (SVG) logo master with light/dark variants, since none currently exists
- Formalize a documented color/type system (this document's Proposed tables) into an internal style guide beyond this project
- Consider defining semantic UI colors (success/warning/error) officially, since the current site has never needed them
- Establish a lightweight component library (buttons, cards, inputs) so future pages stay consistent automatically
- Revisit photography direction once a real photo library is available, rather than relying on inference

---

**Sources:** Live content and computed styles extracted directly from https://envis8ge.com (homepage, `/portfolio`, `/contact-us`) via rendered DOM/CSS inspection on 2026-08-02. All hex values, font names, and copy quoted above are taken directly from the live site. No brand facts have been invented; every recommendation is explicitly labeled Proposed and requires your approval before being treated as a rule for the rebuild.
