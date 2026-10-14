/**
 * Confirmed Home page copy, migrated verbatim from the live site
 * (https://envis8ge.com, captured 2026-08-02) per docs/05-content-plan.md
 * Section 2. Do not edit this copy for style — it is Confirmed content,
 * not draft copy. If the client requests wording changes, update here
 * and note the change in docs/CHANGELOG.md.
 */

export const hero = {
  heading: "Trusted by brands since 2013",
  body: "Our clients love us for our fuss-free and transparent approach towards Social Media Marketing. A boutique social media agency with a regional team, we've partnered with brands and organizations across different industries since 2013.",
};

/**
 * As Seen On — discovered during the Phase 3 Visual Fidelity Pass (not
 * in the original text-only extraction). Confirmed via the live site's
 * "As Seen On" composite logo image: Mediacorp, DAN (Digital Agency
 * Network), DesignRush.
 */
export const asSeenOn = {
  image: "/images/as-seen-on/as-seen-on.png",
};

export const services = {
  heading: "Our Services",
  /**
   * Icon images are the real per-category icons from the live site
   * (public/images/services/), mapped 1:1 by verified DOM containment
   * (each icon confirmed to sit inside the same container as its
   * category heading) — not by visual guesswork.
   */
  items: [
    {
      category: "Content/Community Mgt",
      icon: "/images/services/service-1.webp",
      items: [
        "Social Media Strategy & Content Curation",
        "Online Community Management",
      ],
    },
    {
      category: "User Generated Content",
      icon: "/images/services/service-2.webp",
      items: ["UGC Engagement Strategy", "Creator Liaison & Curation"],
    },
    {
      category: "Social Media Ad Buy",
      icon: "/images/services/service-3.webp",
      items: ["Ad Buy Strategy & Management", "Lead Generation"],
    },
    {
      category: "Email Marketing",
      icon: "/images/services/service-4.webp",
      items: ["Email Marketing Campaigns", "EDM Design"],
    },
    {
      category: "Website Design",
      icon: "/images/services/service-5.webp",
      items: ["Website Design & Management", "Landing Page Optimization"],
    },
    {
      category: "Video/ Photography",
      icon: "/images/services/service-6.webp",
      items: ["Product & Lifestyle shots", "Event coverage"],
    },
  ],
} as const;

export const portfolioPreview = {
  heading: "Our Work Speaks for Itself",
  body: "Explore our curated selection of projects that showcase our expertise in content strategy and visual storytelling. We combine creativity with data-driven insights to craft compelling content that captivates audiences and drives results.",
  subheading: "Brands we've worked with",
  /**
   * The 8 real campaign creative images from the live site's portfolio
   * showcase grid (public/images/portfolio/). None are labeled with a
   * client name on the live site (no alt text, no captions, no links) —
   * reproduced the same way here rather than guessing which client each
   * belongs to.
   */
  images: [
    "/images/portfolio/portfolio-1.jpeg",
    "/images/portfolio/portfolio-2.png",
    "/images/portfolio/portfolio-3.png",
    "/images/portfolio/portfolio-4.png",
    "/images/portfolio/portfolio-5.jpeg",
    "/images/portfolio/portfolio-6.png",
    "/images/portfolio/portfolio-7.png",
    "/images/portfolio/portfolio-8.jpeg",
  ],
  /**
   * All 40 real client logos from the live site's "Brands we've worked
   * with" grid (public/images/clients/). Also unlabeled on the live site
   * (empty alt text) — displayed the same way here.
   */
  clientLogoCount: 40,
} as const;

