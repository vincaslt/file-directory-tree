import { ReactNode } from "react";
import {
  PiFolderLight,
  PiCaretDownLight,
  PiCaretUpLight,
  PiDotsThreeVerticalLight,
  PiFolderOpenLight,
} from "react-icons/pi";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { Button } from "react-aria-components";

type Props = {
  name: string;
  path: string[];
  children: ReactNode;
  isExpanded: boolean;
};

// TODO: remove magic numbers

export function DirectoryTreeFolderRow({
  name,
  children,
  path,
  isExpanded,
}: Props) {
  const level = path.length - 1;
  return (
    <>
      <TableRow id={path.join("/")} className="group">
        <TableCell
          className="gap-1"
          style={{
            marginLeft: `calc(${level * 1.2}rem + ${level * 0.25}rem )`,
          }}
        >
          {isExpanded ? <PiCaretDownLight /> : <PiCaretUpLight />}
          {isExpanded ? <PiFolderOpenLight /> : <PiFolderLight />}
          {name}
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell cellClassName="border-l-0" className="justify-end">
          <Button className="hidden group-hover:block -my-1 -mr-1 p-1 hover:bg-secondary/10 focus:outline-none focus:ring-1 focus:ring-secondary/50">
            <PiDotsThreeVerticalLight />
          </Button>
        </TableCell>
      </TableRow>
      {isExpanded && children}
    </>
  );
}
