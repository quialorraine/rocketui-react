import {
  Children,
  cloneElement,
  isValidElement,
  useState,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { User } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const avatarVariants = cva(
  "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-medium",
  {
    variants: {
      size: {
        xs: "size-6 text-[0.625rem]",
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-12 text-lg",
        xl: "size-14 text-xl",
      },
      shape: {
        circle: "rounded-full",
        rounded: "",
      },
      color: {
        neutral: "bg-secondary text-secondary-foreground",
        brand: "bg-gradient-to-b from-primary to-primary/70 text-primary-foreground",
      },
    },
    compoundVariants: [
      { shape: "rounded", size: "xs", className: "rounded-md" },
      { shape: "rounded", size: "sm", className: "rounded-lg" },
      { shape: "rounded", size: "md", className: "rounded-lg" },
      { shape: "rounded", size: "lg", className: "rounded-xl" },
      { shape: "rounded", size: "xl", className: "rounded-2xl" },
    ],
    defaultVariants: { size: "md", shape: "circle", color: "neutral" },
  },
);

type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>["size"]>;
type AvatarShape = NonNullable<VariantProps<typeof avatarVariants>["shape"]>;

const ICON_SIZE: Record<AvatarSize, string> = {
  xs: "size-3.5",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-7",
};

/** Derive up to two uppercase initials from a display name. */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/* -------------------------------------------------------------------------- */
/*                                   Avatar                                    */
/* -------------------------------------------------------------------------- */

export interface AvatarProps
  extends Omit<ComponentPropsWithoutRef<"span">, "color">,
    VariantProps<typeof avatarVariants> {
  /** Image source. Falls back to initials/icon on error or when omitted. */
  src?: string;
  /** Accessible label for the image. Defaults to `name`. */
  alt?: string;
  /** Display name used to derive initials and the image alt text. */
  name?: string;
  /** Explicit initials, overriding the ones derived from `name`. */
  initials?: string;
  /** Custom fallback node (e.g. an icon) shown when no image is available. */
  fallback?: ReactNode;
}

export function Avatar({
  src,
  alt,
  name,
  initials,
  fallback,
  size,
  shape,
  color,
  className,
  ...props
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSize = size ?? "md";
  const showImage = Boolean(src) && !failed;
  const label = getInitials(initials ?? name ?? "");

  return (
    <span
      data-slot="avatar"
      className={cn(avatarVariants({ size, shape, color }), className)}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? ""}
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : label ? (
        <span aria-hidden="true">{label}</span>
      ) : (
        (fallback ?? <User weight="fill" className={ICON_SIZE[resolvedSize]} />)
      )}
    </span>
  );
}
Avatar.displayName = "Avatar";

/* -------------------------------------------------------------------------- */
/*                                 AvatarGroup                                 */
/* -------------------------------------------------------------------------- */

const GROUP_OVERLAP: Record<AvatarSize, string> = {
  xs: "-space-x-1.5",
  sm: "-space-x-2",
  md: "-space-x-2.5",
  lg: "-space-x-3",
  xl: "-space-x-3.5",
};

export interface AvatarGroupProps extends ComponentPropsWithoutRef<"div"> {
  /** Maximum avatars to render before collapsing the rest into a "+N" badge. */
  max?: number;
  /** Size applied to every avatar in the group (children can override). */
  size?: AvatarSize;
  /** Shape applied to every avatar in the group (children can override). */
  shape?: AvatarShape;
}

export function AvatarGroup({
  max,
  size = "md",
  shape,
  className,
  children,
  ...props
}: AvatarGroupProps) {
  const avatars = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<AvatarProps>[];
  const visible = typeof max === "number" ? avatars.slice(0, max) : avatars;
  const overflow = avatars.length - visible.length;

  const ring = "ring-2 ring-background";

  return (
    <div
      data-slot="avatar-group"
      className={cn("flex items-center", GROUP_OVERLAP[size], className)}
      {...props}
    >
      {visible.map((child, index) =>
        cloneElement(child, {
          key: child.key ?? index,
          size: child.props.size ?? size,
          shape: child.props.shape ?? shape,
          className: cn(ring, child.props.className),
        }),
      )}
      {overflow > 0 && (
        <Avatar
          size={size}
          shape={shape}
          fallback={<span aria-hidden="true">+{overflow}</span>}
          className={ring}
          aria-label={`${overflow} more`}
        />
      )}
    </div>
  );
}
AvatarGroup.displayName = "AvatarGroup";
