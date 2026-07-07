import { useState, type ReactNode } from "react";
import { CheckCircle, Clock, Warning, XCircle } from "@phosphor-icons/react";
import { Chip } from "@/components/ui/chip";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const statuses: Atom[] = [
  {
    label: "Completed",
    node: (
      <Chip color="success" startIcon={<CheckCircle weight="fill" />}>
        Completed
      </Chip>
    ),
    code: `<Chip color="success" startIcon={<CheckCircle weight="fill" />}>\n  Completed\n</Chip>`,
  },
  {
    label: "Failed",
    node: (
      <Chip color="destructive" startIcon={<XCircle weight="fill" />}>
        Failed
      </Chip>
    ),
    code: `<Chip color="destructive" startIcon={<XCircle weight="fill" />}>\n  Failed\n</Chip>`,
  },
  {
    label: "Warning",
    node: (
      <Chip color="warning" startIcon={<Warning weight="fill" />}>
        Warning
      </Chip>
    ),
    code: `<Chip color="warning" startIcon={<Warning weight="fill" />}>\n  Warning\n</Chip>`,
  },
  {
    label: "Pending",
    node: (
      <Chip color="neutral" startIcon={<Clock weight="fill" />}>
        Pending
      </Chip>
    ),
    code: `<Chip color="neutral" startIcon={<Clock weight="fill" />}>\n  Pending\n</Chip>`,
  },
];

const VARIANTS = ["solid", "soft", "outline"] as const;
const COLORS = ["neutral", "primary", "success", "warning", "destructive", "info"] as const;

const variantCards: Atom[] = VARIANTS.flatMap((variant) =>
  COLORS.map((color) => ({
    label: `${variant} · ${color}`,
    node: (
      <Chip variant={variant} color={color}>
        {cap(color)}
      </Chip>
    ),
    code: `<Chip variant="${variant}" color="${color}">${cap(color)}</Chip>`,
  })),
);

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: (
    <Chip size={size} color="info" startIcon={<CheckCircle weight="fill" />}>
      Label
    </Chip>
  ),
  code: `<Chip size="${size}" color="info" startIcon={<CheckCircle weight="fill" />}>\n  Label\n</Chip>`,
}));

const disabledCards: Atom[] = [
  {
    label: "solid",
    node: (
      <Chip disabled color="primary">
        Disabled
      </Chip>
    ),
    code: `<Chip disabled color="primary">\n  Disabled\n</Chip>`,
  },
  {
    label: "soft + icon",
    node: (
      <Chip disabled variant="soft" color="success" startIcon={<CheckCircle weight="fill" />}>
        Completed
      </Chip>
    ),
    code: `<Chip disabled variant="soft" color="success" startIcon={<CheckCircle weight="fill" />}>\n  Completed\n</Chip>`,
  },
  {
    label: "removable",
    node: (
      <Chip disabled variant="outline" onRemove={() => {}}>
        Tag
      </Chip>
    ),
    code: `<Chip disabled variant="outline" onRemove={() => {}}>\n  Tag\n</Chip>`,
  },
];

/** Removable token chips, e.g. selected tags in a field. */
function RemovableChips() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind", "Figma"]);

  if (tags.length === 0) {
    return (
      <button
        type="button"
        className="text-sm text-muted-foreground underline underline-offset-4"
        onClick={() => setTags(["React", "TypeScript", "Tailwind", "Figma"])}
      >
        Reset tags
      </button>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Chip
          key={tag}
          variant="soft"
          color="primary"
          onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
}

const REMOVABLE_CODE = `function RemovableChips() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Chip
          key={tag}
          variant="soft"
          color="primary"
          onRemove={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
}`;

/** Selectable filter chips that toggle an active state. */
function FilterChips() {
  const [active, setActive] = useState<string[]>(["Design"]);
  const filters = ["Design", "Engineering", "Product", "Marketing"];

  const toggle = (name: string) =>
    setActive((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((name) => {
        const on = active.includes(name);
        return (
          <Chip
            key={name}
            interactive
            variant={on ? "solid" : "outline"}
            color={on ? "primary" : "neutral"}
            onClick={() => toggle(name)}
          >
            {name}
          </Chip>
        );
      })}
    </div>
  );
}

const FILTERS_CODE = `function FilterChips() {
  const [active, setActive] = useState<string[]>(["Design"]);

  const toggle = (name: string) =>
    setActive((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );

  return filters.map((name) => {
    const on = active.includes(name);
    return (
      <Chip
        key={name}
        interactive
        variant={on ? "solid" : "outline"}
        color={on ? "primary" : "neutral"}
        onClick={() => toggle(name)}
      >
        {name}
      </Chip>
    );
  });
}`;

export function ChipShowcase() {
  return (
    <ComponentPage
      id="chip"
      title="Chip"
      description="Small informational badges for displaying labels, statuses, and categories. Supports solid, soft and outline variants across semantic colors, with optional icons, a remove button and interactive states."
    >
      <Subsection
        title="Statuses"
        description="Solid chips with a leading icon communicate the state of an item at a glance."
      >
        <DemoGrid cols={3}>
          {statuses.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Variants × colors"
        description="The same color reads differently as a solid fill, a soft tint or an outline."
      >
        <DemoGrid cols={3}>
          {variantCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Height, padding, text and icon scale together across sm, md and lg."
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
        title="Removable"
        description="Add a remove button to build token or tag inputs. Removing the last chip resets the demo."
      >
        <Demo code={REMOVABLE_CODE} align="start">
          <RemovableChips />
        </Demo>
      </Subsection>

      <Subsection
        title="Interactive filters"
        description="Interactive chips behave like toggle buttons — fully keyboard accessible with Enter and Space."
      >
        <Demo code={FILTERS_CODE} align="start">
          <FilterChips />
        </Demo>
      </Subsection>

      <Subsection
        title="Disabled"
        description="Disabled chips are dimmed and ignore pointer and keyboard interaction."
      >
        <DemoGrid cols={3}>
          {disabledCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
