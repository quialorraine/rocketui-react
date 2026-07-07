import type { ReactNode } from "react";
import { CreditCard, Globe, Truck } from "@phosphor-icons/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const FAQ = [
  {
    value: "shipping",
    question: "Do you ship internationally?",
    answer:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: <Globe />,
  },
  {
    value: "delivery",
    question: "How long does delivery take?",
    answer:
      "Standard delivery takes 3–5 business days. Express options are available at checkout for next-day delivery in most regions.",
    icon: <Truck />,
  },
  {
    value: "payment",
    question: "Which payment methods are accepted?",
    answer:
      "We accept all major credit cards, PayPal, Apple Pay, and Google Pay. All transactions are encrypted end to end.",
    icon: <CreditCard />,
  },
] as const;

const chevronCards: Atom[] = [
  {
    label: "leading icons + action",
    node: (
      <Accordion type="single" defaultValue="shipping">
        {FAQ.map((item, index) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger icon={item.icon}>
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              {index === 0 ? (
                <div className="flex flex-col items-start gap-3">
                  <p>{item.answer}</p>
                  <Button size="sm" variant="soft" color="neutral">
                    Read more
                  </Button>
                </div>
              ) : (
                item.answer
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
    code: `<Accordion type="single" defaultValue="shipping">
  {FAQ.map((item, index) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionTrigger icon={item.icon}>
        {item.question}
      </AccordionTrigger>
      <AccordionContent>
        {index === 0 ? (
          <div className="flex flex-col items-start gap-3">
            <p>{item.answer}</p>
            <Button size="sm" variant="soft" color="neutral">
              Read more
            </Button>
          </div>
        ) : (
          item.answer
        )}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`,
  },
  {
    label: "text only",
    node: (
      <Accordion type="single" defaultValue="shipping">
        {FAQ.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
    code: `<Accordion type="single" defaultValue="shipping">
  {FAQ.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionTrigger>{item.question}</AccordionTrigger>
      <AccordionContent>{item.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`,
  },
];

const plusMinusCards: Atom[] = [
  {
    label: "single, collapsible",
    node: (
      <Accordion type="single" indicator="plus" defaultValue="shipping">
        {FAQ.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
    code: `<Accordion type="single" indicator="plus" defaultValue="shipping">
  {FAQ.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionTrigger>{item.question}</AccordionTrigger>
      <AccordionContent>{item.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`,
  },
  {
    label: "multiple open at once",
    node: (
      <Accordion
        type="multiple"
        indicator="plus"
        defaultValue={["shipping", "payment"]}
      >
        {FAQ.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    ),
    code: `<Accordion
  type="multiple"
  indicator="plus"
  defaultValue={["shipping", "payment"]}
>
  {FAQ.map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionTrigger>{item.question}</AccordionTrigger>
      <AccordionContent>{item.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`,
  },
];

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: (
    <Accordion type="single" size={size} defaultValue="shipping">
      {FAQ.slice(0, 2).map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
  code: `<Accordion type="single" size="${size}" defaultValue="shipping">
  {FAQ.slice(0, 2).map((item) => (
    <AccordionItem key={item.value} value={item.value}>
      <AccordionTrigger>{item.question}</AccordionTrigger>
      <AccordionContent>{item.answer}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`,
}));

const plainDisabledCards: Atom[] = [
  {
    label: "plain (inside a card)",
    node: (
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <Accordion type="single" variant="plain" defaultValue="delivery">
          {FAQ.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    ),
    code: `<div className="rounded-2xl border bg-card p-6 shadow-sm">
  <Accordion type="single" variant="plain" defaultValue="delivery">
    {FAQ.map((item) => (
      <AccordionItem key={item.value} value={item.value}>
        <AccordionTrigger>{item.question}</AccordionTrigger>
        <AccordionContent>{item.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</div>`,
  },
  {
    label: "disabled item",
    node: (
      <Accordion type="single" defaultValue="shipping">
        <AccordionItem value="shipping">
          <AccordionTrigger>{FAQ[0].question}</AccordionTrigger>
          <AccordionContent>{FAQ[0].answer}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="delivery" disabled>
          <AccordionTrigger>{FAQ[1].question} (disabled)</AccordionTrigger>
          <AccordionContent>{FAQ[1].answer}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="payment">
          <AccordionTrigger>{FAQ[2].question}</AccordionTrigger>
          <AccordionContent>{FAQ[2].answer}</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
    code: `<Accordion type="single" defaultValue="shipping">
  <AccordionItem value="shipping">
    <AccordionTrigger>{FAQ[0].question}</AccordionTrigger>
    <AccordionContent>{FAQ[0].answer}</AccordionContent>
  </AccordionItem>
  <AccordionItem value="delivery" disabled>
    <AccordionTrigger>{FAQ[1].question} (disabled)</AccordionTrigger>
    <AccordionContent>{FAQ[1].answer}</AccordionContent>
  </AccordionItem>
  <AccordionItem value="payment">
    <AccordionTrigger>{FAQ[2].question}</AccordionTrigger>
    <AccordionContent>{FAQ[2].answer}</AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
];

export function AccordionShowcase() {
  return (
    <ComponentPage
      id="accordion"
      title="Accordion"
      description="A collapsible content panel for organizing information in a compact space. Composable, accessible, and driven entirely by design tokens."
    >
      <Subsection
        title="Chevron indicator"
        description="Default variant. A single item stays open, with a chevron that rotates on expand. Optional leading icons add context, and any content — including actions — can live in the panel."
      >
        <DemoGrid cols={2}>
          {chevronCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Plus / minus indicator"
        description="A leading box toggles between plus and minus. Use it when the expand affordance should read as an explicit add/remove action."
      >
        <DemoGrid cols={2}>
          {plusMinusCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Every trigger, indicator, and content block scales together across sm, md, and lg."
      >
        <DemoGrid cols={1}>
          {sizeCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Plain variant & disabled"
        description="Drop the surrounding surface to inherit any container, and disable individual items while keeping keyboard navigation intact."
      >
        <DemoGrid cols={2}>
          {plainDisabledCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
