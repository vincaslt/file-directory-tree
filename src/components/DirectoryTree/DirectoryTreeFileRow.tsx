import { PiFileLight } from "react-icons/pi";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { Key } from "react-stately";
import { Input, TextField } from "react-aria-components";
import { FileAction, FileActionType } from "./types";

type Props = {
  name: string;
  size: string;
  id: Key;
  level: number;
  modifiedDate: string;
  onAction: (action: FileAction) => void;
};

export function DirectoryTreeFileRow({
  name,
  size,
  modifiedDate,
  id,
  level,
  onAction,
}: Props) {
  return (
    <TableRow id={id} className="group">
      <TableCell
        className="gap-1"
        style={{
          marginLeft: `calc(${level * 1.2}rem + ${level * 0.25}rem )`,
        }}
      >
        <PiFileLight />
        {name === "" ? (
          <TextField aria-label="Folder name">
            <Input
              autoFocus
              placeholder="New Folder"
              className="bg-transparent w-[200px] focus:outline-none focus:ring-1 focus:ring-secondary"
              onBlur={(e) =>
                onAction({
                  type: FileActionType.AssignName,
                  data: { name: e.target.value },
                })
              }
            />
          </TextField>
        ) : (
          name
        )}
      </TableCell>
      <TableCell className="text-foreground/50">{modifiedDate}</TableCell>
      <TableCell className="text-foreground/50">{size}</TableCell>
      <TableCell cellClassName="border-l-0" className="justify-end"></TableCell>
    </TableRow>
  );
}
