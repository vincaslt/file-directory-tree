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
    <Cell {...rest} className={cn("border-l first:border-l-0", cellClassName)}>
      {(...renderProps) => (
        <div
          style={typeof style === "function" ? style(...renderProps) : style}
          className={cn(
            "px-1 py-1 flex items-center",
            typeof className === "function"
              ? className(...renderProps)
              : className
          )}
        >
          {typeof children === "function" ? children(...renderProps) : children}
        </div>
      )}
    </Cell>
  );
}
