import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const pct = (v: number) => `${v} %`;

function SingleExample() {
  const [value, setValue] = useState<number | number[]>(60);
  return (
    <Slider
      label="Storage"
      showValue
      formatValue={pct}
      value={value}
      onValueChange={setValue}
      className="max-w-md"
    />
  );
}

function RangeExample() {
  const [value, setValue] = useState<number | number[]>([30, 60]);
  return (
    <Slider
      label="Storage"
      showValue
      formatValue={pct}
      value={value}
      onValueChange={setValue}
      minStepsBetweenThumbs={5}
      className="max-w-md"
    />
  );
}

export function SliderShowcase() {
  return (
    <ComponentPage
      id="slider"
      title="Slider"
      description="A slider lets a user select one or more values within a range. Supports single and range thumbs, horizontal and vertical orientation, keyboard control and custom value formatting."
    >
      <Subsection
        title="Single"
        description="Drag the thumb, click the track, or use the arrow keys, Home/End and Page Up/Down."
      >
        <Demo align="start" className="w-full" code={`const [value, setValue] = useState(60);

<Slider
  label="Storage"
  showValue
  formatValue={(v) => \`\${v} %\`}
  value={value}
  onValueChange={setValue}
/>`}>
          <SingleExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Range"
        description="Pass an array for two thumbs; minStepsBetweenThumbs keeps them apart."
      >
        <Demo align="start" className="w-full" code={`const [value, setValue] = useState([30, 60]);

<Slider
  label="Storage"
  showValue
  formatValue={(v) => \`\${v} %\`}
  value={value}
  onValueChange={setValue}
  minStepsBetweenThumbs={5}
/>`}>
          <RangeExample />
        </Demo>
      </Subsection>

      <Subsection
        title="Steps"
        description="Set step to snap to discrete increments."
      >
        <Demo align="start" className="w-full" code={`<Slider label="Volume" showValue min={0} max={10} step={1} defaultValue={4} />`}>
          <Slider
            label="Volume"
            showValue
            min={0}
            max={10}
            step={1}
            defaultValue={4}
            className="max-w-md"
          />
        </Demo>
      </Subsection>

      <Subsection
        title="Vertical"
        description={'Set orientation="vertical" for a vertical track.'}
      >
        <Demo align="center" code={`<Slider
  orientation="vertical"
  label="Storage"
  showValue
  formatValue={(v) => \`\${v} %\`}
  defaultValue={60}
/>`}>
          <div className="flex h-56 gap-10">
            <Slider
              orientation="vertical"
              showValue
              formatValue={pct}
              defaultValue={60}
              aria-label="Storage single"
            />
            <Slider
              orientation="vertical"
              showValue
              formatValue={pct}
              defaultValue={[25, 75]}
              aria-label="Storage range"
            />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Disabled"
        description="Prevent interaction with the disabled prop."
      >
        <Demo align="start" className="w-full" code={`<Slider label="Storage" showValue defaultValue={40} disabled />`}>
          <Slider
            label="Storage"
            showValue
            formatValue={pct}
            defaultValue={40}
            disabled
            className="max-w-md"
          />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
