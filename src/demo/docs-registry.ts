import type { ApiGroup } from "./components/doc-sections";

/* -------------------------------------------------------------------------- */
/*                                Global config                                */
/* -------------------------------------------------------------------------- */

export const PKG = "@rocketui-react/core";
export const REPO_URL = "https://github.com/quialorraine/rocketui-react";
export const FIGMA_FILE_URL =
  "https://www.figma.com/design/fSHaOsr5mETQ0JnXqiw0AZ/Untitled--Copy-";
export const PEER_DEPENDENCIES =
  "class-variance-authority clsx tailwind-merge @phosphor-icons/react";

export interface ComponentDoc {
  /** Named exports imported from the package. */
  imports: string[];
  /** Path under `src/components/ui/` used to build the "View source" link. */
  sourceFile: string;
  /** Figma node URL for this component. */
  figmaNodeId?: string;
  /** Basic usage snippet. */
  usage: string;
  /** API tables, one group per exported part. */
  api: ApiGroup[];
}

/* -------------------------------------------------------------------------- */
/*                           Component selection layer                         */
/* -------------------------------------------------------------------------- */

/**
 * One-line purpose plus intent keywords for every component. This is the layer
 * a generating agent should read first: it maps a plain-language need to the
 * right component so common patterns (a search box, a status label) resolve to
 * a dedicated component instead of being rebuilt from primitives.
 */
export interface ComponentGuide {
  /** One sentence describing what the component is for. */
  summary: string;
  /** Plain-language terms that should route to this component. */
  keywords: string[];
}

export const GUIDE: Record<string, ComponentGuide> = {
  button: {
    summary: "Trigger an action or submit a form. Supports variants, sizes, loading, and icon-only.",
    keywords: ["action", "submit", "cta", "click", "confirm"],
  },
  "button-group": {
    summary: "Join related buttons into a single attached control, such as a segmented switch or toolbar.",
    keywords: ["segmented", "toolbar", "grouped actions", "switcher"],
  },
  calendar: {
    summary: "Pick a single day or a date range from a month grid.",
    keywords: ["date", "datepicker", "day", "range", "schedule"],
  },
  card: {
    summary: "Container surface that groups related content with padding, border, and optional media.",
    keywords: ["container", "panel", "box", "tile"],
  },
  carousel: {
    summary: "Center-focused slider with peeking neighbours, arrows, and dot indicators.",
    keywords: ["carousel", "slider", "gallery", "slideshow", "swipe", "coverflow"],
  },
  checkbox: {
    summary: "Toggle one boolean option, with support for an indeterminate state.",
    keywords: ["check", "boolean", "multi select", "agree", "opt in"],
  },
  chip: {
    summary: "Compact label for a status, tag, or removable filter. Full semantic color range.",
    keywords: ["tag", "status", "label", "pill", "filter", "badge"],
  },
  input: {
    summary: "Single-line text field with label, description, and error states.",
    keywords: ["text", "field", "form", "email", "password", "textbox"],
  },
  "input-otp": {
    summary: "Segmented input for one-time codes and PINs.",
    keywords: ["otp", "code", "pin", "verification", "2fa"],
  },
  "number-field": {
    summary: "Numeric input with stepper buttons and locale formatting.",
    keywords: ["number", "quantity", "stepper", "amount", "price", "currency"],
  },
  pagination: {
    summary: "Move between pages of a data set.",
    keywords: ["pages", "pager", "next", "previous"],
  },
  popover: {
    summary: "Floating panel anchored to a trigger for secondary content.",
    keywords: ["floating", "overlay", "anchored panel", "flyout"],
  },
  "radio-group": {
    summary: "Choose exactly one option from a small, visible set.",
    keywords: ["radio", "single choice", "options", "select one"],
  },
  "scroll-shadow": {
    summary: "Fade the edges of a scrollable area to signal that more content is off-screen.",
    keywords: ["scroll", "overflow", "fade", "edge shadow"],
  },
  "search-field": {
    summary: "Text input built for search and filtering, with a search icon, a clear button, and clear-on-Escape.",
    keywords: ["search", "filter", "find", "query", "lookup"],
  },
  select: {
    summary: "Dropdown for picking one option from a list.",
    keywords: ["dropdown", "select", "options", "picker", "combobox"],
  },
  skeleton: {
    summary: "Placeholder blocks shown while content is loading.",
    keywords: ["loading", "placeholder", "shimmer", "loader"],
  },
  slider: {
    summary: "Pick a numeric value or range by dragging along a track.",
    keywords: ["range", "slider", "value", "drag", "min max"],
  },
  surface: {
    summary: "Low-level styled container primitive with configurable elevation.",
    keywords: ["container", "panel", "elevation", "surface", "sheet"],
  },
  table: {
    summary: "Show structured data in rows and columns, with selection and sorting.",
    keywords: ["table", "grid", "rows", "columns", "data", "list"],
  },
  tabs: {
    summary: "Switch between related views within the same space.",
    keywords: ["tabs", "sections", "views", "segmented navigation"],
  },
  toggle: {
    summary: "On or off switch for a single setting.",
    keywords: ["switch", "toggle", "on off", "enable", "boolean setting"],
  },
  kbd: {
    summary: "Render a keyboard key or shortcut inline.",
    keywords: ["keyboard", "shortcut", "hotkey", "key"],
  },
  meter: {
    summary: "Show a value inside a known range as a bar, such as usage or capacity.",
    keywords: ["meter", "gauge", "usage", "capacity", "level", "progress"],
  },
  "dropdown-menu": {
    summary: "Menu of actions opened from a trigger button.",
    keywords: ["menu", "actions", "context menu", "overflow", "more options"],
  },
  avatar: {
    summary: "Show a user image, initials, or a fallback icon.",
    keywords: ["avatar", "user", "profile", "photo", "initials"],
  },
  badge: {
    summary: "Small count or status indicator, often anchored to an icon or avatar.",
    keywords: ["badge", "count", "notification", "dot", "indicator"],
  },
  breadcrumb: {
    summary: "Show the path to the current page in a hierarchy.",
    keywords: ["breadcrumb", "path", "navigation", "hierarchy"],
  },
  accordion: {
    summary: "Expandable sections that reveal and hide content, such as an FAQ.",
    keywords: ["accordion", "collapse", "expand", "faq", "disclosure"],
  },
  alert: {
    summary: "Inline message that communicates status or important information.",
    keywords: ["alert", "notice", "message", "banner", "warning"],
  },
  announcement: {
    summary: "Highlight a new feature or update as a compact, clickable pill.",
    keywords: ["announcement", "new", "callout", "promo", "whats new"],
  },
  "area-chart": {
    summary: "Plot a trend over time as a filled area chart.",
    keywords: ["chart", "area", "trend", "time series", "analytics"],
  },
  "bar-chart": {
    summary: "Compare values across categories as bars.",
    keywords: ["chart", "bar", "compare", "categories", "analytics"],
  },
  attachment: {
    summary: "Show an uploaded file with its name, size, and a remove control.",
    keywords: ["file", "upload", "attachment", "document"],
  },
  autocomplete: {
    summary: "Text input with a filtered list of suggestions.",
    keywords: ["autocomplete", "combobox", "suggestions", "typeahead", "search select"],
  },
  dialog: {
    summary: "Modal overlay for a focused task or a confirmation.",
    keywords: ["modal", "dialog", "popup", "confirm", "overlay"],
  },
  drawer: {
    summary: "Panel that slides in from a screen edge for navigation, filters, details, or settings.",
    keywords: ["drawer", "sheet", "side panel", "slide over", "off-canvas", "flyout"],
  },
  "context-menu": {
    summary: "Menu that opens at the pointer on right-click, reusing the dropdown menu items.",
    keywords: ["context menu", "right click", "rmb", "menu", "actions"],
  },
  sidebar: {
    summary: "Vertical app navigation with a brand header, active items, collapsible groups, and a pinned footer.",
    keywords: ["sidebar", "navigation", "nav", "menu", "app shell", "side nav"],
  },
  "stat-card": {
    summary: "Compact KPI tile with a label, headline value, trend chip, and caption.",
    keywords: ["stat", "kpi", "metric", "dashboard", "summary", "trend"],
  },
};

