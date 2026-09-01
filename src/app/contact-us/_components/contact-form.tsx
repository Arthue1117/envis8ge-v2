"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useState } from "react";

import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { serviceOptions } from "../_data/form-options";

interface FormValues {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-sm border border-neutral-300 bg-white px-4 py-3 text-base text-foreground placeholder:text-neutral-400 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";
const labelClass = "text-foreground text-sm font-medium";
const errorClass = "text-error mt-1 text-xs";

/**
 * Submits directly to /api/contact — a server-side Route Handler that
 * calls Resend (src/app/api/contact/route.ts, src/lib/resend.ts). The
 * GHL embed no longer handles submissions on this site.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.firstName.trim()) next.firstName = "First name is required.";
    if (!values.lastName.trim()) next.lastName = "Last name is required.";
    if (!values.phone.trim()) next.phone = "Phone number is required.";
    if (!values.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;

    setStatus("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error ?? "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong sending your message. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <FadeIn className="flex flex-col items-center gap-3 rounded-md border border-neutral-200 bg-white p-10 text-center">
        <CheckCircle2 aria-hidden className="text-success size-10" />
        <h3 className="font-heading text-foreground text-xl font-semibold">
          Message sent
        </h3>
        <p className="text-muted-foreground max-w-sm text-sm">
          Thanks for reaching out — we&apos;ve received your details and
          will get back to you soon.
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
        className="flex flex-col gap-5 rounded-md border border-neutral-200 bg-white p-8"
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
            placeholder="Your first name"
            disabled={status === "loading"}
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            aria-invalid={!!errors.firstName}
            aria-describedby={
              errors.firstName ? "firstName-error" : undefined
            }
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
            placeholder="Your last name"
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
          <label htmlFor="phone" className={labelClass}>
            Phone <span aria-hidden>*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Your phone number"
            disabled={status === "loading"}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(inputClass, "mt-1.5")}
          />
          {errors.phone && (
            <p id="phone-error" className={errorClass}>
              {errors.phone}
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
            placeholder="you@company.com"
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
          <label htmlFor="message" className={labelClass}>
            Message / Details
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us a bit more about what you need"
            disabled={status === "loading"}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(inputClass, "mt-1.5 resize-y")}
          />
        </div>

        {status === "error" && (
          <div className="bg-error/10 text-error flex items-center gap-2 rounded-sm p-3 text-sm">
            <XCircle aria-hidden className="size-4 shrink-0" />
            {errorMessage}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status === "loading"}
          className="w-full gap-2"
        >
          {status === "loading" && (
            <Loader2 aria-hidden className="size-4 animate-spin" />
          )}
          {status === "loading" ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FadeIn>
  );
}
