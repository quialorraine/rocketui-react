import {
  CursorClick,
  Eye,
  ShoppingCart,
  Users,
} from "@phosphor-icons/react";
import { StatCard } from "@/components/ui/stat-card";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const BASIC_CODE = `<StatCard
  label="Revenue"
  value="$48,120"
  icon={<ShoppingCart weight="fill" />}
  trend={{ value: "12.4%", direction: "up" }}
  description="vs. last 30 days"
/>`;

const GRID_CODE = `<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <StatCard
    label="Visitors"
    value="24,190"
    icon={<Eye weight="fill" />}
    trend={{ value: "8.1%", direction: "up" }}
    description="vs. last week"
  />
  <StatCard
    label="Clicks"
    value="2,832"
    icon={<CursorClick weight="fill" />}
    trend={{ value: "10.5%", direction: "down" }}
    description="Click-through rate dropped"
  />
  <StatCard
    label="New customers"
    value="312"
    icon={<Users weight="fill" />}
    trend={{ value: "3.2%", direction: "up" }}
  />
  <StatCard label="Refunds" value="18" description="No trend recorded" />
</div>`;

const POLARITY_CODE = `// Override the colour when a rise is bad (e.g. churn) or a drop is good.
<StatCard
  label="Churn"
  value="4.8%"
  trend={{ value: "1.2%", direction: "up", color: "destructive" }}
/>
<StatCard
  label="Load time"
  value="820ms"
  trend={{ value: "15%", direction: "down", color: "success" }}
/>`;

export function StatCardShowcase() {
  return (
    <ComponentPage
      id="stat-card"
      title="Stat Card"
      description="A compact KPI tile: a label, a headline value, an optional trend chip, and a supporting caption. Drop it into a grid to build a dashboard summary row."
    >
      <Subsection
        title="Anatomy"
        description="Label and icon on top, the value with a trend chip, and an optional caption below."
      >
        <Demo code={BASIC_CODE}>
          <StatCard
            className="w-64"
            label="Revenue"
            value="$48,120"
            icon={<ShoppingCart weight="fill" />}
            trend={{ value: "12.4%", direction: "up" }}
            description="vs. last 30 days"
          />
        </Demo>
      </Subsection>

      <Subsection
        title="Dashboard grid"
        description="Cards stretch to fill their column, so a plain grid becomes a summary row. Trend and caption are both optional."
      >
        <Demo code={GRID_CODE} className="block p-6">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              label="Visitors"
              value="24,190"
              icon={<Eye weight="fill" />}
              trend={{ value: "8.1%", direction: "up" }}
              description="vs. last week"
            />
            <StatCard
              label="Clicks"
              value="2,832"
              icon={<CursorClick weight="fill" />}
              trend={{ value: "10.5%", direction: "down" }}
              description="Click-through rate dropped"
            />
            <StatCard
              label="New customers"
              value="312"
              icon={<Users weight="fill" />}
              trend={{ value: "3.2%", direction: "up" }}
            />
            <StatCard label="Refunds" value="18" description="No trend recorded" />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Trend polarity"
        description="By default up reads as success and down as destructive. Pass trend.color to flip it when up is bad or down is good."
      >
        <Demo code={POLARITY_CODE} className="block p-6">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              label="Churn"
              value="4.8%"
              trend={{ value: "1.2%", direction: "up", color: "destructive" }}
            />
            <StatCard
              label="Load time"
              value="820ms"
              trend={{ value: "15%", direction: "down", color: "success" }}
            />
          </div>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