/**
 * Curated task-to-component map. The first thing an agent should scan when it
 * knows the outcome it wants but not the component name. `avoid` records the
 * common wrong choice so it is not repeated.
 */
export interface PickerRow {
  /** The outcome the author wants, in plain language. */
  need: string;
  /** The component (and key prop) to reach for. */
  use: string;
  /** The common mistake to avoid, if any. */
  avoid?: string;
}

export const PICKER: PickerRow[] = [
  { need: "Search or filter box", use: "SearchField", avoid: "rebuilding it from Button or Input" },
  { need: "Single-line text entry", use: "Input" },
  { need: "Multi-line text entry", use: "Textarea" },
  { need: "Number, quantity, or price", use: "NumberField", avoid: "a plain Input for numeric values" },
  { need: "One-time code or PIN", use: "InputOTP" },
  { need: "Pick one option from a list", use: "Select", avoid: "a native select element" },
  { need: "Pick one option with typeahead", use: "Autocomplete" },
  { need: "Pick one option shown inline", use: "RadioGroup" },
  { need: "Turn a single setting on or off", use: "Toggle", avoid: "a Checkbox for on and off settings" },
  { need: "Select several options", use: "Checkbox" },
  { need: "Status label (Paid, Pending, Refunded)", use: "Chip with color success, warning, or destructive", avoid: "a neutral gray Chip for every status" },
  { need: "Tag or removable filter", use: "Chip with onRemove" },
  { need: "Count or notification indicator", use: "Badge" },
  { need: "User picture or initials", use: "Avatar" },
  { need: "Structured data in rows and columns", use: "Table" },
  { need: "Menu of actions from a button", use: "DropdownMenu" },
  { need: "Menu of actions on right-click", use: "ContextMenu" },
  { need: "App navigation down the side of a layout", use: "Sidebar", avoid: "rebuilding nav rows from Button" },
  { need: "A single KPI or metric tile", use: "StatCard", avoid: "hand-building a Card with a Chip" },
  { need: "Cycle through images or cards one at a time", use: "Carousel" },
  { need: "Floating panel next to a trigger", use: "Popover" },
  { need: "Focused task or confirmation", use: "Dialog" },
  { need: "Slide-in panel from a screen edge", use: "Drawer", avoid: "a full Dialog for side navigation or filters" },
  { need: "Switch between related views", use: "Tabs" },
  { need: "Expandable sections", use: "Accordion" },
  { need: "Inline status message", use: "Alert" },
  { need: "Loading placeholder", use: "Skeleton" },
  { need: "Date or date range", use: "Calendar" },
  { need: "Value within a range (usage, capacity)", use: "Meter" },
  { need: "Trend over time", use: "AreaChart" },
  { need: "Compare categories", use: "BarChart" },
  { need: "Page navigation", use: "Pagination" },
  { need: "Path within a hierarchy", use: "Breadcrumb" },
];

export function importCodeFor(doc: ComponentDoc): string {
  return `import { ${doc.imports.join(", ")} } from "${PKG}";`;
}

export function sourceUrlFor(doc: ComponentDoc): string {
  return `${REPO_URL}/blob/main/src/components/ui/${doc.sourceFile}`;
}

export function figmaUrlFor(doc: ComponentDoc): string {
  return doc.figmaNodeId
    ? `${FIGMA_FILE_URL}?node-id=${doc.figmaNodeId}`
    : FIGMA_FILE_URL;
}

/* -------------------------------------------------------------------------- */
/*                              Shared prop rows                               */
/* -------------------------------------------------------------------------- */

const className = {
  name: "className",
  type: "string",
  description: "Extra classes merged onto the root element.",
};

/* -------------------------------------------------------------------------- */
/*                                   Registry                                  */
/* -------------------------------------------------------------------------- */

