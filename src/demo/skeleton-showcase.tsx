import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

function MediaCard() {
  return (
    <div className="flex w-44 flex-col gap-3">
      <Skeleton variant="rect" className="size-11" />
      <div className="flex flex-col gap-1.5">
        <Skeleton variant="text" />
        <Skeleton variant="text" width={110} />
        <Skeleton variant="text" width={136} />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="flex w-44 flex-col gap-1.5">
      <Skeleton variant="text" />
      <Skeleton variant="text" width={110} />
      <Skeleton variant="text" width={136} />
    </div>
  );
}

function UserRow() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" className="size-11" />
      <div className="flex w-44 flex-col gap-1.5">
        <Skeleton variant="text" />
        <Skeleton variant="text" width={110} />
      </div>
    </div>
  );
}

function ThumbRow() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton variant="rect" className="size-11" />
      <div className="flex w-44 flex-col gap-1.5">
        <Skeleton variant="text" />
        <Skeleton variant="text" width={110} />
      </div>
    </div>
  );
}

function LoadingSwap() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex flex-col gap-4">
      <Button size="sm" variant="soft" onClick={() => setLoading((v) => !v)}>
        {loading ? "Show content" : "Show skeleton"}
      </Button>
      <div className="flex items-center gap-3">
        {loading ? (
          <Skeleton variant="circle" className="size-11" />
        ) : (
          <Avatar name="Alex Morgan" size="lg" />
        )}
        <div className="flex w-44 flex-col gap-1.5">
          {loading ? (
            <>
              <Skeleton variant="text" />
              <Skeleton variant="text" width={110} />
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-foreground">
                Alex Morgan
              </span>
              <span className="text-sm text-muted-foreground">alex@gmail.com</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function SkeletonShowcase() {
  return (
    <ComponentPage
      id="skeleton"
      title="Skeleton"
      description="A placeholder that shows a loading state and the expected shape of a component. Compose the rect, circle and text variants to mirror any layout."
    >
      <Subsection
        title="Variants"
        description="Three primitives — rect, circle and text — combine into any placeholder."
      >
        <Demo align="start" code={`<Skeleton variant="rect" className="size-11" />
<Skeleton variant="circle" className="size-11" />
<Skeleton variant="text" width={136} />`}>
          <div className="flex items-center gap-6">
            <Skeleton variant="rect" className="size-11" />
            <Skeleton variant="circle" className="size-11" />
            <Skeleton variant="text" width={136} />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Compositions"
        description="Mirror real layouts by stacking the primitives."
      >
        <Demo align="start" className="w-full" code={`<div className="flex flex-col gap-3">
  <Skeleton variant="rect" className="size-11" />
  <div className="flex flex-col gap-1.5">
    <Skeleton variant="text" />
    <Skeleton variant="text" width={110} />
    <Skeleton variant="text" width={136} />
  </div>
</div>`}>
          <div className="flex flex-wrap items-start gap-10">
            <MediaCard />
            <Paragraph />
            <UserRow />
            <ThumbRow />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Loading state"
        description="Swap the skeleton for the real content once data has loaded."
      >
        <Demo align="start" code={`{loading ? (
  <Skeleton variant="circle" className="size-11" />
) : (
  <Avatar name="Alex Morgan" size="lg" />
)}`}>
          <LoadingSwap />
        </Demo>
      </Subsection>

      <Subsection
        title="Static"
        description="Set animated={false} to render a still placeholder."
      >
        <Demo align="start" code={`<Skeleton variant="text" animated={false} width={200} />`}>
          <div className="flex w-56 flex-col gap-1.5">
            <Skeleton variant="text" animated={false} />
            <Skeleton variant="text" animated={false} width={140} />
          </div>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
