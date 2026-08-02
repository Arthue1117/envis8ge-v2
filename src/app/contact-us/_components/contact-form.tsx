"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  budgetOptions,
  serviceOptions,
  timelineOptions,
} from "../_data/form-options";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  agreeToPrivacy: boolean;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
  agreeToPrivacy: false,
};

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-sm border border-neutral-300 px-4 py-2.5 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "text-foreground text-sm font-medium";
const errorClass = "text-error mt-1 text-xs";

/**
 * Blog Plan-style "structured, not hardcoded" approach applied here too:
 * form state is a single typed `FormValues` object, and `handleSubmit`
 * is the one place a real backend call would go later (GoHighLevel,
 * Formspree, Resend, a webhook — per your Section 13). No backend is
 * wired now, per explicit instruction — the async delay below simulates
 * a network call so the loading/success/error states are real and
 * testable, not just visual mockups.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.firstName.trim()) next.firstName = "First name is required.";
    if (!values.lastName.trim()) next.lastName = "Last name is required.";
    if (!values.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!values.message.trim())
      next.message = "Tell us a little about your project.";
    if (!values.agreeToPrivacy)
      next.agreeToPrivacy = "Please agree to the Privacy Policy to continue.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      // Placeholder only — no backend is connected yet (per your Section
      // 13). Swap this block for a real POST to GoHighLevel / Formspree /
      // Resend / a webhook once one is chosen; `values` is already a
      // clean, typed payload ready to send as-is.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setValues(initialValues);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <FadeIn className="flex flex-col items-center gap-3 rounded-md border border-neutral-200 p-10 text-center">
        <CheckCircle2 aria-hidden className="text-success size-10" />
        <h3 className="font-heading text-foreground text-xl font-semibold">
          Message sent
        </h3>
        <p className="text-muted-foreground max-w-sm text-sm">
          Thanks for reaching out — we&apos;ve received your message and will
          get back to you soon.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-busy={status === "loading"}
        className="tablet:grid-cols-2 grid grid-cols-1 gap-x-6 gap-y-5"
      >
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name <span aria-hidden>*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            disabled={status === "loading"}
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={cn(inputClass, "mt-1.5")}
          />
          {errors.firstName && (
            <p id="firstName-error" className={errorClass}>
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name <span aria-hidden>*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            disabled={status === "loading"}
            value={values.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={cn(inputClass, "mt-1.5")}
          />
          {errors.lastName && (
            <p id="lastName-error" className={errorClass}>
              {errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span aria-hidden>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === "loading"}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClass, "mt-1.5")}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            disabled={status === "loading"}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={cn(inputClass, "mt-1.5")}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={status === "loading"}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={cn(inputClass, "mt-1.5")}
          />
        </div>

        <div>
          <label htmlFor="service" className={labelClass}>
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            disabled={status === "loading"}
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            className={cn(inputClass, "mt-1.5")}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Project Budget
          </label>
          <select
            id="budget"
            name="budget"
            disabled={status === "loading"}
            value={values.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={cn(inputClass, "mt-1.5")}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="timeline" className={labelClass}>
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            disabled={status === "loading"}
            value={values.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            className={cn(inputClass, "mt-1.5")}
          >
            <option value="">Select a timeline</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="tablet:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message <span aria-hidden>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            disabled={status === "loading"}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(inputClass, "mt-1.5 resize-y")}
          />
          {errors.message && (
            <p id="message-error" className={errorClass}>
              {errors.message}
            </p>
          )}
        </div>

        <div className="tablet:col-span-2">
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="agreeToPrivacy"
              required
              disabled={status === "loading"}
              checked={values.agreeToPrivacy}
              onChange={(e) => update("agreeToPrivacy", e.target.checked)}
              aria-invalid={!!errors.agreeToPrivacy}
              aria-describedby={
                errors.agreeToPrivacy ? "privacy-error" : undefined
              }
              className="focus-visible:ring-ring mt-0.5 size-4 rounded-sm border-neutral-300 focus-visible:ring-2 focus-visible:outline-none"
            />
            <span>
              I agree to the{" "}
              <a href="/privacy-policy" className="text-primary underline">
                Privacy Policy
              </a>
              . <span aria-hidden>*</span>
            </span>
          </label>
          {errors.agreeToPrivacy && (
            <p id="privacy-error" className={errorClass}>
              {errors.agreeToPrivacy}
            </p>
          )}
        </div>

        {status === "error" && (
          <div className="tablet:col-span-2 bg-error/10 text-error flex items-center gap-2 rounded-sm p-3 text-sm">
            <XCircle aria-hidden className="size-4 shrink-0" />
            Something went wrong sending your message. Please try again.
          </div>
        )}

        <div className="tablet:col-span-2">
          <Button
            type="submit"
            disabled={status === "loading"}
            className="gap-2"
          >
            {status === "loading" && (
              <Loader2 aria-hidden className="size-4 animate-spin" />
            )}
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </FadeIn>
  );
}
