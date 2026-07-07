import { AreaChart } from "@/components/ui/area-chart";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const DATA = [12, 18, 15, 22, 30, 26, 34];
const LABELS = [1, 2, 3, 4, 5, 6, 7];

const BASIC_CODE = `<AreaChart data={[12, 18, 15, 22, 30, 26, 34]} labels={[1, 2, 3, 4, 5, 6, 7]} />`;

const TOOLTIP_CODE = `<AreaChart
  data={[12, 18, 15, 22, 30, 26, 34]}
  labels={[1, 2, 3, 4, 5, 6, 7]}
  tooltip={({ value }) => (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">Daily</span>
      <span className="font-semibold">{value}GB</span>
    </div>
  )}
/>`;

const COLOR_CODE = `<AreaChart data={data} color="var(--color-success)" gridLines={0} />`;

export function AreaChartShowcase() {
  return (
    <ComponentPage
      id="area-chart"
      title="Area Chart"
      description="A dependency-free area chart. A smooth line with a gradient fill, optional grid lines and axis labels, and an interactive hover tooltip. Perfect for dashboard widgets."
    >
      <Subsection
        title="Basic"
        description="Pass a series of numbers and optional labels. Hover to reveal the active point."
      >
        <Demo code={BASIC_CODE}>
          <div className="w-full max-w-md">
            <AreaChart data={DATA} labels={LABELS} />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="With tooltip"
        description="Provide a tooltip render function to show details for the hovered point."
      >
        <Demo code={TOOLTIP_CODE}>
          <div className="w-full max-w-md">
            <AreaChart
              data={DATA}
              labels={LABELS}
              tooltip={({ value }) => (
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">Daily</span>
                  <span className="font-semibold text-foreground">{value}GB</span>
                </div>
              )}
            />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Color & grid"
        description="Set any CSS color and toggle the grid lines off."
      >
        <Demo code={COLOR_CODE}>
          <div className="w-full max-w-md">
            <AreaChart data={DATA} color="var(--color-success)" gridLines={0} />
          </div>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
