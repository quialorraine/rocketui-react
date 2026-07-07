import { Avatar } from "@/components/ui/avatar";
import { ScrollShadow } from "@/components/ui/scroll-shadow";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const PARAGRAPH = `Lorem ipsum is the printing and typesetting industry's standard placeholder text. It consists of scrambled, modified Latin words derived from Cicero's 1st-century BC treatise De finibus bonorum et malorum. It is used to evaluate layouts without distracting readers with readable content. Many desktop publishing packages and web page editors now use it as their default model text.`;

function Person() {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <Avatar name="Alex" size="sm" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">Alex</span>
        <span className="text-sm text-muted-foreground">alex@gmail.com</span>
      </div>
    </div>
  );
}

export function ScrollShadowShowcase() {
  return (
    <ComponentPage
      id="scroll-shadow"
      title="ScrollShadow"
      description="Apply visual shadows to indicate scrollable content overflow, with automatic detection of scroll position. The fade only appears on edges that still have content, and works on both axes."
    >
      <Subsection
        title="Vertical"
        description="The fade appears at the bottom, then flips to the top as you scroll down."
      >
        <Demo align="start" code={`<ScrollShadow className="max-h-40">
  <p>{longText}</p>
</ScrollShadow>`}>
          <div className="w-full max-w-md rounded-3xl bg-card p-4 shadow-sm">
            <ScrollShadow size={48} className="max-h-40 pr-2">
              <p className="text-base leading-relaxed text-foreground">{PARAGRAPH}</p>
            </ScrollShadow>
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Horizontal"
        description={'Set orientation="horizontal" to fade the left and right edges of a scrolling row.'}
      >
        <Demo align="start" className="w-full" code={`<ScrollShadow orientation="horizontal" hideScrollBar>
  <div className="flex gap-8">{items}</div>
</ScrollShadow>`}>
          <div className="w-full max-w-2xl rounded-3xl bg-card p-4 shadow-sm">
            <ScrollShadow orientation="horizontal" size={48} hideScrollBar>
              <div className="flex w-max items-center gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-6">
                    {i > 0 && <span className="h-8 w-px bg-border" />}
                    <Person />
                  </div>
                ))}
              </div>
            </ScrollShadow>
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Shadow size"
        description="Control the length of the fade with the size prop (in pixels)."
      >
        <Demo align="start" className="w-full" code={`<ScrollShadow size={16} className="max-h-40" />
<ScrollShadow size={80} className="max-h-40" />`}>
          <div className="flex w-full max-w-2xl flex-wrap gap-6">
            {[16, 80].map((s) => (
              <div
                key={s}
                className="flex-1 rounded-3xl bg-card p-4 shadow-sm"
              >
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  size={s}
                </p>
                <ScrollShadow size={s} className="max-h-40 pr-2">
                  <p className="text-base leading-relaxed text-foreground">
                    {PARAGRAPH}
                  </p>
                </ScrollShadow>
              </div>
            ))}
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Disabled"
        description="Set isEnabled={false} to keep the scroll container but remove the fade."
      >
        <Demo align="start" code={`<ScrollShadow isEnabled={false} className="max-h-40">
  <p>{longText}</p>
</ScrollShadow>`}>
          <div className="w-full max-w-md rounded-3xl bg-card p-4 shadow-sm">
            <ScrollShadow isEnabled={false} className="max-h-40 pr-2">
              <p className="text-base leading-relaxed text-foreground">{PARAGRAPH}</p>
            </ScrollShadow>
          </div>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
