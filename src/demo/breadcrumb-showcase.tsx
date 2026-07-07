import { Fragment, type ReactNode } from "react";
import { CaretRight, House } from "@phosphor-icons/react";
import { Avatar } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const TRAIL = ["Home", "Products", "Electronics"] as const;

function Trail({ current = "Mobile Phone" }: { current?: string }) {
  return (
    <>
      {TRAIL.map((label) => (
        <Fragment key={label}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{label}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </Fragment>
      ))}
      <BreadcrumbItem>
        <BreadcrumbPage>{current}</BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}

const separatorCards: Atom[] = [
  {
    label: "chevron (default)",
    node: (
      <Breadcrumb>
        <BreadcrumbList>
          <Trail />
        </BreadcrumbList>
      </Breadcrumb>
    ),
    code: `<Breadcrumb>
  <BreadcrumbList>
    <Trail />
  </BreadcrumbList>
</Breadcrumb>`,
  },
  {
    label: "filled caret",
    node: (
      <Breadcrumb separator={<CaretRight weight="fill" />}>
        <BreadcrumbList>
          <Trail />
        </BreadcrumbList>
      </Breadcrumb>
    ),
    code: `<Breadcrumb separator={<CaretRight weight="fill" />}>
  <BreadcrumbList>
    <Trail />
  </BreadcrumbList>
</Breadcrumb>`,
  },
  {
    label: "slash",
    node: (
      <Breadcrumb separator={<span className="text-muted-foreground">/</span>}>
        <BreadcrumbList>
          <Trail />
        </BreadcrumbList>
      </Breadcrumb>
    ),
    code: `<Breadcrumb separator={<span className="text-muted-foreground">/</span>}>
  <BreadcrumbList>
    <Trail />
  </BreadcrumbList>
</Breadcrumb>`,
  },
];

const richContentCards: Atom[] = [
  {
    label: "leading icon",
    node: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <House weight="fill" className="size-4" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Billing</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">
        <House weight="fill" className="size-4" />
        Home
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Billing</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
  {
    label: "user context",
    node: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Avatar
                src="https://i.pravatar.cc/64?img=15"
                name="Alex Turner"
                size="xs"
              />
              Alex
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Users</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>
        <Avatar
          src="https://i.pravatar.cc/64?img=15"
          name="Alex Turner"
          size="xs"
        />
        Alex
      </BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
  },
];

const COLLAPSED_CODE = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Electronics</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Mobile Phone</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;

export function BreadcrumbShowcase() {
  return (
    <ComponentPage
      id="breadcrumb"
      title="Breadcrumbs"
      description="Shows the current page's location within a hierarchy. Composable items with links, a current page, and a configurable separator."
    >
      <Subsection
        title="Separators"
        description="A chevron by default; swap it for a filled caret or a slash via the separator prop."
      >
        <DemoGrid cols={1}>
          {separatorCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="With icons & rich content"
        description="Any node can live inside a crumb — a leading icon on the root, or an avatar and name for a user context."
      >
        <DemoGrid cols={1}>
          {richContentCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Collapsed"
        description="Collapse the middle of a long trail with an ellipsis to keep it on one line."
      >
        <Demo align="start" code={COLLAPSED_CODE}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Electronics</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Mobile Phone</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
