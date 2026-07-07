import type { ReactNode } from "react";
import { PiggyBank, Trash } from "@phosphor-icons/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

const MOVE_COPY = "With new features on the horizon, we're updating a few things.";
const CONFIRM_COPY =
  "This will permanently remove the conversation and everything in it. This action cannot be undone.";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

/* -------------------------------------------------------------------------- */
/*                              Feature icon                                   */
/* -------------------------------------------------------------------------- */

const featureCards: Atom[] = [
  {
    label: "Single action",
    node: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="soft" color="neutral">
            Open
          </Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader align="column" icon={<PiggyBank weight="fill" />}>
            <DialogTitle>We've moved things around</DialogTitle>
            <DialogDescription>{MOVE_COPY}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full">Got it</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="soft" color="neutral">Open</Button>
  </DialogTrigger>
  <DialogContent size="sm">
    <DialogHeader align="column" icon={<PiggyBank weight="fill" />}>
      <DialogTitle>We've moved things around</DialogTitle>
      <DialogDescription>{MOVE_COPY}</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button className="w-full">Got it</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  {
    label: "Two actions",
    node: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="soft" color="neutral">
            Open
          </Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader align="column" icon={<PiggyBank weight="fill" />}>
            <DialogTitle>We've moved things around</DialogTitle>
            <DialogDescription>{MOVE_COPY}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="flex-1">Confirm</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="soft" color="neutral" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `<DialogContent size="sm">
  <DialogHeader align="column" icon={<PiggyBank weight="fill" />}>
    <DialogTitle>We've moved things around</DialogTitle>
    <DialogDescription>{MOVE_COPY}</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <DialogClose asChild>
      <Button className="flex-1">Confirm</Button>
    </DialogClose>
    <DialogClose asChild>
      <Button variant="soft" color="neutral" className="flex-1">
        Cancel
      </Button>
    </DialogClose>
  </DialogFooter>
</DialogContent>`,
  },
];

/* -------------------------------------------------------------------------- */
/*                              Without icon                                   */
/* -------------------------------------------------------------------------- */

const basicCards: Atom[] = [
  {
    label: "Single action",
    node: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="soft" color="neutral">
            Open
          </Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>We've moved things</DialogTitle>
            <DialogDescription>{MOVE_COPY}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-full">Got it</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `<DialogContent size="sm">
  <DialogHeader>
    <DialogTitle>We've moved things</DialogTitle>
    <DialogDescription>{MOVE_COPY}</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <DialogClose asChild>
      <Button className="w-full">Got it</Button>
    </DialogClose>
  </DialogFooter>
</DialogContent>`,
  },
  {
    label: "Two actions",
    node: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="soft" color="neutral">
            Open
          </Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>We've moved things</DialogTitle>
            <DialogDescription>{MOVE_COPY}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="flex-1">Confirm</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="soft" color="neutral" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `<DialogContent size="sm">
  <DialogHeader>
    <DialogTitle>We've moved things</DialogTitle>
    <DialogDescription>{MOVE_COPY}</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <DialogClose asChild>
      <Button className="flex-1">Confirm</Button>
    </DialogClose>
    <DialogClose asChild>
      <Button variant="soft" color="neutral" className="flex-1">
        Cancel
      </Button>
    </DialogClose>
  </DialogFooter>
</DialogContent>`,
  },
];

/* -------------------------------------------------------------------------- */
/*                               Confirmation                                 */
/* -------------------------------------------------------------------------- */

const confirmationExample = (
  <Dialog>
    <DialogTrigger asChild>
      <Button color="destructive">Delete conversation</Button>
    </DialogTrigger>
    <DialogContent role="alertdialog" size="sm" closeOnOverlayClick={false}>
      <DialogHeader icon={<Trash weight="fill" className="text-destructive" />}>
        <DialogTitle>Delete conversation?</DialogTitle>
        <DialogDescription>{CONFIRM_COPY}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button color="destructive">Delete</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="soft" color="neutral">
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const CONFIRMATION_CODE = `<Dialog>
  <DialogTrigger asChild>
    <Button color="destructive">Delete conversation</Button>
  </DialogTrigger>
  <DialogContent role="alertdialog" size="sm" closeOnOverlayClick={false}>
    <DialogHeader icon={<Trash weight="fill" className="text-destructive" />}>
      <DialogTitle>Delete conversation?</DialogTitle>
      <DialogDescription>{CONFIRM_COPY}</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button color="destructive">Delete</Button>
      </DialogClose>
      <DialogClose asChild>
        <Button variant="soft" color="neutral">Cancel</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

/* -------------------------------------------------------------------------- */
/*                                   Sizes                                     */
/* -------------------------------------------------------------------------- */

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="soft" color="neutral">
          Open {size}
        </Button>
      </DialogTrigger>
      <DialogContent size={size}>
        <DialogHeader>
          <DialogTitle>Dialog size: {size}</DialogTitle>
          <DialogDescription>{CONFIRM_COPY}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  code: `<DialogContent size="${size}">
  <DialogHeader>
    <DialogTitle>Dialog size: ${size}</DialogTitle>
    <DialogDescription>{CONFIRM_COPY}</DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <DialogClose asChild>
      <Button>Got it</Button>
    </DialogClose>
  </DialogFooter>
</DialogContent>`,
}));

export function ModalShowcase() {
  return (
    <ComponentPage
      id="dialog"
      title="Dialog"
      description="Modal dialog for focused tasks and critical confirmations. Handles focus trapping, scroll lock, Escape, overlay dismissal, and accessible roles."
    >
      <Subsection
        title="Feature icon"
        description="Stack a large feature icon above the title with align='column'. Use one full-width action, or two side-by-side."
      >
        <DemoGrid cols={2}>
          {featureCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Without icon"
        description="A compact title + description modal. The close button sits in the top-right corner."
      >
        <DemoGrid cols={2}>
          {basicCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Confirmation (alert dialog)"
        description="Use role='alertdialog' with a leading icon for destructive decisions. Overlay dismissal is disabled so the choice is explicit."
      >
        <Demo code={CONFIRMATION_CODE} align="start">
          {confirmationExample}
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Constrain the panel width with sm, md, and lg."
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
