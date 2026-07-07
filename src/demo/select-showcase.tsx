import { useState } from "react";
import { Select, type SelectOption, type SelectSize } from "@/components/ui/select";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

const STATES: SelectOption[] = [
  { value: "ca", label: "California" },
  { value: "ny", label: "New York" },
  { value: "tx", label: "Texas" },
  { value: "fl", label: "Florida" },
  { value: "wa", label: "Washington" },
];

const TIMEZONES: SelectOption[] = [
  { value: "pst", label: "Pacific", description: "UTC−08:00", group: "Americas" },
  { value: "est", label: "Eastern", description: "UTC−05:00", group: "Americas" },
  { value: "gmt", label: "London", description: "UTC+00:00", group: "Europe" },
  { value: "cet", label: "Berlin", description: "UTC+01:00", group: "Europe" },
  { value: "jst", label: "Tokyo", description: "UTC+09:00", group: "Asia" },
];

function BasicExample() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select
      label="States to Visit"
      placeholder="Select states"
      options={STATES}
      value={value}
      onValueChange={setValue}
      className="max-w-xs"
    />
  );
}

export function SelectShowcase() {
  return (
    <ComponentPage
      id="select"
      title="Select"
      description="A select displays a collapsible list of options and lets the user pick one. Fully keyboard accessible (arrows, Home/End, type-ahead), controlled or uncontrolled, with labels, groups, sizes and states."
    >
      <Subsection
        title="Basic"
        description="Click the trigger or press Enter/Space to open, then pick an option."
      >
        <Demo align="start" code={`const [value, setValue] = useState(null);

<Select
  label="States to Visit"
  placeholder="Select states"
  options={states}
  value={value}
  onValueChange={setValue}
/>`}>
          <BasicExample />
        </Demo>
      </Subsection>

      <Subsection
        title="With descriptions & groups"
        description="Options can carry a secondary line and be organised under group headings."
      >
        <Demo align="start" code={`<Select
  label="Timezone"
  placeholder="Select a timezone"
  options={[
    { value: "pst", label: "Pacific", description: "UTC−08:00", group: "Americas" },
    { value: "gmt", label: "London", description: "UTC+00:00", group: "Europe" },
    // ...
  ]}
/>`}>
          <Select
            label="Timezone"
            placeholder="Select a timezone"
            options={TIMEZONES}
            defaultValue="est"
            className="max-w-xs"
          />
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Three sizes matching the Input scale — sm, md and lg."
      >
        <DemoGrid cols={1}>
          {(["sm", "md", "lg"] as SelectSize[]).map((size) => (
            <Demo
              key={size}
              label={size}
              align="start"
              code={`<Select size="${size}" options={states} defaultValue="ca" />`}
            >
              <Select
                size={size}
                options={STATES}
                defaultValue="ca"
                className="max-w-xs"
                aria-label={`States ${size}`}
              />
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="States"
        description="Error and disabled states, plus a disabled individual option."
      >
        <DemoGrid cols={2}>
          <Demo
            align="start"
            code={`<Select label="States to Visit" options={states} error="Please pick a state" />`}
          >
            <Select
              label="States to Visit"
              placeholder="Select states"
              options={STATES}
              error="Please pick a state"
            />
          </Demo>
          <Demo
            align="start"
            code={`<Select label="States to Visit" options={states} defaultValue="ny" disabled />`}
          >
            <Select
              label="States to Visit"
              options={STATES}
              defaultValue="ny"
              disabled
            />
          </Demo>
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
