# RocketUI Agent Guide

RocketUI is a production-ready React + TypeScript component library and
design system, styled with Tailwind CSS v4 and semantic design tokens.

- Package: `@rocketui-react/core`
- Install: `npm install @rocketui-react/core`
- Import the stylesheet once at your app root: `import "@rocketui-react/core/styles.css";`
- Theming is token-driven: toggle a `.dark` class on `<html>` for dark mode.

Every component accepts `className` (merged via `cn`) and forwards native HTML
attributes. Interactive components share the same prop language where relevant:
`size`, `variant`, `disabled`, `loading`.

## Guidelines for generating UI with RocketUI

1. Only use components exported from `@rocketui-react/core`. Do not invent components or props
   that are not listed in the reference below.
2. Import components from `@rocketui-react/core` and import `@rocketui-react/core/styles.css` once at the
   app root.
3. Never hardcode colours. Use semantic Tailwind token classes (`bg-background`,
   `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`,
   `bg-primary`, `text-primary-foreground`, `bg-muted`, `bg-accent`,
   `text-destructive`, `text-success`, `text-warning`) so light/dark theming
   keeps working.
4. Compose layouts with utility classes; prefer the `Card` and `Surface`
   components as containers.
5. Respect each component's documented prop types and defaults exactly.
6. Before composing a pattern from primitives, check "Choosing a component"
   below. A dedicated component usually already exists. For example, use
   `SearchField` for a search box rather than a `Button` or bare `Input`.
7. For status labels, use `Chip` with a semantic color (`success`, `warning`,
   `destructive`, `info`) so states read as distinct. Do not map every status
   to the neutral gray color.

## Styling & layout (important)

`@rocketui-react/core/styles.css` is precompiled and ships a curated safelist of layout
utilities, so you can build screens **without setting up Tailwind**. Available
out of the box (including `sm:`/`md:`/`lg:` variants for the layout ones):

- Display & flex: `flex`, `grid`, `hidden`, `flex-row`, `flex-col`,
  `flex-wrap`, `items-*`, `justify-*`, `self-*`, `place-*`
- Grid: `grid-cols-1` to `grid-cols-12`, `col-span-*`, `grid-rows-*`, `row-span-*`
- Spacing: `gap-*`, `p*-*`, `m*-*`, `space-x-*`, `space-y-*`
- Sizing: `w-full`, `w-1/2`, `h-full`, `h-screen`, `min-h-screen`, `size-*`,
  `max-w-xs` to `max-w-7xl`
- Typography: `text-xs` to `text-6xl`, `font-medium/semibold/bold`,
  `text-left/center/right`, `leading-*`, `tracking-*`, `truncate`
- Position/effects: `relative`, `absolute`, `sticky`, `inset-0`, `z-*`,
  `overflow-*`, `rounded-*`, `border*`, `shadow-*`
- Token colours: `bg-*`, `text-*`, `border-*` for every semantic token.

Rules:
- Stick to these standard utilities. **Arbitrary values** like
  `grid-cols-[220px_1fr]`, `w-[240px]`, `text-[13px]`, `p-[18px]` are NOT in the
  precompiled CSS and will silently do nothing in zero-config mode.

### Two ways to use

**Mode A — zero-config (default).** Import the precompiled stylesheet once and
you are done. Best for quick prototypes and AI-generated screens:

```ts
import "@rocketui-react/core/styles.css";
```

You get every component style, the design tokens, and the layout safelist above.

**Mode B — Tailwind project (full power).** If the app already uses Tailwind
CSS v4 (or you need arbitrary values), do NOT import `styles.css`. Instead pull
the tokens into your own Tailwind entry and let Tailwind scan the package:

```css
@import "tailwindcss";
@import "@rocketui-react/core/theme.css";
@source "../node_modules/@rocketui-react/core/dist";
```

Now the full Tailwind utility set (including arbitrary values) works, the
semantic token colours resolve, and only the classes you actually use are
generated.

## Available components

Accordion, Alert, Announcement, Area Chart, Attachment, Autocomplete, Avatar, Badge, Bar Chart, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Checkbox, Chip, Context Menu, Dialog, Drawer, Dropdown Menu, Input, Input Otp, Kbd, Meter, Number Field, Pagination, Popover, Radio Group, Scroll Shadow, Search Field, Select, Sidebar, Skeleton, Slider, Stat Card, Surface, Table, Tabs, Toggle.

## Choosing a component

Scan this first. Match the outcome you want to a component before you compose one from primitives; a dedicated component almost always exists.

| Need | Use | Avoid |
| --- | --- | --- |
| Search or filter box | `SearchField` | rebuilding it from Button or Input |
| Single-line text entry | `Input` |  |
| Multi-line text entry | `Textarea` |  |
| Number, quantity, or price | `NumberField` | a plain Input for numeric values |
| One-time code or PIN | `InputOTP` |  |
| Pick one option from a list | `Select` | a native select element |
| Pick one option with typeahead | `Autocomplete` |  |
| Pick one option shown inline | `RadioGroup` |  |
| Turn a single setting on or off | `Toggle` | a Checkbox for on and off settings |
| Select several options | `Checkbox` |  |
| Status label (Paid, Pending, Refunded) | `Chip with color success, warning, or destructive` | a neutral gray Chip for every status |
| Tag or removable filter | `Chip with onRemove` |  |
| Count or notification indicator | `Badge` |  |
| User picture or initials | `Avatar` |  |
| Structured data in rows and columns | `Table` |  |
| Menu of actions from a button | `DropdownMenu` |  |
| Menu of actions on right-click | `ContextMenu` |  |
| App navigation down the side of a layout | `Sidebar` | rebuilding nav rows from Button |
| A single KPI or metric tile | `StatCard` | hand-building a Card with a Chip |
| Cycle through images or cards one at a time | `Carousel` |  |
| Floating panel next to a trigger | `Popover` |  |
| Focused task or confirmation | `Dialog` |  |
| Slide-in panel from a screen edge | `Drawer` | a full Dialog for side navigation or filters |
| Switch between related views | `Tabs` |  |
| Expandable sections | `Accordion` |  |
| Inline status message | `Alert` |  |
| Loading placeholder | `Skeleton` |  |
| Date or date range | `Calendar` |  |
| Value within a range (usage, capacity) | `Meter` |  |
| Trend over time | `AreaChart` |  |
| Compare categories | `BarChart` |  |
| Page navigation | `Pagination` |  |
| Path within a hierarchy | `Breadcrumb` |  |

### What each component is for

