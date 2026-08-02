import { FadeIn } from "@/components/motion/fade-in";
import { Logo } from "@/components/layout/logo";
import { Card } from "@/components/ui/card";

/**
 * Blog Plan Section 3.10 / Section 5 — Approved brand-level byline
 * ("Envis8ge" as author, not a named individual). Bio copy drawn from
 * confirmed positioning language already in Brand Guidelines Section 3,
 * not new invented bio content.
 */
export function AuthorBio({ author, bio }: { author: string; bio: string }) {
  return (
    <FadeIn>
      <Card className="tablet:flex-row tablet:items-center flex flex-col items-start gap-4 p-6">
        <Logo className="shrink-0" />
        <div>
          <span className="font-heading text-foreground font-semibold">
            {author}
          </span>
          <p className="text-muted-foreground mt-1 text-sm">{bio}</p>
        </div>
      </Card>
    </FadeIn>
  );
}
