"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import styles from "./page.module.css";
import { getGptAdsAttribution, measureGptAdsLead } from "./pixel";
const WHATSAPP_URL = "https://wa.link/jzk68z";
export function GptAdsForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const data = new FormData(event.currentTarget);
    if (String(data.get("companyFax") || "")) return;
    const value = (key: string) => String(data.get(key) || "").trim();
    const name = value("name");
    if (!name) {
      setError("Please enter your name.");
      setStatus("error");
      return;
    }
    const [firstName, ...remainingName] = name.split(/\s+/);
    setStatus("loading");
    setError("");
    const gptAdsEventId = crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: remainingName.join(" "),
          email: value("email"),
          phone: value("phone"),
          service: "ChatGPT Ads consultation",
          newsletterOptIn: true,
          gptAdsEventId,
          gptAdsOppref: getGptAdsAttribution(),
          message:
            "Source: /GPTads\nCompany website: " +
            value("website") +
            "\nMonthly advertising budget: " +
            value("budget"),
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(
          result?.error ||
            "Unable to send your enquiry. Please try again or email contact@envis8ge.com."
        );
      }
      setStatus("success");
      measureGptAdsLead(gptAdsEventId);
      window.dispatchEvent(
        new CustomEvent("envis8ge:gptads-enquiry-submitted")
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send your enquiry. Please try again."
      );
      setStatus("error");
    }
  }
  if (status === "success")
    return (
      <div className={styles.success} role="status" tabIndex={-1}>
        <CheckCircle2 size={34} aria-hidden />
        <h3>Thanks, we’ve received your enquiry.</h3>
        <p>
          Our team will follow up to discuss your business and the next steps.
          Prefer to chat now? Reach us on WhatsApp.
        </p>
        <div className={styles.whatsapp}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
          >
            Chat with us on WhatsApp <ArrowUpRight size={18} aria-hidden />
          </a>
          <figure>
            <Image
              unoptimized
              src="/images/gptads/whatsapp-qr.svg"
              alt="QR code linking to Envis8ge on WhatsApp"
              width={132}
              height={132}
            />
            <figcaption>Scan to chat on WhatsApp</figcaption>
          </figure>
        </div>
        <p className={styles.small}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            wa.link/jzk68z
          </a>
        </p>
        <button className={styles.secondary} onClick={() => setStatus("idle")}>
          Send another enquiry
        </button>
      </div>
    );
  return (
    <form
      className={styles.form}
      onSubmit={submit}
      aria-busy={status === "loading"}
    >
      <fieldset
        disabled={status === "loading"}
        style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
      >
        <legend className="sr-only">Request a ChatGPT Ads consultation</legend>
        <label className={styles.field}>
          Name
          <input name="name" autoComplete="name" required maxLength={200} />
        </label>
        <label className={styles.field}>
          Contact number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={40}
          />
        </label>
        <label className={styles.field}>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label className={styles.field}>
          Company website
          <input
            name="website"
            placeholder="e.g. envis8ge.com"
            autoComplete="url"
            required
            maxLength={500}
          />
        </label>
        <label className={styles.field}>
          Rough monthly ad budget (a guess is fine)
          <select name="budget" required defaultValue="">
            <option value="" disabled>
              Select a rough budget
            </option>
            <option>Below S$1,000</option>
            <option>S$1,000–S$3,000</option>
            <option>S$3,000–S$5,000</option>
            <option>Above S$5,000</option>
            <option>I’d like your recommendation</option>
          </select>
        </label>
        <div hidden>
          <label>
            Leave this empty
            <input name="companyFax" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <p className={styles.submissionNotice}>
          By submitting this form, you agree that Envis8ge will use these
          details to contact you about your enquiry and send you marketing
          updates. You can unsubscribe from marketing emails at any time.
        </p>
        <button
          type="submit"
          className={styles.primary}
          disabled={status === "loading"}
        >
          {status === "loading"
            ? "Sending your enquiry…"
            : "Request a consultation"}
          <ArrowUpRight size={18} aria-hidden />
        </button>
        {status === "error" && (
          <p className={styles.error} role="alert">
            {error} <a href="mailto:contact@envis8ge.com">Email us instead.</a>
          </p>
        )}
      </fieldset>
    </form>
  );
}