export const DOCS: Record<string, ComponentDoc> = {
  button: {
    imports: ["Button"],
    sourceFile: "button/button.tsx",
    usage: `import { Button } from "${PKG}";

export function Example() {
  return <Button>Get started</Button>;
}`,
    api: [
      {
        title: "Button",
        props: [
          { name: "variant", type: '"solid" | "soft" | "outline" | "ghost" | "link"', default: '"solid"', description: "Visual style of the button." },
          { name: "color", type: '"primary" | "neutral" | "destructive"', default: '"primary"', description: "Semantic color." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control height and padding." },
          { name: "iconOnly", type: "boolean", default: "false", description: "Render a square icon-only button." },
          { name: "fullWidth", type: "boolean", default: "false", description: "Stretch to the container width." },
          { name: "loading", type: "boolean", default: "false", description: "Show a spinner and block interaction." },
          { name: "startIcon", type: "ReactNode", description: "Icon before the label (hidden while loading)." },
          { name: "endIcon", type: "ReactNode", description: "Icon after the label." },
          { name: "asChild", type: "boolean", default: "false", description: "Render styles onto the child element." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the button." },
          className,
        ],
      },
    ],
  },

  "button-group": {
    imports: ["ButtonGroup", "Button"],
    sourceFile: "button-group/button-group.tsx",
    usage: `import { ButtonGroup, Button } from "${PKG}";

export function Example() {
  return (
    <ButtonGroup>
      <Button>Previous</Button>
      <Button>Next</Button>
    </ButtonGroup>
  );
}`,
    api: [
      {
        title: "ButtonGroup",
        description: "Configure the whole group once; each child button can override its own props.",
        props: [
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Stacking direction." },
          { name: "variant", type: "ButtonProps['variant']", description: "Default variant for child buttons." },
          { name: "color", type: "ButtonProps['color']", description: "Default color for child buttons." },
          { name: "size", type: "ButtonProps['size']", description: "Default size for child buttons." },
          className,
        ],
      },
    ],
  },

  calendar: {
    imports: ["Calendar"],
    sourceFile: "calendar/calendar.tsx",
    usage: `import { Calendar } from "${PKG}";
import { useState } from "react";

export function Example() {
  const [date, setDate] = useState<Date | null>(null);
  return <Calendar value={date} onChange={setDate} />;
}`,
    api: [
      {
        title: "Calendar",
        props: [
          { name: "value", type: "Date | null", description: "Selected date (controlled)." },
          { name: "defaultValue", type: "Date | null", description: "Selected date (uncontrolled)." },
          { name: "onChange", type: "(date: Date) => void", description: "Fired when a day is picked." },
          { name: "month", type: "Date", description: "Visible month (controlled)." },
          { name: "defaultMonth", type: "Date", description: "Initial visible month (uncontrolled)." },
          { name: "onMonthChange", type: "(month: Date) => void", description: "Fired when the visible month changes." },
          { name: "minDate", type: "Date", description: "Earliest selectable day (inclusive)." },
          { name: "maxDate", type: "Date", description: "Latest selectable day (inclusive)." },
          { name: "isDateDisabled", type: "(date: Date) => boolean", description: "Disable arbitrary days." },
          { name: "weekStartsOn", type: "0 | 1 | 2 | 3 | 4 | 5 | 6", default: "0", description: "First column of the week (0 = Sunday)." },
          { name: "showOutsideDays", type: "boolean", description: "Render days from adjacent months." },
          { name: "locale", type: "string", description: "Locale for month and weekday names." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Calendar size." },
          className,
        ],
      },
    ],
  },

  card: {
    imports: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter", "CardMedia"],
    sourceFile: "card/card.tsx",
    usage: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "${PKG}";

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Supporting copy.</CardDescription>
      </CardHeader>
      <CardContent>Body content</CardContent>
    </Card>
  );
}`,
    api: [
      {
        title: "Card",
        props: [
          { name: "variant", type: '"elevated" | "outline" | "ghost"', default: '"elevated"', description: "Surface style." },
          { name: "padding", type: '"none" | "sm" | "md" | "lg"', default: '"md"', description: "Inner padding." },
          { name: "interactive", type: "boolean", default: "false", description: "Add hover/focus affordances." },
          { name: "asChild", type: "boolean", default: "false", description: "Render styles onto the child element." },
          className,
        ],
      },
      {
        title: "CardHeader / CardTitle / CardDescription / CardContent / CardFooter / CardMedia",
        description: "Structural slots. Each accepts native attributes and className.",
        props: [className],
      },
    ],
  },

  carousel: {
    imports: ["Carousel", "CarouselItem"],
    sourceFile: "carousel/carousel.tsx",
    usage: `import { Carousel, CarouselItem } from "${PKG}";

export function Example() {
  return (
    <Carousel slideWidth={300} defaultIndex={1}>
      <CarouselItem>
        <img src="/photo-1.jpg" alt="" className="size-full object-cover" />
      </CarouselItem>
      <CarouselItem>
        <img src="/photo-2.jpg" alt="" className="size-full object-cover" />
      </CarouselItem>
      <CarouselItem>
        <img src="/photo-3.jpg" alt="" className="size-full object-cover" />
      </CarouselItem>
    </Carousel>
  );
}`,
    api: [
      {
        title: "Carousel",
        props: [
          { name: "index", type: "number", description: "Active slide index (controlled)." },
          { name: "defaultIndex", type: "number", default: "0", description: "Initial active slide index (uncontrolled)." },
          { name: "onIndexChange", type: "(index: number) => void", description: "Fired with the new active index." },
          { name: "slideWidth", type: "number", default: "311", description: "Width of the active (square) slide in pixels; shrinks to fit narrow viewports." },
          { name: "gap", type: "number", default: "24", description: "Gap between slides in pixels." },
          { name: "peekScale", type: "number", default: "0.7", description: "Scale applied to the non-active side slides." },
          { name: "fadeColor", type: "string", default: '"var(--color-background)"', description: "Colour the side slides fade into at their outer edge; set it to match the surface behind the carousel." },
          { name: "loop", type: "boolean", default: "false", description: "Wrap from the last slide back to the first." },
          { name: "showArrows", type: "boolean", default: "true", description: "Show the previous/next arrow buttons." },
          { name: "showDots", type: "boolean", default: "true", description: "Show the dot indicators." },
          { name: "autoPlay", type: "boolean", default: "false", description: "Advance automatically; pauses on hover and while dragging." },
          { name: "autoPlayInterval", type: "number", default: "4000", description: "Autoplay interval in milliseconds." },
          className,
        ],
      },
      {
        title: "CarouselItem",
        description: "A single slide. Fills its square slot — give it an image or card as the child.",
        props: [className],
      },
    ],
  },

  checkbox: {
    imports: ["Checkbox"],
    sourceFile: "checkbox/checkbox.tsx",
    usage: `import { Checkbox } from "${PKG}";

export function Example() {
  return <Checkbox label="Accept terms" />;
}`,
    api: [
      {
        title: "Checkbox",
        props: [
          { name: "checked", type: "boolean", description: "Checked state (controlled)." },
          { name: "defaultChecked", type: "boolean", default: "false", description: "Initial checked state (uncontrolled)." },
          { name: "indeterminate", type: "boolean", default: "false", description: "Mixed state, shown as a horizontal bar." },
          { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Fired with the next checked value." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Box size." },
          { name: "label", type: "ReactNode", description: "Inline label next to the box." },
          { name: "description", type: "ReactNode", description: "Helper text under the label." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the checkbox." },
          className,
        ],
      },
    ],
  },

  chip: {
    imports: ["Chip"],
    sourceFile: "chip/chip.tsx",
    usage: `import { Chip } from "${PKG}";

export function Example() {
  return <Chip color="primary">Label</Chip>;
}`,
    api: [
      {
        title: "Chip",
        props: [
          { name: "variant", type: '"solid" | "soft" | "outline"', default: '"solid"', description: "Visual style." },
          { name: "color", type: '"neutral" | "primary" | "success" | "warning" | "destructive" | "info"', default: '"neutral"', description: "Semantic color." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Chip size." },
          { name: "interactive", type: "boolean", default: "false", description: "Add hover/press affordances." },
          { name: "startIcon", type: "ReactNode", description: "Icon before the label." },
          { name: "onRemove", type: "() => void", description: "Show a remove button and fire on press." },
          { name: "removeLabel", type: "string", default: '"Remove"', description: "Accessible label for the remove button." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the chip." },
          className,
        ],
      },
    ],
  },

  input: {
    imports: ["Input", "Textarea"],
    sourceFile: "input/input.tsx",
    usage: `import { Input } from "${PKG}";

export function Example() {
  return <Input label="Email" placeholder="you@example.com" />;
}`,
    api: [
      {
        title: "Input",
        props: [
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control height." },
          { name: "label", type: "ReactNode", description: "Label above the control." },
          { name: "required", type: "boolean", default: "false", description: "Add a required asterisk." },
          { name: "description", type: "ReactNode", description: "Helper text below the control." },
          { name: "error", type: "ReactNode", description: "Error message; sets the error style." },
          { name: "invalid", type: "boolean", default: "false", description: "Force the error style." },
          { name: "success", type: "boolean", default: "false", description: "Apply the success style." },
          { name: "startContent", type: "ReactNode", description: "Content before the input." },
          { name: "endContent", type: "ReactNode", description: "Content after the input." },
          { name: "inputClassName", type: "string", description: "Class applied to the <input> element." },
          className,
        ],
      },
      {
        title: "Textarea",
        description: "Shares the Input field props (label, error, size) on a multi-line control and forwards native <textarea> attributes.",
        props: [className],
      },
    ],
  },

  "input-otp": {
    imports: ["InputOTP"],
    sourceFile: "input-otp/input-otp.tsx",
    usage: `import { InputOTP } from "${PKG}";

export function Example() {
  return <InputOTP length={6} onComplete={(code) => console.log(code)} />;
}`,
    api: [
      {
        title: "InputOTP",
        props: [
          { name: "length", type: "number", default: "6", description: "Number of code cells." },
          { name: "value", type: "string", description: "Controlled value." },
          { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
          { name: "onChange", type: "(value: string) => void", description: "Fired on every change." },
          { name: "onComplete", type: "(value: string) => void", description: "Fired once every cell is filled." },
          { name: "type", type: '"numeric" | "alphanumeric"', default: '"numeric"', description: "Accepted characters." },
          { name: "mask", type: "boolean", default: "false", description: "Render characters as dots." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Cell size." },
          { name: "invalid", type: "boolean", default: "false", description: "Apply the error style." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the field." },
          className,
        ],
      },
    ],
  },

  "number-field": {
    imports: ["NumberField"],
    sourceFile: "number-field/number-field.tsx",
    usage: `import { NumberField } from "${PKG}";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState(1);
  return <NumberField label="Quantity" value={value} onChange={setValue} />;
}`,
    api: [
      {
        title: "NumberField",
        props: [
          { name: "value", type: "number", description: "Controlled value." },
          { name: "defaultValue", type: "number", description: "Uncontrolled initial value." },
          { name: "onChange", type: "(value: number | null) => void", description: "Fired with the committed, clamped value." },
          { name: "min", type: "number", description: "Minimum value." },
          { name: "max", type: "number", description: "Maximum value." },
          { name: "step", type: "number", default: "1", description: "Increment for steppers and arrows." },
          { name: "formatOptions", type: "Intl.NumberFormatOptions", description: "Formatting (currency, percent, units)." },
          { name: "locale", type: "string", description: "Locale for formatting." },
          { name: "startContent", type: "ReactNode", description: "Content before the value." },
          { name: "endContent", type: "ReactNode", description: "Content after the value." },
          { name: "hideSteppers", type: "boolean", default: "false", description: "Hide the +/- buttons." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control height." },
          { name: "label", type: "ReactNode", description: "Label above the control." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the field." },
          className,
        ],
      },
    ],
  },

  pagination: {
    imports: ["Pagination"],
    sourceFile: "pagination/pagination.tsx",
    usage: `import { Pagination } from "${PKG}";
import { useState } from "react";

export function Example() {
  const [page, setPage] = useState(1);
  return <Pagination total={10} page={page} onPageChange={setPage} />;
}`,
    api: [
      {
        title: "Pagination",
        props: [
          { name: "total", type: "number", description: "Total number of pages." },
          { name: "page", type: "number", description: "Active page (controlled)." },
          { name: "defaultPage", type: "number", default: "1", description: "Active page (uncontrolled)." },
          { name: "onPageChange", type: "(page: number) => void", description: "Fired when the page changes." },
          { name: "siblings", type: "number", default: "1", description: "Pages shown around the current page." },
          { name: "boundaries", type: "number", default: "1", description: "Pages shown at the start/end." },
          { name: "showControls", type: "boolean", default: "true", description: "Show Previous/Next buttons." },
          { name: "showPages", type: "boolean", default: "true", description: "Show numbered page links." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control size." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable navigation." },
          className,
        ],
      },
    ],
  },

  popover: {
    imports: ["Popover", "PopoverTrigger", "PopoverContent"],
    sourceFile: "popover/popover.tsx",
    usage: `import { Popover, PopoverTrigger, PopoverContent, Button } from "${PKG}";

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  );
}`,
    api: [
      {
        title: "Popover",
        props: [
          { name: "open", type: "boolean", description: "Open state (controlled)." },
          { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state (uncontrolled)." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Fired when open state changes." },
        ],
      },
      {
        title: "PopoverTrigger",
        props: [{ name: "asChild", type: "boolean", default: "false", description: "Merge props onto the child element." }],
      },
      {
        title: "PopoverContent",
        props: [
          { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "Preferred side." },
          { name: "align", type: '"start" | "center" | "end"', default: '"center"', description: "Alignment along the side." },
          { name: "sideOffset", type: "number", default: "8", description: "Gap between trigger and content." },
          { name: "showArrow", type: "boolean", default: "true", description: "Render the pointing arrow." },
          className,
        ],
      },
    ],
  },

  "radio-group": {
    imports: ["RadioGroup", "Radio", "RadioCard"],
    sourceFile: "radio-group/radio-group.tsx",
    usage: `import { RadioGroup, Radio } from "${PKG}";

