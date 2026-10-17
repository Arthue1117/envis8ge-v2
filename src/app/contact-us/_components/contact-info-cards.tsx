import { Mail, MapPin, Phone } from "lucide-react";

import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

/**
 * Confirmed contact details only (docs/01-project-brief.md Section 1) —
 * phone, email, address. "Business Hours" was requested as an example
 * card but is not published anywhere in the locked docs or on the live
 * site; rather than invent a schedule, it's omitted here (flagged for
 * your input rather than guessed at).
 */
const cards = [
  {
    icon: Phone,
    title: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: Mail,
    title: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    title: "Location",
    value: siteConfig.contact.address,
    href: undefined,
  },
];

export function ContactInfoCards() {
  return (
    <StaggerGroup className="tablet:grid-cols-3 grid grid-cols-1 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const content = (
          <Card className="h-full p-6 transition-[transform,box-shadow] duration-250 hover:-translate-y-1 hover:shadow-lg">
            <div className="bg-primary-tint text-foreground rounded-pill inline-flex size-12 items-center justify-center">
              <Icon aria-hidden className="size-5" />
            </div>
            <h3 className="font-heading text-foreground mt-4 text-sm font-semibold tracking-wide uppercase">
              {card.title}
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">{card.value}</p>
          </Card>
        );

        return (
          <StaggerItem key={card.title}>
            {card.href ? (
              <a href={card.href} className="block h-full">
                {content}
              </a>
            ) : (
              content
            )}
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
