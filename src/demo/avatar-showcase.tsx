import type { ReactNode } from "react";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const PORTRAIT = "https://i.pravatar.cc/128?img=12";

const TEAM = [
  { name: "Alex Turner", src: "https://i.pravatar.cc/128?img=13" },
  { name: "Mia Wong", src: "https://i.pravatar.cc/128?img=45" },
  { name: "Sam Lee", src: "https://i.pravatar.cc/128?img=33" },
  { name: "Nina Patel", src: "https://i.pravatar.cc/128?img=24" },
  { name: "Omar Diaz", src: "https://i.pravatar.cc/128?img=51" },
  { name: "Lucy Kim", src: "https://i.pravatar.cc/128?img=9" },
] as const;

const fallbackCards: Atom[] = [
  {
    label: "Image",
    node: <Avatar src={PORTRAIT} name="Alex Turner" />,
    code: `<Avatar src={PORTRAIT} name="Alex Turner" />`,
  },
  {
    label: "Initials (neutral)",
    node: <Avatar name="Alex Turner" />,
    code: `<Avatar name="Alex Turner" />`,
  },
  {
    label: "Initials (brand)",
    node: <Avatar name="Alex Turner" color="brand" />,
    code: `<Avatar name="Alex Turner" color="brand" />`,
  },
  {
    label: "Icon",
    node: <Avatar />,
    code: `<Avatar />`,
  },
  {
    label: "Broken image → fallback",
    node: <Avatar src="https://invalid.example/none.png" name="Mia Wong" color="brand" />,
    code: `<Avatar src="https://invalid.example/none.png" name="Mia Wong" color="brand" />`,
  },
];

const shapeCards: Atom[] = [
  {
    label: "circle · image",
    node: <Avatar src={PORTRAIT} name="Alex Turner" shape="circle" />,
    code: `<Avatar src={PORTRAIT} name="Alex Turner" shape="circle" />`,
  },
  {
    label: "circle · initials",
    node: <Avatar name="Alex Turner" shape="circle" color="brand" />,
    code: `<Avatar name="Alex Turner" shape="circle" color="brand" />`,
  },
  {
    label: "rounded · image",
    node: <Avatar src={PORTRAIT} name="Alex Turner" shape="rounded" />,
    code: `<Avatar src={PORTRAIT} name="Alex Turner" shape="rounded" />`,
  },
  {
    label: "rounded · initials",
    node: <Avatar name="Alex Turner" shape="rounded" color="brand" />,
    code: `<Avatar name="Alex Turner" shape="rounded" color="brand" />`,
  },
];

const SIZES = ["xs", "sm", "md", "lg", "xl"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: <Avatar src={PORTRAIT} name="Alex Turner" size={size} />,
  code: `<Avatar src={PORTRAIT} name="Alex Turner" size="${size}" />`,
}));

const groupCards: Atom[] = [
  {
    label: "Overlapping team",
    node: (
      <AvatarGroup>
        {TEAM.slice(0, 4).map((member) => (
          <Avatar key={member.name} src={member.src} name={member.name} />
        ))}
      </AvatarGroup>
    ),
    code: `<AvatarGroup>\n  {team.slice(0, 4).map((member) => (\n    <Avatar key={member.name} src={member.src} name={member.name} />\n  ))}\n</AvatarGroup>`,
  },
  {
    label: "With overflow (max = 4)",
    node: (
      <AvatarGroup max={4}>
        {TEAM.map((member) => (
          <Avatar key={member.name} src={member.src} name={member.name} />
        ))}
      </AvatarGroup>
    ),
    code: `<AvatarGroup max={4}>\n  {team.map((member) => (\n    <Avatar key={member.name} src={member.src} name={member.name} />\n  ))}\n</AvatarGroup>`,
  },
  {
    label: "Rounded, large",
    node: (
      <AvatarGroup max={4} size="lg" shape="rounded">
        {TEAM.map((member) => (
          <Avatar key={member.name} src={member.src} name={member.name} />
        ))}
      </AvatarGroup>
    ),
    code: `<AvatarGroup max={4} size="lg" shape="rounded">\n  {team.map((member) => (\n    <Avatar key={member.name} src={member.src} name={member.name} />\n  ))}\n</AvatarGroup>`,
  },
];

export function AvatarShowcase() {
  return (
    <ComponentPage
      id="avatar"
      title="Avatar"
      description="Display user profile images with graceful fallbacks. Renders an image, initials from a name, or an icon — as a circle or rounded square, in any size."
    >
      <Subsection
        title="Fallback content"
        description="With no image, the avatar shows initials derived from the name; with no name, a neutral user icon. Choose a neutral or brand-gradient background."
      >
        <DemoGrid cols={3}>
          {fallbackCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Shapes"
        description="A full circle or a rounded square whose corner radius scales with the avatar size."
      >
        <DemoGrid cols={3}>
          {shapeCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Five sizes scale the frame, text and icon together, from xs to xl."
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
        title="Avatar group"
        description="Stack avatars to represent a team or shared context. Cap the count with max to collapse the remainder into a +N badge."
      >
        <DemoGrid cols={2}>
          {groupCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