export function Example() {
  return (
    <RadioGroup defaultValue="a">
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  );
}`,
    api: [
      {
        title: "RadioGroup",
        props: [
          { name: "value", type: "string", description: "Selected value (controlled)." },
          { name: "defaultValue", type: "string", description: "Selected value (uncontrolled)." },
          { name: "onValueChange", type: "(value: string) => void", description: "Fired with the new value." },
          { name: "name", type: "string", description: "Shared form field name." },
          { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Layout direction." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control size." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable every option." },
          className,
        ],
      },
      {
        title: "Radio / RadioCard",
        props: [
          { name: "value", type: "string", description: "The option's value (required)." },
          { name: "label", type: "ReactNode", description: "Option label." },
          { name: "description", type: "ReactNode", description: "Helper text under the label." },
          { name: "icon", type: "ReactNode", description: "Leading media (RadioCard only)." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable this option." },
        ],
      },
    ],
  },

  "scroll-shadow": {
    imports: ["ScrollShadow"],
    sourceFile: "scroll-shadow/scroll-shadow.tsx",
    usage: `import { ScrollShadow } from "${PKG}";

export function Example() {
  return (
    <ScrollShadow className="max-h-40">
      <p>{longText}</p>
    </ScrollShadow>
  );
}`,
    api: [
      {
        title: "ScrollShadow",
        props: [
          { name: "orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Scroll axis the shadow reacts to." },
          { name: "size", type: "number", default: "40", description: "Length of the fade in pixels." },
          { name: "offset", type: "number", default: "0", description: "Slack before an edge shadow appears." },
          { name: "isEnabled", type: "boolean", default: "true", description: "Toggle the fade effect." },
          { name: "hideScrollBar", type: "boolean", default: "false", description: "Hide the native scrollbar." },
          className,
        ],
      },
    ],
  },

  "search-field": {
    imports: ["SearchField"],
    sourceFile: "search-field/search-field.tsx",
    usage: `import { SearchField } from "${PKG}";
import { useState } from "react";

export function Example() {
  const [query, setQuery] = useState("");
  return <SearchField label="Search" value={query} onValueChange={setQuery} />;
}`,
    api: [
      {
        title: "SearchField",
        description: "Also inherits the Input props (size, label, description, error).",
        props: [
          { name: "value", type: "string", description: "Query (controlled)." },
          { name: "defaultValue", type: "string", description: "Query (uncontrolled)." },
          { name: "onValueChange", type: "(value: string) => void", description: "Fired on every change and on clear." },
          { name: "onClear", type: "() => void", description: "Fired when cleared via the button or Escape." },
          className,
        ],
      },
    ],
  },

  select: {
    imports: ["Select"],
    sourceFile: "select/select.tsx",
    usage: `import { Select } from "${PKG}";

export function Example() {
  return (
    <Select
      label="State"
      placeholder="Select a state"
      options={[
        { value: "ca", label: "California" },
        { value: "ny", label: "New York" },
      ]}
    />
  );
}`,
    api: [
      {
        title: "Select",
        props: [
          { name: "options", type: "SelectOption[]", description: "The list of selectable options." },
          { name: "value", type: "string | null", description: "Selected value (controlled)." },
          { name: "defaultValue", type: "string | null", description: "Selected value (uncontrolled)." },
          { name: "onValueChange", type: "(value: string) => void", description: "Fired with the new value." },
          { name: "placeholder", type: "string", default: '"Select an option"', description: "Empty-state text." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Trigger height." },
          { name: "label", type: "ReactNode", description: "Label above the trigger." },
          { name: "error", type: "ReactNode", description: "Error message; sets the error style." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the select." },
          className,
        ],
      },
      {
        title: "SelectOption",
        props: [
          { name: "value", type: "string", description: "Unique value." },
          { name: "label", type: "string", description: "Display text." },
          { name: "description", type: "string", description: "Secondary line under the label." },
          { name: "group", type: "string", description: "Section heading for consecutive options." },
          { name: "disabled", type: "boolean", description: "Disable this option." },
        ],
      },
    ],
  },

  sidebar: {
    imports: [
      "Sidebar",
      "SidebarHeader",
      "SidebarSection",
      "SidebarItem",
      "SidebarGroup",
      "SidebarSubItem",
      "SidebarSeparator",
      "SidebarFooter",
    ],
    sourceFile: "sidebar/sidebar.tsx",
    usage: `import {
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
  SidebarGroup,
  SidebarSubItem,
  SidebarSeparator,
  SidebarFooter,
} from "${PKG}";
import { Compass, CurrencyCircleDollar, Gear, Package } from "@phosphor-icons/react";

