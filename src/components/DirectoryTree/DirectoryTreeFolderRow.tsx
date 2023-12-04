import { ReactNode } from "react";
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  TextField,
  Input,
} from "react-aria-components";
import {
  PiCaretDownLight,
  PiCaretUpLight,
  PiDotsThreeVerticalLight,
  PiFilePlusLight,
  PiFolderLight,
  PiFolderOpenLight,
  PiFolderPlusLight,
} from "react-icons/pi";
import { TableCell } from "./TableCell";
import { TableRow } from "./TableRow";
import { FolderAction, FolderActionType } from "./types";

type Props = {
  name: string;
  path: string[];
  children: ReactNode;
  isExpanded: boolean;
  onAction: (action: FolderAction) => void;
};

export function DirectoryTreeFolderRow({
  name,
  children,
  path,
  isExpanded,
  onAction,
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
          {name === "" ? (
            <TextField>
              <Input
                autoFocus
                placeholder="New Folder"
                className="bg-transparent w-[200px] focus:outline-none focus:ring-1 focus:ring-secondary"
                onBlur={(e) =>
                  onAction({
                    type: FolderActionType.AssignName,
                    data: { name: e.target.value },
                  })
                }
              />
            </TextField>
          ) : (
            name
          )}
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell cellClassName="border-l-0" className="justify-end">
          <MenuTrigger>
            <Button className="hidden group-hover:block group-focus:block -my-1 -mr-1 p-1 hover:bg-secondary/10 focus:outline-none focus:ring-1 focus:ring-secondary/50">
              <PiDotsThreeVerticalLight />
            </Button>
            <Popover offset={0}>
              <Menu
                onAction={(action) =>
                  onAction({
                    type: action as
                      | FolderActionType.NewFile
                      | FolderActionType.NewFolder,
                  })
                }
                className="border shadow-md focus:outline-none bg-background text-sm"
              >
                <MenuItem
                  className="flex gap-1 py-1 px-2 cursor-pointer focus:bg-primary/10 focus:outline-none"
                  id={FolderActionType.NewFolder}
                >
                  <PiFolderPlusLight /> New Folder
                </MenuItem>
                <MenuItem
                  className="flex gap-1 py-1 px-2 cursor-pointer focus:bg-primary/10 focus:outline-none"
                  id={FolderActionType.NewFile}
                >
                  <PiFilePlusLight />
                  New File
                </MenuItem>
              </Menu>
            </Popover>
          </MenuTrigger>
        </TableCell>
      </TableRow>
      {isExpanded && children}
    </>
  );
}
