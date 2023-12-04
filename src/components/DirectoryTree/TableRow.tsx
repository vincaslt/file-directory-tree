import { ComponentProps } from "react";
import { Row } from "react-aria-components";
import { cn } from "~/utils/ui";

export function TableRow({ className, ...rest }: ComponentProps<typeof Row>) {
  return (
    <Row
      {...rest}
      className={(...renderProps) =>
        cn(
          "even:bg-secondary/5 cursor-pointer text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 selected:bg-primary/20 hover:bg-secondary/10 dragging:outline-none dragging:ring-1 dragging:ring-secondary/50 dragging:opacity-50 drop-target:ring-1 drop-target:ring-primary",
          typeof className === "function"
            ? className(...renderProps)
            : className
        )
      }
    />
  );
}