export function Example() {
  return (
    <Sidebar>
      <SidebarHeader>
        <img src="/logo.svg" alt="RocketUI" className="size-9" />
        <span className="text-lg font-semibold">RocketUI</span>
      </SidebarHeader>

      <SidebarSection className="mt-3">
        <SidebarItem icon={<Compass />} active>Dashboard</SidebarItem>
        <SidebarItem icon={<Package />}>Products</SidebarItem>
      </SidebarSection>

      <SidebarSeparator />

      <SidebarGroup icon={<CurrencyCircleDollar />} label="Finances" defaultOpen>
        <SidebarSubItem>Invoices</SidebarSubItem>
        <SidebarSubItem>Transactions</SidebarSubItem>
      </SidebarGroup>

      <SidebarFooter>
        <SidebarItem icon={<Gear />}>Settings</SidebarItem>
      </SidebarFooter>
    </Sidebar>
  );
}`,
    api: [
      {
        title: "Sidebar",
        description: "The shell and selection owner. Renders a <nav>; give items a value and they become active on click. Set a height (e.g. h-screen) to pin the footer.",
        props: [
          { name: "value", type: "string", description: "Value of the selected item (controlled)." },
          { name: "defaultValue", type: "string", description: "Value of the initially selected item (uncontrolled)." },
          { name: "onValueChange", type: "(value: string) => void", description: "Fired with the value of the item that was selected." },
          { name: "className", type: "string", description: "Extra classes merged onto the root element (e.g. width or height)." },
        ],
      },
      {
        title: "SidebarItem",
        description: "A primary navigation row. Renders a <button>, or the child element via asChild.",
        props: [
          { name: "icon", type: "ReactNode", description: "Leading icon element." },
          { name: "value", type: "string", description: "Selection id. Selected on click and matched against the Sidebar value to set the active state." },
          { name: "active", type: "boolean", description: "Force the active state, overriding value-based selection." },
          { name: "trailing", type: "ReactNode", description: "Trailing content, e.g. a badge or count." },
          { name: "asChild", type: "boolean", default: "false", description: "Render styles onto the child (e.g. an <a> or router link)." },
          { name: "onClick", type: "(e) => void", description: "Fired on press, after selection." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the item." },
          className,
        ],
      },
      {
        title: "SidebarGroup",
        description: "A labelled group that expands and collapses a tree of sub-items.",
        props: [
          { name: "label", type: "ReactNode", description: "Group label shown on the trigger. Required." },
          { name: "icon", type: "ReactNode", description: "Leading icon for the trigger." },
          { name: "open", type: "boolean", description: "Open state (controlled)." },
          { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state (uncontrolled)." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Fired when the open state changes." },
          className,
        ],
      },
      {
        title: "SidebarSubItem",
        description: "A nested link inside a SidebarGroup, drawn with a tree connector.",
        props: [
          { name: "value", type: "string", description: "Selection id. Selected on click and matched against the Sidebar value." },
          { name: "active", type: "boolean", description: "Force the active state, overriding value-based selection." },
          { name: "asChild", type: "boolean", default: "false", description: "Render styles onto the child element." },
          className,
        ],
      },
      {
        title: "SidebarHeader / SidebarSection / SidebarFooter / SidebarSeparator",
        description: "Structural slots. Header holds the brand, Section groups items, Footer pins to the bottom, Separator draws a divider.",
        props: [className],
      },
    ],
  },

  skeleton: {
    imports: ["Skeleton"],
    sourceFile: "skeleton/skeleton.tsx",
    usage: `import { Skeleton } from "${PKG}";

export function Example() {
  return <Skeleton variant="text" width={200} />;
}`,
    api: [
      {
        title: "Skeleton",
        props: [
          { name: "variant", type: '"rect" | "circle" | "text"', default: '"rect"', description: "Shape preset." },
          { name: "width", type: "number | string", description: "Explicit width (number → px)." },
          { name: "height", type: "number | string", description: "Explicit height (number → px)." },
          { name: "animated", type: "boolean", default: "true", description: "Toggle the pulse animation." },
          className,
        ],
      },
    ],
  },

  slider: {
    imports: ["Slider"],
    sourceFile: "slider/slider.tsx",
    usage: `import { Slider } from "${PKG}";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState(60);
  return <Slider label="Storage" showValue value={value} onValueChange={setValue} />;
}`,
    api: [
      {
        title: "Slider",
        props: [
          { name: "value", type: "number | number[]", description: "Value(s) (controlled). Array for a range." },
          { name: "defaultValue", type: "number | number[]", description: "Value(s) (uncontrolled)." },
          { name: "onValueChange", type: "(value: number | number[]) => void", description: "Fired while dragging." },
          { name: "onValueCommit", type: "(value: number | number[]) => void", description: "Fired when interaction settles." },
          { name: "min", type: "number", default: "0", description: "Minimum value." },
          { name: "max", type: "number", default: "100", description: "Maximum value." },
          { name: "step", type: "number", default: "1", description: "Snap increment." },
          { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Track direction." },
          { name: "label", type: "ReactNode", description: "Label above the track." },
          { name: "showValue", type: "boolean | (v) => ReactNode", default: "false", description: "Show/format the current value(s)." },
          { name: "minStepsBetweenThumbs", type: "number", default: "0", description: "Gap enforced between range thumbs." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the slider." },
          className,
        ],
      },
    ],
  },

  "stat-card": {
    imports: ["StatCard"],
    sourceFile: "stat-card/stat-card.tsx",
    usage: `import { StatCard } from "${PKG}";
import { ShoppingCart } from "@phosphor-icons/react";

export function Example() {
  return (
    <StatCard
      label="Revenue"
      value="$48,120"
      icon={<ShoppingCart weight="fill" />}
      trend={{ value: "12.4%", direction: "up" }}
      description="vs. last 30 days"
    />
  );
}`,
    api: [
      {
        title: "StatCard",
        props: [
          { name: "label", type: "ReactNode", description: "Metric name shown at the top. Required." },
          { name: "value", type: "ReactNode", description: "The headline value, e.g. a number or currency. Required." },
          { name: "icon", type: "ReactNode", description: "Leading icon shown top-right." },
          { name: "description", type: "ReactNode", description: "Supporting caption under the value." },
          { name: "trend", type: "StatCardTrend", description: "Trend chip beside the value." },
          className,
        ],
      },
      {
        title: "StatCardTrend",
        description: "The shape of the trend prop.",
        props: [
          { name: "value", type: "ReactNode", description: "The delta label, e.g. \"10.5%\". Required." },
          { name: "direction", type: '"up" | "down"', default: '"up"', description: "Arrow direction." },
          { name: "color", type: '"neutral" | "primary" | "success" | "warning" | "destructive" | "info"', description: "Chip colour. Defaults to success for up and destructive for down." },
        ],
      },
    ],
  },

  surface: {
    imports: ["Surface"],
    sourceFile: "surface/surface.tsx",
    usage: `import { Surface } from "${PKG}";

export function Example() {
  return <Surface variant="elevated">Content</Surface>;
}`,
    api: [
      {
        title: "Surface",
        props: [
          { name: "variant", type: '"elevated" | "outline" | "filled" | "ghost"', default: '"elevated"', description: "Surface style." },
          { name: "radius", type: '"none" | "md" | "lg" | "xl" | "full"', default: '"xl"', description: "Corner rounding." },
          { name: "padding", type: '"none" | "sm" | "md" | "lg"', default: '"lg"', description: "Inner padding." },
          { name: "interactive", type: "boolean", default: "false", description: "Add hover/focus affordances." },
          { name: "asChild", type: "boolean", default: "false", description: "Render styles onto the child element." },
          className,
        ],
      },
    ],
  },

  table: {
    imports: [
      "Table",
      "TableHeader",
      "TableBody",
      "TableRow",
      "TableHead",
      "TableCell",
    ],
    sourceFile: "table/table.tsx",
    usage: `import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "${PKG}";

