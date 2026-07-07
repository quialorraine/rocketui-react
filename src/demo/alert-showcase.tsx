import { useState, type ReactNode } from "react";
import { Images, Trash } from "@phosphor-icons/react";
import { Alert, AlertDescription, AlertLink } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

/** Demo helper so dismiss can be shown and restored. */
function Dismissible({ render }: { render: (close: () => void) => ReactNode }) {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-fit text-sm font-medium text-info transition-colors hover:underline"
      >
        Show alert again
      </button>
    );
  }
  return <>{render(() => setOpen(false))}</>;
}

const statusVariants: Atom[] = [
  {
    label: "success",
    node: (
      <div className="w-full max-w-md">
        <Dismissible
          render={(close) => (
            <Alert
              variant="success"
              title="Credit purchased successfully!"
              onClose={close}
            >
              You've successfully added credits to your account. Start
              generating images with more customization.
            </Alert>
          )}
        />
      </div>
    ),
    code: `<Alert\n  variant="success"\n  title="Credit purchased successfully!"\n  onClose={() => setOpen(false)}\n>\n  You've successfully added credits to your account. Start\n  generating images with more customization.\n</Alert>`,
  },
  {
    label: "info + link",
    node: (
      <div className="w-full max-w-md">
        <Dismissible
          render={(close) => (
            <Alert
              variant="info"
              title="We've moved things around"
              onClose={close}
            >
              <AlertDescription>
                With new features on the horizon, we're updating a few things.
              </AlertDescription>
              <AlertLink href="#">See what's changed</AlertLink>
            </Alert>
          )}
        />
      </div>
    ),
    code: `<Alert\n  variant="info"\n  title="We've moved things around"\n  onClose={() => setOpen(false)}\n>\n  <AlertDescription>\n    With new features on the horizon, we're updating a few things.\n  </AlertDescription>\n  <AlertLink href="#">See what's changed</AlertLink>\n</Alert>`,
  },
  {
    label: "warning",
    node: (
      <div className="w-full max-w-md">
        <Dismissible
          render={(close) => (
            <Alert
              variant="warning"
              title="Your trial ends in 3 days"
              onClose={close}
            >
              Upgrade now to keep access to premium models and higher limits.
            </Alert>
          )}
        />
      </div>
    ),
    code: `<Alert\n  variant="warning"\n  title="Your trial ends in 3 days"\n  onClose={() => setOpen(false)}\n>\n  Upgrade now to keep access to premium models and higher limits.\n</Alert>`,
  },
  {
    label: "destructive",
    node: (
      <div className="w-full max-w-md">
        <Dismissible
          render={(close) => (
            <Alert
              variant="destructive"
              title="Payment failed"
              onClose={close}
            >
              We couldn't process your last payment. Update your billing
              details to avoid interruption.
            </Alert>
          )}
        />
      </div>
    ),
    code: `<Alert\n  variant="destructive"\n  title="Payment failed"\n  onClose={() => setOpen(false)}\n>\n  We couldn't process your last payment. Update your billing\n  details to avoid interruption.\n</Alert>`,
  },
];

const COMPACT_CODE = `<Alert
  title="32 images archived"
  icon={<Images />}
  action={<AlertLink as="button">Undo</AlertLink>}
  onClose={() => setOpen(false)}
/>`;

const CONFIRMATION_CODE = `<Alert
  variant="destructive"
  title="Delete conversation?"
  icon={<Trash weight="fill" />}
  onClose={() => {}}
>
  <AlertDescription>
    Browse our products, add items to your cart, and proceed to
    checkout. You'll need to provide shipping and payment information to
    complete your purchase.
  </AlertDescription>
  <div className="flex gap-3">
    <Button size="sm" color="destructive">
      Delete
    </Button>
    <Button size="sm" variant="soft" color="neutral">
      Cancel
    </Button>
  </div>
</Alert>`;

const CUSTOM_MEDIA_CODE = `<Alert
  title="Credit purchased successfully!"
  icon={
    <span className="block size-12 rounded-lg bg-gradient-to-br from-fuchsia-400 via-violet-400 to-indigo-500" />
  }
  onClose={() => {}}
>
  You've successfully added credits to your account.
</Alert>`;

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: (
    <div className="w-full max-w-md">
      <Alert
        variant="success"
        size={size}
        title="Credit purchased successfully!"
        onClose={() => {}}
      >
        You've successfully added credits to your account.
      </Alert>
    </div>
  ),
  code: `<Alert\n  variant="success"\n  size="${size}"\n  title="Credit purchased successfully!"\n  onClose={() => {}}\n>\n  You've successfully added credits to your account.\n</Alert>`,
}));

export function AlertShowcase() {
  return (
    <ComponentPage
      id="alert"
      title="Alert"
      description="Display important messages and notifications to users with status indicators. Supports status variants, dismissal, inline actions, and rich bodies."
    >
      <Subsection
        title="Status variants"
        description="Each variant sets a status icon and color while keeping a clean surface. Provide a title, optional body, and a dismiss handler."
      >
        <DemoGrid cols={2}>
          {statusVariants.map((a) => (
            <Demo
              key={a.label}
              label={a.label}
              code={a.code}
              className="justify-start"
            >
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Compact, with inline action"
        description="A single-line notification with a trailing action next to the dismiss button."
      >
        <Demo className="justify-start" code={COMPACT_CODE}>
          <div className="w-full max-w-md">
            <Dismissible
              render={(close) => (
                <Alert
                  title="32 images archived"
                  icon={<Images />}
                  action={<AlertLink as="button">Undo</AlertLink>}
                  onClose={close}
                />
              )}
            />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Confirmation with actions"
        description="Compose buttons into the body for destructive confirmations. Override the icon to match the action."
      >
        <Demo className="justify-start" code={CONFIRMATION_CODE}>
          <div className="w-full max-w-md">
            <Alert
              variant="destructive"
              title="Delete conversation?"
              icon={<Trash weight="fill" />}
              onClose={() => {}}
            >
              <AlertDescription>
                Browse our products, add items to your cart, and proceed to
                checkout. You'll need to provide shipping and payment information to
                complete your purchase.
              </AlertDescription>
              <div className="flex gap-3">
                <Button size="sm" color="destructive">
                  Delete
                </Button>
                <Button size="sm" variant="soft" color="neutral">
                  Cancel
                </Button>
              </div>
            </Alert>
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Custom media"
        description="Swap the status icon for any node — an avatar, product thumbnail, or illustration."
      >
        <Demo className="justify-start" code={CUSTOM_MEDIA_CODE}>
          <div className="w-full max-w-md">
            <Alert
              title="Credit purchased successfully!"
              icon={
                <span className="block size-12 rounded-lg bg-gradient-to-br from-fuchsia-400 via-violet-400 to-indigo-500" />
              }
              onClose={() => {}}
            >
              You've successfully added credits to your account.
            </Alert>
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Padding, icon, and typography scale together across sm, md, and lg."
      >
        <DemoGrid cols={1}>
          {sizeCards.map((a) => (
            <Demo
              key={a.label}
              label={a.label}
              code={a.code}
              className="justify-start"
            >
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
