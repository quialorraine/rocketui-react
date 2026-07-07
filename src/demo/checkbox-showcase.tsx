import { useState, type ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

const LABEL = "Do you ship internationally?";

const TOPICS = ["Shipping", "Returns", "Payments"] as const;

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const stateCards: Atom[] = [
  {
    label: "Unchecked",
    node: <Checkbox label={LABEL} />,
    code: `<Checkbox label="Do you ship internationally?" />`,
  },
  {
    label: "Checked",
    node: <Checkbox label={LABEL} defaultChecked />,
    code: `<Checkbox label="Do you ship internationally?" defaultChecked />`,
  },
  {
    label: "Indeterminate",
    node: <Checkbox label={LABEL} indeterminate />,
    code: `<Checkbox label="Do you ship internationally?" indeterminate />`,
  },
  {
    label: "Disabled",
    node: <Checkbox label={LABEL} defaultChecked disabled />,
    code: `<Checkbox label="Do you ship internationally?" defaultChecked disabled />`,
  },
];

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: <Checkbox size={size} label={LABEL} defaultChecked />,
  code: `<Checkbox size="${size}" label="Do you ship internationally?" defaultChecked />`,
}));

const descriptionExample = (
  <Checkbox
    label={LABEL}
    description="Browse our products, add items to your cart, and check out from anywhere."
    defaultChecked
  />
);

const DESCRIPTION_CODE = `<Checkbox
  label="Do you ship internationally?"
  description="Browse our products, add items to your cart, and check out from anywhere."
  defaultChecked
/>`;

/** A parent checkbox whose state is derived from its children. */
function CheckboxTree() {
  const [items, setItems] = useState<Record<string, boolean>>({
    Shipping: true,
    Returns: false,
    Payments: false,
  });

  const values = Object.values(items);
  const allChecked = values.every(Boolean);
  const someChecked = values.some(Boolean);

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Select all topics"
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onCheckedChange={(next) =>
          setItems(Object.fromEntries(TOPICS.map((t) => [t, next])))
        }
      />
      <div className="ml-7 flex flex-col gap-3">
        {TOPICS.map((topic) => (
          <Checkbox
            key={topic}
            label={topic}
            checked={items[topic]}
            onCheckedChange={(next) =>
              setItems((prev) => ({ ...prev, [topic]: next }))
            }
          />
        ))}
      </div>
    </div>
  );
}

const TREE_CODE = `function CheckboxTree() {
  const [items, setItems] = useState({
    Shipping: true,
    Returns: false,
    Payments: false,
  });

  const values = Object.values(items);
  const allChecked = values.every(Boolean);
  const someChecked = values.some(Boolean);

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Select all topics"
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onCheckedChange={(next) =>
          setItems(Object.fromEntries(TOPICS.map((t) => [t, next])))
        }
      />
      <div className="ml-7 flex flex-col gap-3">
        {TOPICS.map((topic) => (
          <Checkbox
            key={topic}
            label={topic}
            checked={items[topic]}
            onCheckedChange={(next) =>
              setItems((prev) => ({ ...prev, [topic]: next }))
            }
          />
        ))}
      </div>
    </div>
  );
}`;

export function CheckboxShowcase() {
  return (
    <ComponentPage
      id="checkbox"
      title="Checkbox"
      description="Select one or many items from a list, or toggle a single option on and off. Supports checked, indeterminate and disabled states with an optional label and description."
    >
      <Subsection
        title="States"
        description="Unchecked, checked, indeterminate, and disabled — all driven by design tokens."
      >
        <DemoGrid cols={2}>
          {stateCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="With description"
        description="Add a secondary line to explain the option. The whole block is clickable and correctly associated for screen readers."
      >
        <Demo code={DESCRIPTION_CODE} align="start">
          {descriptionExample}
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="The box, icon and label scale together across sm, md and lg."
      >
        <DemoGrid cols={3}>
          {sizeCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Parent / children"
        description="Compose a select-all control: the parent reflects an indeterminate state when only some children are selected."
      >
        <Demo align="start" code={TREE_CODE}>
          <CheckboxTree />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
