import type { ReactNode } from "react";
import {
  Autocomplete,
  type AutocompleteOption,
} from "@/components/ui/autocomplete";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

function GradientAvatar() {
  return (
    <span className="block size-full bg-gradient-to-br from-fuchsia-400 via-violet-400 to-indigo-500" />
  );
}

const STATES: AutocompleteOption[] = [
  "Alabama",
  "Alaska",
  "Arizona",
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Hawaii",
  "Illinois",
  "New York",
].map((label) => ({ value: label.toLowerCase(), label }));

const PEOPLE: AutocompleteOption[] = [
  { value: "alex", label: "Alex", description: "alex@gmail.com", avatar: <GradientAvatar /> },
  { value: "bob", label: "Bob", description: "bob@gmail.com", avatar: <GradientAvatar /> },
  { value: "carol", label: "Carol", description: "carol@gmail.com", avatar: <GradientAvatar /> },
  { value: "dave", label: "Dave", description: "dave@gmail.com", avatar: <GradientAvatar /> },
];

const CITIES: AutocompleteOption[] = [
  { value: "chicago", label: "Chicago", description: "USA" },
  { value: "london", label: "London", description: "UK" },
  { value: "tokyo", label: "Tokyo", description: "Japan" },
  { value: "paris", label: "Paris", description: "France" },
  { value: "berlin", label: "Berlin", description: "Germany" },
];

const GROUPED: AutocompleteOption[] = [
  { value: "recent-1", label: "Design review", group: "Recent" },
  { value: "recent-2", label: "Sprint planning", group: "Recent" },
  { value: "all-1", label: "Roadmap", group: "All boards" },
  { value: "all-2", label: "Backlog", group: "All boards" },
  { value: "all-3", label: "Retrospective", group: "All boards" },
];

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex w-72 max-w-full flex-col gap-2">
      <span className="text-base font-medium text-foreground">{label}</span>
      {children}
    </div>
  );
}

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const selectCards: Atom[] = [
  {
    label: "Single",
    node: (
      <Field label="States to Visit">
        <Autocomplete
          options={STATES}
          placeholder="Select states"
          aria-label="States to visit"
        />
      </Field>
    ),
    code: `<Field label="States to Visit">
  <Autocomplete
    options={STATES}
    placeholder="Select states"
    aria-label="States to visit"
  />
</Field>`,
  },
  {
    label: "Multiple",
    node: (
      <Field label="States to Visit">
        <Autocomplete
          multiple
          options={STATES}
          defaultValue={["alabama", "alaska"]}
          placeholder="Select states"
          aria-label="States to visit (multiple)"
        />
      </Field>
    ),
    code: `<Field label="States to Visit">
  <Autocomplete
    multiple
    options={STATES}
    defaultValue={["alabama", "alaska"]}
    placeholder="Select states"
    aria-label="States to visit (multiple)"
  />
</Field>`,
  },
];

const richCards: Atom[] = [
  {
    label: "Assignees",
    node: (
      <Field label="Assignees">
        <Autocomplete
          multiple
          options={PEOPLE}
          defaultValue={["alex"]}
          placeholder="Add people"
          aria-label="Assignees"
        />
      </Field>
    ),
    code: `<Field label="Assignees">
  <Autocomplete
    multiple
    options={PEOPLE}
    defaultValue={["alex"]}
    placeholder="Add people"
    aria-label="Assignees"
  />
</Field>`,
  },
  {
    label: "Destination",
    node: (
      <Field label="Destination">
        <Autocomplete
          options={CITIES}
          placeholder="Select a city"
          aria-label="Destination"
        />
      </Field>
    ),
    code: `<Field label="Destination">
  <Autocomplete
    options={CITIES}
    placeholder="Select a city"
    aria-label="Destination"
  />
</Field>`,
  },
];

const groupedExample = (
  <Field label="Open board">
    <Autocomplete
      options={GROUPED}
      placeholder="Search boards"
      aria-label="Open board"
    />
  </Field>
);

const GROUPED_CODE = `<Field label="Open board">
  <Autocomplete
    options={GROUPED}
    placeholder="Search boards"
    aria-label="Open board"
  />
</Field>`;

const disabledExample = (
  <Field label="Disabled">
    <Autocomplete
      disabled
      options={STATES}
      defaultValue={["california"]}
      placeholder="Select states"
      aria-label="States (disabled)"
    />
  </Field>
);

const DISABLED_CODE = `<Field label="Disabled">
  <Autocomplete
    disabled
    options={STATES}
    defaultValue={["california"]}
    placeholder="Select states"
    aria-label="States (disabled)"
  />
</Field>`;

export function AutocompleteShowcase() {
  return (
    <ComponentPage
      id="autocomplete"
      title="Autocomplete"
      description="Combines a select with filtering, letting users search and pick from a list. Supports single and multi-select, rich options, grouping, and full keyboard control."
    >
      <Subsection
        title="Single & multi-select"
        description="Type to filter. Multi-select renders removable chips; both variants can be cleared."
      >
        <DemoGrid cols={2}>
          {selectCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Rich options"
        description="Options can carry an avatar and a secondary line — ideal for people pickers and search results."
      >
        <DemoGrid cols={2}>
          {richCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Grouped options"
        description="Provide a group on each option to render section headings with dividers."
      >
        <Demo align="start" code={GROUPED_CODE}>
          {groupedExample}
        </Demo>
      </Subsection>

      <Subsection
        title="Disabled"
        description="Supports a disabled state that blocks interaction while keeping the selection visible."
      >
        <Demo align="start" code={DISABLED_CODE}>
          {disabledExample}
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
