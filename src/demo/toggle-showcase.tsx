import { useState, type ReactNode } from "react";
import { Toggle } from "@/components/ui/toggle";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

const LABEL = "Do you ship internationally?";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const stateCards: Atom[] = [
  {
    label: "Off",
    node: <Toggle label={LABEL} />,
    code: `<Toggle label="Do you ship internationally?" />`,
  },
  {
    label: "On",
    node: <Toggle label={LABEL} defaultChecked />,
    code: `<Toggle label="Do you ship internationally?" defaultChecked />`,
  },
  {
    label: "Disabled off",
    node: <Toggle label={LABEL} disabled />,
    code: `<Toggle label="Do you ship internationally?" disabled />`,
  },
  {
    label: "Disabled on",
    node: <Toggle label={LABEL} defaultChecked disabled />,
    code: `<Toggle label="Do you ship internationally?" defaultChecked disabled />`,
  },
];

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: <Toggle size={size} label={LABEL} defaultChecked />,
  code: `<Toggle size="${size}" label="Do you ship internationally?" defaultChecked />`,
}));

const DESCRIPTION_CODE = `<Toggle
  label="Do you ship internationally?"
  description="Enable to show international shipping rates at checkout."
  defaultChecked
/>`;

const LABEL_START_CODE = `<Toggle
  label="Do you ship internationally?"
  labelPosition="start"
  className="w-72 justify-between"
/>`;

function ControlledToggle() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex flex-col items-start gap-3">
      <Toggle
        label={`Shipping is ${on ? "enabled" : "disabled"}`}
        checked={on}
        onCheckedChange={setOn}
      />
    </div>
  );
}

const CONTROLLED_CODE = `function ControlledToggle() {
  const [on, setOn] = useState(true);
  return (
    <Toggle
      label={\`Shipping is \${on ? "enabled" : "disabled"}\`}
      checked={on}
      onCheckedChange={setOn}
    />
  );
}`;

export function ToggleShowcase() {
  return (
    <ComponentPage
      id="toggle"
      title="Toggle"
      description="A switch for turning a single option on or off. Supports controlled and uncontrolled state, sizes, an optional label and description, and disabled states."
    >
      <Subsection
        title="States"
        description="Off, on, and disabled — the track and thumb are driven by design tokens."
      >
        <DemoGrid cols={2}>
          {stateCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="With description"
        description="Add a secondary line to explain the option. The whole block is clickable and associated for screen readers."
      >
        <Demo code={DESCRIPTION_CODE}>
          <Toggle
            label={LABEL}
            description="Enable to show international shipping rates at checkout."
            defaultChecked
          />
        </Demo>
      </Subsection>

      <Subsection
        title="Label position"
        description="Place the label before the switch and space it out for a settings-row layout."
      >
        <Demo code={LABEL_START_CODE}>
          <Toggle label={LABEL} labelPosition="start" className="w-72 justify-between" />
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="The track, thumb and label scale together across sm, md and lg."
      >
        <DemoGrid cols={3}>
          {sizeCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Controlled"
        description="Drive the switch from your own state with checked and onCheckedChange."
      >
        <Demo code={CONTROLLED_CODE}>
          <ControlledToggle />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