export const process = {
  heading: "8 Step Process",
  intro:
    "Many agencies tend to see Social Media as a disparate part of marketing that functions in isolation. We see Social Media as part of a holistic marketing plan with each part interdependent on each other. With Envis8ge's 8 step process, we find the best ways to use Social Media with your current marketing and operational plans.",
  steps: [
    {
      title: "Audience Research",
      description:
        "Dive deep into our audience persona with vital questions such as 'What's their emotional why?' and 'What's holding them back?'. This forms the basis of any content we generate.",
    },
    {
      title: "Product Research",
      description:
        "A great product and offer has greater opportunity to scale and will make a huge difference to any Social Media campaign. We seek to understand your products and it's demand in the market.",
    },
    {
      title: "Offer Research",
      description:
        "Offers make your product look good, and attract your ideal target audiences to your Call-To-Action. A good offer can do wonders in increasing your sales and generating a higher ROI for your business.",
    },
    {
      title: "Funnel Research",
      description:
        "The pathway in which a customer goes through can make a HUGE impact. Here we look into each step of your customer's journey - from cold audiences to returning customers.",
    },
    {
      title: "Content Strategy",
      description:
        "Organic and Paid content both play important roles in Social Media. From determining content pillars to ad buy objectives, this phase determines the effectiveness of your Social Media campaigns",
    },
    {
      title: "Integration Strategy",
      description:
        "The best strategies don't seek to build everything from scratch; they seek to integrate with what's already working for you and the people in your industry.",
    },
    {
      title: "Execution",
      description:
        "All that planning had better lead to somewhere! From crafting relevant content to optimizing ad buy, this is where we take tangible action to make the magic happen.",
    },
    {
      title: "Evaluation",
      description:
        "The modern audience is fickle. What works in one season might not work for another. Through constant testing and evaluation, we dive deep into the changing trends and adapt for success.",
    },
  ],
} as const;

export const testimonials = {
  heading: "Why Our Clients Choose Us",
  label: "Customer Testimonials",
  intro:
    "Our clients love us for our fuss-free and transparent approach towards Social Media Marketing. Established in 2013, we're behind many of the brands you know and love, enabling businesses grow and succeed with practical strategies and solutions.",
  items: [
    {
      quote:
        "Envis8ge has also been responsive to last minute requests, which is much appreciated in a field of many moving parts. It has been my pleasure working with Envis8ge, and I would recommend Envis8ge for social media services to fellow marketeers.",
      name: "Darryll Chua",
      title: "Principal Specialist, Communications and Digital",
      company: "Employment and Employability Institute (e2i)",
    },
    {
      quote:
        "The working relationship with Envis8ge had been smooth and enjoyable. I would recommend Envis8ge for organisations intending to boost their social media presence in view of their professionalism.",
      name: "Paul Chong",
      title: "Vice President Marketing",
      company: "VSTECS (Singapore) Pte Ltd",
    },
    {
      quote:
        "I want to thank Shawn and Envis8ge for the excellent work they have done for LOVE, NILS and would sincerely recommend Envis8ge for any organisation looking to develop their social media initiatives.",
      name: "Lesli Berggren",
      title: "Founder",
      company: "LOVE, NILS",
    },
    {
      quote:
        "Since Envis8ge had taken over our social media over a period of 7 months, our Facebook fans have increased by 160%, engaged users increased by 61.1X and reach increased by 32.4X. From an inactive online presence, we are now engaging our audience actively via Facebook, Instagram, monthly email newsletters and blog articles. We've achieved multiple new leads through our social media channels, and built brand presence online.",
      name: "Leo Chu",
      title: "Founder",
      company: "U China Travel",
    },
    {
      quote:
        "VF Brands has engaged Envis8ge to manage our Social Media content and media buy for Kipling Singapore; as well as collaborative ads for Philippines and Malaysia. As we sought to increase our brand awareness and online sales in the New Normal world, Envis8ge has been instrumental in planning and crafting quality content for our audiences. They've also supported us in our push for Facebook Live events, Personal Shopper Concierge on WhatsApp, seasonal promotions and other online initiatives.",
      name: "Stephanie Chong",
      title: "Regional Marketing Manager, Kipling Singapore & APAC Wholesale",
      company: "VF Brands Pte Ltd",
    },
    {
      quote:
        "As the leading British colour cosmetics company, Barry M Cosmetics sought to expand within Asia in 2019. We engaged Envis8ge to increase brand awareness and reach in Singapore. Over the past 16 months, Envis8ge has been consistent in generating quality content for our social media pages, sometimes going out of the way to organise giveaways and collaborations with suitable local brands and influencers. From near-zero growth and engagement, we have a much more active Facebook and Instagram page.",
      name: "Heena Dhobi",
      title: "National Account Manager",
      company: "Barry M Cosmetics",
    },
  ],
} as const;