export function Example() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alex</TableCell>
          <TableCell>Product Manager</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}`,
    api: [
      {
        title: "Table",
        description: "Root wrapper that renders a rounded, scrollable surface around a <table>.",
        props: [
          { name: "containerProps", type: "ComponentProps<'div'>", description: "Props for the scrollable wrapper element." },
          className,
        ],
      },
      {
        title: "TableRow",
        props: [
          { name: "selected", type: "boolean", default: "false", description: "Highlight the row as selected." },
          { name: "interactive", type: "boolean", default: "false", description: "Add hover affordance and pointer cursor." },
          className,
        ],
      },
      {
        title: "TableHeader / TableBody / TableFooter / TableHead / TableCell / TableCaption",
        description: "Structural slots mapping to thead, tbody, tfoot, th, td and caption. Each forwards native attributes and className.",
        props: [className],
      },
    ],
  },

  tabs: {
    imports: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
    sourceFile: "tabs/tabs.tsx",
    usage: `import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "${PKG}";

export function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
      <TabsContent value="password">Password settings</TabsContent>
    </Tabs>
  );
}`,
    api: [
      {
        title: "Tabs",
        description: "Root element that owns the selected value and provides context.",
        props: [
          { name: "value", type: "string", description: "Selected tab value (controlled)." },
          { name: "defaultValue", type: "string", description: "Initial value (uncontrolled)." },
          { name: "onValueChange", type: "(value: string) => void", description: "Fires when the selection changes." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "Scales the track and triggers." },
          className,
        ],
      },
      {
        title: "TabsList",
        props: [
          { name: "fullWidth", type: "boolean", default: "false", description: "Stretch triggers to fill the width." },
          className,
        ],
      },
      {
        title: "TabsTrigger",
        props: [
          { name: "value", type: "string", description: "Value this trigger selects. Required." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable and skip during keyboard nav." },
          className,
        ],
      },
      {
        title: "TabsContent",
        props: [
          { name: "value", type: "string", description: "Value that shows this panel. Required." },
          className,
        ],
      },
    ],
  },

  toggle: {
    imports: ["Toggle"],
    sourceFile: "toggle/toggle.tsx",
    usage: `import { Toggle } from "${PKG}";

export function Example() {
  return <Toggle label="Do you ship internationally?" defaultChecked />;
}`,
    api: [
      {
        title: "Toggle",
        props: [
          { name: "checked", type: "boolean", description: "On/off state (controlled)." },
          { name: "defaultChecked", type: "boolean", default: "false", description: "Initial state (uncontrolled)." },
          { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Fired with the next state on toggle." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Switch size." },
          { name: "label", type: "ReactNode", description: "Inline label next to the switch." },
          { name: "description", type: "ReactNode", description: "Helper text under the label." },
          { name: "labelPosition", type: '"start" | "end"', default: '"end"', description: "Place the label before or after the switch." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the toggle." },
          className,
        ],
      },
    ],
  },

  kbd: {
    imports: ["Kbd"],
    sourceFile: "kbd/kbd.tsx",
    usage: `import { Kbd } from "${PKG}";

export function Example() {
  return <Kbd keys={["command"]}>K</Kbd>;
}`,
    api: [
      {
        title: "Kbd",
        props: [
          { name: "keys", type: "KbdKey | KbdKey[]", description: "Named modifier/symbol keys rendered as glyphs." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Key size." },
          { name: "children", type: "ReactNode", description: "Literal key label, e.g. \"K\"." },
          className,
        ],
      },
    ],
  },

  meter: {
    imports: ["Meter"],
    sourceFile: "meter/meter.tsx",
    usage: `import { Meter } from "${PKG}";

export function Example() {
  return <Meter label="Storage" value={60} />;
}`,
    api: [
      {
        title: "Meter",
        props: [
          { name: "value", type: "number", description: "Current value (required)." },
          { name: "min", type: "number", default: "0", description: "Lower bound." },
          { name: "max", type: "number", default: "100", description: "Upper bound." },
          { name: "label", type: "ReactNode", description: "Label above the track." },
          { name: "showValue", type: "boolean", default: "true", description: "Show the value on the right." },
          { name: "formatValue", type: "(value, percent) => ReactNode", description: "Custom value formatter." },
          { name: "color", type: '"primary" | "info" | "success" | "warning" | "destructive"', default: '"primary"', description: "Fill color." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Track thickness." },
          className,
        ],
      },
    ],
  },

  "dropdown-menu": {
    imports: ["DropdownMenu", "DropdownMenuTrigger", "DropdownMenuContent", "DropdownMenuItem"],
    sourceFile: "dropdown-menu/dropdown-menu.tsx",
    usage: `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from "${PKG}";

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}`,
    api: [
      {
        title: "DropdownMenu",
        props: [
          { name: "open", type: "boolean", description: "Open state (controlled)." },
          { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Fired when open state changes." },
        ],
      },
      {
        title: "DropdownMenuContent",
        props: [
          { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: "Preferred side." },
          { name: "align", type: '"start" | "center" | "end"', default: '"start"', description: "Alignment along the side." },
          { name: "sideOffset", type: "number", default: "8", description: "Gap between trigger and menu." },
          className,
        ],
      },
      {
        title: "DropdownMenuItem",
        props: [
          { name: "onSelect", type: "() => void", description: "Fired on click / Enter / Space." },
          { name: "icon", type: "ReactNode", description: "Leading icon." },
          { name: "shortcut", type: "ReactNode", description: "Trailing keyboard shortcut hint." },
          { name: "description", type: "ReactNode", description: "Secondary line beneath the label." },
          { name: "destructive", type: "boolean", default: "false", description: "Style as a dangerous action." },
          { name: "closeOnSelect", type: "boolean", default: "true", description: "Close the menu after selecting." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the item." },
        ],
      },
    ],
  },

  "context-menu": {
    imports: [
      "ContextMenu",
      "ContextMenuTrigger",
      "ContextMenuContent",
      "ContextMenuItem",
    ],
    sourceFile: "context-menu/context-menu.tsx",
    usage: `import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "${PKG}";
import { Copy, Scissors, Trash } from "@phosphor-icons/react";

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="grid h-40 place-items-center rounded-2xl border border-dashed">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem icon={<Copy />} shortcut="⌘C">Copy</ContextMenuItem>
        <ContextMenuItem icon={<Scissors />} shortcut="⌘X">Cut</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem icon={<Trash />} destructive>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`,
    api: [
      {
        title: "ContextMenu",
        description: "Root that owns the open state and the pointer position.",
        props: [
          { name: "open", type: "boolean", description: "Open state (controlled)." },
          { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Fired when open state changes." },
        ],
      },
      {
        title: "ContextMenuTrigger",
        description: "The region that opens the menu on right-click. Renders a <div>, or the child via asChild.",
        props: [
          { name: "asChild", type: "boolean", default: "false", description: "Merge the trigger behaviour onto the child element." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable opening the menu." },
          className,
        ],
      },
      {
        title: "ContextMenuContent",
        description: "The menu surface, positioned at the pointer and clamped to the viewport.",
        props: [
          { name: "closeOnEscape", type: "boolean", default: "true", description: "Close when Escape is pressed." },
          className,
        ],
      },
      {
        title: "ContextMenuItem",
        description: "Same as DropdownMenuItem. ContextMenuLabel, ContextMenuSeparator, ContextMenuGroup and ContextMenuSub* are also re-exported.",
        props: [
          { name: "onSelect", type: "() => void", description: "Fired on click / Enter / Space." },
          { name: "icon", type: "ReactNode", description: "Leading icon." },
          { name: "shortcut", type: "ReactNode", description: "Trailing keyboard shortcut hint." },
          { name: "destructive", type: "boolean", default: "false", description: "Style as a dangerous action." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the item." },
        ],
      },
    ],
  },

  avatar: {
    imports: ["Avatar", "AvatarGroup"],
    sourceFile: "avatar/avatar.tsx",
    usage: `import { Avatar } from "${PKG}";

