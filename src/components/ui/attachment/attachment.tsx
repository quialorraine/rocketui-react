import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { File as FileIcon, Play, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Types                                     */
/* -------------------------------------------------------------------------- */

export type AttachmentType = "image" | "video" | "file";

function resolveType(type: AttachmentType | undefined, src?: string): AttachmentType {
  if (type) return type;
  return src ? "image" : "file";
}

/* -------------------------------------------------------------------------- */
/*                                 Thumbnail                                   */
/* -------------------------------------------------------------------------- */

interface ThumbnailProps {
  src?: string;
  type: AttachmentType;
  alt?: string;
  size: number;
  className?: string;
}

function Thumbnail({ src, type, alt, size, className }: ThumbnailProps) {
  const showImage = src && type !== "file";
  const playSize = Math.round(size * 0.4);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg bg-accent",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? ""}
          className="size-full object-cover"
          draggable={false}
        />
      ) : (
        <span className="grid size-full place-items-center text-foreground">
          <FileIcon weight="fill" style={{ width: size * 0.4, height: size * 0.4 }} />
        </span>
      )}

      {type === "video" && (
        <span className="absolute inset-0 grid place-items-center bg-black/10">
          <span
            className="grid place-items-center rounded-full bg-card/90 text-foreground"
            style={{ width: playSize, height: playSize }}
          >
            <Play weight="fill" style={{ width: playSize * 0.5, height: playSize * 0.5 }} />
          </span>
        </span>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Remove button                                */
/* -------------------------------------------------------------------------- */

function RemoveButton({
  onRemove,
  label = "Remove",
}: {
  onRemove: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
      className={cn(
        "absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full border border-border bg-card/90 text-foreground backdrop-blur transition-colors",
        "hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "[&_svg]:size-3",
      )}
    >
      <X weight="bold" />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Tile (grid)                                  */
/* -------------------------------------------------------------------------- */

export interface AttachmentTileProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onClick"> {
  src?: string;
  type?: AttachmentType;
  alt?: string;
  /** Square edge length in pixels. */
  size?: number;
  /** Show a remove button and fire this when pressed. */
  onRemove?: () => void;
  removeLabel?: string;
  onClick?: () => void;
}

export function AttachmentTile({
  src,
  type,
  alt,
  size = 80,
  onRemove,
  removeLabel,
  onClick,
  className,
  ...props
}: AttachmentTileProps) {
  const resolved = resolveType(type, src);
  return (
    <div
      className={cn("relative inline-block", onClick && "cursor-pointer", className)}
      onClick={onClick}
      {...props}
    >
      <Thumbnail src={src} type={resolved} alt={alt} size={size} />
      {onRemove && <RemoveButton onRemove={onRemove} label={removeLabel} />}
    </div>
  );
}
AttachmentTile.displayName = "AttachmentTile";

/* -------------------------------------------------------------------------- */
/*                               Item (list row)                              */
/* -------------------------------------------------------------------------- */

export interface AttachmentProps extends ComponentPropsWithoutRef<"div"> {
  src?: string;
  type?: AttachmentType;
  alt?: string;
  /** Primary line. */
  name: ReactNode;
  /** Secondary line. */
  description?: ReactNode;
  /** Thumbnail edge length in pixels. */
  thumbnailSize?: number;
  /** Trailing content, e.g. a menu button. */
  action?: ReactNode;
  /** Show a remove button (used when no `action` is given). */
  onRemove?: () => void;
  removeLabel?: string;
}

export function Attachment({
  src,
  type,
  alt,
  name,
  description,
  thumbnailSize = 42,
  action,
  onRemove,
  removeLabel = "Remove",
  className,
  ...props
}: AttachmentProps) {
  const resolved = resolveType(type, src);
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      <Thumbnail src={src} type={resolved} alt={alt} size={thumbnailSize} />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-foreground">{name}</span>
        {description != null && (
          <span className="truncate text-sm text-muted-foreground">{description}</span>
        )}
      </div>
      <div className="ml-auto flex shrink-0 items-center">
        {action ??
          (onRemove && (
            <button
              type="button"
              aria-label={removeLabel}
              onClick={onRemove}
              className={cn(
                "grid size-8 place-items-center rounded-full text-muted-foreground transition-colors",
                "hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "[&_svg]:size-[18px]",
              )}
            >
              <X weight="bold" />
            </button>
          ))}
      </div>
    </div>
  );
}
Attachment.displayName = "Attachment";