/**
 * Agency content. `brandLogos`, `agencyResults`, and `agencyTestimonials`
 * below are migrated verbatim from https://shawnyeodigital.com/agency/
 * (captured 2026-08-20) — the same Envis8ge team's own case-study/results
 * page on Shawn Yeo's personal site (its own header logo links back to
 * https://envis8ge.com/). Extracted directly from raw HTML (not an
 * AI-summarized fetch) so wording, numbers, and names are exact, per the
 * same verbatim standard used for the portfolio case studies. Its
 * "Get In Touch" section, header, and footer are also not reproduced;
 * this site keeps its own.
 *
 * `agencyServices` is the exception: its service list (the six category
 * titles) is referenced from that same page per the client's request,
 * but the eyebrow/headline/intro copy and the per-item descriptions are
 * original Envis8ge wording, not copied from Shawn Yeo's site — see the
 * doc comment on `agencyServices` below.
 *
 * `brandLogos` below is the real, in-color "Brands we've worked with"
 * client-logo artwork from that same source page (`/_astro/*.webp` /
 * `*.svg`), downloaded as-is (not recreated, redrawn, recolored, or
 * grayscaled) and saved under public/images/brands/. Per correction,
 * the site's own earlier grayscale client-logo set
 * (public/images/clients/) is not used for this section.
 */
export const brandLogos = [
  { src: "/images/brands/stag-match-education.webp", alt: "stag match education" },
  { src: "/images/brands/katong.webp", alt: "katong" },
  { src: "/images/brands/7th-mile-coffeeshop.webp", alt: "7th mile coffeeshop" },
  { src: "/images/brands/acetek-college.webp", alt: "acetek college" },
  { src: "/images/brands/amiyaki.webp", alt: "amiyaki" },
  { src: "/images/brands/aquatiz.webp", alt: "aquatiz" },
  { src: "/images/brands/barry-m.webp", alt: "barry m" },
  { src: "/images/brands/bmw.webp", alt: "bmw" },
  { src: "/images/brands/don-quijote.webp", alt: "don quijote" },
  { src: "/images/brands/e2i.webp", alt: "e2i" },
  { src: "/images/brands/eduquest.webp", alt: "eduquest" },
  { src: "/images/brands/era.webp", alt: "era" },
  { src: "/images/brands/erc-institute.webp", alt: "erc institute" },
  { src: "/images/brands/harbourfront-centre.webp", alt: "harbourfront centre" },
  { src: "/images/brands/hcsa-academy.svg", alt: "hcsa academy" },
  { src: "/images/brands/henney-bear.webp", alt: "henney bear" },
  { src: "/images/brands/ingrasys.webp", alt: "ingrasys" },
  { src: "/images/brands/inspire-immigration.webp", alt: "inspire immigration" },
  { src: "/images/brands/john-and-co-jewellery.webp", alt: "john and co jewellery" },
  { src: "/images/brands/jurong-point.webp", alt: "jurong point" },
  { src: "/images/brands/kipling.svg", alt: "kipling" },
  { src: "/images/brands/love-nils.webp", alt: "love nils" },
  { src: "/images/brands/maritime-port-authority.webp", alt: "maritime port authority" },
  { src: "/images/brands/marshall-cavendish.svg", alt: "marshall cavendish" },
  { src: "/images/brands/maybank.webp", alt: "maybank" },
  { src: "/images/brands/music-solutions-academy.webp", alt: "music solutions academy" },
  { src: "/images/brands/my-chinese-steps.webp", alt: "my chinese steps" },
  { src: "/images/brands/nu-skin.svg", alt: "nu skin" },
  { src: "/images/brands/psa.webp", alt: "psa" },
  { src: "/images/brands/rht-academy.webp", alt: "rht academy" },
  { src: "/images/brands/sothys-paris.webp", alt: "sothys paris" },
  { src: "/images/brands/spd.webp", alt: "spd" },
  { src: "/images/brands/spoonx.webp", alt: "spoonx" },
  { src: "/images/brands/stag-match-institute.webp", alt: "stag match institute" },
  { src: "/images/brands/sunflower-preschool.webp", alt: "sunflower preschool" },
  { src: "/images/brands/the-car-concept.webp", alt: "the car concept" },
  { src: "/images/brands/tokyo-soba.webp", alt: "tokyo soba" },
  { src: "/images/brands/u-china-travel.webp", alt: "u china travel" },
  { src: "/images/brands/unionpay.svg", alt: "unionpay" },
  { src: "/images/brands/vivocity.webp", alt: "vivocity" },
  { src: "/images/brands/vstecs.webp", alt: "vstecs" },
] as const;

