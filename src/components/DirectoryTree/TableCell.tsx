import { ComponentProps } from "react";
import { Cell } from "react-aria-components";
import { cn } from "~/utils/ui";

type Props = {
  cellClassName?: string;
};

export function TableCell({
  className,
  cellClassName,
  children,
  style,
  ...rest
}: ComponentProps<typeof Cell> & Props) {
  return (
    <Cell
      {...rest}
      className={cn(
        "h-0 relative border-l first:border-l-0 focus:outline-none group/cell",
        cellClassName
      )}
    >
      {(...renderProps) => (
        <div className="h-full group-focus/cell:ring-1 group-focus/cell:ring-primary/50">
          <div
            style={typeof style === "function" ? style(...renderProps) : style}
            className={cn(
              "h-full px-1 py-1 flex items-center",
              typeof className === "function"
                ? className(...renderProps)
                : className
            )}
          >
            {typeof children === "function"
              ? children(...renderProps)
              : children}
          </div>
        </div>
      )}
    </Cell>
  );
}
