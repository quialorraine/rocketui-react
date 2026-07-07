import { useState } from "react";
import { Pagination, type PaginationSize } from "@/components/ui/pagination";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

function BasicExample() {
  const [page, setPage] = useState(1);
  return <Pagination total={4} page={page} onPageChange={setPage} />;
}

function EllipsisExample() {
  const [page, setPage] = useState(6);
  return <Pagination total={10} page={page} onPageChange={setPage} />;
}

function CountExample() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex w-full max-w-2xl flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">1 to 5 of 50 invoices</p>
      <Pagination total={4} page={page} onPageChange={setPage} />
    </div>
  );
}

function SimpleExample() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex w-full max-w-2xl flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">1 to 5 of 50 invoices</p>
      <Pagination total={10} page={page} onPageChange={setPage} showPages={false} />
    </div>
  );
}

const SIZES: PaginationSize[] = ["sm", "md", "lg"];

export function PaginationShowcase() {
  return (
    <ComponentPage
      id="pagination"
      title="Pagination"
      description="Page navigation with numbered links, Previous/Next controls and automatic ellipsis. Controlled or uncontrolled, with the current page pinned and configurable siblings/boundaries."
    >
      <Subsection
        title="Basic"
        description="The active page is highlighted; Previous/Next disable at the bounds."
      >
        <Demo align="start" code={`const [page, setPage] = useState(1);

<Pagination total={4} page={page} onPageChange={setPage} />`}>
          <BasicExample />
        </Demo>
      </Subsection>

      <Subsection
        title="With ellipsis"
        description="For long ranges, the first, last and neighbouring pages stay visible while the rest collapse into an ellipsis."
      >
        <Demo align="start" code={`const [page, setPage] = useState(6);

<Pagination total={10} page={page} onPageChange={setPage} />`}>
          <EllipsisExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Three sizes — sm, md and lg — to match surrounding density."
      >
        <DemoGrid cols={1}>
          {SIZES.map((size) => (
            <Demo
              key={size}
              label={size}
              align="start"
              code={`<Pagination total={5} defaultPage={1} size="${size}" />`}
            >
              <Pagination total={5} defaultPage={1} size={size} />
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="With item count"
        description="Pair the navigation with a range summary using a flex container."
      >
        <Demo
          align="start"
          className="w-full"
          code={`<div className="flex items-center justify-between gap-4">
  <p className="text-sm text-muted-foreground">1 to 5 of 50 invoices</p>
  <Pagination total={4} page={page} onPageChange={setPage} />
</div>`}
        >
          <CountExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Controls only"
        description="Hide the page links with showPages={false} for a compact Previous/Next pager."
      >
        <Demo
          align="start"
          className="w-full"
          code={`<div className="flex items-center justify-between gap-4">
  <p className="text-sm text-muted-foreground">1 to 5 of 50 invoices</p>
  <Pagination total={10} page={page} onPageChange={setPage} showPages={false} />
</div>`}
        >
          <SimpleExample />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
