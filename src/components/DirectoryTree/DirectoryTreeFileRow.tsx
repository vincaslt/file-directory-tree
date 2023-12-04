import { TableCell } from "./TableCell";
import { PiDotsThreeVerticalLight, PiFileLight } from "react-icons/pi";
import { TableRow } from "./TableRow";
import { Button } from "react-aria-components";

type Props = {
  name: string;
  size: string;
  modifiedDate: string;
  path: string[];
};

export function DirectoryTreeFileRow({
  name,
  size,
  modifiedDate,
  path,
}: Props) {
  const level = path.length - 1;
  return (
    <TableRow id={path.join("/")} className="group">
      <TableCell
        className="gap-1"
        style={{
          marginLeft: `calc(${level * 1.2}rem + ${level * 0.25}rem )`,
        }}
      >
        <PiFileLight />
        {name}
      </TableCell>
      <TableCell className="text-foreground/50">{modifiedDate}</TableCell>
      <TableCell className="text-foreground/50">{size}</TableCell>
      <TableCell cellClassName="border-l-0" className="justify-end">
        <Button className="hidden group-hover:block -my-1 -mr-1 p-1 hover:bg-secondary/10 focus:outline-none focus:ring-1 focus:ring-secondary/50">
          <PiDotsThreeVerticalLight />
        </Button>
      </TableCell>
    </TableRow>
  );
}