/**
 * "What We Do" — service categories per the client's reference
 * (https://shawnyeodigital.com/agency/), reworded in Envis8ge's own voice
 * for Envis8ge's own boutique social-media-agency positioning (est. 2013,
 * regional team — see `hero` above), not copied wording or claims from
 * that reference site. The section's prior eyebrow/headline/intro copy
 * ("Social Media Agency in Singapore" / "Leads from $3.03...") has been
 * removed at the client's request — see `AgencyServices` in
 * ./agency-services.tsx.
 */
export const agencyServices = {
  label: "What We Do",
  items: [
    {
      title: "Lead Generation",
      description:
        "Paid social campaigns planned, built and optimised around real enquiries, not just impressions — with ongoing testing to keep results moving in the right direction.",
    },
    {
      title: "Content Strategy",
      description:
        "A content plan built around who you're speaking to, which platforms they're on, and what you want them to do next.",
    },
    {
      title: "Content Management",
      description:
        "Copy, imagery and video produced and scheduled for your social channels, so your brand shows up consistently without it falling on your team.",
    },
    {
      title: "Landing Page Dev",
      description:
        "Landing pages designed around a single goal: turning the traffic from your campaigns into leads.",
    },
    {
      title: "AEO / SEO",
      description:
        "Helping your business get found in both traditional search and the AI answer engines more buyers are starting with.",
    },
    {
      title: "Email Marketing",
      description:
        "Email campaigns that nurture leads after the first enquiry, and a list your business owns for the long term.",
    },
  ],
} as const;

export const agencyResults = {
  heading: "Cost per lead, by industry",
  lede: "Real numbers from real clients.",
  columns: ["Industry", "Cost per lead", "Detail"],
  rows: [
    {
      industry: "Chinese language education",
      costPerLead: "$3.03",
      detail: "first month, 13 leads",
    },
    {
      industry: "Adult training provider",
      costPerLead: "$5.36",
      detail: "per lead",
    },
    {
      industry: "Healthcare training academy",
      costPerLead: "$6.93",
      detail: "per lead",
    },
    {
      industry: "Private college, WSQ courses",
      costPerLead: "$7.08",
      detail: "average over four months",
    },
    {
      industry: "Adult training institute",
      costPerLead: "$7.40",
      detail: "75 leads in the first month",
    },
    {
      industry: "Smart sanitaryware",
      costPerLead: "$15",
      detail: "per lead over six months",
    },
    {
      industry: "Car buying and selling",
      costPerLead: "$25",
      detail: "first month, one transaction closed",
    },
  ],
  closing:
    "Clients who joined us in 2018 are still working with us today. We focus on long-term partnerships rather than quick gains.",
} as const;

