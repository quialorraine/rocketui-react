import type { ReactNode } from "react";
import { Bell, Envelope } from "@phosphor-icons/react";
import { Avatar } from "@/components/ui/avatar";
import { Badge, BadgeWrapper } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const PORTRAIT = "https://i.pravatar.cc/128?img=32";

const ring = "ring-2 ring-background";

const typeCards: Atom[] = [
  {
    label: "count",
    node: <Badge color="destructive">5</Badge>,
    code: `<Badge color="destructive">5</Badge>`,
  },
  {
    label: "overflow",
    node: (
      <Badge color="destructive" max={99}>
        {128}
      </Badge>
    ),
    code: `<Badge color="destructive" max={99}>{128}</Badge>`,
  },
  {
    label: "label",
    node: <Badge color="primary">New</Badge>,
    code: `<Badge color="primary">New</Badge>`,
  },
  {
    label: "dot",
    node: <Badge dot color="success" />,
    code: `<Badge dot color="success" />`,
  },
];

const overlaidCards: Atom[] = [
  {
    label: "Count on avatar",
    node: (
      <BadgeWrapper
        overlap="circular"
        badge={
          <Badge color="destructive" className={ring}>
            5
          </Badge>
        }
      >
        <Avatar src={PORTRAIT} name="Alex Turner" size="lg" />
      </BadgeWrapper>
    ),
    code: `<BadgeWrapper\n  overlap="circular"\n  badge={<Badge color="destructive" className="ring-2 ring-background">5</Badge>}\n>\n  <Avatar src={PORTRAIT} name="Alex Turner" size="lg" />\n</BadgeWrapper>`,
  },
  {
    label: "Label on avatar",
    node: (
      <BadgeWrapper
        placement="bottom-center"
        badge={
          <Badge color="primary" className={ring}>
            New
          </Badge>
        }
      >
        <Avatar name="Alex Turner" color="brand" size="lg" />
      </BadgeWrapper>
    ),
    code: `<BadgeWrapper\n  placement="bottom-center"\n  badge={<Badge color="primary" className="ring-2 ring-background">New</Badge>}\n>\n  <Avatar name="Alex Turner" color="brand" size="lg" />\n</BadgeWrapper>`,
  },
  {
    label: "Status dot",
    node: (
      <BadgeWrapper
        overlap="circular"
        placement="bottom-right"
        badge={<Badge dot color="success" className={ring} />}
      >
        <Avatar src={PORTRAIT} name="Alex Turner" size="lg" />
      </BadgeWrapper>
    ),
    code: `<BadgeWrapper\n  overlap="circular"\n  placement="bottom-right"\n  badge={<Badge dot color="success" className="ring-2 ring-background" />}\n>\n  <Avatar src={PORTRAIT} name="Alex Turner" size="lg" />\n</BadgeWrapper>`,
  },
  {
    label: "On a button",
    node: (
      <BadgeWrapper
        overlap="circular"
        badge={
          <Badge color="destructive" className={ring}>
            12
          </Badge>
        }
      >
        <Button variant="outline" color="neutral" size="lg" iconOnly aria-label="Notifications">
          <Bell weight="fill" />
        </Button>
      </BadgeWrapper>
    ),
    code: `<BadgeWrapper\n  overlap="circular"\n  badge={<Badge color="destructive" className="ring-2 ring-background">12</Badge>}\n>\n  <Button variant="outline" color="neutral" size="lg" iconOnly aria-label="Notifications">\n    <Bell weight="fill" />\n  </Button>\n</BadgeWrapper>`,
  },
  {
    label: "Dot on a button",
    node: (
      <BadgeWrapper
        overlap="circular"
        badge={<Badge dot color="destructive" className={ring} />}
      >
        <Button variant="outline" color="neutral" size="lg" iconOnly aria-label="Messages">
          <Envelope weight="fill" />
        </Button>
      </BadgeWrapper>
    ),
    code: `<BadgeWrapper\n  overlap="circular"\n  badge={<Badge dot color="destructive" className="ring-2 ring-background" />}\n>\n  <Button variant="outline" color="neutral" size="lg" iconOnly aria-label="Messages">\n    <Envelope weight="fill" />\n  </Button>\n</BadgeWrapper>`,
  },
];

export function BadgeShowcase() {
  return (
    <ComponentPage
      id="badge"
      title="Badge"
      description="A small indicator anchored to another element — a notification count, a status dot, or a short label like “New”."
    >
      <Subsection
        title="Types"
        description="A numeric count (collapsing to max+ on overflow), a short label, or a bare status dot."
      >
        <DemoGrid cols={3}>
          {typeCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Overlaid on elements"
        description="Wrap any element to anchor a badge to a corner — on avatars for presence and counts, on icon buttons for notifications."
      >
        <DemoGrid cols={3}>
          {overlaidCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
