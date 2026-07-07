import { type ReactNode } from "react";
import { Meter } from "@/components/ui/meter";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

interface Atom {
  label: string;
  node: ReactNode;
  code: string;
}

const SIZES = ["sm", "md", "lg"] as const;

const sizeCards: Atom[] = SIZES.map((size) => ({
  label: size,
  node: <Meter size={size} label="Storage" value={60} className="w-72" />,
  code: `<Meter size="${size}" label="Storage" value={60} />`,
}));

const COLORS = ["primary", "info", "success", "warning", "destructive"] as const;

const colorValues: Record<(typeof COLORS)[number], number> = {
  primary: 60,
  info: 45,
  success: 30,
  warning: 75,
  destructive: 92,
};

const colorCards: Atom[] = COLORS.map((color) => ({
  label: color,
  node: (
    <Meter
      color={color}
      label={color[0].toUpperCase() + color.slice(1)}
      value={colorValues[color]}
      className="w-72"
    />
  ),
  code: `<Meter color="${color}" value={${colorValues[color]}} />`,
}));

export function MeterShowcase() {
  return (
    <ComponentPage
      id="meter"
      title="Meter"
      description="A meter represents a scalar quantity within a known range — disk usage, capacity, a score. Unlike a progress bar, it reflects a static measurement rather than task completion."
    >
      <Subsection
        title="Basic"
        description="A label and value sit above the track; the fill reflects the value within its range."
      >
        <Demo align="start" code={`<Meter label="Storage" value={60} />`}>
          <Meter label="Storage" value={60} className="w-[455px] max-w-full" />
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="The track thickens across sm, md and lg while the header stays consistent."
      >
        <DemoGrid cols={1}>
          {sizeCards.map((a) => (
            <Demo key={a.label} label={a.label} align="start" code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Colors"
        description="Use semantic colors to signal healthy, warning or critical levels."
      >
        <DemoGrid cols={1}>
          {colorCards.map((a) => (
            <Demo key={a.label} label={a.label} align="start" code={a.code}>
              {a.node}
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Custom value"
        description="Pass formatValue to render units, ratios or any custom label instead of a percentage."
      >
        <Demo
          align="start"
          code={`<Meter\n  label="Disk space"\n  value={6.2}\n  max={10}\n  formatValue={(v, p) => \`\${v} GB of 10 GB · \${Math.round(p)}%\`}\n/>`}
        >
          <Meter
            label="Disk space"
            value={6.2}
            max={10}
            color="info"
            formatValue={(v, p) => `${v} GB of 10 GB · ${Math.round(p)}%`}
            className="w-[455px] max-w-full"
          />
        </Demo>
      </Subsection>

      <Subsection
        title="Custom range"
        description="Set min and max for non-percentage scales, e.g. a rating out of five."
      >
        <Demo
          align="start"
          code={`<Meter\n  label="Rating"\n  value={4.2}\n  min={0}\n  max={5}\n  color="warning"\n  formatValue={(v) => \`\${v} / 5\`}\n/>`}
        >
          <Meter
            label="Rating"
            value={4.2}
            min={0}
            max={5}
            color="warning"
            formatValue={(v) => `${v} / 5`}
            className="w-72"
          />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
