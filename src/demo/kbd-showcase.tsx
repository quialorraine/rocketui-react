import { type ReactNode } from "react";
import { Kbd } from "@/components/ui/kbd";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const shortcutCards: Atom[] = [
  {
    label: "command",
    node: <Kbd keys="command">K</Kbd>,
    code: `<Kbd keys="command">K</Kbd>`,
  },
  {
    label: "shift",
    node: <Kbd keys="shift">P</Kbd>,
    code: `<Kbd keys="shift">P</Kbd>`,
  },
  {
    label: "ctrl",
    node: <Kbd keys="ctrl">C</Kbd>,
    code: `<Kbd keys="ctrl">C</Kbd>`,
  },
  {
    label: "option",
    node: <Kbd keys="option">D</Kbd>,
    code: `<Kbd keys="option">D</Kbd>`,
  },
];

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: (
    <Kbd size={size} keys="command">
      K
    </Kbd>
  ),
  code: `<Kbd size="${size}" keys="command">K</Kbd>`,
}));

export function KbdShowcase() {
  return (
    <ComponentPage
      id="kbd"
      title="Kbd"
      description="Display keyboard shortcuts and key combinations. Named keys render as platform glyphs (⌘, ⇧, ⌃, ⌥, arrows) while the literal key is passed as children — perfect for command palettes, tooltips and help text."
    >
      <Subsection
        title="Shortcuts"
        description="Combine a named modifier with a literal key. The modifier is rendered as a glyph and announced by screen readers."
      >
        <DemoGrid>
          {shortcutCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Combinations"
        description="Pass an array of keys to chain several modifiers before the final key."
      >
        <Demo
          align="start"
          code={`<Kbd keys={["command", "shift"]}>P</Kbd>\n<Kbd keys={["command", "option"]}>Delete</Kbd>\n<Kbd keys={["ctrl", "shift"]}>Tab</Kbd>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <Kbd keys={["command", "shift"]}>P</Kbd>
            <Kbd keys={["command", "option"]}>Delete</Kbd>
            <Kbd keys={["ctrl", "shift"]}>Tab</Kbd>
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Arrow keys"
        description="Standalone glyph keys need no children — useful for navigation hints."
      >
        <Demo
          align="start"
          code={`<Kbd keys="up" />\n<Kbd keys="down" />\n<Kbd keys="left" />\n<Kbd keys="right" />`}
        >
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Arrow Keys:</span>
            <Kbd keys="up" />
            <Kbd keys="down" />
            <Kbd keys="left" />
            <Kbd keys="right" />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Height, padding and text scale together across sm, md and lg."
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
        title="Inline"
        description="Kbd is inline and vertically aligned, so it sits naturally inside sentences and help text."
      >
        <Demo align="start" code={INLINE_CODE}>
          <div className="flex max-w-md flex-col gap-2 text-sm text-muted-foreground">
            <p>
              Press <Kbd size="sm" keys="command">K</Kbd> to open the command
              palette.
            </p>
            <p>
              Navigate with <Kbd size="sm" keys="up" /> <Kbd size="sm" keys="down" />{" "}
              and hit <Kbd size="sm" keys="enter" /> to select.
            </p>
            <p>
              Press <Kbd size="sm" keys="escape" /> to close the dialog.
            </p>
          </div>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}

const INLINE_CODE = `<p>
  Press <Kbd size="sm" keys="command">K</Kbd> to open the command palette.
</p>
<p>
  Navigate with <Kbd size="sm" keys="up" /> <Kbd size="sm" keys="down" /> and
  hit <Kbd size="sm" keys="enter" /> to select.
</p>
<p>
  Press <Kbd size="sm" keys="escape" /> to close the dialog.
</p>`;
