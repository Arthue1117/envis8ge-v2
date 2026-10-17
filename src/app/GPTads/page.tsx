import type { Metadata } from "next";
import { ClientMarquee } from "./client-marquee";
import {
  ArrowUpRight,
  Check,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  ClipboardList,
  PenLine,
  Layers,
  PanelsTopLeft,
  Radar,
  ChartLine,
  Users,
  TrendingUp,
  Hourglass,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { GptAdsForm } from "./consultation-form";
import { GptAdsPixel } from "./pixel";
import { CountUp, LandingVideo, MobileCta, ScrollReveal } from "./motion";
import styles from "./page.module.css";

const description =
  "ChatGPT advertising services for Singapore B2C businesses. Explore campaign strategy, creative, landing pages and conversion measurement with Envis8ge.";
export const metadata: Metadata = {
  title: "ChatGPT Ads for Singapore Businesses",
  description,
  alternates: { canonical: "/GPTads" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Beat your competitors to ChatGPT Ads | Envis8ge",
    description,
    url: "/GPTads",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ChatGPT Ads for Singapore Businesses | Envis8ge",
    description,
  },
};

const services = [
  [
    "01",
    "Strategy & suitability",
    "We assess your offer, customers, objectives and account eligibility to build a focused campaign plan.",
  ],
  [
    "02",
    "Creative & campaign setup",
    "We develop your message and ad assets, then prepare the campaign using the settings available to your account.",
  ],
  [
    "03",
    "Landing pages & tracking",
    "We align the destination with your offer and configure available conversion measurement around a meaningful business action.",
  ],
  [
    "04",
    "Optimisation & reporting",
    "We review performance, refine the campaign and explain the results in terms that matter to your business.",
  ],
];
const whyNow = [
  {
    icon: Users,
    title: "Few B2C brands are here yet",
    text: "Most Singapore businesses are still focused on search and social media. Fewer competing advertisers leaves more room for your offer to be seen.",
  },
  {
    icon: TrendingUp,
    title: "Less competition for attention",
    text: "In a less crowded channel, a clear offer and well-made ads have a better chance to stand out from the start.",
  },
  {
    icon: Hourglass,
    title: "Learn before the channel gets crowded",
    text: "Start early, build evidence of what works for your customers, and have a tested approach ready as more businesses arrive.",
  },
];

const deliverables = [
  {
    icon: CalendarCheck,
    title: "Kick-off strategy call",
    text: "A session to agree goals, offer and audience before anything goes live.",
  },
  {
    icon: ShieldCheck,
    title: "Account setup walkthrough and business verification",
    text: "We guide you through setting up your ads account and completing business verification.",
  },
  {
    icon: ClipboardList,
    title: "A written campaign plan designed for your business",
    text: "Your objective, target customers, key message, budget and timeline, set out in one plan.",
  },
  {
    icon: PenLine,
    title: "Ad copy written around your offer and target audience",
    text: "Messaging that gives the right customers a clear reason to choose you.",
  },
  {
    icon: Layers,
    title: "Multiple ads for testing and optimisation",
    text: "Several ad variations, so we can compare results and back what performs best.",
  },
  {
    icon: PanelsTopLeft,
    title: "A dedicated landing page built for the campaign",
    text: "A page that matches your ad and is designed to turn visits into enquiries, bookings or purchases.",
  },
  {
    icon: Radar,
    title: "Pixel and Conversion API setup",
    text: "Measurement configured and tested before launch, so results are recorded from day one.",
  },
  {
    icon: ChartLine,
    title: "Regular checks on performance and spending",
    text: "We monitor results and budget throughout the campaign and adjust where needed.",
  },
];

// Real client testimonials, as published on shawnyeodigital.com and in
// agencyTestimonials (src/app/_sections/data.ts). Agency work, not ChatGPT Ads.
const testimonials = [
  {
    quote:
      "Over the past 4 months we achieved an average cost per lead of $7.08. They took time to understand our courses and target audience, and they are absolutely transparent in their work.",
    name: "Allan Lee",
    stat: "$7.08",
    statLabel: "average cost per lead",
    title: "Head of Marketing, Acetek College",
  },
  {
    quote:
      "Over the 11 months we have worked together, Envis8ge has generated 1,500+ leads for Stag Match Institute. Rigorous optimisation, an affordable retainer, CRM integration and knowledge of the training industry.",
    name: "Kelvin Wo",
    stat: "1,500+",
    statLabel: "leads in 11 months",
    title: "Director of Sales and Business Development, Stag Match Institute",
  },
  {
    quote:
      "We just wanted to focus on our core business of teaching, while leaving the essentials of marketing to the professional. During the first month we achieved 13 leads at an incredible $3.03 per lead.",
    name: "Alethea Ler",
    stat: "$3.03",
    statLabel: "per lead in the first month",
    title: "Founder, My Chinese Steps",
  },
  {
    quote:
      "Despite already having an active social media presence, we have achieved 2X reach and 1.5X link clicks for our brand. I would commend them for their responsiveness and willingness to go the extra mile.",
    name: "Adelle Khang",
    stat: "2X",
    statLabel: "reach for the brand",
    title: "Assistant Marketing Manager, Kipling",
  },
  {
    quote:
      "Over a period of 6 months we have a more active Facebook page with an increase in reach and engagement. Our number of fans has increased by 4.2X.",
    name: "Paul Chong",
    stat: "4.2X",
    statLabel: "more Facebook fans",
    title: "Vice President Marketing, VSTECS Singapore",
  },
  {
    quote:
      "Since Envis8ge took over our social media, our Facebook fans have increased by 160% and reach by 32.4X. Time and time again they have gone beyond their defined work scope to help with a request.",
    name: "Leo Chu",
    stat: "32.4X",
    statLabel: "increase in reach",
    title: "Founder, U China Travel",
  },
];

const promptWords =
  "“I’m looking for something a little different. What are my options?”".split(
    " "
  );

const faqs = [
  [
    "Is ChatGPT Ads right for my business?",
    "That depends on your offer, customers, budget, eligibility and campaign goals. We start with an assessment so you can decide whether a pilot is a sensible next step.",
  ],
  [
    "Will my business appear in ChatGPT's answers?",
    "This service covers paid advertising placements. Buying ads does not guarantee an organic mention, recommendation or position in ChatGPT's answers.",
  ],
  [
    "How much does it cost?",
    "We provide a tailored quotation based on the work required. Setup and management fees are separate from your advertising spend, with the scope and budget agreed before launch.",
  ],
  [
    "How long does a pilot take?",
    "We recommend an initial 6–8-week pilot, subject to account access, ad approval, budget and available traffic. We agree the schedule and success measures with you before starting.",
  ],
  [
    "How will we measure results?",
    "We agree a primary outcome such as a purchase, booking or qualified enquiry. Available tracking and campaign reports help assess performance. A click or WhatsApp visit alone is not a confirmed sale or lead.",
  ],
  [
    "Do you guarantee leads or sales?",
    "No. Results depend on factors including your offer, budget, customer demand and campaign delivery. Our role is to run a structured test, improve what we can and give you clear evidence.",
  ],
];

export default function GptAdsPage() {
  return (
    <div className={styles.page}>
      <GptAdsPixel />
      <ScrollReveal />
      <MobileCta />
      <section className={styles.hero} id="gptads-hero">
        <Container>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>
                <span /> CHATGPT ADS · SINGAPORE
              </p>
              <h1>
                Beat your competitors to <span>ChatGPT Ads.</span>
              </h1>
              <p className={styles.intro}>
                Few Singapore businesses are advertising on ChatGPT yet. We set
                up, run and measure your campaign so you get there before your
                competitors.
              </p>
              <a
                href="#consultation"
                className={`${styles.primary} ${styles.heroCta}`}
              >
                Check if ChatGPT Ads will work for you{" "}
                <ArrowUpRight size={19} aria-hidden />
              </a>
              <p className={styles.heroNote}>Free assessment · No obligation</p>
              <p className={styles.spots}>
                <span /> New service: we’re taking on only 10 ChatGPT Ads
                clients for now.
              </p>
            </div>
            <div className={styles.visual}>
              <div className={styles.visualTop}>
                <Sparkles size={18} aria-hidden />
                <span>From curiosity to possibility</span>
              </div>
              <div className={styles.prompt}>
                {promptWords.map((word, i) => (
                  <span key={i} style={{ "--i": i } as React.CSSProperties}>
                    {word}{" "}
                  </span>
                ))}
              </div>
              <div className={styles.answerLines}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.exampleAd}>
                <p className={styles.adLabel}>Sponsored · Your business</p>
                <div className={styles.adArt}>
                  <span>
                    YOUR
                    <br />
                    NEXT
                    <br />
                    <b>DISCOVERY.</b>
                  </span>
                  <ArrowUpRight size={44} aria-hidden />
                </div>
                <h2>An offer worth exploring.</h2>
                <p>A clear reason to choose you. An easy next step.</p>
                <span className={styles.mockLink}>
                  Explore the offer <ArrowUpRight size={15} aria-hidden />
                </span>
              </div>
              <p className={styles.caption}>
                Illustrative concept—not a live ad or actual ChatGPT interface.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.band}`} id="video">
        <Container>
          <LandingVideo />
        </Container>
      </section>

      <section className={`${styles.section} ${styles.dark}`} id="why-now">
        <Container>
          <p className={styles.eyebrow}>WHY NOW</p>
          <div className={styles.sectionHeading}>
            <h2>
              Early days.
              <br />
              Less competition.
            </h2>
            <p>
              Now is the best time for B2C businesses to get into ChatGPT Ads.
              Few companies are advertising there yet, so early movers have more
              room to be noticed.
            </p>
          </div>
          <div className={styles.benefits}>
            {whyNow.map(({ icon: Icon, title, text }, i) => (
              <article
                key={title}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                <Icon className={styles.icon} size={29} aria-hidden />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className={styles.small}>
            Advertiser activity changes over time. Starting early does not
            guarantee lower costs, leads or sales.
          </p>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.tint}`} id="services">
        <Container>
          <p className={styles.eyebrow}>WHAT WE HANDLE</p>
          <div className={styles.sectionHeading}>
            <h2>
              What to expect with
              <br />
              Envis8ge ChatGPT Ads
            </h2>
            <p>
              A practical, end-to-end service designed to make a new advertising
              channel easier to navigate.
            </p>
          </div>
          <div className={styles.services}>
            {services.map(([number, title, text], i) => (
              <article
                key={number}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <ArrowUpRight size={24} aria-hidden />
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.section} id="what-you-receive">
        <Container>
          <p className={styles.eyebrow}>WHAT YOU WILL RECEIVE</p>
          <div className={styles.sectionHeading}>
            <h2>
              Everything you need
              <br />
              to launch with confidence.
            </h2>
            <p>
              When you engage us for ChatGPT Ads, here is what we deliver for
              your business.
            </p>
          </div>
          <ol className={styles.deliverables}>
            {deliverables.map(({ icon: Icon, title, text }, i) => (
              <li
                key={title}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                <Icon className={styles.icon} size={26} aria-hidden />
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <p className={styles.small}>
            Advertising spend is paid separately. Account verification and ad
            approval are decided by the advertising platform.
          </p>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.tint}`}>
        <Container>
          <div className={styles.pilot}>
            <div>
              <p className={styles.eyebrow}>START WITH A FOCUSED TEST</p>
              <h2>
                Reach out to new audiences
                <br />
                with ChatGPT Ads
              </h2>
              <p className={styles.body}>
                A defined campaign. An agreed budget. A clear review of what we
                learned.
              </p>
              <a href="#consultation" className={styles.primary}>
                Discuss your pilot <ArrowUpRight size={19} aria-hidden />
              </a>
            </div>
            <div>
              <p className={styles.pilotLabel}>
                A proposed 6–8-week starting point
              </p>
              <ul>
                {[
                  "Business assessment and campaign objective",
                  "Campaign strategy and creative development",
                  "Campaign setup and conversion measurement",
                  "Ongoing review and optimisation",
                  "Performance review and next-step recommendations",
                ].map((item) => (
                  <li key={item}>
                    <Check size={18} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.small}>
                Scope and timing are agreed after assessment. Service fees and
                advertising spend are quoted separately in SGD. Launch is
                subject to account access and ad approval.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container>
          <div className={styles.proofHeading}>
            <div>
              <p className={styles.eyebrow}>ENVIS8GE · SINCE 2013</p>
              <h2>
                A new channel.
                <br />
                An experienced partner.
              </h2>
            </div>
            <p>
              Our approach brings together creative strategy, digital marketing
              and measurement. These are brands we’ve worked with across our
              agency services.
            </p>
          </div>
          <ClientMarquee />
          <h3 className={styles.testimonialsHeading}>What our clients say</h3>
          <div className={styles.testimonials}>
            {testimonials.map(({ stat, statLabel, quote, name, title }, i) => (
              <figure
                key={name}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
              >
                <p className={styles.stat}>
                  <strong>
                    <CountUp value={stat} />
                  </strong>
                  {statLabel}
                </p>
                <blockquote>“{quote}”</blockquote>
                <figcaption>
                  <span aria-hidden>{name.charAt(0)}</span>
                  <div>
                    <strong>{name}</strong>
                    {title}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.small}>
            Client logos and testimonials reflect our agency services such as
            social media and paid social, not ChatGPT Ads campaign results.
          </p>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.tint}`}>
        <Container>
          <div className={styles.faqGrid}>
            <div>
              <p className={styles.eyebrow}>GOOD QUESTIONS</p>
              <h2>
                Before you
                <br />
                get started.
              </h2>
            </div>
            <div>
              {faqs.map(([q, a]) => (
                <details className={styles.faq} key={q}>
                  <summary>
                    {q}
                    <span aria-hidden>+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} id="consultation">
        <Container>
          <div className={styles.consultation}>
            <div>
              <p className={styles.eyebrow}>LET’S EXPLORE YOUR NEXT MOVE</p>
              <h2>
                Could ChatGPT Ads
                <br />
                work for <span>your business?</span>
              </h2>
              <p className={styles.body}>
                Tell us a little about your business. We’ll follow up to discuss
                your objectives, campaign suitability and a sensible starting
                plan.
              </p>
              <div className={styles.contactNote}>
                <Check size={18} aria-hidden /> Trusted by brands since 2013
                <br />
                <Check size={18} aria-hidden /> Free assessment, no obligation
                <br />
                <Check size={18} aria-hidden /> Clear scope before you commit
                <br />
                <Check size={18} aria-hidden /> Advertising spend explained
                separately
              </div>
              <p className={styles.spots}>
                <span /> Only 10 ChatGPT Ads client spots for now, as this is a
                new service.
              </p>
            </div>
            <GptAdsForm />
          </div>
          <p className={styles.disclaimer}>
            Envis8ge is an independent marketing agency. ChatGPT and OpenAI are
            trademarks of their respective owners. No affiliation or endorsement
            is implied.
          </p>
        </Container>
      </section>
    </div>
  );
}
