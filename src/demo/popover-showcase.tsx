import { Plus } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  type PopoverSide,
} from "@/components/ui/popover";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

const AVATAR = "https://i.pravatar.cc/128?img=13";
const COPY =
  "You've successfully added credits to your account. Start generating images with more customization.";

export function PopoverShowcase() {
  return (
    <ComponentPage
      id="popover"
      title="Popover"
      description="Displays rich content anchored to a trigger. Handles positioning, an optional arrow, outside-click and Escape dismissal, and focus management. Content is fully composable."
    >
      <Subsection
        title="Basic"
        description="A title and description anchored below the trigger with a pointing arrow."
      >
        <Demo
          code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="soft" color="neutral">Show details</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Credit purchased successfully!</PopoverTitle>
    <PopoverDescription className="mt-1.5">{COPY}</PopoverDescription>
  </PopoverContent>
</Popover>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="soft" color="neutral">
                Show details
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverTitle>Credit purchased successfully!</PopoverTitle>
              <PopoverDescription className="mt-1.5">{COPY}</PopoverDescription>
            </PopoverContent>
          </Popover>
        </Demo>
      </Subsection>

      <Subsection
        title="Placement"
        description="Anchor the panel to any side of the trigger. Combine with align='start' | 'center' | 'end' for finer control."
      >
        <DemoGrid cols={2}>
          {(["top", "bottom", "left", "right"] as PopoverSide[]).map((side) => (
            <Demo
              key={side}
              label={side}
              code={`<PopoverContent side="${side}">…</PopoverContent>`}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="soft" color="neutral">
                    {side}
                  </Button>
                </PopoverTrigger>
                <PopoverContent side={side} className="w-64">
                  <PopoverTitle>Credit purchased!</PopoverTitle>
                  <PopoverDescription className="mt-1.5">
                    Credits added to your account.
                  </PopoverDescription>
                </PopoverContent>
              </Popover>
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Without arrow"
        description="Set showArrow={false} for a detached panel."
      >
        <Demo
          code={`<PopoverContent showArrow={false}>…</PopoverContent>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="soft" color="neutral">
                Show details
              </Button>
            </PopoverTrigger>
            <PopoverContent showArrow={false}>
              <PopoverTitle>Credit purchased successfully!</PopoverTitle>
              <PopoverDescription className="mt-1.5">{COPY}</PopoverDescription>
            </PopoverContent>
          </Popover>
        </Demo>
      </Subsection>

      <Subsection
        title="Rich content"
        description="Compose any content — here a profile card with an avatar, identity and an action."
      >
        <Demo
          code={`<PopoverContent>
  <div className="flex items-center gap-3">
    <Avatar src={AVATAR} name="Alex" size="lg" />
    <div className="min-w-0 flex-1">
      <p className="text-sm font-medium text-foreground">Alex</p>
      <p className="truncate text-sm text-muted-foreground">alex@gmail.com</p>
    </div>
    <Button iconOnly size="sm" aria-label="Add friend">
      <Plus weight="bold" />
    </Button>
  </div>
  <PopoverDescription className="mt-4">{COPY}</PopoverDescription>
</PopoverContent>`}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="soft" color="neutral">
                View profile
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex items-center gap-3">
                <Avatar src={AVATAR} name="Alex" size="lg" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">Alex</p>
                  <p className="truncate text-sm text-muted-foreground">
                    alex@gmail.com
                  </p>
                </div>
                <Button iconOnly size="sm" aria-label="Add friend">
                  <Plus weight="bold" />
                </Button>
              </div>
              <PopoverDescription className="mt-4">{COPY}</PopoverDescription>
            </PopoverContent>
          </Popover>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
