import { useMemo, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { SearchField } from "@/components/ui/search-field";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

function BasicExample() {
  const [query, setQuery] = useState("Alex");
  return (
    <SearchField
      label="Search"
      value={query}
      onValueChange={setQuery}
      className="max-w-xs"
    />
  );
}

const PEOPLE = [
  { name: "Alex Morgan", email: "alex@gmail.com" },
  { name: "Jamie Rivera", email: "jamie@outlook.com" },
  { name: "Taylor Brooks", email: "taylor@proton.me" },
  { name: "Jordan Lee", email: "jordan@gmail.com" },
  { name: "Casey Kim", email: "casey@icloud.com" },
];

function FilterExample() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PEOPLE;
    return PEOPLE.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <SearchField
        label="Search"
        value={query}
        onValueChange={setQuery}
        onClear={() => setQuery("")}
      />
      <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
        {results.length === 0 ? (
          <p className="px-2 py-6 text-center text-sm text-muted-foreground">
            No people found.
          </p>
        ) : (
          <ul className="flex flex-col">
            {results.map((p) => (
              <li
                key={p.email}
                className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-muted"
              >
                <Avatar name={p.name} size="sm" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {p.name}
                  </span>
                  <span className="text-sm text-muted-foreground">{p.email}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const SIZES = ["sm", "md", "lg"] as const;

export function SearchFieldShowcase() {
  return (
    <ComponentPage
      id="search-field"
      title="SearchField"
      description="Search input with a leading magnifier and a clear button that appears once there's a query. Controlled or uncontrolled, clears on Escape, and inherits the Input sizes and states."
    >
      <Subsection
        title="Basic"
        description="The clear button shows only when the field has a value; Escape clears it."
      >
        <Demo align="start" code={`const [query, setQuery] = useState("Alex");

<SearchField label="Search" value={query} onValueChange={setQuery} />`}>
          <BasicExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Live filtering"
        description="Wire onValueChange to filter a list as the user types."
      >
        <Demo align="start" code={`const [query, setQuery] = useState("");
const results = people.filter((p) => p.name.includes(query));

<SearchField label="Search" value={query} onValueChange={setQuery} />
<ul>{results.map(/* ... */)}</ul>`}>
          <FilterExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Three sizes matching the Input scale — sm, md and lg."
      >
        <DemoGrid cols={1}>
          {SIZES.map((size) => (
            <Demo
              key={size}
              label={size}
              align="start"
              code={`<SearchField size="${size}" defaultValue="Alex" />`}
            >
              <SearchField
                size={size}
                defaultValue="Alex"
                className="max-w-xs"
                aria-label={`Search ${size}`}
              />
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Disabled"
        description="Disable the field to prevent input and hide the clear button."
      >
        <Demo align="start" code={`<SearchField defaultValue="Alex" disabled />`}>
          <SearchField
            defaultValue="Alex"
            disabled
            className="max-w-xs"
            aria-label="Disabled search"
          />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
