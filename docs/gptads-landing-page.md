# ChatGPT Ads landing page

- Route: `/GPTads` (case-sensitive), canonical `https://envis8ge.com/GPTads`.
- Audience: Singapore B2C business owners.
- Unlisted: no inbound link added to the site's navigation or footer. Search indexing remains enabled (`index, follow`), as requested.
- Brand: existing cyan, light-blue, mint accent gradient, black/white and Montserrat design tokens.
- Enquiries: `/api/contact`, service `ChatGPT Ads consultation`, source and business details included in the notification message.
- Form fields: Name, Contact number, Email address, Company website, Monthly advertising budget. A single-word name is supported.
- Newsletter: no checkboxes, per request. A notice above the submit button explains enquiry contact and marketing updates, with an unsubscribe option. GPT Ads submissions send `newsletterOptIn: true` and enter the existing marketing flow.
- Notifications: GPT Ads enquiries are addressed only to `shawn@envis8ge.com`, with subject `New ChatGPT Ads enquiry: <name>` and all submitted details. Email-provider rejection returns a form error. Other contact-form notifications retain their existing recipients and behaviour.
- Logos: all 41 existing agency client assets from `https://shawnyeodigital.com/agency/` appear in a horizontal marquee. Duplicate loop content is hidden from assistive technology; pause/resume and reduced-motion fallback are supported.
- Pixel: `AgEMrYuCyboP1vUabv4Y9A`, loaded only by `/GPTads`. Sends `contents_viewed` once on page arrival and `lead_created` only after an accepted enquiry. Page exit via client navigation disables measurement. No tracking component was added to the sitewide layout.
- Conversion API: server-only integration uses the same Pixel ID and event IDs as the browser for deduplication. `/api/gptads/content-view` accepts same-origin requests referred from `/GPTads`; contact-handler lead conversions require the GPT Ads service, a valid event ID and a `/GPTads` referrer. Source URL is fixed to the landing page. Available `oppref` and `__obref` identifiers support attribution; raw enquiry details are not included in Conversion API payloads.
- Conversion API key: configure `OPENAI_ADS_CAPI_KEY` as a secret on the existing Cloudflare Worker. With no key, server events are skipped and browser measurement still works. Never put this secret in client code or commit it. Conversion API delivery failures do not change the result of an accepted enquiry.
- Sections added 14 October 2026: "Why now" (`#why-now`, black band after The Opportunity: early-mover, low-competition message with a no-guarantee note) and "What you will receive" (`#what-you-receive`, after What We Handle: seven numbered deliverables).
- Copy update 14 October 2026: hero H1 "Beat your competitors to ChatGPT Ads.", hero CTA "Check if ChatGPT Ads will work for you"; removed "The Opportunity" and "Built around your customers" sections and the hero scroll link; services H2 "What to expect with Envis8ge ChatGPT Ads"; pilot H2 "Reach out to new audiences with ChatGPT Ads".
- Conversion update 14 October 2026: hero intro and "Free assessment · No obligation" note; "only 10 ChatGPT Ads clients for now" notice in hero and consultation; "Trusted by brands since 2013" beside the form; budget label "Rough monthly ad budget (a guess is fine)"; six real agency testimonials (from shawnyeodigital.com / `agencyTestimonials`) under the logo marquee, labelled as agency rather than ChatGPT Ads results; success state confirms receipt and offers WhatsApp (`https://wa.link/jzk68z`, QR at `public/images/gptads/whatsapp-qr.svg`, hidden on mobile). Deployed as Cloudflare version `51181b84-a27d-4396-8a12-3a24049b7c08`.
- Campaign examples are illustrative; agency client logos do not imply ChatGPT Ads results.

## Validation

Production Next.js and OpenNext Cloudflare builds passed. TypeScript and targeted ESLint checks passed. Desktop and mobile browser checks verified the layout, mobile overflow and the consultation anchor. Local HTTP checks verified the route, canonical URL, indexing metadata and invalid payload rejection. Mocked handler checks verified newsletter opt-in/opt-out and existing-form compatibility without sending emails.

## Deployment

Updated on 13 October 2026 with landing-page-only pixel and server Conversion API code, alongside the 41-logo marquee, five-field form and Shawn notifications. The live `/GPTads` page contains the Pixel SDK; a fresh homepage load does not. Mocked checks covered browser events, CAPI schemas, matching event IDs, attribution, source-page restrictions, rejected enquiries and tracking-failure isolation. Cloudflare version: `eb708424-85da-48db-9f22-f7cf967d0db6`. The `OPENAI_ADS_CAPI_KEY` secret is configured. One live server content-view event was accepted by OpenAI (endpoint HTTP 204); requests referred from `/contact-us` were rejected (HTTP 403). No fake lead or enquiry was submitted. Visibility in Ads Manager and live lead delivery have not been independently inspected.

Use `opennextjs-cloudflare build`, followed by `opennextjs-cloudflare deploy`. A plain Next.js build does not generate all standalone artifacts required by OpenNext, so `--skipNextBuild` is suitable only after an OpenNext build. The deployment must use the existing `envis8ge-web` hosting account, rather than create a replacement in a different account.