- **Accordion**: Expandable sections that reveal and hide content, such as an FAQ.
- **Alert**: Inline message that communicates status or important information.
- **Announcement**: Highlight a new feature or update as a compact, clickable pill.
- **Area Chart**: Plot a trend over time as a filled area chart.
- **Attachment**: Show an uploaded file with its name, size, and a remove control.
- **Autocomplete**: Text input with a filtered list of suggestions.
- **Avatar**: Show a user image, initials, or a fallback icon.
- **Badge**: Small count or status indicator, often anchored to an icon or avatar.
- **Bar Chart**: Compare values across categories as bars.
- **Breadcrumb**: Show the path to the current page in a hierarchy.
- **Button**: Trigger an action or submit a form. Supports variants, sizes, loading, and icon-only.
- **Button Group**: Join related buttons into a single attached control, such as a segmented switch or toolbar.
- **Calendar**: Pick a single day or a date range from a month grid.
- **Card**: Container surface that groups related content with padding, border, and optional media.
- **Carousel**: Center-focused slider with peeking neighbours, arrows, and dot indicators.
- **Checkbox**: Toggle one boolean option, with support for an indeterminate state.
- **Chip**: Compact label for a status, tag, or removable filter. Full semantic color range.
- **Context Menu**: Menu that opens at the pointer on right-click, reusing the dropdown menu items.
- **Dialog**: Modal overlay for a focused task or a confirmation.
- **Drawer**: Panel that slides in from a screen edge for navigation, filters, details, or settings.
- **Dropdown Menu**: Menu of actions opened from a trigger button.
- **Input**: Single-line text field with label, description, and error states.
- **Input Otp**: Segmented input for one-time codes and PINs.
- **Kbd**: Render a keyboard key or shortcut inline.
- **Meter**: Show a value inside a known range as a bar, such as usage or capacity.
- **Number Field**: Numeric input with stepper buttons and locale formatting.
- **Pagination**: Move between pages of a data set.
- **Popover**: Floating panel anchored to a trigger for secondary content.
- **Radio Group**: Choose exactly one option from a small, visible set.
- **Scroll Shadow**: Fade the edges of a scrollable area to signal that more content is off-screen.
- **Search Field**: Text input built for search and filtering, with a search icon, a clear button, and clear-on-Escape.
- **Select**: Dropdown for picking one option from a list.
- **Sidebar**: Vertical app navigation with a brand header, active items, collapsible groups, and a pinned footer.
- **Skeleton**: Placeholder blocks shown while content is loading.
- **Slider**: Pick a numeric value or range by dragging along a track.
- **Stat Card**: Compact KPI tile with a label, headline value, trend chip, and caption.
- **Surface**: Low-level styled container primitive with configurable elevation.
- **Table**: Show structured data in rows and columns, with selection and sorting.
- **Tabs**: Switch between related views within the same space.
- **Toggle**: On or off switch for a single setting.

## Component reference

### Accordion

Expandable sections that reveal and hide content, such as an FAQ.

Use for: accordion, collapse, expand, faq, disclosure.

Exports: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@rocketui-react/core";
```

#### Accordion

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"single" \| "multiple"` | `"single"` | How many items can be open. |
| `collapsible` | `boolean` | `false` | Allow closing the open item in single mode. |
| `value` | `string \| string[]` | `-` | Open value(s) (controlled). |
| `defaultValue` | `string \| string[]` | `-` | Open value(s) (uncontrolled). |
| `onValueChange` | `(value) => void` | `-` | Fired when open value(s) change. |
| `indicator` | `"chevron" \| "plus"` | `"chevron"` | Trigger indicator. |
| `disabled` | `boolean` | `false` | Disable every item. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### AccordionItem / AccordionTrigger / AccordionContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Item identifier (AccordionItem). |
| `disabled` | `boolean` | `-` | Disable a single item. |

Usage:

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@rocketui-react/core";

export function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="a">
        <AccordionTrigger>Question</AccordionTrigger>
        <AccordionContent>Answer</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

---

### Alert

Inline message that communicates status or important information.

Use for: alert, notice, message, banner, warning.

Exports: `Alert`, `AlertDescription`, `AlertLink`

```tsx
import { Alert, AlertDescription, AlertLink } from "@rocketui-react/core";
```

#### Alert

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "info" \| "success" \| "warning" \| "destructive"` | `"default"` | Status style and default icon. |
| `size` | `"sm" \| "md"` | `"md"` | Alert size. |
| `title` | `ReactNode` | `-` | Heading line. |
| `icon` | `ReactNode` | `-` | Leading media; pass null to hide. |
| `action` | `ReactNode` | `-` | Trailing inline action. |
| `onClose` | `() => void` | `-` | Show a dismiss button and fire on press. |
| `closeLabel` | `string` | `"Dismiss"` | Accessible label for dismiss. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Alert, AlertDescription } from "@rocketui-react/core";

export function Example() {
  return (
    <Alert variant="success" title="Saved">
      <AlertDescription>Your changes were saved.</AlertDescription>
    </Alert>
  );
}
```

---

### Announcement

Highlight a new feature or update as a compact, clickable pill.

Use for: announcement, new, callout, promo, whats new.

Exports: `Announcement`

```tsx
import { Announcement } from "@rocketui-react/core";
```

#### Announcement

Renders an anchor when href is set, otherwise a button. Forwards native attributes accordingly.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | `ReactNode` | `-` | Leading badge label (optional). |
| `color` | `"neutral" \| "primary" \| "success" \| "warning" \| "destructive" \| "info"` | `"neutral"` | Colour of the leading badge. |
| `icon` | `ReactNode` | `<ArrowRight />` | Trailing icon; pass null to hide it. |
| `href` | `string` | `-` | When set, renders an anchor. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Announcement } from "@rocketui-react/core";

export function Example() {
  return (
    <Announcement tag="New feature" href="/changelog">
      Meet your AI Relocation Assistant
    </Announcement>
  );
}
```

---

### Area Chart

Plot a trend over time as a filled area chart.

Use for: chart, area, trend, time series, analytics.

Exports: `AreaChart`

```tsx
import { AreaChart } from "@rocketui-react/core";
```

#### AreaChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `number[]` | `-` | Series values, plotted left to right. Required. |
| `labels` | `(string \| number)[]` | `-` | Optional x-axis labels, one per point. |
| `height` | `number` | `180` | Chart height in pixels (excludes labels). |
| `color` | `string` | `var(--color-primary)` | Line and fill colour (any CSS color). |
| `gridLines` | `number` | `4` | Number of horizontal grid lines; 0 hides them. |
| `tooltip` | `(point: { index: number; value: number }) => ReactNode` | `-` | Render tooltip contents for the hovered point. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { AreaChart } from "@rocketui-react/core";

export function Example() {
  return (
    <AreaChart
      data={[12, 18, 15, 22, 30, 26, 34]}
      labels={[1, 2, 3, 4, 5, 6, 7]}
      tooltip={({ value }) => <span>{value}GB</span>}
    />
  );
}
```

