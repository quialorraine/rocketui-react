import { Sparkle } from "@phosphor-icons/react";
import { Announcement } from "@/components/ui/announcement";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const BASIC_CODE = `<Announcement tag="New feature" href="#">
  Meet your AI Relocation Assistant
</Announcement>`;

const COLORS_CODE = `<Announcement tag="New" color="primary" href="#">
  Dark mode is here
</Announcement>
<Announcement tag="Beta" color="success" href="#">
  Try the new dashboard
</Announcement>
<Announcement tag="Update" color="info" href="#">
  We shipped faster search
</Announcement>`;

const NO_ICON_CODE = `<Announcement tag="Note" icon={null}>
  Read-only announcement without an arrow
</Announcement>`;

const CUSTOM_ICON_CODE = `<Announcement
  tag="AI"
  color="primary"
  icon={<Sparkle weight="fill" />}
  href="#"
>
  Generate content with one click
</Announcement>`;

const PLAIN_CODE = `<Announcement href="#">
  Announcing our Series A
</Announcement>`;

export function AnnouncementShowcase() {
  return (
    <ComponentPage
      id="announcement"
      title="Announcement"
      description="A compact, clickable pill for highlighting news or a call to action — a coloured badge, a short message and a trailing arrow."
    >
      <Subsection
        title="Basic"
        description="A leading badge, a message and an arrow. Renders an anchor when href is set."
      >
        <Demo code={BASIC_CODE}>
          <Announcement tag="New feature" href="#">
            Meet your AI Relocation Assistant
          </Announcement>
        </Demo>
      </Subsection>

      <Subsection
        title="Colors"
        description="Colour the badge to match the type of announcement."
      >
        <Demo code={COLORS_CODE} className="flex-col">
          <Announcement tag="New" color="primary" href="#">
            Dark mode is here
          </Announcement>
          <Announcement tag="Beta" color="success" href="#">
            Try the new dashboard
          </Announcement>
          <Announcement tag="Update" color="info" href="#">
            We shipped faster search
          </Announcement>
        </Demo>
      </Subsection>

      <Subsection
        title="Custom icon"
        description="Swap the trailing arrow for any icon."
      >
        <Demo code={CUSTOM_ICON_CODE}>
          <Announcement
            tag="AI"
            color="primary"
            icon={<Sparkle weight="fill" />}
            href="#"
          >
            Generate content with one click
          </Announcement>
        </Demo>
      </Subsection>

      <Subsection
        title="Without icon"
        description="Hide the arrow with icon={null} for a static announcement."
      >
        <Demo code={NO_ICON_CODE}>
          <Announcement tag="Note" icon={null}>
            Read-only announcement without an arrow
          </Announcement>
        </Demo>
      </Subsection>

      <Subsection
        title="Without badge"
        description="Omit the tag for a plain message pill."
      >
        <Demo code={PLAIN_CODE}>
          <Announcement href="#">Announcing our Series A</Announcement>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