export function Example() {
  return <Avatar name="Alex Morgan" src="/alex.jpg" />;
}`,
    api: [
      {
        title: "Avatar",
        props: [
          { name: "src", type: "string", description: "Image source; falls back to initials/icon." },
          { name: "name", type: "string", description: "Display name used for initials and alt." },
          { name: "initials", type: "string", description: "Explicit initials override." },
          { name: "alt", type: "string", description: "Accessible label for the image." },
          { name: "fallback", type: "ReactNode", description: "Custom fallback node." },
          { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Avatar size." },
          { name: "shape", type: '"circle" | "rounded"', default: '"circle"', description: "Corner shape." },
          { name: "color", type: '"neutral" | "brand"', default: '"neutral"', description: "Fallback color." },
          className,
        ],
      },
      {
        title: "AvatarGroup",
        props: [
          { name: "max", type: "number", description: "Max avatars before a +N overflow chip." },
          className,
        ],
      },
    ],
  },

  badge: {
    imports: ["Badge", "BadgeWrapper"],
    sourceFile: "badge/badge.tsx",
    usage: `import { Badge } from "${PKG}";

export function Example() {
  return <Badge color="primary">New</Badge>;
}`,
    api: [
      {
        title: "Badge",
        props: [
          { name: "color", type: '"primary" | "neutral" | "destructive" | "success" | "warning" | "info"', default: '"primary"', description: "Fill/dot color." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "Badge size." },
          { name: "dot", type: "boolean", default: "false", description: "Render a bare status dot." },
          { name: "max", type: "number", description: "Cap numeric children as N+ (e.g. 99+)." },
          className,
        ],
      },
      {
        title: "BadgeWrapper",
        description: "Anchors a Badge to the corner of its child (icon, avatar).",
        props: [
          { name: "badge", type: "ReactNode", description: "The badge element to overlay." },
          { name: "placement", type: '"top-right" | "top-left" | "bottom-right" | "bottom-left"', default: '"top-right"', description: "Corner to pin the badge." },
          className,
        ],
      },
    ],
  },

  breadcrumb: {
    imports: ["Breadcrumb", "BreadcrumbList", "BreadcrumbItem", "BreadcrumbLink", "BreadcrumbPage", "BreadcrumbSeparator", "BreadcrumbEllipsis"],
    sourceFile: "breadcrumb/breadcrumb.tsx",
    usage: `import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "${PKG}";

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbPage>Settings</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`,
    api: [
      {
        title: "Breadcrumb",
        props: [
          { name: "separator", type: "ReactNode", default: "<CaretRight />", description: "Node rendered between items." },
          className,
        ],
      },
      {
        title: "BreadcrumbList / Item / Link / Page / Separator / Ellipsis",
        description: "Structural parts. Link and Page mark interactive vs. current crumbs.",
        props: [className],
      },
    ],
  },

  accordion: {
    imports: ["Accordion", "AccordionItem", "AccordionTrigger", "AccordionContent"],
    sourceFile: "accordion/accordion.tsx",
    usage: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "${PKG}";

export function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>Question</AccordionTrigger>
        <AccordionContent>Answer</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`,
    api: [
      {
        title: "Accordion",
        props: [
          { name: "type", type: '"single" | "multiple"', default: '"single"', description: "How many items can be open." },
          { name: "collapsible", type: "boolean", default: "false", description: "Allow closing the open item in single mode." },
          { name: "value", type: "string | string[]", description: "Open value(s) (controlled)." },
          { name: "defaultValue", type: "string | string[]", description: "Open value(s) (uncontrolled)." },
          { name: "onValueChange", type: "(value) => void", description: "Fired when open value(s) change." },
          { name: "indicator", type: '"chevron" | "plus"', default: '"chevron"', description: "Trigger indicator." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable every item." },
          className,
        ],
      },
      {
        title: "AccordionItem / AccordionTrigger / AccordionContent",
        props: [
          { name: "value", type: "string", description: "Item identifier (AccordionItem)." },
          { name: "disabled", type: "boolean", description: "Disable a single item." },
        ],
      },
    ],
  },

  alert: {
    imports: ["Alert", "AlertDescription", "AlertLink"],
    sourceFile: "alert/alert.tsx",
    usage: `import { Alert, AlertDescription } from "${PKG}";

export function Example() {
  return (
    <Alert variant="success" title="Saved">
      <AlertDescription>Your changes were saved.</AlertDescription>
    </Alert>
  );
}`,
    api: [
      {
        title: "Alert",
        props: [
          { name: "variant", type: '"default" | "info" | "success" | "warning" | "destructive"', default: '"default"', description: "Status style and default icon." },
          { name: "size", type: '"sm" | "md"', default: '"md"', description: "Alert size." },
          { name: "title", type: "ReactNode", description: "Heading line." },
          { name: "icon", type: "ReactNode", description: "Leading media; pass null to hide." },
          { name: "action", type: "ReactNode", description: "Trailing inline action." },
          { name: "onClose", type: "() => void", description: "Show a dismiss button and fire on press." },
          { name: "closeLabel", type: "string", default: '"Dismiss"', description: "Accessible label for dismiss." },
          className,
        ],
      },
    ],
  },

  announcement: {
    imports: ["Announcement"],
    sourceFile: "announcement/announcement.tsx",
    usage: `import { Announcement } from "${PKG}";

export function Example() {
  return (
    <Announcement tag="New feature" href="/changelog">
      Meet your AI Relocation Assistant
    </Announcement>
  );
}`,
    api: [
      {
        title: "Announcement",
        description: "Renders an anchor when href is set, otherwise a button. Forwards native attributes accordingly.",
        props: [
          { name: "tag", type: "ReactNode", description: "Leading badge label (optional)." },
          { name: "color", type: '"neutral" | "primary" | "success" | "warning" | "destructive" | "info"', default: '"neutral"', description: "Colour of the leading badge." },
          { name: "icon", type: "ReactNode", default: "<ArrowRight />", description: "Trailing icon; pass null to hide it." },
          { name: "href", type: "string", description: "When set, renders an anchor." },
          className,
        ],
      },
    ],
  },

  "area-chart": {
    imports: ["AreaChart"],
    sourceFile: "area-chart/area-chart.tsx",
    usage: `import { AreaChart } from "${PKG}";

export function Example() {
  return (
    <AreaChart
      data={[12, 18, 15, 22, 30, 26, 34]}
      labels={[1, 2, 3, 4, 5, 6, 7]}
      tooltip={({ value }) => <span>{value}GB</span>}
    />
  );
}`,
    api: [
      {
        title: "AreaChart",
        props: [
          { name: "data", type: "number[]", description: "Series values, plotted left to right. Required." },
          { name: "labels", type: "(string | number)[]", description: "Optional x-axis labels, one per point." },
          { name: "height", type: "number", default: "180", description: "Chart height in pixels (excludes labels)." },
          { name: "color", type: "string", default: "var(--color-primary)", description: "Line and fill colour (any CSS color)." },
          { name: "gridLines", type: "number", default: "4", description: "Number of horizontal grid lines; 0 hides them." },
          { name: "tooltip", type: "(point: { index: number; value: number }) => ReactNode", description: "Render tooltip contents for the hovered point." },
          className,
        ],
      },
    ],
  },

  "bar-chart": {
    imports: ["BarChart"],
    sourceFile: "bar-chart/bar-chart.tsx",
    usage: `import { BarChart } from "${PKG}";

export function Example() {
  return (
    <BarChart
      data={[8, 6, 5, 7, 7, 12, 3, 2, 6]}
      activeIndex={5}
      tooltip={({ value }) => <span>{value}GB</span>}
    />
  );
}`,
    api: [
      {
        title: "BarChart",
        props: [
          { name: "data", type: "number[]", description: "Series values, plotted left to right. Required." },
          { name: "labels", type: "(string | number)[]", description: "Optional x-axis labels, one per bar." },
          { name: "height", type: "number", default: "180", description: "Bars area height in pixels (excludes labels)." },
          { name: "color", type: "string", default: "var(--color-primary)", description: "Highlight colour for the active bar." },
          { name: "activeIndex", type: "number", description: "Bar highlighted by default (when not hovering)." },
          { name: "gridLines", type: "number", default: "4", description: "Number of horizontal grid lines; 0 hides them." },
          { name: "tooltip", type: "(bar: { index: number; value: number }) => ReactNode", description: "Render tooltip contents for the active bar." },
          className,
        ],
      },
    ],
  },

  attachment: {
    imports: ["Attachment", "AttachmentTile"],
    sourceFile: "attachment/attachment.tsx",
    usage: `import { Attachment, AttachmentTile } from "${PKG}";

export function Example() {
  return (
    <div className="flex gap-3">
      <AttachmentTile src="/photo.jpg" onRemove={() => {}} />
      <AttachmentTile type="video" src="/clip.jpg" onRemove={() => {}} />
      <AttachmentTile type="file" onRemove={() => {}} />
    </div>
  );
}`,
    api: [
      {
        title: "AttachmentTile",
        description: "Square media preview for grids.",
        props: [
          { name: "src", type: "string", description: "Image/poster source." },
          { name: "type", type: '"image" | "video" | "file"', description: "Preview state. Defaults to image when src is set, otherwise file." },
          { name: "size", type: "number", default: "80", description: "Square edge length in pixels." },
          { name: "onRemove", type: "() => void", description: "Show a remove button and fire on press." },
          { name: "onClick", type: "() => void", description: "Make the tile clickable." },
          className,
        ],
      },
      {
        title: "Attachment",
        description: "Compact list row with a thumbnail and text.",
        props: [
          { name: "name", type: "ReactNode", description: "Primary line. Required." },
          { name: "description", type: "ReactNode", description: "Secondary line." },
          { name: "src", type: "string", description: "Thumbnail source." },
          { name: "type", type: '"image" | "video" | "file"', description: "Thumbnail state." },
          { name: "thumbnailSize", type: "number", default: "42", description: "Thumbnail edge length in pixels." },
          { name: "action", type: "ReactNode", description: "Trailing content (e.g. a menu button)." },
          { name: "onRemove", type: "() => void", description: "Show a dismiss button when no action is given." },
          className,
        ],
      },
    ],
  },

  autocomplete: {
    imports: ["Autocomplete"],
    sourceFile: "autocomplete/autocomplete.tsx",
    usage: `import { Autocomplete } from "${PKG}";

export function Example() {
  return (
    <Autocomplete
      placeholder="Search"
      options={[
        { value: "1", label: "Alex" },
        { value: "2", label: "Jamie" },
      ]}
    />
  );
}`,
    api: [
      {
        title: "Autocomplete",
        props: [
          { name: "options", type: "AutocompleteOption[]", description: "The list of options." },
          { name: "value", type: "string | string[] | null", description: "Selected value(s) (controlled)." },
          { name: "defaultValue", type: "string | string[] | null", description: "Selected value(s) (uncontrolled)." },
          { name: "onValueChange", type: "(value) => void", description: "Fired with the new selection." },
          { name: "multiple", type: "boolean", default: "false", description: "Allow multiple selections (chips)." },
          { name: "placeholder", type: "string", default: '"Search"', description: "Empty-state text." },
          { name: "clearable", type: "boolean", default: "true", description: "Show a clear button." },
          { name: "filter", type: "(option, query) => boolean", description: "Custom filter predicate." },
          { name: "emptyMessage", type: "ReactNode", default: '"No results found"', description: "Shown when nothing matches." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Control height." },
          { name: "disabled", type: "boolean", default: "false", description: "Disable the field." },
          className,
        ],
      },
    ],
  },

  dialog: {
    imports: ["Dialog", "DialogTrigger", "DialogContent", "DialogHeader", "DialogTitle", "DialogDescription", "DialogFooter", "DialogClose"],
    sourceFile: "dialog/dialog.tsx",
    usage: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, Button } from "${PKG}";

export function Example() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}`,
    api: [
      {
        title: "Dialog",
        props: [
          { name: "open", type: "boolean", description: "Open state (controlled)." },
          { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Fired when open state changes." },
        ],
      },
      {
        title: "DialogContent",
        props: [
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Dialog width." },
          { name: "hideClose", type: "boolean", default: "false", description: "Hide the built-in top-right close button." },
          { name: "closeOnOverlayClick", type: "boolean", default: "true", description: "Close when the overlay is clicked." },
          { name: "closeOnEscape", type: "boolean", default: "true", description: "Close when Escape is pressed." },
          { name: "role", type: '"dialog" | "alertdialog"', default: '"dialog"', description: "Use alertdialog for decision flows." },
          className,
        ],
      },
      {
        title: "DialogHeader",
        props: [
          { name: "icon", type: "ReactNode", description: "Leading feature icon." },
          { name: "align", type: '"row" | "column"', default: '"row"', description: "Icon beside or above the title." },
        ],
      },
    ],
  },
  drawer: {
    imports: [
      "Drawer",
      "DrawerTrigger",
      "DrawerContent",
      "DrawerHeader",
      "DrawerTitle",
      "DrawerDescription",
      "DrawerBody",
      "DrawerFooter",
      "DrawerClose",
    ],
    sourceFile: "drawer/drawer.tsx",
    usage: `import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Button,
} from "${PKG}";

