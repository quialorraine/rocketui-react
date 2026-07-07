import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const BASIC_CODE = `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="team">Team</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Manage your account details.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
  <TabsContent value="team">Invite and manage teammates.</TabsContent>
</Tabs>`;

function BasicTabs() {
  return (
    <Tabs defaultValue="account" className="w-[360px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-sm text-muted-foreground">
        Manage your account details.
      </TabsContent>
      <TabsContent value="password" className="text-sm text-muted-foreground">
        Change your password here.
      </TabsContent>
      <TabsContent value="team" className="text-sm text-muted-foreground">
        Invite and manage teammates.
      </TabsContent>
    </Tabs>
  );
}

const SIZES_CODE = `<Tabs defaultValue="one" size="sm">
  <TabsList>
    <TabsTrigger value="one">Overview</TabsTrigger>
    <TabsTrigger value="two">Activity</TabsTrigger>
    <TabsTrigger value="three">Settings</TabsTrigger>
  </TabsList>
</Tabs>

<Tabs defaultValue="one" size="md">
  <TabsList>
    <TabsTrigger value="one">Overview</TabsTrigger>
    <TabsTrigger value="two">Activity</TabsTrigger>
    <TabsTrigger value="three">Settings</TabsTrigger>
  </TabsList>
</Tabs>`;

function SizeTabs({ size }: { size: "sm" | "md" }) {
  return (
    <Tabs defaultValue="one" size={size}>
      <TabsList>
        <TabsTrigger value="one">Overview</TabsTrigger>
        <TabsTrigger value="two">Activity</TabsTrigger>
        <TabsTrigger value="three">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

const FULL_WIDTH_CODE = `<Tabs defaultValue="preview" className="w-[420px]">
  <TabsList fullWidth>
    <TabsTrigger value="preview">Preview</TabsTrigger>
    <TabsTrigger value="code">Code</TabsTrigger>
  </TabsList>
</Tabs>`;

function FullWidthTabs() {
  return (
    <Tabs defaultValue="preview" className="w-[420px]">
      <TabsList fullWidth>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

const DISABLED_CODE = `<Tabs defaultValue="one">
  <TabsList>
    <TabsTrigger value="one">Enabled</TabsTrigger>
    <TabsTrigger value="two" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="three">Enabled</TabsTrigger>
  </TabsList>
</Tabs>`;

function DisabledTabs() {
  return (
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">Enabled</TabsTrigger>
        <TabsTrigger value="two" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="three">Enabled</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

const CONTROLLED_CODE = `function ControlledTabs() {
  const [tab, setTab] = useState("list");
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList>
        <TabsTrigger value="list">List</TabsTrigger>
        <TabsTrigger value="board">Board</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}`;

function ControlledTabs() {
  const [tab, setTab] = useState("list");
  return (
    <div className="flex flex-col items-center gap-3">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
      </Tabs>
      <p className="text-sm text-muted-foreground">
        Selected: <span className="font-medium text-foreground">{tab}</span>
      </p>
    </div>
  );
}

export function TabsShowcase() {
  return (
    <ComponentPage
      id="tabs"
      title="Tabs"
      description="Organize content into multiple sections and let users switch between them. A segmented control with keyboard navigation, controlled and uncontrolled state, and two sizes."
    >
      <Subsection
        title="Basic"
        description="Pair each trigger with a matching content panel via the shared value."
      >
        <Demo code={BASIC_CODE}>
          <BasicTabs />
        </Demo>
      </Subsection>

      <Subsection
        title="Sizes"
        description="Two sizes — sm and md — scale the track and triggers together."
      >
        <Demo code={SIZES_CODE} className="flex-col gap-4">
          <SizeTabs size="md" />
          <SizeTabs size="sm" />
        </Demo>
      </Subsection>

      <Subsection
        title="Full width"
        description="Stretch triggers to fill the container with the fullWidth prop."
      >
        <Demo code={FULL_WIDTH_CODE}>
          <FullWidthTabs />
        </Demo>
      </Subsection>

      <Subsection
        title="Disabled"
        description="Disable individual triggers; they're skipped during keyboard navigation."
      >
        <Demo code={DISABLED_CODE}>
          <DisabledTabs />
        </Demo>
      </Subsection>

      <Subsection
        title="Controlled"
        description="Drive the active tab from your own state with value and onValueChange."
      >
        <Demo code={CONTROLLED_CODE}>
          <ControlledTabs />
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