---

### Attachment

Show an uploaded file with its name, size, and a remove control.

Use for: file, upload, attachment, document.

Exports: `Attachment`, `AttachmentTile`

```tsx
import { Attachment, AttachmentTile } from "@rocketui-react/core";
```

#### AttachmentTile

Square media preview for grids.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | `-` | Image/poster source. |
| `type` | `"image" \| "video" \| "file"` | `-` | Preview state. Defaults to image when src is set, otherwise file. |
| `size` | `number` | `80` | Square edge length in pixels. |
| `onRemove` | `() => void` | `-` | Show a remove button and fire on press. |
| `onClick` | `() => void` | `-` | Make the tile clickable. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### Attachment

Compact list row with a thumbnail and text.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `ReactNode` | `-` | Primary line. Required. |
| `description` | `ReactNode` | `-` | Secondary line. |
| `src` | `string` | `-` | Thumbnail source. |
| `type` | `"image" \| "video" \| "file"` | `-` | Thumbnail state. |
| `thumbnailSize` | `number` | `42` | Thumbnail edge length in pixels. |
| `action` | `ReactNode` | `-` | Trailing content (e.g. a menu button). |
| `onRemove` | `() => void` | `-` | Show a dismiss button when no action is given. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Attachment, AttachmentTile } from "@rocketui-react/core";

export function Example() {
  return (
    <div className="flex gap-3">
      <AttachmentTile src="/photo.jpg" onRemove={() => {}} />
      <AttachmentTile type="video" src="/clip.jpg" onRemove={() => {}} />
      <AttachmentTile type="file" onRemove={() => {}} />
    </div>
  );
}
```

---

### Autocomplete

Text input with a filtered list of suggestions.

Use for: autocomplete, combobox, suggestions, typeahead, search select.

Exports: `Autocomplete`

```tsx
import { Autocomplete } from "@rocketui-react/core";
```

#### Autocomplete

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `AutocompleteOption[]` | `-` | The list of options. |
| `value` | `string \| string[] \| null` | `-` | Selected value(s) (controlled). |
| `defaultValue` | `string \| string[] \| null` | `-` | Selected value(s) (uncontrolled). |
| `onValueChange` | `(value) => void` | `-` | Fired with the new selection. |
| `multiple` | `boolean` | `false` | Allow multiple selections (chips). |
| `placeholder` | `string` | `"Search"` | Empty-state text. |
| `clearable` | `boolean` | `true` | Show a clear button. |
| `filter` | `(option, query) => boolean` | `-` | Custom filter predicate. |
| `emptyMessage` | `ReactNode` | `"No results found"` | Shown when nothing matches. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control height. |
| `disabled` | `boolean` | `false` | Disable the field. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Autocomplete } from "@rocketui-react/core";

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
}
```

---

### Avatar

Show a user image, initials, or a fallback icon.

Use for: avatar, user, profile, photo, initials.

Exports: `Avatar`, `AvatarGroup`

```tsx
import { Avatar, AvatarGroup } from "@rocketui-react/core";
```

#### Avatar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | `-` | Image source; falls back to initials/icon. |
| `name` | `string` | `-` | Display name used for initials and alt. |
| `initials` | `string` | `-` | Explicit initials override. |
| `alt` | `string` | `-` | Accessible label for the image. |
| `fallback` | `ReactNode` | `-` | Custom fallback node. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Avatar size. |
| `shape` | `"circle" \| "rounded"` | `"circle"` | Corner shape. |
| `color` | `"neutral" \| "brand"` | `"neutral"` | Fallback color. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### AvatarGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `max` | `number` | `-` | Max avatars before a +N overflow chip. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Avatar } from "@rocketui-react/core";

export function Example() {
  return <Avatar name="Alex Morgan" src="/alex.jpg" />;
}
```

---

### Badge

Small count or status indicator, often anchored to an icon or avatar.

Use for: badge, count, notification, dot, indicator.

Exports: `Badge`, `BadgeWrapper`

```tsx
import { Badge, BadgeWrapper } from "@rocketui-react/core";
```

#### Badge

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `"primary" \| "neutral" \| "destructive" \| "success" \| "warning" \| "info"` | `"primary"` | Fill/dot color. |
| `size` | `"sm" \| "md"` | `"md"` | Badge size. |
| `dot` | `boolean` | `false` | Render a bare status dot. |
| `max` | `number` | `-` | Cap numeric children as N+ (e.g. 99+). |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### BadgeWrapper

Anchors a Badge to the corner of its child (icon, avatar).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `badge` | `ReactNode` | `-` | The badge element to overlay. |
| `placement` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"` | `"top-right"` | Corner to pin the badge. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Badge } from "@rocketui-react/core";

export function Example() {
  return <Badge color="primary">New</Badge>;
}
```

---

### Bar Chart

Compare values across categories as bars.

Use for: chart, bar, compare, categories, analytics.

Exports: `BarChart`

```tsx
import { BarChart } from "@rocketui-react/core";
```

#### BarChart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `number[]` | `-` | Series values, plotted left to right. Required. |
| `labels` | `(string \| number)[]` | `-` | Optional x-axis labels, one per bar. |
| `height` | `number` | `180` | Bars area height in pixels (excludes labels). |
| `color` | `string` | `var(--color-primary)` | Highlight colour for the active bar. |
| `activeIndex` | `number` | `-` | Bar highlighted by default (when not hovering). |
| `gridLines` | `number` | `4` | Number of horizontal grid lines; 0 hides them. |
| `tooltip` | `(bar: { index: number; value: number }) => ReactNode` | `-` | Render tooltip contents for the active bar. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { BarChart } from "@rocketui-react/core";

export function Example() {
  return (
    <BarChart
      data={[8, 6, 5, 7, 7, 12, 3, 2, 6]}
      activeIndex={5}
      tooltip={({ value }) => <span>{value}GB</span>}
    />
  );
}
```

---

### Breadcrumb

Show the path to the current page in a hierarchy.

Use for: breadcrumb, path, navigation, hierarchy.