export function Example() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>Panel content</DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`,
    api: [
      {
        title: "Drawer",
        description: "Root that owns the open state.",
        props: [
          { name: "open", type: "boolean", description: "Open state (controlled)." },
          { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state." },
          { name: "onOpenChange", type: "(open: boolean) => void", description: "Fired when open state changes." },
        ],
      },
      {
        title: "DrawerTrigger",
        description: "Opens the drawer. Renders a <button>, or the child via asChild.",
        props: [
          { name: "asChild", type: "boolean", default: "false", description: "Merge the trigger behaviour onto the child element." },
        ],
      },
      {
        title: "DrawerContent",
        description: "The sliding panel. Wrap DrawerHeader, DrawerBody and DrawerFooter inside it.",
        props: [
          { name: "side", type: '"right" | "left" | "top" | "bottom"', default: '"right"', description: "Edge the panel slides in from." },
          { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Panel width (left/right) or height (top/bottom)." },
          { name: "hideClose", type: "boolean", default: "false", description: "Hide the built-in top-right close button." },
          { name: "closeOnOverlayClick", type: "boolean", default: "true", description: "Close when the overlay is clicked." },
          { name: "closeOnEscape", type: "boolean", default: "true", description: "Close when Escape is pressed." },
          className,
        ],
      },
      {
        title: "DrawerHeader / DrawerBody / DrawerFooter",
        description: "Layout slots. DrawerBody scrolls; header and footer stay pinned. DrawerTitle, DrawerDescription and DrawerClose are also exported.",
        props: [className],
      },
    ],
  },
};
