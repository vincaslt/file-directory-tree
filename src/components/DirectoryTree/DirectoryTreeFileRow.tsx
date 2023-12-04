import { PiFileLight } from "react-icons/pi";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";

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
      <TableCell cellClassName="border-l-0" className="justify-end"></TableCell>
    </TableRow>
  );
}