Exports: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`

```tsx
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "@rocketui-react/core";
```

#### Breadcrumb

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `separator` | `ReactNode` | `<CaretRight />` | Node rendered between items. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### BreadcrumbList / Item / Link / Page / Separator / Ellipsis

Structural parts. Link and Page mark interactive vs. current crumbs.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@rocketui-react/core";

export function Example() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbItem><BreadcrumbPage>Settings</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

---

### Button

Trigger an action or submit a form. Supports variants, sizes, loading, and icon-only.

Use for: action, submit, cta, click, confirm.

Exports: `Button`

```tsx
import { Button } from "@rocketui-react/core";
```

#### Button

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"solid" \| "soft" \| "outline" \| "ghost" \| "link"` | `"solid"` | Visual style of the button. |
| `color` | `"primary" \| "neutral" \| "destructive"` | `"primary"` | Semantic color. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control height and padding. |
| `iconOnly` | `boolean` | `false` | Render a square icon-only button. |
| `fullWidth` | `boolean` | `false` | Stretch to the container width. |
| `loading` | `boolean` | `false` | Show a spinner and block interaction. |
| `startIcon` | `ReactNode` | `-` | Icon before the label (hidden while loading). |
| `endIcon` | `ReactNode` | `-` | Icon after the label. |
| `asChild` | `boolean` | `false` | Render styles onto the child element. |
| `disabled` | `boolean` | `false` | Disable the button. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Button } from "@rocketui-react/core";

export function Example() {
  return <Button>Get started</Button>;
}
```

---

### Button Group

Join related buttons into a single attached control, such as a segmented switch or toolbar.

Use for: segmented, toolbar, grouped actions, switcher.

Exports: `ButtonGroup`, `Button`

```tsx
import { ButtonGroup, Button } from "@rocketui-react/core";
```

#### ButtonGroup

Configure the whole group once; each child button can override its own props.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Stacking direction. |
| `variant` | `ButtonProps['variant']` | `-` | Default variant for child buttons. |
| `color` | `ButtonProps['color']` | `-` | Default color for child buttons. |
| `size` | `ButtonProps['size']` | `-` | Default size for child buttons. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { ButtonGroup, Button } from "@rocketui-react/core";

export function Example() {
  return (
    <ButtonGroup>
      <Button>Previous</Button>
      <Button>Next</Button>
    </ButtonGroup>
  );
}
```

---

### Calendar

Pick a single day or a date range from a month grid.

Use for: date, datepicker, day, range, schedule.

Exports: `Calendar`

```tsx
import { Calendar } from "@rocketui-react/core";
```

#### Calendar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `Date \| null` | `-` | Selected date (controlled). |
| `defaultValue` | `Date \| null` | `-` | Selected date (uncontrolled). |
| `onChange` | `(date: Date) => void` | `-` | Fired when a day is picked. |
| `month` | `Date` | `-` | Visible month (controlled). |
| `defaultMonth` | `Date` | `-` | Initial visible month (uncontrolled). |
| `onMonthChange` | `(month: Date) => void` | `-` | Fired when the visible month changes. |
| `minDate` | `Date` | `-` | Earliest selectable day (inclusive). |
| `maxDate` | `Date` | `-` | Latest selectable day (inclusive). |
| `isDateDisabled` | `(date: Date) => boolean` | `-` | Disable arbitrary days. |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` | First column of the week (0 = Sunday). |
| `showOutsideDays` | `boolean` | `-` | Render days from adjacent months. |
| `locale` | `string` | `-` | Locale for month and weekday names. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Calendar size. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Calendar } from "@rocketui-react/core";
import { useState } from "react";

export function Example() {
  const [date, setDate] = useState<Date | null>(null);
  return <Calendar value={date} onChange={setDate} />;
}
```

---

### Card

Container surface that groups related content with padding, border, and optional media.

Use for: container, panel, box, tile.

Exports: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardMedia`

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardMedia } from "@rocketui-react/core";
```

#### Card

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"elevated" \| "outline" \| "ghost"` | `"elevated"` | Surface style. |
| `padding` | `"none" \| "sm" \| "md" \| "lg"` | `"md"` | Inner padding. |
| `interactive` | `boolean` | `false` | Add hover/focus affordances. |
| `asChild` | `boolean` | `false` | Render styles onto the child element. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### CardHeader / CardTitle / CardDescription / CardContent / CardFooter / CardMedia

Structural slots. Each accepts native attributes and className.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@rocketui-react/core";

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
}
```

---

### Carousel

Center-focused slider with peeking neighbours, arrows, and dot indicators.

Use for: carousel, slider, gallery, slideshow, swipe, coverflow.

Exports: `Carousel`, `CarouselItem`

```tsx
import { Carousel, CarouselItem } from "@rocketui-react/core";
```

#### Carousel

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `index` | `number` | `-` | Active slide index (controlled). |
| `defaultIndex` | `number` | `0` | Initial active slide index (uncontrolled). |
| `onIndexChange` | `(index: number) => void` | `-` | Fired with the new active index. |
| `slideWidth` | `number` | `311` | Width of the active (square) slide in pixels; shrinks to fit narrow viewports. |
| `gap` | `number` | `24` | Gap between slides in pixels. |
| `peekScale` | `number` | `0.7` | Scale applied to the non-active side slides. |
| `fadeColor` | `string` | `"var(--color-background)"` | Colour the side slides fade into at their outer edge; set it to match the surface behind the carousel. |
| `loop` | `boolean` | `false` | Wrap from the last slide back to the first. |
| `showArrows` | `boolean` | `true` | Show the previous/next arrow buttons. |
| `showDots` | `boolean` | `true` | Show the dot indicators. |
| `autoPlay` | `boolean` | `false` | Advance automatically; pauses on hover and while dragging. |
| `autoPlayInterval` | `number` | `4000` | Autoplay interval in milliseconds. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### CarouselItem

A single slide. Fills its square slot — give it an image or card as the child.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Carousel, CarouselItem } from "@rocketui-react/core";

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
}
```

---

### Checkbox

Toggle one boolean option, with support for an indeterminate state.

Use for: check, boolean, multi select, agree, opt in.

Exports: `Checkbox`

```tsx
import { Checkbox } from "@rocketui-react/core";
```

#### Checkbox

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `-` | Checked state (controlled). |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled). |
| `indeterminate` | `boolean` | `false` | Mixed state, shown as a horizontal bar. |
| `onCheckedChange` | `(checked: boolean) => void` | `-` | Fired with the next checked value. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Box size. |
| `label` | `ReactNode` | `-` | Inline label next to the box. |
| `description` | `ReactNode` | `-` | Helper text under the label. |
| `disabled` | `boolean` | `false` | Disable the checkbox. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Checkbox } from "@rocketui-react/core";

export function Example() {
  return <Checkbox label="Accept terms" />;
}
```

