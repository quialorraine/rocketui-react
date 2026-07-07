import { DotsThree } from "@phosphor-icons/react";
import { Attachment, AttachmentTile } from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import { ComponentPage, Subsection } from "./docs";
import { Demo } from "./components/demo";

const IMG_1 = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop";
const IMG_2 = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop";

function Menu() {
  return (
    <Button variant="ghost" color="neutral" size="sm" iconOnly aria-label="Options">
      <DotsThree weight="bold" />
    </Button>
  );
}

const TILES_CODE = `<AttachmentTile src={img1} onRemove={() => {}} />
<AttachmentTile src={img2} type="video" onRemove={() => {}} />
<AttachmentTile type="file" onRemove={() => {}} />`;

const LIST_CODE = `<Attachment
  type="file"
  name="Alex"
  description="alex@gmail.com"
  action={<Menu />}
/>
<Attachment
  src={img1}
  name="Alex"
  description="alex@gmail.com"
  action={<Menu />}
/>
<Attachment
  src={img2}
  name="Alex"
  description="alex@gmail.com"
  action={<Menu />}
/>`;

const REMOVABLE_CODE = `<Attachment
  src={img1}
  name="mountains.jpg"
  description="2.4 MB"
  onRemove={() => {}}
/>`;

export function AttachmentShowcase() {
  return (
    <ComponentPage
      id="attachment"
      title="Attachment"
      description="Preview uploaded media and files. Square tiles with a remove button and image, video and file states, plus a compact list row with primary and secondary text and a trailing action."
    >
      <Subsection
        title="Tiles"
        description="Square previews for a media grid. Video shows a play overlay; files fall back to a document icon."
      >
        <Demo code={TILES_CODE}>
          <AttachmentTile src={IMG_1} alt="Portrait" onRemove={() => {}} />
          <AttachmentTile src={IMG_2} alt="Landscape" type="video" onRemove={() => {}} />
          <AttachmentTile type="file" onRemove={() => {}} />
        </Demo>
      </Subsection>

      <Subsection
        title="List"
        description="A compact row with a thumbnail, primary and secondary text, and a trailing action slot."
      >
        <Demo code={LIST_CODE}>
          <div className="flex w-[280px] flex-col gap-4">
            <Attachment type="file" name="Alex" description="alex@gmail.com" action={<Menu />} />
            <Attachment src={IMG_1} alt="Portrait" name="Alex" description="alex@gmail.com" action={<Menu />} />
            <Attachment src={IMG_2} alt="Landscape" name="Alex" description="alex@gmail.com" action={<Menu />} />
          </div>
        </Demo>
      </Subsection>

      <Subsection
        title="Removable row"
        description="Pass onRemove instead of an action to show a dismiss button."
      >
        <Demo code={REMOVABLE_CODE}>
          <div className="w-[280px]">
            <Attachment
              src={IMG_2}
              alt="Landscape"
              name="mountains.jpg"
              description="2.4 MB"
              onRemove={() => {}}
            />
          </div>
        </Demo>
      </Subsection>
    </ComponentPage>
  );
}
