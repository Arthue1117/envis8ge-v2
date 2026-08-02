import { FadeIn } from "@/components/motion/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Blog Plan Section 3.13 — placeholder only. No email service provider
 * is selected yet (docs/06-blog-plan.md marks this "To be confirmed").
 * Visually complete but not wired to a live integration — the input is
 * disabled and the button does nothing, deliberately, rather than
 * pretending to collect real signups.
 */
export function NewsletterSignup() {
  return (
    <FadeIn>
      <div className="bg-muted rounded-md p-6 text-center">
        <h2 className="font-heading text-foreground text-lg font-semibold">
          Get social media insights for Singapore brands, straight to your
          inbox.
        </h2>
        <form className="tablet:flex-row mt-4 flex flex-col justify-center gap-3">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            disabled
            placeholder="Email address"
            className="rounded-sm border border-neutral-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          />
          <button
            type="submit"
            disabled
            className={cn(
              buttonVariants({ size: "default" }),
              "disabled:opacity-60"
            )}
          >
            Subscribe
          </button>
        </form>
        <p className="text-muted-foreground mt-3 text-xs">
          Coming soon — not yet connected to a mailing list.
        </p>
      </div>
    </FadeIn>
  );
}