---

### Chip

Compact label for a status, tag, or removable filter. Full semantic color range.

Use for: tag, status, label, pill, filter, badge.

Exports: `Chip`

```tsx
import { Chip } from "@rocketui-react/core";
```

#### Chip

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"solid" \| "soft" \| "outline"` | `"solid"` | Visual style. |
| `color` | `"neutral" \| "primary" \| "success" \| "warning" \| "destructive" \| "info"` | `"neutral"` | Semantic color. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Chip size. |
| `interactive` | `boolean` | `false` | Add hover/press affordances. |
| `startIcon` | `ReactNode` | `-` | Icon before the label. |
| `onRemove` | `() => void` | `-` | Show a remove button and fire on press. |
| `removeLabel` | `string` | `"Remove"` | Accessible label for the remove button. |
| `disabled` | `boolean` | `false` | Disable the chip. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Chip } from "@rocketui-react/core";

export function Example() {
  return <Chip color="primary">Label</Chip>;
}
```

---

### Context Menu

Menu that opens at the pointer on right-click, reusing the dropdown menu items.

Use for: context menu, right click, rmb, menu, actions.

Exports: `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`

```tsx
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@rocketui-react/core";
```

#### ContextMenu

Root that owns the open state and the pointer position.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `-` | Open state (controlled). |
| `defaultOpen` | `boolean` | `false` | Initial open state. |
| `onOpenChange` | `(open: boolean) => void` | `-` | Fired when open state changes. |

#### ContextMenuTrigger

The region that opens the menu on right-click. Renders a <div>, or the child via asChild.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Merge the trigger behaviour onto the child element. |
| `disabled` | `boolean` | `false` | Disable opening the menu. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### ContextMenuContent

The menu surface, positioned at the pointer and clamped to the viewport.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `closeOnEscape` | `boolean` | `true` | Close when Escape is pressed. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### ContextMenuItem

Same as DropdownMenuItem. ContextMenuLabel, ContextMenuSeparator, ContextMenuGroup and ContextMenuSub* are also re-exported.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSelect` | `() => void` | `-` | Fired on click / Enter / Space. |
| `icon` | `ReactNode` | `-` | Leading icon. |
| `shortcut` | `ReactNode` | `-` | Trailing keyboard shortcut hint. |
| `destructive` | `boolean` | `false` | Style as a dangerous action. |
| `disabled` | `boolean` | `false` | Disable the item. |

Usage:

```tsx
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@rocketui-react/core";
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
}
```

---

### Dialog

Modal overlay for a focused task or a confirmation.

Use for: modal, dialog, popup, confirm, overlay.

Exports: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@rocketui-react/core";
```

#### Dialog

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `-` | Open state (controlled). |
| `defaultOpen` | `boolean` | `false` | Initial open state. |
| `onOpenChange` | `(open: boolean) => void` | `-` | Fired when open state changes. |

#### DialogContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Dialog width. |
| `hideClose` | `boolean` | `false` | Hide the built-in top-right close button. |
| `closeOnOverlayClick` | `boolean` | `true` | Close when the overlay is clicked. |
| `closeOnEscape` | `boolean` | `true` | Close when Escape is pressed. |
| `role` | `"dialog" \| "alertdialog"` | `"dialog"` | Use alertdialog for decision flows. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### DialogHeader

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | `-` | Leading feature icon. |
| `align` | `"row" \| "column"` | `"row"` | Icon beside or above the title. |

Usage:

```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, Button } from "@rocketui-react/core";

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
}
```

---

### Drawer

Panel that slides in from a screen edge for navigation, filters, details, or settings.

Use for: drawer, sheet, side panel, slide over, off-canvas, flyout.

Exports: `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerBody`, `DrawerFooter`, `DrawerClose`

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose } from "@rocketui-react/core";
```

#### Drawer

Root that owns the open state.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `-` | Open state (controlled). |
| `defaultOpen` | `boolean` | `false` | Initial open state. |
| `onOpenChange` | `(open: boolean) => void` | `-` | Fired when open state changes. |

#### DrawerTrigger

Opens the drawer. Renders a <button>, or the child via asChild.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Merge the trigger behaviour onto the child element. |

#### DrawerContent

The sliding panel. Wrap DrawerHeader, DrawerBody and DrawerFooter inside it.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"right" \| "left" \| "top" \| "bottom"` | `"right"` | Edge the panel slides in from. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Panel width (left/right) or height (top/bottom). |
| `hideClose` | `boolean` | `false` | Hide the built-in top-right close button. |
| `closeOnOverlayClick` | `boolean` | `true` | Close when the overlay is clicked. |
| `closeOnEscape` | `boolean` | `true` | Close when Escape is pressed. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### DrawerHeader / DrawerBody / DrawerFooter

Layout slots. DrawerBody scrolls; header and footer stay pinned. DrawerTitle, DrawerDescription and DrawerClose are also exported.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
  DrawerFooter,
  DrawerClose,
  Button,
} from "@rocketui-react/core";

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
}
```

---

### Dropdown Menu

Menu of actions opened from a trigger button.

Use for: menu, actions, context menu, overflow, more options.

Exports: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@rocketui-react/core";
```

#### DropdownMenu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `-` | Open state (controlled). |
| `defaultOpen` | `boolean` | `false` | Initial open state. |
| `onOpenChange` | `(open: boolean) => void` | `-` | Fired when open state changes. |

#### DropdownMenuContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Preferred side. |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Alignment along the side. |
| `sideOffset` | `number` | `8` | Gap between trigger and menu. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### DropdownMenuItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onSelect` | `() => void` | `-` | Fired on click / Enter / Space. |
| `icon` | `ReactNode` | `-` | Leading icon. |
| `shortcut` | `ReactNode` | `-` | Trailing keyboard shortcut hint. |
| `description` | `ReactNode` | `-` | Secondary line beneath the label. |
| `destructive` | `boolean` | `false` | Style as a dangerous action. |
| `closeOnSelect` | `boolean` | `true` | Close the menu after selecting. |
| `disabled` | `boolean` | `false` | Disable the item. |

