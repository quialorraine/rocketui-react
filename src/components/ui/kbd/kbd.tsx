import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Key map                                    */
/* -------------------------------------------------------------------------- */

/** Named keys that render as a glyph instead of literal text. */
export type KbdKey =
  | "command"
  | "shift"
  | "ctrl"
  | "option"
  | "alt"
  | "enter"
  | "return"
  | "escape"
  | "backspace"
  | "delete"
  | "tab"
  | "capslock"
  | "space"
  | "up"
  | "down"
  | "left"
  | "right"
  | "pageup"
  | "pagedown"
  | "home"
  | "end"
  | "win";

/** Glyph + spoken label for each named key. */
const KEY_META: Record<KbdKey, { glyph: string; label: string }> = {
  command: { glyph: "⌘", label: "Command" },
  shift: { glyph: "⇧", label: "Shift" },
  ctrl: { glyph: "⌃", label: "Control" },
  option: { glyph: "⌥", label: "Option" },
  alt: { glyph: "⌥", label: "Alt" },
  enter: { glyph: "↵", label: "Enter" },
  return: { glyph: "↵", label: "Return" },
  escape: { glyph: "esc", label: "Escape" },
  backspace: { glyph: "⌫", label: "Backspace" },
  delete: { glyph: "⌦", label: "Delete" },
  tab: { glyph: "⇥", label: "Tab" },
  capslock: { glyph: "⇪", label: "Caps Lock" },
  space: { glyph: "␣", label: "Space" },
  up: { glyph: "↑", label: "Arrow Up" },
  down: { glyph: "↓", label: "Arrow Down" },
  left: { glyph: "←", label: "Arrow Left" },
  right: { glyph: "→", label: "Arrow Right" },
  pageup: { glyph: "⇞", label: "Page Up" },
  pagedown: { glyph: "⇟", label: "Page Down" },
  home: { glyph: "↖", label: "Home" },
  end: { glyph: "↘", label: "End" },
  win: { glyph: "⊞", label: "Windows" },
};

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const kbdVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center justify-center gap-0.5 rounded-md",
    "bg-secondary font-medium text-secondary-foreground align-middle leading-none tracking-tight",
  ],
  {
    variants: {
      size: {
        sm: "h-6 min-w-6 px-1.5 text-xs",
        md: "h-7 min-w-7 px-2 text-sm",
        lg: "h-8 min-w-8 px-2.5 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/* -------------------------------------------------------------------------- */
/*                                 Component                                   */
/* -------------------------------------------------------------------------- */

export interface KbdProps
  extends Omit<ComponentPropsWithoutRef<"kbd">, "children">,
    VariantProps<typeof kbdVariants> {
  /** Named modifier/symbol keys rendered as glyphs before the label. */
  keys?: KbdKey | KbdKey[];
  /** Literal key label, e.g. "K" or "Esc". */
  children?: ReactNode;
}

/**
 * Displays a keyboard key or shortcut, e.g. `<Kbd keys="command">K</Kbd>` → ⌘K.
 * Pass an array for combinations (`keys={["command", "shift"]}`) and use the
 * `children` for the final literal key.
 */
export function Kbd({ keys, size, className, children, ...props }: KbdProps) {
  const list = keys ? (Array.isArray(keys) ? keys : [keys]) : [];

  return (
    <kbd className={cn(kbdVariants({ size }), className)} {...props}>
      {list.map((key, index) => (
        <abbr
          key={`${key}-${index}`}
          title={KEY_META[key]?.label ?? key}
          className="no-underline"
        >
          {KEY_META[key]?.glyph ?? key}
        </abbr>
      ))}
      {children}
    </kbd>
  );
}
Kbd.displayName = "Kbd";

export { kbdVariants };
