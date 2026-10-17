"use client";

import { motion } from "framer-motion";

import { Section } from "@/components/layout/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHoverCapable } from "@/hooks/use-hover-capable";
import { fadeInUp, staggerContainer } from "@/lib/motion";

import { BrandsWorkedWith } from "./brands-worked-with";
import { agencyServices } from "./data";

/**
 * Per client request, this section no longer opens with the
 * "Social Media Agency in Singapore" eyebrow/headline/intro copy — it
 * now goes straight from `BrandsWorkedWith` into "What We Do". See the
 * doc comment on `agencyServices` in ./data.ts for the sourcing note on
 * the service list itself.
 */
export function AgencyServices() {
  const hoverCapable = useHoverCapable();

  return (
    <>
      <BrandsWorkedWith />

      <Section>
        <h3 className="font-heading text-foreground tablet:text-4xl text-center text-3xl font-bold">
          {agencyServices.label}
        </h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="tablet:grid-cols-2 desktop:grid-cols-3 mt-10 grid grid-cols-1 gap-6"
        >
          {agencyServices.items.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              whileHover={
                hoverCapable
                  ? {
                      y: -7,
                      scale: 1.02,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }
                  : undefined
              }
              className="h-full"
            >
              <Card className="border-primary/0 hover:border-primary h-full border transition-[box-shadow,border-color] duration-[220ms] hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
}
