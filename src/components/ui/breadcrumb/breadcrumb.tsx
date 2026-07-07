import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { CaretRight, DotsThree } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Context                                    */
/* -------------------------------------------------------------------------- */

const BreadcrumbContext = createContext<{ separator: ReactNode }>({
  separator: <CaretRight />,
});

/* -------------------------------------------------------------------------- */
/*                                    Root                                     */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbProps extends ComponentPropsWithoutRef<"nav"> {
  /** Node rendered between items. Defaults to a chevron. */
  separator?: ReactNode;
}

export function Breadcrumb({ separator = <CaretRight />, ...props }: BreadcrumbProps) {
  return (
    <BreadcrumbContext.Provider value={{ separator }}>
      <nav aria-label="breadcrumb" {...props} />
    </BreadcrumbContext.Provider>
  );
}
Breadcrumb.displayName = "Breadcrumb";

/* -------------------------------------------------------------------------- */
/*                                    List                                     */
/* -------------------------------------------------------------------------- */

export type BreadcrumbListProps = ComponentPropsWithoutRef<"ol">;

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-2 break-words text-base font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
BreadcrumbList.displayName = "BreadcrumbList";

/* -------------------------------------------------------------------------- */
/*                                    Item                                     */
/* -------------------------------------------------------------------------- */

export type BreadcrumbItemProps = ComponentPropsWithoutRef<"li">;

export function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <li className={cn("inline-flex items-center gap-2", className)} {...props} />
  );
}
BreadcrumbItem.displayName = "BreadcrumbItem";

/* -------------------------------------------------------------------------- */
/*                                    Link                                     */
/* -------------------------------------------------------------------------- */

export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<"a"> {
  /** Render styles onto a custom child (e.g. a router Link) instead of `<a>`. */
  asChild?: boolean;
}

export function BreadcrumbLink({
  asChild = false,
  className,
  children,
  ...props
}: BreadcrumbLinkProps) {
  const classes = cn(
    "inline-flex items-center gap-2 rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(classes, child.props.className),
      ...props,
    });
  }

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}
BreadcrumbLink.displayName = "BreadcrumbLink";

/* -------------------------------------------------------------------------- */
/*                                    Page                                     */
/* -------------------------------------------------------------------------- */

export type BreadcrumbPageProps = ComponentPropsWithoutRef<"span">;

/** The current page, the last, non-interactive crumb. */
export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("inline-flex items-center gap-2 text-foreground", className)}
      {...props}
    />
  );
}
BreadcrumbPage.displayName = "BreadcrumbPage";

/* -------------------------------------------------------------------------- */
/*                                  Separator                                  */
/* -------------------------------------------------------------------------- */

export type BreadcrumbSeparatorProps = ComponentPropsWithoutRef<"li">;

export function BreadcrumbSeparator({
  className,
  children,
  ...props
}: BreadcrumbSeparatorProps) {
  const { separator } = useContext(BreadcrumbContext);
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex items-center text-muted-foreground [&>svg]:size-4",
        className,
      )}
      {...props}
    >
      {children ?? separator}
    </li>
  );
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/* -------------------------------------------------------------------------- */
/*                                  Ellipsis                                   */
/* -------------------------------------------------------------------------- */

export type BreadcrumbEllipsisProps = ComponentPropsWithoutRef<"span">;

/** Collapsed middle crumbs. Wrap in a menu trigger to reveal them. */
export function BreadcrumbEllipsis({
  className,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn(
        "inline-flex size-6 items-center justify-center [&>svg]:size-4",
        className,
      )}
      {...props}
    >
      <DotsThree weight="bold" />
    </span>
  );
}
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
