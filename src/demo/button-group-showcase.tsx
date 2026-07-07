import type { ReactNode } from "react";
import {
  CaretDown,
  CaretLeft,
  CaretRight,
  TextB,
  TextItalic,
  TextT,
  TextUnderline,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const segmentedCards: Atom[] = [
  {
    label: "Actions",
    node: (
      <ButtonGroup color="neutral">
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup color="neutral">\n  <Button>Button</Button>\n  <Button>Button</Button>\n  <Button>Button</Button>\n</ButtonGroup>`,
  },
  {
    label: "Pagination",
    node: (
      <ButtonGroup color="neutral">
        <Button startIcon={<CaretLeft />}>Previous</Button>
        <Button endIcon={<CaretRight />}>Next</Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup color="neutral">\n  <Button startIcon={<CaretLeft />}>Previous</Button>\n  <Button endIcon={<CaretRight />}>Next</Button>\n</ButtonGroup>`,
  },
];

const splitCards: Atom[] = [
  {
    label: "Menu trigger",
    node: (
      <ButtonGroup color="neutral">
        <Button>Button</Button>
        <Button iconOnly aria-label="More options">
          <CaretDown />
        </Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup color="neutral">\n  <Button>Button</Button>\n  <Button iconOnly aria-label="More options">\n    <CaretDown />\n  </Button>\n</ButtonGroup>`,
  },
  {
    label: "With label badge",
    node: (
      <ButtonGroup color="neutral">
        <Button>
          Button
          <Badge color="primary" size="sm">
            New
          </Badge>
        </Button>
        <Button iconOnly aria-label="More options">
          <CaretDown />
        </Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup color="neutral">\n  <Button>\n    Button\n    <Badge color="primary" size="sm">New</Badge>\n  </Button>\n  <Button iconOnly aria-label="More options">\n    <CaretDown />\n  </Button>\n</ButtonGroup>`,
  },
  {
    label: "With count badge",
    node: (
      <ButtonGroup color="neutral">
        <Button>
          Button
          <Badge color="destructive" size="sm">
            5
          </Badge>
        </Button>
        <Button iconOnly aria-label="More options">
          <CaretDown />
        </Button>
      </ButtonGroup>
    ),
    code: `<ButtonGroup color="neutral">\n  <Button>\n    Button\n    <Badge color="destructive" size="sm">5</Badge>\n  </Button>\n  <Button iconOnly aria-label="More options">\n    <CaretDown />\n  </Button>\n</ButtonGroup>`,
  },
];

const ICON_TOOLBAR_CODE = `<ButtonGroup color="neutral" size="sm">\n  <Button iconOnly aria-label="Bold">\n    <TextB weight="bold" />\n  </Button>\n  <Button iconOnly aria-label="Italic">\n    <TextItalic />\n  </Button>\n  <Button iconOnly aria-label="Underline">\n    <TextUnderline />\n  </Button>\n  <Button iconOnly aria-label="Heading">\n    <TextT />\n  </Button>\n</ButtonGroup>`;

const ORIENTATION_CODE = `<ButtonGroup orientation="vertical" color="neutral">\n  <Button>Profile</Button>\n  <Button>Settings</Button>\n  <Button>Sign out</Button>\n</ButtonGroup>`;

export function ButtonGroupShowcase() {
  return (
    <ComponentPage
      id="button-group"
      title="ButtonGroup"
      description="Group related buttons into a single segmented control — shared outer radius, hairline dividers, and one place to set variant, color and size."
    >
      <Subsection
        title="Segmented"
        description="Adjacent buttons merge into one control. Configure the whole group once; each segment can still override its own props."
      >
        <DemoGrid cols={2}>
          {segmentedCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Split button"
        description="Pair a primary action with an adjacent trigger for secondary options — a menu, or overflow actions."
      >
        <DemoGrid cols={2}>
          {splitCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Icon toolbar"
        description="Compose icon-only buttons into a compact toolbar, e.g. rich-text formatting controls."
      >
        <Demo label="Formatting" code={ICON_TOOLBAR_CODE}>
          <ButtonGroup color="neutral" size="sm">
            <Button iconOnly aria-label="Bold">
              <TextB weight="bold" />
            </Button>
            <Button iconOnly aria-label="Italic">
              <TextItalic />
            </Button>
            <Button iconOnly aria-label="Underline">
              <TextUnderline />
            </Button>
            <Button iconOnly aria-label="Heading">
              <TextT />
            </Button>
          </ButtonGroup>
        </Demo>
      </Subsection>

      <Subsection
        title="Orientation"
        description="Stack the group vertically for sidebars and menus."
      >
        <Demo label="Vertical" code={ORIENTATION_CODE} align="start">
          <ButtonGroup orientation="vertical" color="neutral">
            <Button>Profile</Button>
            <Button>Settings</Button>
            <Button>Sign out</Button>
          </ButtonGroup>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
