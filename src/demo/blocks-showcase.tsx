import {
  ArrowUpRight,
  ChartPieSlice,
  Compass,
  CurrencyCircleDollar,
  Gear,
  Image as ImageIcon,
  ListDashes,
  Package,
  Question,
  Receipt,
  SealPercent,
  Storefront,
  UsersThree,
} from "@phosphor-icons/react";
import { AreaChart } from "@/components/ui/area-chart";
import { BarChart } from "@/components/ui/bar-chart";
import {
  Sidebar,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  SidebarSeparator,
  SidebarSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/cn";
import logoUrl from "@/assets/logo.svg";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const DAILY = [1.9, 2.1, 2.0, 2.28, 2.5, 2.35, 2.6];
const CUMULATIVE = [1.9, 4.0, 6.0, 7.76, 10.26, 12.61, 15.21];
const DATES = [
  "April 4",
  "April 6",
  "April 8",
  "April 10",
  "April 12",
  "April 14",
  "April 16",
];
const LABELS = [1, 2, 3, 4, 5, 6, 7];

function UsageWidget() {
  return (
    <div className="w-[324px] rounded-xl border border-border bg-card p-[15px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-foreground">Usage</h3>
        <p className="text-xs text-muted-foreground">
          Track your storage across the last 7 days.
        </p>
      </div>

      <p className="mt-4 text-[20px] font-semibold leading-none text-foreground">
        60.02GB{" "}
        <span className="text-base font-normal text-muted-foreground">
          of 200GB
        </span>
      </p>

      <AreaChart
        className="mt-6"
        data={DAILY}
        labels={LABELS}
        height={120}
        tooltip={({ index }) => (
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-foreground">{DATES[index]}, 2026</p>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Daily</span>
              <span className="font-semibold text-foreground">
                {DAILY[index].toFixed(2)}GB
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Cumulative</span>
              <span className="font-semibold text-foreground">
                {CUMULATIVE[index].toFixed(2)}GB
              </span>
            </div>
          </div>
        )}
      />
    </div>
  );
}

const WIDGET_CODE = `function UsageWidget() {
  return (
    <div className="w-[324px] rounded-xl border border-border bg-card p-[15px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold">Usage</h3>
        <p className="text-xs text-muted-foreground">
          Track your storage across the last 7 days.
        </p>
      </div>

      <p className="mt-4 text-[20px] font-semibold leading-none">
        60.02GB <span className="text-base font-normal text-muted-foreground">of 200GB</span>
      </p>

      <AreaChart
        className="mt-6"
        data={daily}
        labels={[1, 2, 3, 4, 5, 6, 7]}
        height={120}
        tooltip={({ index }) => (
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold">{dates[index]}, 2026</p>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Daily</span>
              <span className="font-semibold">{daily[index].toFixed(2)}GB</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Cumulative</span>
              <span className="font-semibold">{cumulative[index].toFixed(2)}GB</span>
            </div>
          </div>
        )}
      />
    </div>
  );
}`;

const CREDIT_DATA = [8, 6, 5, 7, 7, 12, 3, 2, 6, 9, 7, 5, 4, 5];
const CREDIT_LABELS = [1, "", "", "", 2, "", "", "", 3, "", "", "", 4, ""];
const CREDIT_DATES = [
  "April 1", "April 3", "April 5", "April 7", "April 10", "April 12",
  "April 14", "April 16", "April 18", "April 20", "April 22", "April 24",
  "April 26", "April 28",
];
const CREDIT_CUMULATIVE = [0.8, 1.4, 1.9, 2.6, 2.28, 7.76, 8.1, 8.3, 8.9, 9.8, 10.5, 11.0, 11.4, 11.9];

function CreditUsageWidget() {
  return (
    <div className="w-[233px] rounded-xl border border-border bg-card p-[15px]">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-foreground">Credit Usage</h3>
        <span className="text-xs text-muted-foreground">2026</span>
      </div>

      <BarChart
        className="mt-4"
        data={CREDIT_DATA}
        labels={CREDIT_LABELS}
        height={130}
        activeIndex={5}
        tooltip={({ index }) => (
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-foreground">{CREDIT_DATES[index]}, 2026</p>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Daily</span>
              <span className="font-semibold text-foreground">
                {CREDIT_DATA[index].toFixed(2)}GB
              </span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Cumulative</span>
              <span className="font-semibold text-foreground">
                {CREDIT_CUMULATIVE[index].toFixed(2)}GB
              </span>
            </div>
          </div>
        )}
      />
    </div>
  );
}

const CREDIT_CODE = `function CreditUsageWidget() {
  return (
    <div className="w-[233px] rounded-xl border border-border bg-card p-[15px]">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold">Credit Usage</h3>
        <span className="text-xs text-muted-foreground">2026</span>
      </div>

      <BarChart
        className="mt-4"
        data={data}
        labels={[1, "", "", "", 2, "", "", "", 3, "", "", "", 4, ""]}
        height={130}
        activeIndex={5}
        tooltip={({ index }) => (
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold">{dates[index]}, 2026</p>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Daily</span>
              <span className="font-semibold">{data[index].toFixed(2)}GB</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span className="text-muted-foreground">Cumulative</span>
              <span className="font-semibold">{cumulative[index].toFixed(2)}GB</span>
            </div>
          </div>
        )}
      />
    </div>
  );
}`;

export function CreditUsageBlock() {
  return (
    <ComponentPage
      id="credit-usage-widget"
      title="Credit Usage Widget"
      description="A dashboard widget with a titled header and a bar chart that highlights a single bar with an interactive tooltip. Composed from the Card surface and the BarChart component."
    >
      <Subsection
        title="Preview"
        description="Hover any bar to move the highlight and inspect its daily and cumulative usage."
      >
        <Demo code={CREDIT_CODE}>
          <CreditUsageWidget />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}

export function UsageWidgetBlock() {
  return (
    <ComponentPage
      id="usage-widget"
      title="Usage Widget"
      description="A dashboard widget with a stat header, a smooth area chart and an interactive tooltip. Composed from the Card surface and the AreaChart component — copy the code and drop it straight into your dashboard."
    >
      <Subsection
        title="Preview"
        description="Hover the chart to inspect each day's daily and cumulative usage."
      >
        <Demo code={WIDGET_CODE}>
          <UsageWidget />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Billing Status                                   */
/* -------------------------------------------------------------------------- */

const BILLING_TOTAL = 45;
const BILLING_CLEARED = 22;

function BillingStatus() {
  return (
    <div className="w-[387px] rounded-2xl border border-border bg-card p-[22px]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Receipt weight="fill" className="size-[22px] text-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              Billing Status
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">Last payment: Nov 7</p>
        </div>
        <button
          type="button"
          className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowUpRight className="size-5" />
        </button>
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <p className="text-[26px] font-semibold leading-none text-foreground">
          68.34%
        </p>
        <span className="grid size-[30px] place-items-center rounded-md bg-success/10 text-success">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Auto-cleared</span>
          <span>Under Review</span>
        </div>
        <div className="flex h-10 items-center justify-between">
          {Array.from({ length: BILLING_TOTAL }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-10 w-[3px] rounded-full",
                i < BILLING_CLEARED ? "bg-success" : "bg-border",
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>11.2K</span>
          <span>22</span>
        </div>
      </div>
    </div>
  );
}

const BILLING_CODE = `import { cn } from "@rocketui-react/core";
import { ArrowUpRight, Receipt } from "@phosphor-icons/react";

const TOTAL = 45;
const CLEARED = 22;

function BillingStatus() {
  return (
    <div className="w-[387px] rounded-2xl border border-border bg-card p-[22px]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Receipt weight="fill" className="size-[22px]" />
            <h3 className="text-lg font-semibold">Billing Status</h3>
          </div>
          <p className="text-sm text-muted-foreground">Last payment: Nov 7</p>
        </div>
        <button className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
          <ArrowUpRight className="size-5" />
        </button>
      </div>

      <div className="mt-5 flex items-center gap-2.5">
        <p className="text-[26px] font-semibold leading-none">68.34%</p>
        <span className="grid size-[30px] place-items-center rounded-md bg-success/10 text-success">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Auto-cleared</span>
          <span>Under Review</span>
        </div>
        <div className="flex h-10 items-center justify-between">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <span key={i} className={cn("h-10 w-[3px] rounded-full", i < CLEARED ? "bg-success" : "bg-border")} />
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>11.2K</span>
          <span>22</span>
        </div>
      </div>
    </div>
  );
}`;

export function BillingStatusBlock() {
  return (
    <ComponentPage
      id="billing-status"
      title="Billing Status"
      description="A billing summary card with a header action, a headline percentage with a trend badge, and a segmented meter comparing two buckets. Built from the Card surface and semantic tokens."
    >
      <Subsection
        title="Preview"
        description="The segmented bar splits auto-cleared from under-review balances."
      >
        <Demo code={BILLING_CODE}>
          <BillingStatus />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Sidebar Navigation                               */
/* -------------------------------------------------------------------------- */

function SidebarNav() {
  return (
    <Sidebar className="w-[248px]" defaultValue="dashboard">
      <SidebarHeader>
        <img src={logoUrl} alt="RocketUI" className="size-9 shrink-0" />
        <span className="text-lg font-semibold text-foreground">RocketUI</span>
      </SidebarHeader>

      <SidebarSection className="mt-3">
        <SidebarItem icon={<Compass />} value="dashboard">
          Dashboard
        </SidebarItem>
        <SidebarItem icon={<ListDashes />} value="orders">
          Orders
        </SidebarItem>
        <SidebarItem icon={<Package />} value="products">
          Products
        </SidebarItem>
        <SidebarItem icon={<UsersThree />} value="customers">
          Customers
        </SidebarItem>
        <SidebarItem icon={<ImageIcon />} value="content">
          Content
        </SidebarItem>
        <SidebarItem icon={<Storefront />} value="store">
          Online store
        </SidebarItem>
      </SidebarSection>

      <SidebarSeparator />

      <SidebarGroup
        icon={<CurrencyCircleDollar />}
        label="Finances"
        defaultOpen
      >
        <SidebarSubItem value="invoices">Invoices</SidebarSubItem>
        <SidebarSubItem value="transactions">Transactions</SidebarSubItem>
        <SidebarSubItem value="reports">Reports</SidebarSubItem>
      </SidebarGroup>

      <SidebarSection className="mt-1">
        <SidebarItem icon={<ChartPieSlice />} value="analytics">
          Analytics
        </SidebarItem>
        <SidebarItem icon={<SealPercent />} value="discounts">
          Discounts
        </SidebarItem>
      </SidebarSection>

      <SidebarSection className="mt-8">
        <SidebarItem icon={<Gear />} value="settings">
          Settings
        </SidebarItem>
        <SidebarItem icon={<Question />} value="help">
          Help & Support
        </SidebarItem>
      </SidebarSection>
    </Sidebar>
  );
}

const SIDEBAR_CODE = `import {
  Sidebar, SidebarHeader, SidebarSection, SidebarSeparator,
  SidebarItem, SidebarGroup, SidebarSubItem,
} from "@rocketui-react/core";
import {
  ChartPieSlice, Compass, CurrencyCircleDollar, Gear,
  Image as ImageIcon, ListDashes, Package, Question, SealPercent,
  Storefront, UsersThree,
} from "@phosphor-icons/react";
import logo from "./logo.svg";

function SidebarNav() {
  // Sidebar tracks the selected item — give each item a value and it
  // becomes active on click. Use value/onValueChange for controlled routing.
  return (
    <Sidebar className="w-[248px]" defaultValue="dashboard">
      <SidebarHeader>
        <img src={logo} alt="RocketUI" className="size-9 shrink-0" />
        <span className="text-lg font-semibold">RocketUI</span>
      </SidebarHeader>

      <SidebarSection className="mt-3">
        <SidebarItem icon={<Compass />} value="dashboard">Dashboard</SidebarItem>
        <SidebarItem icon={<ListDashes />} value="orders">Orders</SidebarItem>
        <SidebarItem icon={<Package />} value="products">Products</SidebarItem>
        <SidebarItem icon={<UsersThree />} value="customers">Customers</SidebarItem>
        <SidebarItem icon={<ImageIcon />} value="content">Content</SidebarItem>
        <SidebarItem icon={<Storefront />} value="store">Online store</SidebarItem>
      </SidebarSection>

      <SidebarSeparator />

      <SidebarGroup icon={<CurrencyCircleDollar />} label="Finances" defaultOpen>
        <SidebarSubItem value="invoices">Invoices</SidebarSubItem>
        <SidebarSubItem value="transactions">Transactions</SidebarSubItem>
        <SidebarSubItem value="reports">Reports</SidebarSubItem>
      </SidebarGroup>

      <SidebarSection className="mt-1">
        <SidebarItem icon={<ChartPieSlice />} value="analytics">Analytics</SidebarItem>
        <SidebarItem icon={<SealPercent />} value="discounts">Discounts</SidebarItem>
      </SidebarSection>

      <SidebarSection className="mt-8">
        <SidebarItem icon={<Gear />} value="settings">Settings</SidebarItem>
        <SidebarItem icon={<Question />} value="help">Help & Support</SidebarItem>
      </SidebarSection>
    </Sidebar>
  );
}`;

export function SidebarNavBlock() {
  return (
    <ComponentPage
      id="sidebar-nav"
      title="Sidebar Navigation"
      description="A full application sidebar: brand header, primary nav with an active item, a collapsible group with a tree of sub-links, and a pinned footer. Built entirely from semantic tokens and Phosphor icons."
    >
      <Subsection
        title="Preview"
        description="Dashboard is active; Finances expands into Invoices, Transactions and Reports."
      >
        <Demo code={SIDEBAR_CODE}>
          <SidebarNav />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
