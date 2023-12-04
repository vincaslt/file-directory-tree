import { useMemo, useState } from "react";
import {
  Button,
  DropIndicator,
  Table,
  TableBody,
  TableHeader,
  isTextDropItem,
  useDragAndDrop,
} from "react-aria-components";
import { PiCaretUpDownLight } from "react-icons/pi";
import { Key, Selection, TreeData, useTreeData } from "react-stately";
import { DirectoryTreeNode } from "./DirectoryTreeNode";
import { TableHeaderColumn } from "./TableHeaderColumn";
import { format } from "date-fns";
import { mapTree } from "./helpers";
import {
  DirectoryTreeNode as DirectoryTreeNodeType,
  FileAction,
  FileActionType,
  FolderAction,
  FolderActionType,
} from "./types";
import { cn } from "~/utils/ui";

interface Props {
  root: DirectoryTreeNodeType;
  onSelect?: (key: Key, tree: TreeData<DirectoryTreeNodeType>) => void;
}

export function DirectoryTree({ root, onSelect }: Props) {
  const initialItems = useMemo(() => [root], [root]);

  const tree = useTreeData({
    initialItems,
    getKey: () => window.crypto.randomUUID(),
    getChildren: (item) => (item.kind === "directory" ? item.children : []),
  });

  const [expandedKeys, setExpandedKeys] = useState(
    new Set(
      mapTree(
        (treeItem) => treeItem.children,
        (treeItem) => treeItem.key,
        tree.items
      )
    )
  );

  const { dragAndDropHooks } = useDragAndDrop({
    shouldAcceptItemDrop: (target) =>
      tree.getItem(target.key).value.kind === "directory",
    renderDropIndicator: (target) => (
      <DropIndicator
        target={target}
        className={({ isDropTarget }) =>
          cn("", isDropTarget && "ring-1 ring-primary")
        }
      />
    ),
    getItems: (keys) => {
      return [...keys].map((key) => {
        return {
          key: JSON.stringify(key),
        };
      });
    },
    onItemDrop: async (e) => {
      const keys = await Promise.all<Key>(
        e.items
          .filter(isTextDropItem)
          .map((item) => item.getText("key").then((key) => JSON.parse(key)))
      );
      keys.forEach((key) => tree.move(key, e.target.key, 0));
    },
    onReorder: (e) => {
      const targetNode = tree.getItem(e.target.key);
      const targetPosition = tree
        .getItem(targetNode.parentKey)
        .children.findIndex((node) => node.key === e.target.key);

      if (e.target.dropPosition === "before") {
        [...e.keys].forEach((key) => {
          if (!targetNode.parentKey) {
            // Disable dropping above root (could handle it though in onRootDrop)
            return;
          }
          tree.move(key, targetNode.parentKey, targetPosition);
        });
      } else if (e.target.dropPosition === "after") {
        [...e.keys].reverse().forEach((key) => {
          if (e.target.key === key) {
            return;
          }

          if (
            targetNode.value.kind === "directory" &&
            expandedKeys.has(e.target.key)
          ) {
            tree.move(key, e.target.key, 0);
          } else if (key !== tree.items.at(0)?.key) {
            // Won't move the root folder (could also handle it)
            tree.move(key, targetNode.parentKey, targetPosition + 1);
          }
        });
      }
    },
  });

  const toggleExpandedNode = (key: Key) => {
    const treeItem = tree.getItem(key);

    if (treeItem.value.kind !== "directory") {
      return;
    }

    const updated = new Set([...expandedKeys]);

    if (expandedKeys.has(treeItem.key)) {
      updated.delete(treeItem.key);
    } else {
      updated.add(treeItem.key);
    }

    setExpandedKeys(updated);
  };

  const handleSelectionChange = (selection: Selection) => {
    if (selection === "all") {
      return;
    }

    const [selectedKey] = selection;

    if (selectedKey) {
      // New selection is made
      tree.setSelectedKeys(selection);
      onSelect?.(selectedKey, tree);
      toggleExpandedNode(selectedKey);
    } else {
      // Currently selected path is selected again
      const [key] = tree.selectedKeys;
      toggleExpandedNode(key);
    }
  };

  const handleToggleAllExpanded = () => {
    if (expandedKeys.size > 0) {
      setExpandedKeys(new Set([]));
    } else {
      setExpandedKeys(
        new Set(
          mapTree(
            (treeItem) => treeItem.children,
            (treeItem) => treeItem.key,
            tree.items
          )
        )
      );
    }
  };

  const assignNodeName = (key: Key, name: string) => {
    const treeItem = tree.getItem(key);

    if (name !== "") {
      tree.update(key, {
        ...treeItem.value,
        name,
      });
    } else {
      tree.remove(key);
    }
  };

  const handleFolderAction = (action: FolderAction, key: Key) => {
    if (action.type === FolderActionType.NewFile) {
      tree.append(key, {
        name: "",
        kind: "file",
        size: "0KB",
        modified: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
      });
    }

    if (action.type === FolderActionType.NewFolder) {
      tree.append(key, {
        name: "",
        kind: "directory",
        children: [],
      });
      const addedItem = tree.getItem(key).children.at(-1);
      if (addedItem) {
        toggleExpandedNode(addedItem.key);
      }
    }

    if (action.type === FolderActionType.AssignName) {
      assignNodeName(key, action.data.name);
    }
  };

  const handleFileAction = (action: FileAction, key: Key) => {
    if (action.type === FileActionType.AssignName) {
      assignNodeName(key, action.data.name);
    }
  };

  return (
    <Table
      aria-label="Directory Tree"
      selectionBehavior="toggle"
      selectionMode="single"
      className="w-full"
      selectedKeys={tree.selectedKeys}
      onSelectionChange={handleSelectionChange}
      dragAndDropHooks={dragAndDropHooks}
    >
      <TableHeader className="border-b text-sm">
        <TableHeaderColumn className="gap-1">
          <Button
            aria-label={expandedKeys.size > 0 ? "Collapse All" : "Expand All"}
            className="-my-1 -ml-1 hover:bg-secondary/10 p-1 focus:outline-none focus:ring-1 focus:ring-secondary/50"
            onPress={handleToggleAllExpanded}
          >
            <PiCaretUpDownLight />
          </Button>
          Name
        </TableHeaderColumn>
        <TableHeaderColumn>Date Modified</TableHeaderColumn>
        <TableHeaderColumn>Size</TableHeaderColumn>
        <TableHeaderColumn columnClassName="w-[2.1rem] border-l-0"></TableHeaderColumn>
      </TableHeader>
      <TableBody className="relative">
        {tree.items.map((treeNode) => (
          <DirectoryTreeNode
            key={treeNode.key}
            treeNode={treeNode}
            expandedKeys={expandedKeys}
            onFolderAction={handleFolderAction}
            onFileAction={handleFileAction}
          />
        ))}
      </TableBody>
    </Table>
  );
}