Usage:

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, Button } from "@rocketui-react/core";

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
}
```

---

### Input

Single-line text field with label, description, and error states.

Use for: text, field, form, email, password, textbox.

Exports: `Input`, `Textarea`

```tsx
import { Input, Textarea } from "@rocketui-react/core";
```

#### Input

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control height. |
| `label` | `ReactNode` | `-` | Label above the control. |
| `required` | `boolean` | `false` | Add a required asterisk. |
| `description` | `ReactNode` | `-` | Helper text below the control. |
| `error` | `ReactNode` | `-` | Error message; sets the error style. |
| `invalid` | `boolean` | `false` | Force the error style. |
| `success` | `boolean` | `false` | Apply the success style. |
| `startContent` | `ReactNode` | `-` | Content before the input. |
| `endContent` | `ReactNode` | `-` | Content after the input. |
| `inputClassName` | `string` | `-` | Class applied to the <input> element. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### Textarea

Shares the Input field props (label, error, size) on a multi-line control and forwards native <textarea> attributes.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Input } from "@rocketui-react/core";

export function Example() {
  return <Input label="Email" placeholder="you@example.com" />;
}
```

---

### Input Otp

Segmented input for one-time codes and PINs.

Use for: otp, code, pin, verification, 2fa.

Exports: `InputOTP`

```tsx
import { InputOTP } from "@rocketui-react/core";
```

#### InputOTP

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `length` | `number` | `6` | Number of code cells. |
| `value` | `string` | `-` | Controlled value. |
| `defaultValue` | `string` | `-` | Uncontrolled initial value. |
| `onChange` | `(value: string) => void` | `-` | Fired on every change. |
| `onComplete` | `(value: string) => void` | `-` | Fired once every cell is filled. |
| `type` | `"numeric" \| "alphanumeric"` | `"numeric"` | Accepted characters. |
| `mask` | `boolean` | `false` | Render characters as dots. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Cell size. |
| `invalid` | `boolean` | `false` | Apply the error style. |
| `disabled` | `boolean` | `false` | Disable the field. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { InputOTP } from "@rocketui-react/core";

export function Example() {
  return <InputOTP length={6} onComplete={(code) => console.log(code)} />;
}
```

---

### Kbd

Render a keyboard key or shortcut inline.

Use for: keyboard, shortcut, hotkey, key.

Exports: `Kbd`

```tsx
import { Kbd } from "@rocketui-react/core";
```

#### Kbd

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `keys` | `KbdKey \| KbdKey[]` | `-` | Named modifier/symbol keys rendered as glyphs. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Key size. |
| `children` | `ReactNode` | `-` | Literal key label, e.g. "K". |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Kbd } from "@rocketui-react/core";

export function Example() {
  return <Kbd keys={["command"]}>K</Kbd>;
}
```

---

### Meter

Show a value inside a known range as a bar, such as usage or capacity.

Use for: meter, gauge, usage, capacity, level, progress.

Exports: `Meter`

```tsx
import { Meter } from "@rocketui-react/core";
```

#### Meter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `-` | Current value (required). |
| `min` | `number` | `0` | Lower bound. |
| `max` | `number` | `100` | Upper bound. |
| `label` | `ReactNode` | `-` | Label above the track. |
| `showValue` | `boolean` | `true` | Show the value on the right. |
| `formatValue` | `(value, percent) => ReactNode` | `-` | Custom value formatter. |
| `color` | `"primary" \| "info" \| "success" \| "warning" \| "destructive"` | `"primary"` | Fill color. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Track thickness. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Meter } from "@rocketui-react/core";

export function Example() {
  return <Meter label="Storage" value={60} />;
}
```

---

### Number Field

Numeric input with stepper buttons and locale formatting.

Use for: number, quantity, stepper, amount, price, currency.

Exports: `NumberField`

```tsx
import { NumberField } from "@rocketui-react/core";
```

#### NumberField

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `-` | Controlled value. |
| `defaultValue` | `number` | `-` | Uncontrolled initial value. |
| `onChange` | `(value: number \| null) => void` | `-` | Fired with the committed, clamped value. |
| `min` | `number` | `-` | Minimum value. |
| `max` | `number` | `-` | Maximum value. |
| `step` | `number` | `1` | Increment for steppers and arrows. |
| `formatOptions` | `Intl.NumberFormatOptions` | `-` | Formatting (currency, percent, units). |
| `locale` | `string` | `-` | Locale for formatting. |
| `startContent` | `ReactNode` | `-` | Content before the value. |
| `endContent` | `ReactNode` | `-` | Content after the value. |
| `hideSteppers` | `boolean` | `false` | Hide the +/- buttons. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control height. |
| `label` | `ReactNode` | `-` | Label above the control. |
| `disabled` | `boolean` | `false` | Disable the field. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { NumberField } from "@rocketui-react/core";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState(1);
  return <NumberField label="Quantity" value={value} onChange={setValue} />;
}
```

---

### Pagination

Move between pages of a data set.

Use for: pages, pager, next, previous.

Exports: `Pagination`

```tsx
import { Pagination } from "@rocketui-react/core";
```

#### Pagination

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `total` | `number` | `-` | Total number of pages. |
| `page` | `number` | `-` | Active page (controlled). |
| `defaultPage` | `number` | `1` | Active page (uncontrolled). |
| `onPageChange` | `(page: number) => void` | `-` | Fired when the page changes. |
| `siblings` | `number` | `1` | Pages shown around the current page. |
| `boundaries` | `number` | `1` | Pages shown at the start/end. |
| `showControls` | `boolean` | `true` | Show Previous/Next buttons. |
| `showPages` | `boolean` | `true` | Show numbered page links. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control size. |
| `disabled` | `boolean` | `false` | Disable navigation. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Pagination } from "@rocketui-react/core";
import { useState } from "react";

export function Example() {
  const [page, setPage] = useState(1);
  return <Pagination total={10} page={page} onPageChange={setPage} />;
}
```

---

### Popover

Floating panel anchored to a trigger for secondary content.

Use for: floating, overlay, anchored panel, flyout.

Exports: `Popover`, `PopoverTrigger`, `PopoverContent`

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@rocketui-react/core";
```

#### Popover

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `-` | Open state (controlled). |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled). |
| `onOpenChange` | `(open: boolean) => void` | `-` | Fired when open state changes. |

#### PopoverTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Merge props onto the child element. |

#### PopoverContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Preferred side. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment along the side. |
| `sideOffset` | `number` | `8` | Gap between trigger and content. |
| `showArrow` | `boolean` | `true` | Render the pointing arrow. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Popover, PopoverTrigger, PopoverContent, Button } from "@rocketui-react/core";

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  );
}
```

---

### Radio Group

Choose exactly one option from a small, visible set.

Use for: radio, single choice, options, select one.

Exports: `RadioGroup`, `Radio`, `RadioCard`

```tsx
import { RadioGroup, Radio, RadioCard } from "@rocketui-react/core";
```

#### RadioGroup

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Selected value (controlled). |
| `defaultValue` | `string` | `-` | Selected value (uncontrolled). |
| `onValueChange` | `(value: string) => void` | `-` | Fired with the new value. |
| `name` | `string` | `-` | Shared form field name. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Layout direction. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control size. |
| `disabled` | `boolean` | `false` | Disable every option. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### Radio / RadioCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | The option's value (required). |
| `label` | `ReactNode` | `-` | Option label. |
| `description` | `ReactNode` | `-` | Helper text under the label. |
| `icon` | `ReactNode` | `-` | Leading media (RadioCard only). |
| `disabled` | `boolean` | `false` | Disable this option. |

Usage:

```tsx
import { RadioGroup, Radio } from "@rocketui-react/core";

export function Example() {
  return (
    <RadioGroup defaultValue="a">
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
    </RadioGroup>
  );
}
```

---

### Scroll Shadow

Fade the edges of a scrollable area to signal that more content is off-screen.

Use for: scroll, overflow, fade, edge shadow.

Exports: `ScrollShadow`

```tsx
import { ScrollShadow } from "@rocketui-react/core";
```

#### ScrollShadow

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Scroll axis the shadow reacts to. |
| `size` | `number` | `40` | Length of the fade in pixels. |
| `offset` | `number` | `0` | Slack before an edge shadow appears. |
| `isEnabled` | `boolean` | `true` | Toggle the fade effect. |
| `hideScrollBar` | `boolean` | `false` | Hide the native scrollbar. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { ScrollShadow } from "@rocketui-react/core";

export function Example() {
  return (
    <ScrollShadow className="max-h-40">
      <p>{longText}</p>
    </ScrollShadow>
  );
}
```

---

### Search Field

Text input built for search and filtering, with a search icon, a clear button, and clear-on-Escape.

Use for: search, filter, find, query, lookup.

Exports: `SearchField`

```tsx
import { SearchField } from "@rocketui-react/core";
```

#### SearchField

Also inherits the Input props (size, label, description, error).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Query (controlled). |
| `defaultValue` | `string` | `-` | Query (uncontrolled). |
| `onValueChange` | `(value: string) => void` | `-` | Fired on every change and on clear. |
| `onClear` | `() => void` | `-` | Fired when cleared via the button or Escape. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { SearchField } from "@rocketui-react/core";
import { useState } from "react";

export function Example() {
  const [query, setQuery] = useState("");
  return <SearchField label="Search" value={query} onValueChange={setQuery} />;
}
```

---

### Select

Dropdown for picking one option from a list.

Use for: dropdown, select, options, picker, combobox.

Exports: `Select`

```tsx
import { Select } from "@rocketui-react/core";
```

#### Select

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `SelectOption[]` | `-` | The list of selectable options. |
| `value` | `string \| null` | `-` | Selected value (controlled). |
| `defaultValue` | `string \| null` | `-` | Selected value (uncontrolled). |
| `onValueChange` | `(value: string) => void` | `-` | Fired with the new value. |
| `placeholder` | `string` | `"Select an option"` | Empty-state text. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Trigger height. |
| `label` | `ReactNode` | `-` | Label above the trigger. |
| `error` | `ReactNode` | `-` | Error message; sets the error style. |
| `disabled` | `boolean` | `false` | Disable the select. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### SelectOption

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Unique value. |
| `label` | `string` | `-` | Display text. |
| `description` | `string` | `-` | Secondary line under the label. |
| `group` | `string` | `-` | Section heading for consecutive options. |
| `disabled` | `boolean` | `-` | Disable this option. |

Usage:

```tsx
import { Select } from "@rocketui-react/core";

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
}
```

---

### Sidebar

Vertical app navigation with a brand header, active items, collapsible groups, and a pinned footer.

Use for: sidebar, navigation, nav, menu, app shell, side nav.

Exports: `Sidebar`, `SidebarHeader`, `SidebarSection`, `SidebarItem`, `SidebarGroup`, `SidebarSubItem`, `SidebarSeparator`, `SidebarFooter`

```tsx
import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarGroup, SidebarSubItem, SidebarSeparator, SidebarFooter } from "@rocketui-react/core";
```

#### Sidebar

The shell and selection owner. Renders a <nav>; give items a value and they become active on click. Set a height (e.g. h-screen) to pin the footer.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Value of the selected item (controlled). |
| `defaultValue` | `string` | `-` | Value of the initially selected item (uncontrolled). |
| `onValueChange` | `(value: string) => void` | `-` | Fired with the value of the item that was selected. |
| `className` | `string` | `-` | Extra classes merged onto the root element (e.g. width or height). |

#### SidebarItem

A primary navigation row. Renders a <button>, or the child element via asChild.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `ReactNode` | `-` | Leading icon element. |
| `value` | `string` | `-` | Selection id. Selected on click and matched against the Sidebar value to set the active state. |
| `active` | `boolean` | `-` | Force the active state, overriding value-based selection. |
| `trailing` | `ReactNode` | `-` | Trailing content, e.g. a badge or count. |
| `asChild` | `boolean` | `false` | Render styles onto the child (e.g. an <a> or router link). |
| `onClick` | `(e) => void` | `-` | Fired on press, after selection. |
| `disabled` | `boolean` | `false` | Disable the item. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### SidebarGroup

A labelled group that expands and collapses a tree of sub-items.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `-` | Group label shown on the trigger. Required. |
| `icon` | `ReactNode` | `-` | Leading icon for the trigger. |
| `open` | `boolean` | `-` | Open state (controlled). |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled). |
| `onOpenChange` | `(open: boolean) => void` | `-` | Fired when the open state changes. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### SidebarSubItem

A nested link inside a SidebarGroup, drawn with a tree connector.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Selection id. Selected on click and matched against the Sidebar value. |
| `active` | `boolean` | `-` | Force the active state, overriding value-based selection. |
| `asChild` | `boolean` | `false` | Render styles onto the child element. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### SidebarHeader / SidebarSection / SidebarFooter / SidebarSeparator

Structural slots. Header holds the brand, Section groups items, Footer pins to the bottom, Separator draws a divider.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import {
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
  SidebarGroup,
  SidebarSubItem,
  SidebarSeparator,
  SidebarFooter,
} from "@rocketui-react/core";
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
}
```

