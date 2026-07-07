import { AreaChart } from "@/components/ui/area-chart";
import { BarChart } from "@/components/ui/bar-chart";
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
