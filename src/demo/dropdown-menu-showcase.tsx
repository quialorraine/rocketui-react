import type { ReactNode } from "react";
import {
  DotsThreeVertical,
  FacebookLogo,
  InstagramLogo,
  LinkSimple,
  PencilSimple,
  Plus,
  ShareNetwork,
  Trash,
  TwitterLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

function Trigger({ label = "Options" }: { label?: string }) {
  return (
    <DropdownMenuTrigger asChild>
      <Button variant="outline" color="neutral" endIcon={<DotsThreeVertical weight="bold" />}>
        {label}
      </Button>
    </DropdownMenuTrigger>
  );
}

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const basicExample = (
  <DropdownMenu>
    <Trigger />
    <DropdownMenuContent>
      <DropdownMenuItem icon={<Plus />}>Create new file</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<LinkSimple />}>Copy link</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<PencilSimple />}>Edit</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<Trash />} destructive>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const BASIC_CODE = `<DropdownMenu>
  <Trigger />
  <DropdownMenuContent>
    <DropdownMenuItem icon={<Plus />}>Create new file</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<LinkSimple />}>Copy link</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<PencilSimple />}>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<Trash />} destructive>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const shortcutsExample = (
  <DropdownMenu>
    <Trigger />
    <DropdownMenuContent className="min-w-[15rem]">
      <DropdownMenuItem icon={<Plus />} shortcut="⌘N">
        Create new file
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<LinkSimple />} shortcut="⌘C">
        Copy link
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<PencilSimple />} shortcut="⌘E">
        Edit
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<Trash />} shortcut="⌫" destructive>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SHORTCUTS_CODE = `<DropdownMenu>
  <Trigger />
  <DropdownMenuContent className="min-w-[15rem]">
    <DropdownMenuItem icon={<Plus />} shortcut="⌘N">
      Create new file
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<LinkSimple />} shortcut="⌘C">
      Copy link
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<PencilSimple />} shortcut="⌘E">
      Edit
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<Trash />} shortcut="⌫" destructive>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const submenuExample = (
  <DropdownMenu>
    <Trigger />
    <DropdownMenuContent>
      <DropdownMenuItem icon={<Plus />}>Create new file</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger icon={<ShareNetwork />}>Share</DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuItem icon={<TwitterLogo />}>Twitter</DropdownMenuItem>
          <DropdownMenuItem icon={<InstagramLogo />}>Instagram</DropdownMenuItem>
          <DropdownMenuItem icon={<FacebookLogo />}>Facebook</DropdownMenuItem>
          <DropdownMenuItem icon={<WhatsappLogo />}>WhatsApp</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<PencilSimple />}>Edit</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<Trash />} destructive>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SUBMENU_CODE = `<DropdownMenu>
  <Trigger />
  <DropdownMenuContent>
    <DropdownMenuItem icon={<Plus />}>Create new file</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger icon={<ShareNetwork />}>Share</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem icon={<TwitterLogo />}>Twitter</DropdownMenuItem>
        <DropdownMenuItem icon={<InstagramLogo />}>Instagram</DropdownMenuItem>
        <DropdownMenuItem icon={<FacebookLogo />}>Facebook</DropdownMenuItem>
        <DropdownMenuItem icon={<WhatsappLogo />}>WhatsApp</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<PencilSimple />}>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem icon={<Trash />} destructive>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const descriptionsExample = (
  <DropdownMenu>
    <Trigger />
    <DropdownMenuContent className="min-w-[22rem]">
      <DropdownMenuItem
        icon={<Plus />}
        description="Browse our products, add items to your cart"
      >
        Create new file
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        icon={<LinkSimple />}
        description="Browse our products, add items to your cart"
      >
        Copy link
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        icon={<PencilSimple />}
        description="Browse our products, add items to your cart"
      >
        Edit
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const DESCRIPTIONS_CODE = `<DropdownMenu>
  <Trigger />
  <DropdownMenuContent className="min-w-[22rem]">
    <DropdownMenuItem
      icon={<Plus />}
      description="Browse our products, add items to your cart"
    >
      Create new file
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem
      icon={<LinkSimple />}
      description="Browse our products, add items to your cart"
    >
      Copy link
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem
      icon={<PencilSimple />}
      description="Browse our products, add items to your cart"
    >
      Edit
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const alignmentCards: Atom[] = [
  {
    label: "labels only",
    node: (
      <DropdownMenu>
        <Trigger />
        <DropdownMenuContent>
          <DropdownMenuItem>Create new file</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Share</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem destructive>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    code: `<DropdownMenu>
  <Trigger />
  <DropdownMenuContent>
    <DropdownMenuItem>Create new file</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Share</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
  {
    label: "align end",
    node: (
      <DropdownMenu>
        <Trigger />
        <DropdownMenuContent align="end">
          <DropdownMenuItem icon={<Plus />}>Create new file</DropdownMenuItem>
          <DropdownMenuItem icon={<PencilSimple />}>Edit</DropdownMenuItem>
          <DropdownMenuItem icon={<Trash />} destructive>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    code: `<DropdownMenu>
  <Trigger />
  <DropdownMenuContent align="end">
    <DropdownMenuItem icon={<Plus />}>Create new file</DropdownMenuItem>
    <DropdownMenuItem icon={<PencilSimple />}>Edit</DropdownMenuItem>
    <DropdownMenuItem icon={<Trash />} destructive>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },
];

export function DropdownMenuShowcase() {
  return (
    <ComponentPage
      id="dropdown-menu"
      title="Dropdown"
      description="A dropdown displays a list of actions or options that a user can choose. Fully keyboard navigable with icons, shortcuts, descriptions, submenus and destructive actions."
    >
      <Subsection
        title="Basic"
        description="Icon + label items with a divider between each and a destructive action at the end."
      >
        <Demo align="start" code={BASIC_CODE}>
          {basicExample}
        </Demo>
      </Subsection>

      <Subsection
        title="With shortcuts"
        description="Trailing hints communicate keyboard shortcuts for each action."
      >
        <Demo align="start" code={SHORTCUTS_CODE}>
          {shortcutsExample}
        </Demo>
      </Subsection>

      <Subsection
        title="With submenu"
        description="Nest related actions. Open the submenu on hover, click, or with the Right arrow key."
      >
        <Demo align="start" code={SUBMENU_CODE}>
          {submenuExample}
        </Demo>
      </Subsection>

      <Subsection
        title="With descriptions"
        description="Give each option a secondary line to explain what it does."
      >
        <Demo align="start" code={DESCRIPTIONS_CODE}>
          {descriptionsExample}
        </Demo>
      </Subsection>

      <Subsection
        title="Without icons & alignment"
        description="Icons are optional. Menus can align to the start or end of the trigger."
      >
        <DemoGrid cols={2}>
          {alignmentCards.map((a) => (
            <Demo key={a.label} label={a.label} code={a.code} align="start">
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
