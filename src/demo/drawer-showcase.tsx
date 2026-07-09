import type { ReactNode } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Basic                                     */
/* -------------------------------------------------------------------------- */

const basicExample = (
  <Drawer>
    <DrawerTrigger asChild>
      <Button>Open drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Account settings</DrawerTitle>
        <DrawerDescription>
          Manage your profile and preferences. Changes are saved instantly.
        </DrawerDescription>
      </DrawerHeader>
      <DrawerBody>
        <div className="flex flex-col gap-4">
          <Input label="Display name" defaultValue="Alex Morgan" />
          <Input label="Email" defaultValue="alex@example.com" />
          <Toggle label="Email notifications" defaultChecked />
          <Toggle label="Two-factor authentication" />
        </div>
      </DrawerBody>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button>Save changes</Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button variant="soft" color="neutral">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

const BASIC_CODE = `<Drawer>
  <DrawerTrigger asChild>
    <Button>Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Account settings</DrawerTitle>
      <DrawerDescription>
        Manage your profile and preferences.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <div className="flex flex-col gap-4">
        <Input label="Display name" defaultValue="Alex Morgan" />
        <Input label="Email" defaultValue="alex@example.com" />
        <Toggle label="Email notifications" defaultChecked />
        <Toggle label="Two-factor authentication" />
      </div>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button>Save changes</Button>
      </DrawerClose>
      <DrawerClose asChild>
        <Button variant="soft" color="neutral">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`;

/* -------------------------------------------------------------------------- */
/*                                   Sides                                     */
/* -------------------------------------------------------------------------- */

const SIDES = ["right", "left", "top", "bottom"] as const;

const sideCards: Atom[] = SIDES.map((side) => ({
  label: side,
  node: (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="soft" color="neutral">
          {side}
        </Button>
      </DrawerTrigger>
      <DrawerContent side={side}>
        <DrawerHeader>
          <DrawerTitle>Slides from {side}</DrawerTitle>
          <DrawerDescription>
            Set the side prop to choose which edge the panel enters from.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-muted-foreground">
            The overlay dims the page, focus is trapped inside, and Escape or an
            outside click dismisses the drawer.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  code: `<DrawerContent side="${side}">
  <DrawerHeader>
    <DrawerTitle>Slides from ${side}</DrawerTitle>
  </DrawerHeader>
  <DrawerBody>…</DrawerBody>
</DrawerContent>`,
}));

/* -------------------------------------------------------------------------- */
/*                                   Sizes                                     */
/* -------------------------------------------------------------------------- */

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="soft" color="neutral">
          Open {size}
        </Button>
      </DrawerTrigger>
      <DrawerContent size={size}>
        <DrawerHeader>
          <DrawerTitle>Width: {size}</DrawerTitle>
          <DrawerDescription>
            size controls the panel width for left/right, or height for top/bottom.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-muted-foreground">
            Pick the size that fits the content without crowding the page.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
  code: `<DrawerContent size="${size}">…</DrawerContent>`,
}));

export function DrawerShowcase() {
  return (
    <ComponentPage
      id="drawer"
      title="Drawer"
      description="A panel that slides in from a screen edge when its trigger is pressed. It shares the Dialog primitives — focus trap, scroll lock, Escape and overlay dismissal — and is ideal for navigation, filters, details and settings."
    >
      <Subsection
        title="Basic"
        description="A right-side settings panel with a header, a scrollable body, and a footer of actions."
      >
        <Demo code={BASIC_CODE} align="start">
          {basicExample}
        </Demo>
      </Subsection>

      <Subsection
        title="Sides"
        description="Slide in from any edge with the side prop: right (default), left, top, or bottom."
      >
        <DemoGrid cols={2}>
          {sideCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Constrain the panel with sm, md, and lg."
      >
        <DemoGrid cols={3}>
          {sizeCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
