import {
  ChartPieSlice,
  Compass,
  CurrencyCircleDollar,
  Gear,
  House,
  Image as ImageIcon,
  Lifebuoy,
  ListDashes,
  Package,
  Question,
  SealPercent,
  Storefront,
  UsersThree,
} from "@phosphor-icons/react";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  SidebarSeparator,
  SidebarSubItem,
} from "@/components/ui/sidebar";
import logoUrl from "@/assets/logo.svg";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

const FULL_CODE = `// Sidebar tracks the selected item. Give each item a value and it
// becomes active on click — no local state needed. Use value +
// onValueChange to drive it from your router instead.
<Sidebar defaultValue="dashboard">
  <SidebarHeader>
    <img src={logo} alt="RocketUI" className="size-9" />
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

  <SidebarFooter>
    <SidebarItem icon={<Gear />} value="settings">Settings</SidebarItem>
    <SidebarItem icon={<Question />} value="help">Help & Support</SidebarItem>
  </SidebarFooter>
</Sidebar>`;

const ASCHILD_CODE = `// asChild keeps the styling and selection but renders your own
// element — an <a>, or a router <Link> — so navigation stays native.
<Sidebar className="w-56" defaultValue="home">
  <SidebarSection>
    <SidebarItem icon={<House />} value="home" asChild>
      <a href="/">Home</a>
    </SidebarItem>
    <SidebarItem icon={<ChartPieSlice />} value="analytics" asChild>
      <a href="/analytics">Analytics</a>
    </SidebarItem>
  </SidebarSection>

  <SidebarSeparator />

  <SidebarGroup icon={<CurrencyCircleDollar />} label="Finances" defaultOpen>
    <SidebarSubItem value="invoices" asChild>
      <a href="/invoices">Invoices</a>
    </SidebarSubItem>
    <SidebarSubItem value="reports" asChild>
      <a href="/reports">Reports</a>
    </SidebarSubItem>
  </SidebarGroup>

  <SidebarFooter>
    <SidebarItem icon={<Lifebuoy />} value="support" asChild>
      <a href="/support">Support</a>
    </SidebarItem>
  </SidebarFooter>
</Sidebar>`;

export function SidebarShowcase() {
  return (
    <ComponentPage
      id="sidebar"
      title="Sidebar"
      description="Vertical application navigation: a brand header, primary items with an active state, a collapsible group that reveals a tree of sub-links, and a footer that pins to the bottom. Every part is composable and driven by semantic tokens."
    >
      <Subsection
        title="Composition"
        description="Assemble the shell from slots. Set a height on Sidebar (e.g. h-screen) so the footer pins to the bottom; here it hugs its content."
      >
        <DemoGrid cols={1}>
          <Demo label="full app sidebar" code={FULL_CODE}>
            <Sidebar defaultValue="dashboard">
              <SidebarHeader>
                <img src={logoUrl} alt="RocketUI" className="size-9 shrink-0" />
                <span className="text-lg font-semibold text-foreground">
                  RocketUI
                </span>
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
                <SidebarSubItem value="transactions">
                  Transactions
                </SidebarSubItem>
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

              <SidebarFooter>
                <SidebarItem icon={<Gear />} value="settings">
                  Settings
                </SidebarItem>
                <SidebarItem icon={<Question />} value="help">
                  Help & Support
                </SidebarItem>
              </SidebarFooter>
            </Sidebar>
          </Demo>
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Links with asChild"
        description="Pass asChild to render each item as an anchor or a router link while keeping the sidebar styling, active state, and tree connectors."
      >
        <DemoGrid cols={1}>
          <Demo label="anchor items" code={ASCHILD_CODE}>
            <Sidebar className="w-56" defaultValue="home">
              <SidebarSection>
                <SidebarItem
                  icon={<House />}
                  value="home"
                  asChild
                  onClick={(e) => e.preventDefault()}
                >
                  <a href="/">Home</a>
                </SidebarItem>
                <SidebarItem
                  icon={<ChartPieSlice />}
                  value="analytics"
                  asChild
                  onClick={(e) => e.preventDefault()}
                >
                  <a href="/analytics">Analytics</a>
                </SidebarItem>
              </SidebarSection>

              <SidebarSeparator />

              <SidebarGroup
                icon={<CurrencyCircleDollar />}
                label="Finances"
                defaultOpen
              >
                <SidebarSubItem
                  value="invoices"
                  asChild
                  onClick={(e) => e.preventDefault()}
                >
                  <a href="/invoices">Invoices</a>
                </SidebarSubItem>
                <SidebarSubItem
                  value="reports"
                  asChild
                  onClick={(e) => e.preventDefault()}
                >
                  <a href="/reports">Reports</a>
                </SidebarSubItem>
              </SidebarGroup>

              <SidebarFooter>
                <SidebarItem
                  icon={<Lifebuoy />}
                  value="support"
                  asChild
                  onClick={(e) => e.preventDefault()}
                >
                  <a href="/support">Support</a>
                </SidebarItem>
              </SidebarFooter>
            </Sidebar>
          </Demo>
        </DemoGrid>
      </Subsection>
    </ComponentPage>
  );
}
