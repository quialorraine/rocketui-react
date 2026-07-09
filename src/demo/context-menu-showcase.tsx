import {
  ArrowsClockwise,
  ArrowSquareOut,
  Copy,
  DownloadSimple,
  PencilSimple,
  Scissors,
  Share,
  Trash,
  ClipboardText,
  Star,
} from "@phosphor-icons/react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

function DropZone({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-48 w-full place-items-center rounded-2xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground select-none">
      {children}
    </div>
  );
}

const BASIC_CODE = `<ContextMenu>
  <ContextMenuTrigger>
    <div className="grid h-48 place-items-center rounded-2xl border border-dashed">
      Right-click here
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem icon={<Copy />} shortcut="⌘C">Copy</ContextMenuItem>
    <ContextMenuItem icon={<Scissors />} shortcut="⌘X">Cut</ContextMenuItem>
    <ContextMenuItem icon={<ClipboardText />} shortcut="⌘V">Paste</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem icon={<Trash />} destructive shortcut="⌫">
      Delete
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

const RICH_CODE = `<ContextMenu>
  <ContextMenuTrigger>
    <div className="grid h-48 place-items-center rounded-2xl border border-dashed">
      Right-click the file
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuLabel>Actions</ContextMenuLabel>
    <ContextMenuGroup>
      <ContextMenuItem icon={<PencilSimple />}>Rename</ContextMenuItem>
      <ContextMenuItem icon={<Star />}>Add to favorites</ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger icon={<Share />}>Share</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem icon={<ArrowSquareOut />}>Copy link</ContextMenuItem>
        <ContextMenuItem icon={<DownloadSimple />}>Export</ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuItem icon={<ArrowsClockwise />}>Refresh</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem icon={<Trash />} destructive>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

export function ContextMenuShowcase() {
  return (
    <ComponentPage
      id="context-menu"
      title="Context Menu"
      description="A menu that opens at the pointer on right-click. It reuses the DropdownMenu items, so icons, shortcuts, descriptions, destructive actions and submenus all work the same way. Navigate with the mouse or the arrow keys."
    >
      <Subsection
        title="Right-click to open"
        description="Wrap any region in a trigger. The menu appears at the cursor and stays inside the viewport."
      >
        <Demo code={BASIC_CODE} className="block p-8">
          <ContextMenu>
            <ContextMenuTrigger>
              <DropZone>Right-click here</DropZone>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem icon={<Copy />} shortcut="⌘C">
                Copy
              </ContextMenuItem>
              <ContextMenuItem icon={<Scissors />} shortcut="⌘X">
                Cut
              </ContextMenuItem>
              <ContextMenuItem icon={<ClipboardText />} shortcut="⌘V">
                Paste
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<Trash />} destructive shortcut="⌫">
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
      </Subsection>

      <Subsection
        title="Labels, groups & submenus"
        description="Everything from DropdownMenu is available: a section label, grouped items, a nested submenu, and destructive styling."
      >
        <Demo code={RICH_CODE} className="block p-8">
          <ContextMenu>
            <ContextMenuTrigger>
              <DropZone>Right-click the file</DropZone>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Actions</ContextMenuLabel>
              <ContextMenuGroup>
                <ContextMenuItem icon={<PencilSimple />}>Rename</ContextMenuItem>
                <ContextMenuItem icon={<Star />}>Add to favorites</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger icon={<Share />}>
                  Share
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem icon={<ArrowSquareOut />}>
                    Copy link
                  </ContextMenuItem>
                  <ContextMenuItem icon={<DownloadSimple />}>
                    Export
                  </ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuItem icon={<ArrowsClockwise />}>
                Refresh
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem icon={<Trash />} destructive>
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
