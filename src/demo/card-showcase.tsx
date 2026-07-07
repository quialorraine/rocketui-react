import type { ReactNode } from "react";
import { ArrowUpRight, PiggyBank, Sparkle, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from "@/components/ui/card";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const TITLE = "We've moved things around";
const BODY = "With new features on the horizon, we're updating a few things.";
const IMG = "https://picsum.photos/seed/rocketui/240/240";

function ChangedLink() {
  return (
    <Button variant="link" color="primary" endIcon={<ArrowUpRight weight="bold" />}>
      See what's changed
    </Button>
  );
}

function CloseButton() {
  return (
    <Button
      variant="ghost"
      color="neutral"
      size="sm"
      iconOnly
      aria-label="Dismiss"
      className="absolute top-3 right-3"
    >
      <X weight="bold" />
    </Button>
  );
}

const mediaCards: Atom[] = [
  {
    label: "icon + surface",
    node: (
      <Card className="w-[380px]">
        <PiggyBank weight="fill" className="size-14 text-muted-foreground" />
        <CardHeader>
          <CardTitle>{TITLE}</CardTitle>
          <CardDescription>{BODY}</CardDescription>
        </CardHeader>
        <CardFooter>
          <ChangedLink />
        </CardFooter>
      </Card>
    ),
    code: `<Card className="w-[380px]">
  <PiggyBank weight="fill" className="size-14 text-muted-foreground" />
  <CardHeader>
    <CardTitle>{TITLE}</CardTitle>
    <CardDescription>{BODY}</CardDescription>
  </CardHeader>
  <CardFooter>
    <ChangedLink />
  </CardFooter>
</Card>`,
  },
  {
    label: "ghost variant",
    node: (
      <Card variant="ghost" padding="none" className="w-[380px]">
        <Sparkle weight="fill" className="size-14 text-muted-foreground" />
        <CardHeader>
          <CardTitle>{TITLE}</CardTitle>
          <CardDescription>{BODY}</CardDescription>
        </CardHeader>
        <CardFooter>
          <ChangedLink />
        </CardFooter>
      </Card>
    ),
    code: `<Card variant="ghost" padding="none" className="w-[380px]">
  <Sparkle weight="fill" className="size-14 text-muted-foreground" />
  <CardHeader>
    <CardTitle>{TITLE}</CardTitle>
    <CardDescription>{BODY}</CardDescription>
  </CardHeader>
  <CardFooter>
    <ChangedLink />
  </CardFooter>
</Card>`,
  },
];

const horizontalCards: Atom[] = [
  {
    label: "with link action",
    node: (
      <Card className="w-[560px] flex-row items-stretch">
        <CardMedia className="w-32 self-stretch">
          <img src={IMG} alt="" />
        </CardMedia>
        <div className="flex flex-1 flex-col justify-center gap-3 pr-8">
          <CardHeader>
            <CardTitle>{TITLE}</CardTitle>
            <CardDescription>{BODY}</CardDescription>
          </CardHeader>
          <CardFooter>
            <ChangedLink />
          </CardFooter>
        </div>
        <CloseButton />
      </Card>
    ),
    code: `<Card className="w-[560px] flex-row items-stretch">
  <CardMedia className="w-32 self-stretch">
    <img src={IMG} alt="" />
  </CardMedia>
  <div className="flex flex-1 flex-col justify-center gap-3 pr-8">
    <CardHeader>
      <CardTitle>{TITLE}</CardTitle>
      <CardDescription>{BODY}</CardDescription>
    </CardHeader>
    <CardFooter>
      <ChangedLink />
    </CardFooter>
  </div>
  <CloseButton />
</Card>`,
  },
  {
    label: "with buttons",
    node: (
      <Card className="w-[560px] flex-row items-stretch">
        <CardMedia className="w-32 self-stretch">
          <img src={IMG} alt="" />
        </CardMedia>
        <div className="flex flex-1 flex-col justify-center gap-4 pr-8">
          <CardHeader>
            <CardTitle>{TITLE}</CardTitle>
            <CardDescription>{BODY}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="min-w-28">Buy</Button>
            <Button variant="soft" color="neutral" className="min-w-28">
              Cancel
            </Button>
          </CardFooter>
        </div>
        <CloseButton />
      </Card>
    ),
    code: `<Card className="w-[560px] flex-row items-stretch">
  <CardMedia className="w-32 self-stretch">
    <img src={IMG} alt="" />
  </CardMedia>
  <div className="flex flex-1 flex-col justify-center gap-4 pr-8">
    <CardHeader>
      <CardTitle>{TITLE}</CardTitle>
      <CardDescription>{BODY}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button className="min-w-28">Buy</Button>
      <Button variant="soft" color="neutral" className="min-w-28">
        Cancel
      </Button>
    </CardFooter>
  </div>
  <CloseButton />
</Card>`,
  },
];

const VERTICAL_CODE = `<Card className="w-[320px]">
  <CardMedia className="size-24">
    <img src={IMG} alt="" />
  </CardMedia>
  <CardHeader>
    <CardTitle>{TITLE}</CardTitle>
    <CardDescription>{BODY}</CardDescription>
  </CardHeader>
  <CardFooter>
    <Button size="sm">Buy</Button>
    <Button size="sm" variant="soft" color="neutral">
      Cancel
    </Button>
  </CardFooter>
  <CloseButton />
</Card>`;

export function CardShowcase() {
  return (
    <ComponentPage
      id="card"
      title="Card"
      description="A flexible container for grouping related content and actions. Composable header, media, content and footer slots that arrange into any layout."
    >
      <Subsection
        title="Media & surface"
        description="Lead with an icon or image. Drop the surface with the ghost variant to place a card inline on any background."
      >
        <DemoGrid cols={2}>
          {mediaCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Horizontal"
        description="Place media beside the content by making the card a row. A dismiss action anchors to the corner."
      >
        <DemoGrid cols={1}>
          {horizontalCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Vertical"
        description="Stack media on top with actions in the footer — the classic product or promo card."
      >
        <Demo align="start" code={VERTICAL_CODE}>
          <Card className="w-[320px]">
            <CardMedia className="size-24">
              <img src={IMG} alt="" />
            </CardMedia>
            <CardHeader>
              <CardTitle>{TITLE}</CardTitle>
              <CardDescription>{BODY}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button size="sm">Buy</Button>
              <Button size="sm" variant="soft" color="neutral">
                Cancel
              </Button>
            </CardFooter>
            <CloseButton />
          </Card>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
