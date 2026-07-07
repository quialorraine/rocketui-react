import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

const JUNE_2020 = new Date(2020, 5, 1);
const SELECTED = new Date(2020, 5, 26);

/** Reproduces the "unavailable days" mock — a few scattered disabled dates. */
const BOOKED = new Set([4, 13, 18, 21, 24]);

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

function ControlledCalendar() {
  const [date, setDate] = useState<Date | null>(SELECTED);
  return (
    <Calendar
      value={date}
      onChange={setDate}
      defaultMonth={JUNE_2020}
      locale="en-US"
    />
  );
}

const DEFAULT_CODE = `function ControlledCalendar() {
  const [date, setDate] = useState<Date | null>(SELECTED);
  return (
    <Calendar
      value={date}
      onChange={setDate}
      defaultMonth={JUNE_2020}
      locale="en-US"
    />
  );
}`;

const footerCards: Atom[] = [
  {
    label: "Helper text",
    node: (
      <Calendar defaultValue={SELECTED} defaultMonth={JUNE_2020} locale="en-US">
        With new features on the horizon, we're updating a few things.
      </Calendar>
    ),
    code: `<Calendar defaultValue={SELECTED} defaultMonth={JUNE_2020} locale="en-US">
  With new features on the horizon, we're updating a few things.
</Calendar>`,
  },
  {
    label: "Actions",
    node: (
      <Calendar defaultValue={SELECTED} defaultMonth={JUNE_2020} locale="en-US">
        <ButtonGroup className="w-full [&>*]:flex-1">
          <Button>Today</Button>
          <Button>Clear</Button>
          <Button>Apply</Button>
        </ButtonGroup>
      </Calendar>
    ),
    code: `<Calendar defaultValue={SELECTED} defaultMonth={JUNE_2020} locale="en-US">
  <ButtonGroup className="w-full [&>*]:flex-1">
    <Button>Today</Button>
    <Button>Clear</Button>
    <Button>Apply</Button>
  </ButtonGroup>
</Calendar>`,
  },
];

const disabledExample = (
  <Calendar
    defaultMonth={JUNE_2020}
    locale="en-US"
    isDateDisabled={(date) =>
      date.getMonth() === 5 && BOOKED.has(date.getDate())
    }
  />
);

const DISABLED_CODE = `<Calendar
  defaultMonth={JUNE_2020}
  locale="en-US"
  isDateDisabled={(date) =>
    date.getMonth() === 5 && BOOKED.has(date.getDate())
  }
/>`;

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: (
    <Calendar
      size={size}
      defaultValue={SELECTED}
      defaultMonth={JUNE_2020}
      locale="en-US"
    />
  ),
  code: `<Calendar
  size="${size}"
  defaultValue={SELECTED}
  defaultMonth={JUNE_2020}
  locale="en-US"
/>`,
}));

export function CalendarShowcase() {
  return (
    <ComponentPage
      id="calendar"
      title="Calendar"
      description="A composable date picker with a month grid, month/year navigation, disabled days, and keyboard support — driven entirely by design tokens."
    >
      <Subsection
        title="Default"
        description="Single date selection. Click the caption to jump to the month, then year picker. Fully keyboard navigable with arrow keys, Home/End and PageUp/Down."
      >
        <Demo align="start" code={DEFAULT_CODE}>
          <ControlledCalendar />
        </Demo>
      </Subsection>

      <Subsection
        title="With footer"
        description="Pass children to render a footer — helper text, a legend, or a row of actions."
      >
        <DemoGrid cols={2}>
          {footerCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Disabled days"
        description="Block arbitrary days with isDateDisabled, or bound the range with minDate / maxDate. Disabled days are struck through and skipped by the keyboard."
      >
        <Demo align="start" code={DISABLED_CODE}>
          {disabledExample}
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="The grid, weekday headers and typography scale together across sm, md and lg."
      >
        <DemoGrid cols={3}>
          {sizeCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