---

### Skeleton

Placeholder blocks shown while content is loading.

Use for: loading, placeholder, shimmer, loader.

Exports: `Skeleton`

```tsx
import { Skeleton } from "@rocketui-react/core";
```

#### Skeleton

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"rect" \| "circle" \| "text"` | `"rect"` | Shape preset. |
| `width` | `number \| string` | `-` | Explicit width (number → px). |
| `height` | `number \| string` | `-` | Explicit height (number → px). |
| `animated` | `boolean` | `true` | Toggle the pulse animation. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Skeleton } from "@rocketui-react/core";

export function Example() {
  return <Skeleton variant="text" width={200} />;
}
```

---

### Slider

Pick a numeric value or range by dragging along a track.

Use for: range, slider, value, drag, min max.

Exports: `Slider`

```tsx
import { Slider } from "@rocketui-react/core";
```

#### Slider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number \| number[]` | `-` | Value(s) (controlled). Array for a range. |
| `defaultValue` | `number \| number[]` | `-` | Value(s) (uncontrolled). |
| `onValueChange` | `(value: number \| number[]) => void` | `-` | Fired while dragging. |
| `onValueCommit` | `(value: number \| number[]) => void` | `-` | Fired when interaction settles. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Snap increment. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Track direction. |
| `label` | `ReactNode` | `-` | Label above the track. |
| `showValue` | `boolean \| (v) => ReactNode` | `false` | Show/format the current value(s). |
| `minStepsBetweenThumbs` | `number` | `0` | Gap enforced between range thumbs. |
| `disabled` | `boolean` | `false` | Disable the slider. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Slider } from "@rocketui-react/core";
import { useState } from "react";

export function Example() {
  const [value, setValue] = useState(60);
  return <Slider label="Storage" showValue value={value} onValueChange={setValue} />;
}
```

---

### Stat Card

Compact KPI tile with a label, headline value, trend chip, and caption.

Use for: stat, kpi, metric, dashboard, summary, trend.

Exports: `StatCard`

```tsx
import { StatCard } from "@rocketui-react/core";
```

#### StatCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` | `-` | Metric name shown at the top. Required. |
| `value` | `ReactNode` | `-` | The headline value, e.g. a number or currency. Required. |
| `icon` | `ReactNode` | `-` | Leading icon shown top-right. |
| `description` | `ReactNode` | `-` | Supporting caption under the value. |
| `trend` | `StatCardTrend` | `-` | Trend chip beside the value. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### StatCardTrend

The shape of the trend prop.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `ReactNode` | `-` | The delta label, e.g. "10.5%". Required. |
| `direction` | `"up" \| "down"` | `"up"` | Arrow direction. |
| `color` | `"neutral" \| "primary" \| "success" \| "warning" \| "destructive" \| "info"` | `-` | Chip colour. Defaults to success for up and destructive for down. |

Usage:

```tsx
import { StatCard } from "@rocketui-react/core";
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
}
```

---

### Surface

Low-level styled container primitive with configurable elevation.

Use for: container, panel, elevation, surface, sheet.

Exports: `Surface`

```tsx
import { Surface } from "@rocketui-react/core";
```

#### Surface

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"elevated" \| "outline" \| "filled" \| "ghost"` | `"elevated"` | Surface style. |
| `radius` | `"none" \| "md" \| "lg" \| "xl" \| "full"` | `"xl"` | Corner rounding. |
| `padding` | `"none" \| "sm" \| "md" \| "lg"` | `"lg"` | Inner padding. |
| `interactive` | `boolean` | `false` | Add hover/focus affordances. |
| `asChild` | `boolean` | `false` | Render styles onto the child element. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Surface } from "@rocketui-react/core";

export function Example() {
  return <Surface variant="elevated">Content</Surface>;
}
```

---

### Table

Show structured data in rows and columns, with selection and sorting.

Use for: table, grid, rows, columns, data, list.

Exports: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@rocketui-react/core";
```

#### Table

Root wrapper that renders a rounded, scrollable surface around a <table>.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `containerProps` | `ComponentProps<'div'>` | `-` | Props for the scrollable wrapper element. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### TableRow

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `selected` | `boolean` | `false` | Highlight the row as selected. |
| `interactive` | `boolean` | `false` | Add hover affordance and pointer cursor. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### TableHeader / TableBody / TableFooter / TableHead / TableCell / TableCaption

Structural slots mapping to thead, tbody, tfoot, th, td and caption. Each forwards native attributes and className.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@rocketui-react/core";

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
}
```

---

### Tabs

Switch between related views within the same space.

Use for: tabs, sections, views, segmented navigation.

Exports: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@rocketui-react/core";
```

#### Tabs

Root element that owns the selected value and provides context.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Selected tab value (controlled). |
| `defaultValue` | `string` | `-` | Initial value (uncontrolled). |
| `onValueChange` | `(value: string) => void` | `-` | Fires when the selection changes. |
| `size` | `"sm" \| "md"` | `"md"` | Scales the track and triggers. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### TabsList

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `fullWidth` | `boolean` | `false` | Stretch triggers to fill the width. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### TabsTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Value this trigger selects. Required. |
| `disabled` | `boolean` | `false` | Disable and skip during keyboard nav. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

#### TabsContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | `-` | Value that shows this panel. Required. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@rocketui-react/core";

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
}
```

---

### Toggle

On or off switch for a single setting.

Use for: switch, toggle, on off, enable, boolean setting.

Exports: `Toggle`

```tsx
import { Toggle } from "@rocketui-react/core";
```

#### Toggle

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | `-` | On/off state (controlled). |
| `defaultChecked` | `boolean` | `false` | Initial state (uncontrolled). |
| `onCheckedChange` | `(checked: boolean) => void` | `-` | Fired with the next state on toggle. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Switch size. |
| `label` | `ReactNode` | `-` | Inline label next to the switch. |
| `description` | `ReactNode` | `-` | Helper text under the label. |
| `labelPosition` | `"start" \| "end"` | `"end"` | Place the label before or after the switch. |
| `disabled` | `boolean` | `false` | Disable the toggle. |
| `className` | `string` | `-` | Extra classes merged onto the root element. |

Usage:

```tsx
import { Toggle } from "@rocketui-react/core";

export function Example() {
  return <Toggle label="Do you ship internationally?" defaultChecked />;
}
```
