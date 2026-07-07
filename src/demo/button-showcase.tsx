import { useState, type ReactNode } from "react";
import { ArrowRight, Heart, Plus, Trash } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { AppleIcon, GitHubIcon, GoogleIcon } from "@/components/icons";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const VARIANTS = ["solid", "soft", "outline", "ghost", "link"] as const;
const COLORS = ["primary", "neutral", "destructive"] as const;

const variantCards: Atom[] = VARIANTS.flatMap((variant) =>
  COLORS.map((color) => ({
    label: `${variant} · ${color}`,
    node: (
      <Button variant={variant} color={color}>
        Button
      </Button>
    ),
    code: `<Button variant="${variant}" color="${color}">Button</Button>`,
  })),
);

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: (
    <Button size={size} startIcon={<Plus weight="bold" />}>
      Button
    </Button>
  ),
  code: `<Button size="${size}" startIcon={<Plus weight="bold" />}>\n  Button\n</Button>`,
}));

const iconCards: Atom[] = [
  {
    label: "New project",
    node: <Button startIcon={<Plus weight="bold" />}>New project</Button>,
    code: `<Button startIcon={<Plus weight="bold" />}>New project</Button>`,
  },
  {
    label: "Delete",
    node: (
      <Button color="destructive" startIcon={<Trash weight="fill" />}>
        Delete
      </Button>
    ),
    code: `<Button color="destructive" startIcon={<Trash weight="fill" />}>\n  Delete\n</Button>`,
  },
  {
    label: "Continue",
    node: (
      <Button variant="soft" endIcon={<ArrowRight weight="bold" />}>
        Continue
      </Button>
    ),
    code: `<Button variant="soft" endIcon={<ArrowRight weight="bold" />}>\n  Continue\n</Button>`,
  },
  {
    label: "Favourite",
    node: (
      <Button variant="outline" color="neutral" startIcon={<Heart />}>
        Favourite
      </Button>
    ),
    code: `<Button variant="outline" color="neutral" startIcon={<Heart />}>\n  Favourite\n</Button>`,
  },
];

const iconOnlyCards: Atom[] = [
  ...SIZES.map((size) => ({
    label: size,
    node: (
      <Button size={size} iconOnly aria-label="Add item">
        <Plus weight="bold" />
      </Button>
    ),
    code: `<Button size="${size}" iconOnly aria-label="Add item">\n  <Plus weight="bold" />\n</Button>`,
  })),
  {
    label: "destructive",
    node: (
      <Button iconOnly color="destructive" aria-label="Delete item">
        <Trash weight="fill" />
      </Button>
    ),
    code: `<Button iconOnly color="destructive" aria-label="Delete item">\n  <Trash weight="fill" />\n</Button>`,
  },
  {
    label: "like",
    node: (
      <Button iconOnly variant="soft" aria-label="Like">
        <Heart weight="fill" />
      </Button>
    ),
    code: `<Button iconOnly variant="soft" aria-label="Like">\n  <Heart weight="fill" />\n</Button>`,
  },
];

/** Button that shows a spinner while an async action runs. */
function AsyncButton() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 1800);
      }}
    >
      Save changes
    </Button>
  );
}

const ASYNC_CODE = `function AsyncButton() {
  const [loading, setLoading] = useState(false);
  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        window.setTimeout(() => setLoading(false), 1800);
      }}
    >
      Save changes
    </Button>
  );
}`;

const stateCards: Atom[] = [
  {
    label: "async",
    node: <AsyncButton />,
    code: ASYNC_CODE,
  },
  {
    label: "loading",
    node: (
      <Button loading variant="soft">
        Loading
      </Button>
    ),
    code: `<Button loading variant="soft">\n  Loading\n</Button>`,
  },
  {
    label: "disabled",
    node: <Button disabled>Disabled</Button>,
    code: `<Button disabled>Disabled</Button>`,
  },
  {
    label: "disabled outline",
    node: (
      <Button disabled variant="outline" color="neutral">
        Disabled
      </Button>
    ),
    code: `<Button disabled variant="outline" color="neutral">\n  Disabled\n</Button>`,
  },
  {
    label: "full width",
    node: <Button fullWidth>Full width action</Button>,
    code: `<Button fullWidth>Full width action</Button>`,
  },
];

const socialCards: Atom[] = [
  {
    label: "Apple",
    node: (
      <Button size="lg" color="neutral" startIcon={<AppleIcon />}>
        Sign in with Apple
      </Button>
    ),
    code: `<Button size="lg" color="neutral" startIcon={<AppleIcon />}>\n  Sign in with Apple\n</Button>`,
  },
  {
    label: "Google",
    node: (
      <Button size="lg" color="neutral" startIcon={<GoogleIcon />}>
        Sign in with Google
      </Button>
    ),
    code: `<Button size="lg" color="neutral" startIcon={<GoogleIcon />}>\n  Sign in with Google\n</Button>`,
  },
  {
    label: "GitHub",
    node: (
      <Button size="lg" color="neutral" startIcon={<GitHubIcon />}>
        Sign in with GitHub
      </Button>
    ),
    code: `<Button size="lg" color="neutral" startIcon={<GitHubIcon />}>\n  Sign in with GitHub\n</Button>`,
  },
];

const ASCHILD_CODE = `<Button asChild variant="link">\n  <a href="#button">Back to top</a>\n</Button>`;

export function ButtonShowcase() {
  return (
    <ComponentPage
      id="button"
      title="Button"
      description="A clickable action with multiple variants, colors, sizes and states. Composable via asChild, accessible by default, and driven entirely by design tokens."
    >
      <Subsection
        title="Variants × colors"
        description="Five visual variants combine with three semantic colors. Solid for primary actions, soft and outline for secondary ones, ghost and link for low-emphasis controls."
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
        description="Three sizes scale height, padding, text and icons together — from compact toolbars to prominent calls to action."
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
        title="With icons"
        description="Add leading or trailing icons for extra context. Icons inherit the label's size and color automatically."
      >
        <DemoGrid cols={3}>
          {iconCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Icon only"
        description="Square buttons for toolbars and compact UIs. Always pass an aria-label so the action stays accessible."
      >
        <DemoGrid cols={3}>
          {iconOnlyCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="States"
        description="Loading swaps the leading icon for a spinner and blocks interaction. Disabled dims the control and removes pointer events. Full width fills its container."
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
        title="Social sign-in"
        description="Neutral buttons paired with brand marks compose common authentication actions — no bespoke component required."
      >
        <DemoGrid cols={2}>
          {socialCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="As child"
        description="Render the button's styling onto any element with asChild — here a real anchor — to keep semantics correct without duplicating styles."
      >
        <Demo label="Back to top" code={ASCHILD_CODE}>
          <Button asChild variant="link">
            <a href="#button">Back to top</a>
          </Button>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
