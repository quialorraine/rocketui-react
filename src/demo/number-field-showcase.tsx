import { type ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { NumberField } from "@/components/ui/number-field";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: <NumberField size={size} defaultValue={156} aria-label={`Width ${size}`} className="w-64" />,
  code: `<NumberField size="${size}" defaultValue={156} />`,
}));

export function NumberFieldShowcase() {
  return (
    <ComponentPage
      id="number-field"
      title="Number Field"
      description="A numeric input with increment/decrement steppers, min/max clamping, keyboard support and internationalized formatting. Arrow keys and press-and-hold on the steppers adjust the value; the display reformats on blur."
    >
      <Subsection
        title="Basic"
        description="Steppers sit on each side of a centered value. Type directly, use ↑/↓, or click − and +."
      >
        <Demo align="start" code={`<NumberField label="Width" defaultValue={156} />`}>
          <NumberField label="Width" defaultValue={156} className="w-64" />
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Three heights — sm, md and lg — matching the rest of the form family."
      >
        <DemoGrid cols={1}>
          {sizeCards.map((a) => (
            <Demo key={a.label} label={a.label} align="start" code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Min, max & step"
        description="Clamp the value to a range and set the increment. Steppers disable automatically at the bounds."
      >
        <Demo
          align="start"
          code={`<NumberField
  label="Quantity"
  defaultValue={2}
  min={0}
  max={10}
  step={2}
  description="Between 0 and 10, in steps of 2."
/>`}
        >
          <NumberField
            label="Quantity"
            defaultValue={2}
            min={0}
            max={10}
            step={2}
            description="Between 0 and 10, in steps of 2."
            className="w-64"
          />
        </Demo>
      </Subsection>

      <Subsection
        title="Formatting"
        description="Pass Intl.NumberFormat options to render currencies, percentages or units. The raw number stays editable while focused."
      >
        <DemoGrid cols={2}>
          <Demo
            label="Currency"
            align="start"
            code={`<NumberField
  label="Price"
  defaultValue={150}
  step={10}
  min={0}
  locale="en-US"
  formatOptions={{ style: "currency", currency: "USD" }}
/>`}
          >
            <NumberField
              label="Price"
              defaultValue={150}
              step={10}
              min={0}
              locale="en-US"
              formatOptions={{ style: "currency", currency: "USD" }}
              className="w-full"
            />
          </Demo>
          <Demo
            label="Percent"
            align="start"
            code={`<NumberField
  label="Discount"
  defaultValue={0.15}
  step={0.05}
  min={0}
  max={1}
  locale="en-US"
  formatOptions={{ style: "percent" }}
/>`}
          >
            <NumberField
              label="Discount"
              defaultValue={0.15}
              step={0.05}
              min={0}
              max={1}
              locale="en-US"
              formatOptions={{ style: "percent" }}
              className="w-full"
            />
          </Demo>
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Trailing content"
        description="Hide the steppers and drop in a unit or selector via endContent — ideal for a price with a currency picker."
      >
        <Demo
          align="start"
          code={`<NumberField
  label="Set a price"
  defaultValue={150}
  min={0}
  hideSteppers
  locale="en-US"
  formatOptions={{ minimumFractionDigits: 0, maximumFractionDigits: 2 }}
  startContent={<span className="text-foreground">$</span>}
  endContent={
    <>
      <span className="my-2 w-px self-stretch bg-border" />
      <button type="button" className="flex items-center gap-1.5 pr-3 text-foreground">
        USD <CaretDown className="size-4" />
      </button>
    </>
  }
/>`}
        >
          <NumberField
            label="Set a price"
            defaultValue={150}
            min={0}
            hideSteppers
            locale="en-US"
            formatOptions={{ minimumFractionDigits: 0, maximumFractionDigits: 2 }}
            startContent={<span className="text-foreground">$</span>}
            endContent={
              <>
                <span className="my-2 w-px self-stretch bg-border" />
                <button
                  type="button"
                  className="flex items-center gap-1.5 pr-3 text-foreground transition-colors hover:text-muted-foreground"
                >
                  USD <CaretDown className="size-4" />
                </button>
              </>
            }
            className="w-72"
          />
        </Demo>
      </Subsection>

      <Subsection
        title="States"
        description="Disabled and error styles are shared with the rest of the field family."
      >
        <DemoGrid cols={2}>
          <Demo
            label="Disabled"
            align="start"
            code={`<NumberField label="Seats" defaultValue={4} disabled />`}
          >
            <NumberField label="Seats" defaultValue={4} disabled className="w-full" />
          </Demo>
          <Demo
            label="Error"
            align="start"
            code={`<NumberField
  label="Age"
  defaultValue={0}
  min={18}
  error="Must be 18 or older."
/>`}
          >
            <NumberField
              label="Age"
              defaultValue={0}
              min={18}
              error="Must be 18 or older."
              className="w-full"
            />
          </Demo>
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
