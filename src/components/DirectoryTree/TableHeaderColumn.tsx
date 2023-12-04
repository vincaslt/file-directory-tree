import { ComponentProps } from "react";
import { Column } from "react-aria-components";
import { cn } from "~/utils/ui";

type Props = {
  columnClassName?: string;
};

export function TableHeaderColumn({
  columnClassName,
  className,
  children,
  ...rest
}: ComponentProps<typeof Column> & Props) {
  return (
    <Column
      {...rest}
      className={cn(
        "focus:outline-none text-left border-l first:border-l-0",
        columnClassName
      )}
      isRowHeader
    >
      {(...renderProps) => (
        <div
          className={cn(
            "p-1 flex items-center",
            typeof className === "function"
              ? className(...renderProps)
              : className
          )}
        >
          {typeof children === "function" ? children(...renderProps) : children}
        </div>
      )}
    </Column>
  );
}