export const agencyTestimonials = {
  heading: "What Clients Say",
  items: [
    {
      quote:
        "Over the past 4 months we achieved an average cost per lead of $7.08. They took time to understand our courses and target audience, and they are absolutely transparent in their work.",
      name: "Allan Lee",
      title: "Head of Marketing, Acetek College",
    },
    {
      quote:
        "Over the 11 months we have worked together, Envis8ge has generated 1,500+ leads for Stag Match Institute. Rigorous optimisation, an affordable retainer, CRM integration and knowledge of the training industry.",
      name: "Kelvin Wo",
      title: "Director of Sales and Business Development, Stag Match Institute",
    },
    {
      quote:
        "We just wanted to focus on our core business of teaching, while leaving the essentials of marketing to the professional. During the first month we achieved 13 leads at an incredible $3.03 per lead.",
      name: "Alethea Ler",
      title: "Founder, My Chinese Steps",
    },
    {
      quote:
        "Despite already having an active social media presence, we have achieved 2X reach and 1.5X link clicks for our brand. I would commend them for their responsiveness and willingness to go the extra mile.",
      name: "Adelle Khang",
      title: "Assistant Marketing Manager, Kipling",
    },
    {
      quote:
        "Envis8ge has been instrumental in planning and crafting quality content for our audiences. Their flexibility allowed us to respond quickly to operational changes, and they integrated into our workflow straight from the onset.",
      name: "Stephanie Chong",
      title: "Regional Marketing Manager, Kipling Singapore and APAC Wholesale",
    },
    {
      quote:
        "e2i has been working with Envis8ge for over a year, on 30+ Facebook ad campaigns and counting. They have also been responsive to last minute requests, which is much appreciated in a field of many moving parts.",
      name: "Darryll Chua",
      title: "Principal Specialist, Communications and Digital, e2i",
    },
    {
      quote:
        "From near-zero growth and engagement, we have a much more active Facebook and Instagram page. It has been a fantastic and enjoyable experience working with Envis8ge, despite the cross-border communication.",
      name: "Heena Dhobi",
      title: "National Account Manager, Barry M Cosmetics",
    },
    {
      quote:
        "Since Envis8ge took over our social media, our Facebook fans have increased by 160% and reach by 32.4X. Time and time again they have gone beyond their defined work scope to help with a request.",
      name: "Leo Chu",
      title: "Founder, U China Travel",
    },
    {
      quote:
        "Shawn has been very responsive and helpful, going the extra mile to link up collaborations. He helped us immensely with our annual virtual fundraiser, and his support helped us raise $78,000.",
      name: "Lesli Berggren",
      title: "Founder and Executive Director, LOVE, NILS",
    },
    {
      quote:
        "Over a period of 6 months we have a more active Facebook page with an increase in reach and engagement. Our number of fans has increased by 4.2X.",
      name: "Paul Chong",
      title: "Vice President Marketing, VSTECS Singapore",
    },
    {
      quote:
        "After meeting several agencies we went with Envis8ge for their affordability, transparency and track record. In our first month we achieved 8 leads at $25 each and completed one transaction.",
      name: "Gideon Tan",
      title: "Founder, The Car Concept",
    },
    {
      quote:
        "Through micro-influencers we gained additional customers, almost 90% of our customer base. We then ran Facebook ads and received 44 message enquiries at $1.82 each.",
      name: "Vivian Won",
      title: "Founder, BrowStation Embroidery",
    },
    {
      quote:
        "Working together for nearly 1.5 years, we have had a good experience entrusting our client's social media to them, from crafting engaging content to ad buys to influencer collaborations.",
      name: "Chong Huang",
      title: "Operations Manager, Confirm Trading",
    },
    {
      quote:
        "It is always a pleasure to work with Shawn and his team. Their level of professionalism and go-the-extra-mile attitude to push for win-win social media marketing outcomes is very commendable.",
      name: "Cherlynn Cheong",
      title: "Google review",
    },
    {
      quote:
        "Having partnered with them on numerous ad campaigns, the team's expertise and positive attitude have been exceptional. They exhibit a strong command of their field, offering valuable insights for any request.",
      name: "Bao Zhen Kuah",
      title: "Google review",
    },
    {
      quote:
        "Envis8ge helped me develop a comprehensive marketing strategy tailored to my specific needs and goals. They also provided valuable insights into the Singapore market and helped me build a strong brand presence.",
      name: "Qisti Putra",
      title: "Google review",
    },
    {
      quote:
        "Shawn Yeo is very knowledgeable, approachable, helpful and friendly. Recommended, and you could start a no obligation chat to find out more about their services before deciding to engage.",
      name: "Edger Lim",
      title: "Google Local Guide",
    },
    {
      quote:
        "We engaged Envis8ge to manage our lead generation and social media campaigns and received excellent results and responses, many of which translated into actual sales for our institute.",
      name: "Allan Lee",
      title: "Google review",
    },
    {
      quote:
        "Had a very good experience with [Envis8ge]. They are so professional and a trusted media company to work with. We engage them for our F&B outlets. Most importantly they are experienced and independent.",
      name: "Jennie Loh",
      title: "Google review",
    },
    {
      quote:
        "Been with Shawn for close to a year now, and been seeing the inflow of leads coming in.",
      name: "Abel Chan",
      title: "Google review",
    },
  ],
} as const;

