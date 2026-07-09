import { useEffect, useState, type ComponentType } from "react";
import { GithubLogo, MagnifyingGlass, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import logoUrl from "@/assets/logo.svg";
import { AccordionShowcase } from "@/demo/accordion-showcase";
import { AlertShowcase } from "@/demo/alert-showcase";
import { AnnouncementShowcase } from "@/demo/announcement-showcase";
import { AreaChartShowcase } from "@/demo/area-chart-showcase";
import { AttachmentShowcase } from "@/demo/attachment-showcase";
import { BarChartShowcase } from "@/demo/bar-chart-showcase";
import {
  BillingStatusBlock,
  CreditUsageBlock,
  SidebarNavBlock,
  UsageWidgetBlock,
} from "@/demo/blocks-showcase";
import { AutocompleteShowcase } from "@/demo/autocomplete-showcase";
import { AvatarShowcase } from "@/demo/avatar-showcase";
import { BadgeShowcase } from "@/demo/badge-showcase";
import { BreadcrumbShowcase } from "@/demo/breadcrumb-showcase";
import { ButtonGroupShowcase } from "@/demo/button-group-showcase";
import { ButtonShowcase } from "@/demo/button-showcase";
import { CalendarShowcase } from "@/demo/calendar-showcase";
import { CardShowcase } from "@/demo/card-showcase";
import { CarouselShowcase } from "@/demo/carousel-showcase";
import { CheckboxShowcase } from "@/demo/checkbox-showcase";
import { ChipShowcase } from "@/demo/chip-showcase";
import { ContextMenuShowcase } from "@/demo/context-menu-showcase";
import { DrawerShowcase } from "@/demo/drawer-showcase";
import { DropdownMenuShowcase } from "@/demo/dropdown-menu-showcase";
import { FormShowcase } from "@/demo/form-showcase";
import { InputOTPShowcase } from "@/demo/input-otp-showcase";
import { KbdShowcase } from "@/demo/kbd-showcase";
import { MeterShowcase } from "@/demo/meter-showcase";
import { ModalShowcase } from "@/demo/modal-showcase";
import { NumberFieldShowcase } from "@/demo/number-field-showcase";
import { PaginationShowcase } from "@/demo/pagination-showcase";
import { PopoverShowcase } from "@/demo/popover-showcase";
import { RadioGroupShowcase } from "@/demo/radio-group-showcase";
import { ScrollShadowShowcase } from "@/demo/scroll-shadow-showcase";
import { SearchFieldShowcase } from "@/demo/search-field-showcase";
import { SelectShowcase } from "@/demo/select-showcase";
import { SidebarShowcase } from "@/demo/sidebar-showcase";
import { SkeletonShowcase } from "@/demo/skeleton-showcase";
import { StatCardShowcase } from "@/demo/stat-card-showcase";
import { SliderShowcase } from "@/demo/slider-showcase";
import { SurfaceShowcase } from "@/demo/surface-showcase";
import { TableShowcase } from "@/demo/table-showcase";
import { TabsShowcase } from "@/demo/tabs-showcase";
import { ToggleShowcase } from "@/demo/toggle-showcase";
import { ThemeToggle } from "@/demo/docs";

interface ComponentEntry {
  id: string;
  label: string;
  Showcase: ComponentType;
  fullWidth?: boolean;
}

/** Placeholder page shown for sections that aren't built yet. */
function makeComingSoon(title: string): ComponentType {
  return function ComingSoonPage() {
    return <ComingSoon title={title} />;
  };
}

const PAGES: ComponentEntry[] = [
  { id: "docs", label: "Docs", Showcase: makeComingSoon("Docs"), fullWidth: true },
  { id: "illustrations", label: "Illustrations", Showcase: makeComingSoon("Illustrations"), fullWidth: true },
  { id: "icons", label: "Icons", Showcase: makeComingSoon("Icons"), fullWidth: true },
  { id: "animations", label: "Animations", Showcase: makeComingSoon("Animations"), fullWidth: true },
];

const BLOCKS: ComponentEntry[] = [
  { id: "sidebar-nav", label: "Sidebar Navigation", Showcase: SidebarNavBlock },
  { id: "billing-status", label: "Billing Status", Showcase: BillingStatusBlock },
  { id: "usage-widget", label: "Usage Widget", Showcase: UsageWidgetBlock },
  { id: "credit-usage-widget", label: "Credit Usage Widget", Showcase: CreditUsageBlock },
];

const COMPONENTS: ComponentEntry[] = [
  { id: "button", label: "Button", Showcase: ButtonShowcase },
  { id: "button-group", label: "Button Group", Showcase: ButtonGroupShowcase },
  { id: "calendar", label: "Calendar", Showcase: CalendarShowcase },
  { id: "card", label: "Card", Showcase: CardShowcase },
  { id: "carousel", label: "Carousel", Showcase: CarouselShowcase },
  { id: "checkbox", label: "Checkbox", Showcase: CheckboxShowcase },
  { id: "chip", label: "Chip", Showcase: ChipShowcase },
  { id: "context-menu", label: "Context Menu", Showcase: ContextMenuShowcase },
  { id: "drawer", label: "Drawer", Showcase: DrawerShowcase },
  { id: "input", label: "Input", Showcase: FormShowcase },
  { id: "input-otp", label: "Input OTP", Showcase: InputOTPShowcase },
  { id: "number-field", label: "Number Field", Showcase: NumberFieldShowcase },
  { id: "pagination", label: "Pagination", Showcase: PaginationShowcase },
  { id: "popover", label: "Popover", Showcase: PopoverShowcase },
  { id: "radio-group", label: "RadioGroup", Showcase: RadioGroupShowcase },
  { id: "scroll-shadow", label: "Scroll Shadow", Showcase: ScrollShadowShowcase },
  { id: "search-field", label: "Search Field", Showcase: SearchFieldShowcase },
  { id: "select", label: "Select", Showcase: SelectShowcase },
  { id: "sidebar", label: "Sidebar", Showcase: SidebarShowcase },
  { id: "skeleton", label: "Skeleton", Showcase: SkeletonShowcase },
  { id: "slider", label: "Slider", Showcase: SliderShowcase },
  { id: "stat-card", label: "Stat Card", Showcase: StatCardShowcase },
  { id: "surface", label: "Surface", Showcase: SurfaceShowcase },
  { id: "table", label: "Table", Showcase: TableShowcase },
  { id: "tabs", label: "Tabs", Showcase: TabsShowcase },
  { id: "toggle", label: "Toggle", Showcase: ToggleShowcase },
  { id: "kbd", label: "Kbd", Showcase: KbdShowcase },
  { id: "meter", label: "Meter", Showcase: MeterShowcase },
  { id: "dropdown-menu", label: "Dropdown", Showcase: DropdownMenuShowcase },
  { id: "avatar", label: "Avatar", Showcase: AvatarShowcase },
  { id: "badge", label: "Badge", Showcase: BadgeShowcase },
  { id: "breadcrumb", label: "Breadcrumbs", Showcase: BreadcrumbShowcase },
  { id: "accordion", label: "Accordion", Showcase: AccordionShowcase },
  { id: "alert", label: "Alert", Showcase: AlertShowcase },
  { id: "announcement", label: "Announcement", Showcase: AnnouncementShowcase },
  { id: "area-chart", label: "Area Chart", Showcase: AreaChartShowcase },
  { id: "attachment", label: "Attachment", Showcase: AttachmentShowcase },
  { id: "autocomplete", label: "Autocomplete", Showcase: AutocompleteShowcase },
  { id: "bar-chart", label: "Bar Chart", Showcase: BarChartShowcase },
  { id: "dialog", label: "Dialog", Showcase: ModalShowcase },
];

const ROUTES: ComponentEntry[] = [...PAGES, ...COMPONENTS, ...BLOCKS];

const DEFAULT_ID = COMPONENTS[0].id;
const DEFAULT_BLOCK_ID = BLOCKS[0].id;

const PRIMARY_NAV: { label: string; href: string }[] = [
  { label: "Docs", href: "#docs" },
  { label: "Components", href: `#${DEFAULT_ID}` },
  { label: "Blocks", href: `#${DEFAULT_BLOCK_ID}` },
  { label: "Illustrations", href: "#illustrations" },
  { label: "Icons", href: "#icons" },
  { label: "Animations", href: "#animations" },
];

const COMPONENT_IDS = new Set(COMPONENTS.map((c) => c.id));
const BLOCK_IDS = new Set(BLOCKS.map((c) => c.id));

const hashId = () => window.location.hash.replace(/^#/, "");
const isRoute = (id: string) => ROUTES.some((c) => c.id === id);

export function App() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string>(() => {
    const hash = hashId();
    return isRoute(hash) ? hash : DEFAULT_ID;
  });

  useEffect(() => {
    const onHashChange = () => {
      const hash = hashId();
      if (hash === "") return;
      if (isRoute(hash)) {
        setActiveId(hash);
        window.scrollTo({ top: 0 });
        return;
      }
      window.location.reload();
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const q = query.trim().toLowerCase();
  const filtered = COMPONENTS.filter((c) => c.label.toLowerCase().includes(q));
  const filteredBlocks = BLOCKS.filter((c) => c.label.toLowerCase().includes(q));

  const active = ROUTES.find((c) => c.id === activeId) ?? COMPONENTS[0];
  const ActiveShowcase = active.Showcase;
  const componentsActive = COMPONENT_IDS.has(activeId);
  const blocksActive = BLOCK_IDS.has(activeId);

  const sidebar = componentsActive
    ? { icon: <ComponentsIcon className="size-[22px] text-foreground" />, title: "Components", items: filtered }
    : blocksActive
      ? { icon: <BlocksIcon className="size-[22px] text-foreground" />, title: "Blocks", items: filteredBlocks }
      : null;

  return (
    <div className="min-h-dvh bg-card text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-card/85 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[90rem] items-center justify-between gap-4 px-6 lg:px-[3.75rem]">
          <div className="flex items-center gap-[25px]">
            <a href={`#${DEFAULT_ID}`} className="flex items-center gap-1.5">
              <img src={logoUrl} alt="RocketUI" className="size-[45px]" />
              <span className="text-[16px] font-semibold tracking-tight text-foreground">
                RocketUI
              </span>
              <span className="text-sm text-muted-foreground">v0.1</span>
            </a>

            <nav className="hidden items-center gap-[25px] text-sm font-medium lg:flex">
              {PRIMARY_NAV.map((item) => {
                const isActive =
                  item.label === "Components"
                    ? componentsActive
                    : item.label === "Blocks"
                      ? blocksActive
                      : `#${activeId}` === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "transition-colors hover:text-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <MagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="h-10 w-[210px] rounded-2xl bg-muted pl-11 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className={cn(
                    "absolute right-2.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-muted-foreground/15 text-muted-foreground transition-colors",
                    "hover:bg-muted-foreground/25 hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "[&_svg]:size-3",
                  )}
                >
                  <X weight="bold" />
                </button>
              )}
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="flex h-10 items-center gap-1 rounded-2xl bg-muted px-3 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <GithubLogo weight="fill" className="size-[22px]" />
              353
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[90rem] gap-12 px-6 lg:px-[3.75rem]">
        {/* Sidebar — shown for the Components and Blocks sections */}
        {sidebar && (
          <aside className="sticky top-[72px] hidden h-[calc(100dvh-72px)] w-44 shrink-0 flex-col gap-5 overflow-y-auto py-10 lg:flex">
            <div className="flex items-center gap-2">
              {sidebar.icon}
              <p className="text-[17px] font-medium text-foreground">{sidebar.title}</p>
            </div>
            <nav className="flex flex-col gap-4">
              {sidebar.items.map((component) => (
                <NavLink key={component.id} entry={component} activeId={activeId} />
              ))}
              {sidebar.items.length === 0 && (
                <p className="text-sm text-muted-foreground">No results found.</p>
              )}
            </nav>
          </aside>
        )}

        {/* Content — one component per page, centred within the main area */}
        <main className="min-w-0 flex-1 py-10">
          <div className={cn("mx-auto pb-32", active.fullWidth ? "w-full" : "max-w-3xl")}>
            <ActiveShowcase key={active.id} />
          </div>
        </main>
      </div>
    </div>
  );
}

/** Placeholder shown for sections that are not built yet. */
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[calc(100dvh-16rem)] flex-col items-center justify-center gap-6 text-center">
      <img src={logoUrl} alt="RocketUI" className="size-20" />
      <div className="flex flex-col gap-2">
        <h2 className="text-[26px] font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="text-base text-muted-foreground">
          This section is coming soon.
        </p>
      </div>
    </div>
  );
}

/** "Blocks" menu glyph — a package/box mark. */
function BlocksIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-hidden="true">
      <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,120,47.65,76,128,32l80.35,44Zm8,99.64V133.83l80-43.78v85.76Z" />
    </svg>
  );
}

/** "Components" menu glyph — exact vector from the Figma design (node 2049:208). */
function ComponentsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fill="currentColor"
        d="M7.07609 5.98641C7.01217 5.92256 6.96146 5.84673 6.92686 5.76327C6.89227 5.67981 6.87446 5.59035 6.87446 5.5C6.87446 5.40965 6.89227 5.32019 6.92686 5.23673C6.96146 5.15327 7.01217 5.07744 7.07609 5.01359L10.5136 1.57609C10.5774 1.51217 10.6533 1.46146 10.7367 1.42687C10.8202 1.39227 10.9097 1.37446 11 1.37446C11.0903 1.37446 11.1798 1.39227 11.2633 1.42687C11.3467 1.46146 11.4226 1.51217 11.4864 1.57609L14.9239 5.01359C14.9878 5.07744 15.0385 5.15327 15.0731 5.23673C15.1077 5.32019 15.1255 5.40965 15.1255 5.5C15.1255 5.59035 15.1077 5.67981 15.0731 5.76327C15.0385 5.84673 14.9878 5.92256 14.9239 5.98641L11.4864 9.42391C11.4226 9.48783 11.3467 9.53854 11.2633 9.57313C11.1798 9.60773 11.0903 9.62554 11 9.62554C10.9097 9.62554 10.8202 9.60773 10.7367 9.57313C10.6533 9.53854 10.5774 9.48783 10.5136 9.42391L7.07609 5.98641ZM11.4864 12.5761C11.4226 12.5122 11.3467 12.4615 11.2633 12.4269C11.1798 12.3923 11.0903 12.3745 11 12.3745C10.9097 12.3745 10.8202 12.3923 10.7367 12.4269C10.6533 12.4615 10.5774 12.5122 10.5136 12.5761L7.07609 16.0136C7.01217 16.0774 6.96146 16.1533 6.92686 16.2367C6.89227 16.3202 6.87446 16.4096 6.87446 16.5C6.87446 16.5903 6.89227 16.6798 6.92686 16.7633C6.96146 16.8467 7.01217 16.9226 7.07609 16.9864L10.5136 20.4239C10.5774 20.4878 10.6533 20.5385 10.7367 20.5731C10.8202 20.6077 10.9097 20.6255 11 20.6255C11.0903 20.6255 11.1798 20.6077 11.2633 20.5731C11.3467 20.5385 11.4226 20.4878 11.4864 20.4239L14.9239 16.9864C14.9878 16.9226 15.0385 16.8467 15.0731 16.7633C15.1077 16.6798 15.1255 16.5903 15.1255 16.5C15.1255 16.4096 15.1077 16.3202 15.0731 16.2367C15.0385 16.1533 14.9878 16.0774 14.9239 16.0136L11.4864 12.5761ZM20.4239 10.5136L16.9864 7.07609C16.9226 7.01217 16.8467 6.96146 16.7633 6.92686C16.6798 6.89227 16.5903 6.87446 16.5 6.87446C16.4096 6.87446 16.3202 6.89227 16.2367 6.92686C16.1533 6.96146 16.0774 7.01217 16.0136 7.07609L12.5761 10.5136C12.5122 10.5774 12.4615 10.6533 12.4269 10.7367C12.3923 10.8202 12.3745 10.9097 12.3745 11C12.3745 11.0903 12.3923 11.1798 12.4269 11.2633C12.4615 11.3467 12.5122 11.4226 12.5761 11.4864L16.0136 14.9239C16.0774 14.9878 16.1533 15.0385 16.2367 15.0731C16.3202 15.1077 16.4096 15.1255 16.5 15.1255C16.5903 15.1255 16.6798 15.1077 16.7633 15.0731C16.8467 15.0385 16.9226 14.9878 16.9864 14.9239L20.4239 11.4864C20.4878 11.4226 20.5385 11.3467 20.5731 11.2633C20.6077 11.1798 20.6255 11.0903 20.6255 11C20.6255 10.9097 20.6077 10.8202 20.5731 10.7367C20.5385 10.6533 20.4878 10.5774 20.4239 10.5136ZM9.42391 10.5136L5.98641 7.07609C5.92256 7.01217 5.84673 6.96146 5.76327 6.92686C5.67981 6.89227 5.59035 6.87446 5.5 6.87446C5.40965 6.87446 5.32019 6.89227 5.23673 6.92686C5.15327 6.96146 5.07744 7.01217 5.01359 7.07609L1.57609 10.5136C1.51217 10.5774 1.46146 10.6533 1.42687 10.7367C1.39227 10.8202 1.37446 10.9097 1.37446 11C1.37446 11.0903 1.39227 11.1798 1.42687 11.2633C1.46146 11.3467 1.51217 11.4226 1.57609 11.4864L5.01359 14.9239C5.07744 14.9878 5.15327 15.0385 5.23673 15.0731C5.32019 15.1077 5.40965 15.1255 5.5 15.1255C5.59035 15.1255 5.67981 15.1077 5.76327 15.0731C5.84673 15.0385 5.92256 14.9878 5.98641 14.9239L9.42391 11.4864C9.48783 11.4226 9.53854 11.3467 9.57313 11.2633C9.60773 11.1798 9.62554 11.0903 9.62554 11C9.62554 10.9097 9.60773 10.8202 9.57313 10.7367C9.53854 10.6533 9.48783 10.5774 9.42391 10.5136Z"
      />
    </svg>
  );
}

function NavLink({
  entry,
  activeId,
}: {
  entry: ComponentEntry;
  activeId: string;
}) {
  const active = entry.id === activeId;
  return (
    <a
      href={`#${entry.id}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-base leading-[22px] transition-colors",
        active
          ? "font-medium text-foreground"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {entry.label}
    </a>
  );
}
