import { useState } from "react";
import { PaypalLogo, CreditCard } from "@phosphor-icons/react";
import {
  RadioGroup,
  Radio,
  RadioCard,
  type RadioSize,
} from "@/components/ui/radio-group";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

function BasicExample() {
  return (
    <RadioGroup defaultValue="standard" aria-label="Shipping speed">
      <Radio value="standard" label="Standard" />
      <Radio value="express" label="Express" />
      <Radio value="overnight" label="Overnight" />
    </RadioGroup>
  );
}

function DescriptionExample() {
  return (
    <RadioGroup defaultValue="ship" aria-label="Delivery options">
      <Radio
        value="ship"
        label="Do you ship internationally?"
        description="Browse our products, add items to your cart."
      />
      <Radio
        value="pickup"
        label="Can I pick up my order?"
        description="Collect your order from a nearby store."
      />
      <Radio
        value="track"
        label="How do I track my order?"
        description="Use the tracking link sent to your email."
      />
    </RadioGroup>
  );
}

function HorizontalExample() {
  return (
    <RadioGroup
      defaultValue="two"
      orientation="horizontal"
      aria-label="Plan"
      className="gap-x-8"
    >
      <Radio
        value="one"
        label="Internationally"
        description="Browse our products"
      />
      <Radio
        value="two"
        label="Internationally"
        description="Browse our products"
      />
      <Radio
        value="three"
        label="Internationally"
        description="Browse our products"
      />
    </RadioGroup>
  );
}

function CardExample() {
  const [value, setValue] = useState("paypal");
  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      orientation="horizontal"
      aria-label="Payment method"
    >
      <RadioCard
        value="paypal"
        icon={<PaypalLogo weight="fill" />}
        label="PayPal"
        description="Pay with Paypal"
        className="w-64"
      />
      <RadioCard
        value="card"
        icon={<CreditCard weight="fill" />}
        label="*** 0123"
        description="Exp. on 07.12.2027"
        className="w-64"
      />
    </RadioGroup>
  );
}

const SIZES: RadioSize[] = ["sm", "md", "lg"];

export function RadioGroupShowcase() {
  return (
    <ComponentPage
      id="radio-group"
      title="RadioGroup"
      description="Radio group for selecting a single option from a list. Controlled or uncontrolled, with optional descriptions, horizontal layout and a card variant. Arrow keys move between options natively."
    >
      <Subsection
        title="Basic"
        description="A vertical list where only one option can be selected at a time."
      >
        <Demo align="start" code={`<RadioGroup defaultValue="standard">
  <Radio value="standard" label="Standard" />
  <Radio value="express" label="Express" />
  <Radio value="overnight" label="Overnight" />
</RadioGroup>`}>
          <BasicExample />
        </Demo>
      </Subsection>

      <Subsection
        title="With descriptions"
        description="Each option can carry a helper line under its label."
      >
        <Demo align="start" code={`<RadioGroup defaultValue="ship">
  <Radio
    value="ship"
    label="Do you ship internationally?"
    description="Browse our products, add items to your cart."
  />
  <Radio
    value="pickup"
    label="Can I pick up my order?"
    description="Collect your order from a nearby store."
  />
</RadioGroup>`}>
          <DescriptionExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Horizontal"
        description={'Set orientation="horizontal" to lay the options out in a row.'}
      >
        <Demo align="start" className="w-full" code={`<RadioGroup defaultValue="two" orientation="horizontal">
  <Radio value="one" label="Internationally" description="Browse our products" />
  <Radio value="two" label="Internationally" description="Browse our products" />
  <Radio value="three" label="Internationally" description="Browse our products" />
</RadioGroup>`}>
          <HorizontalExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Three control sizes — sm, md and lg."
      >
        <DemoGrid cols={1}>
          {SIZES.map((size) => (
            <Demo
              key={size}
              label={size}
              align="start"
              code={`<RadioGroup defaultValue="a" size="${size}">
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>`}
            >
              <RadioGroup defaultValue="a" size={size} aria-label={`Size ${size}`}>
                <Radio value="a" label="Option A" />
                <Radio value="b" label="Option B" />
              </RadioGroup>
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Cards"
        description="RadioCard turns each option into a selectable card with an icon, title and check indicator."
      >
        <Demo align="start" className="w-full" code={`const [value, setValue] = useState("paypal");

<RadioGroup value={value} onValueChange={setValue} orientation="horizontal">
  <RadioCard
    value="paypal"
    icon={<PaypalLogo weight="fill" />}
    label="PayPal"
    description="Pay with Paypal"
    className="w-64"
  />
  <RadioCard
    value="card"
    icon={<CreditCard weight="fill" />}
    label="*** 0123"
    description="Exp. on 07.12.2027"
    className="w-64"
  />
</RadioGroup>`}>
          <CardExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Disabled"
        description="Disable the whole group or an individual option."
      >
        <Demo align="start" code={`<RadioGroup defaultValue="express" disabled>
  <Radio value="standard" label="Standard" />
  <Radio value="express" label="Express" />
</RadioGroup>`}>
          <RadioGroup defaultValue="express" disabled aria-label="Disabled group">
            <Radio value="standard" label="Standard" />
            <Radio value="express" label="Express" />
          </RadioGroup>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
