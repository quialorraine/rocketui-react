import type {
  ComponentPropsWithoutRef,
  ReactNode,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Root                                      */
/* -------------------------------------------------------------------------- */

export interface TableProps extends ComponentPropsWithoutRef<"table"> {
  /** Wrapper element props (the rounded, scrollable surface). */
  containerProps?: ComponentPropsWithoutRef<"div">;
}

/**
 * A structured data table. Compose with TableHeader / TableBody / TableRow /
 * TableHead / TableCell. The root renders a rounded, horizontally scrollable
 * surface around a semantic <table>.
 */
export function Table({ className, containerProps, ...props }: TableProps) {
  const { className: containerClassName, ...restContainer } = containerProps ?? {};
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-2xl border border-border bg-card",
        containerClassName,
      )}
      {...restContainer}
    >
      <table
        className={cn("w-full border-collapse text-left text-sm", className)}
        {...props}
      />
    </div>
  );
}
Table.displayName = "Table";

/* -------------------------------------------------------------------------- */
/*                               Sections                                     */
/* -------------------------------------------------------------------------- */

export function TableHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn(className)} {...props} />;
}
TableHeader.displayName = "TableHeader";

export function TableBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody
      className={cn("[&>tr:last-child]:border-0", className)}
      {...props}
    />
  );
}
TableBody.displayName = "TableBody";

export function TableFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<"tfoot">) {
  return (
    <tfoot
      className={cn("border-t border-border/70 font-medium", className)}
      {...props}
    />
  );
}
TableFooter.displayName = "TableFooter";

/* -------------------------------------------------------------------------- */
/*                                  Row                                        */
/* -------------------------------------------------------------------------- */

export interface TableRowProps extends ComponentPropsWithoutRef<"tr"> {
  /** Highlight the row (e.g. selected state). */
  selected?: boolean;
  /** Add hover affordance + pointer cursor. */
  interactive?: boolean;
}

export function TableRow({
  className,
  selected,
  interactive,
  ...props
}: TableRowProps) {
  return (
    <tr
      data-selected={selected || undefined}
      className={cn(
        "border-b border-border/70 transition-colors",
        interactive && "cursor-pointer hover:bg-accent/50",
        selected && "bg-accent/60",
        className,
      )}
      {...props}
    />
  );
}
TableRow.displayName = "TableRow";

/* -------------------------------------------------------------------------- */
/*                                 Cells                                       */
/* -------------------------------------------------------------------------- */

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      scope="col"
      className={cn(
        "h-11 px-4 text-left align-middle text-sm font-medium text-muted-foreground",
        "first:pl-5 last:pr-5",
        className,
      )}
      {...props}
    />
  );
}
TableHead.displayName = "TableHead";

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function TableCell({ className, ...props }: TableCellProps) {
  return (
    <td
      className={cn(
        "px-4 py-3 align-middle text-sm text-foreground",
        "first:pl-5 last:pr-5",
        className,
      )}
      {...props}
    />
  );
}
TableCell.displayName = "TableCell";

/* -------------------------------------------------------------------------- */
/*                                 Caption                                     */
/* -------------------------------------------------------------------------- */

export function TableCaption({
  className,
  ...props
}: ComponentPropsWithoutRef<"caption">) {
  return (
    <caption
      className={cn("px-6 py-4 text-left text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
TableCaption.displayName = "TableCaption";