/**
 * The exact Google review screenshot images from the Customer
 * Testimonials section of https://envis8ge.com/ (captured 2026-08-20),
 * downloaded as-is from their original hosting
 * (storage.googleapis.com/msgsndr/.../media/*.png) — not recreated as
 * text, not cropped, not altered. Saved under public/images/testimonials/.
 * `width`/`height` are each image's real native pixel dimensions (they
 * vary — these are literal cropped screenshots, not a designed uniform
 * asset) so `next/image` can render each at its true aspect ratio
 * without distortion. Order matches the sequence they appear in on the
 * source page.
 */
export const googleReviews = [
  {
    src: "/images/testimonials/67aee6a12ba94e7c02a18df7.png",
    alt: "Google review from Jennie Loh, 5 stars",
    width: 638,
    height: 123,
  },
  {
    src: "/images/testimonials/67aee6a111feb9be26ce88a2.png",
    alt: "Google review from Allan Lee, 5 stars",
    width: 657,
    height: 145,
  },
  {
    src: "/images/testimonials/67aee6a12ba94e39f1a18df9.png",
    alt: "Google review from Qisti Putra, 5 stars",
    width: 636,
    height: 178,
  },
  {
    src: "/images/testimonials/67aee6a145496e198c516b08.png",
    alt: "Google review from Edger Lim, 5 stars",
    width: 647,
    height: 124,
  },
  {
    src: "/images/testimonials/67aee6a12ba94e5acaa18df8.png",
    alt: "Google review from Cherlynn Cheong, 5 stars",
    width: 648,
    height: 139,
  },
  {
    src: "/images/testimonials/67aee6a145496e2a22516b07.png",
    alt: "Google review from Adelle Khang, 5 stars",
    width: 656,
    height: 157,
  },
  {
    src: "/images/testimonials/67aee6a145496e1de1516b06.png",
    alt: "Google review from Lucas Lee, 5 stars",
    width: 641,
    height: 125,
  },
  {
    src: "/images/testimonials/67af19c39b4e262bddb2cda7.png",
    alt: "Google review from Bao Zhen Kuah, 5 stars",
    width: 654,
    height: 159,
  },
] as const;

export const cta = {
  heading: "Ready to get STARTED?",
  body: "Drop us an email with details and we'll get back to you as soon as we can!",
  button: "Contact Us!",
};
