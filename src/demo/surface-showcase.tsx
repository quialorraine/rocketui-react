import { Surface } from "@/components/ui/surface";
import { ComponentPage, Subsection } from "./docs";
import { Demo, DemoGrid } from "./components/demo";

function SampleContent() {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-lg font-medium text-foreground">
        We've moved things around
      </p>
      <p className="text-sm leading-relaxed text-muted-foreground">
        With new features in the horizon, we're updating few things.
      </p>
    </div>
  );
}

export function SurfaceShowcase() {
  return (
    <ComponentPage
      id="surface"
      title="Surface"
      description="A low-level container that provides surface-level styling for child components. Pick a variant, radius and padding, or render onto any element with asChild."
    >
      <Subsection
        title="Variants"
        description="Elevated, outline and filled cover most container needs; ghost is a bare box."
      >
        <DemoGrid cols={2}>
          <Demo align="start" code={`<Surface variant="elevated">…</Surface>`}>
            <Surface variant="elevated" className="w-full">
              <SampleContent />
            </Surface>
          </Demo>
          <Demo align="start" code={`<Surface variant="outline">…</Surface>`}>
            <Surface variant="outline" className="w-full">
              <SampleContent />
            </Surface>
          </Demo>
          <Demo align="start" code={`<Surface variant="filled">…</Surface>`}>
            <Surface variant="filled" className="w-full">
              <SampleContent />
            </Surface>
          </Demo>
          <Demo align="start" code={`<Surface variant="ghost">…</Surface>`}>
            <Surface variant="ghost" className="w-full">
              <SampleContent />
            </Surface>
          </Demo>
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Padding"
        description="Four padding steps — none, sm, md and lg."
      >
        <DemoGrid cols={2}>
          {(["none", "sm", "md", "lg"] as const).map((padding) => (
            <Demo key={padding} label={padding} align="start" code={`<Surface padding="${padding}" />`}>
              <Surface variant="filled" padding={padding} className="w-full">
                <SampleContent />
              </Surface>
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Radius"
        description="Adjust corner rounding independently of the variant."
      >
        <DemoGrid cols={2}>
          {(["md", "lg", "xl", "none"] as const).map((radius) => (
            <Demo key={radius} label={radius} align="start" code={`<Surface radius="${radius}" />`}>
              <Surface variant="outline" radius={radius} className="w-full">
                <SampleContent />
              </Surface>
            </Demo>
          ))}
        </DemoGrid>
      </Subsection>

      <Subsection
        title="Interactive"
        description="Set interactive for hover and focus affordances; combine with asChild to render a link or button."
      >
        <Demo align="start" code={`<Surface asChild interactive variant="outline">
  <a href="#surface">…</a>
</Surface>`}>
          <Surface asChild interactive variant="outline" className="block max-w-md">
            <a href="#surface">
              <SampleContent />
            </a>
          </Surface>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
