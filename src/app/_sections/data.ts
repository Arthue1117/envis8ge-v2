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

export const cta = {
  heading: "Ready to get STARTED?",
  body: "Drop us an email with details and we'll get back to you as soon as we can!",
  button: "Contact Us!",
};
