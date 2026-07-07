import { BarChart } from "@/components/ui/bar-chart";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const DATA = [8, 6, 5, 7, 7, 12, 3, 2, 6, 9, 7, 5, 4, 5];
const LABELS = [1, "", "", "", 2, "", "", "", 3, "", "", "", 4, ""];

const BASIC_CODE = `<BarChart data={[8, 6, 5, 7, 7, 12, 3, 2, 6]} activeIndex={5} />`;

const TOOLTIP_CODE = `<BarChart
  data={data}
  activeIndex={5}
  tooltip={({ value }) => (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">Daily</span>
      <span className="font-semibold">{value}GB</span>
    </div>
  )}
/>`;

const COLOR_CODE = `<BarChart data={data} color="var(--color-success)" gridLines={0} />`;

export function BarChartShowcase() {
  return (
    <ComponentPage
      id="bar-chart"
      title="Bar Chart"
      description="A dependency-free bar chart. Grey bars with one highlighted bar, optional grid lines and axis labels, and an interactive hover tooltip with a pointer."
    >
      <Subsection
        title="Basic"
        description="Pass a series of numbers and highlight a bar with activeIndex. Hover any bar to move the highlight."
      >
        <Demo code={BASIC_CODE}>
          <div className="w-full max-w-md">
            <BarChart data={DATA} labels={LABELS} activeIndex={5} />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="With tooltip"
        description="Provide a tooltip render function to show details for the active bar."
      >
        <Demo code={TOOLTIP_CODE}>
          <div className="w-full max-w-md">
            <BarChart
              data={DATA}
              labels={LABELS}
              activeIndex={5}
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
        description="Set any CSS color for the active bar and toggle the grid lines off."
      >
        <Demo code={COLOR_CODE}>
          <div className="w-full max-w-md">
            <BarChart data={DATA} color="var(--color-success)" gridLines={0} activeIndex={5} />
          </div>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
