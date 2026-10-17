import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";

import { agencyResults } from "./data";

/**
 * Agency content, migrated verbatim from
 * https://shawnyeodigital.com/agency/ — see the doc comment on
 * `agencyResults` in ./data.ts for the full sourcing note.
 */
export function AgencyResults() {
  return (
    <Section background="band">
      <FadeIn className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-foreground tablet:text-4xl text-3xl font-bold">
          {agencyResults.heading}
        </h2>
        <p className="text-muted-foreground mt-4">{agencyResults.lede}</p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12">
        <div className="border-border overflow-x-auto rounded-md border">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="bg-primary-tint/40">
                {agencyResults.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="text-foreground border-border border-b px-6 py-4 text-xs font-semibold tracking-wide uppercase"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agencyResults.rows.map((row) => (
                <tr
                  key={row.industry}
                  className="border-border [&:not(:last-child)]:border-b"
                >
                  <th
                    scope="row"
                    className="font-heading text-foreground px-6 py-4 text-sm font-semibold"
                  >
                    {row.industry}
                  </th>
                  <td className="text-primary-text px-6 py-4 text-sm font-bold">
                    {row.costPerLead}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm">
                    {row.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-center">
          {agencyResults.closing}
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/portfolio"
            className={buttonVariants({ variant: "outline" })}
          >
            View Full Portfolio
          </Link>
        </div>
      </FadeIn>
    </Section>
  );
}
