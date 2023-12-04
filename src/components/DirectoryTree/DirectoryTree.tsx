import { useMemo, useState } from "react";
import { Button, Table, TableBody, TableHeader } from "react-aria-components";
import { PiCaretUpDownLight } from "react-icons/pi";
import { Key, Selection, useTreeData } from "react-stately";
import { DirectoryTreeNode } from "./DirectoryTreeNode";
import { TableHeaderColumn } from "./TableHeaderColumn";
import { generateDirectoryPaths, mapTree } from "./helpers";
import {
  DirectoryTreeNode as DirectoryTreeNodeType,
  DirectoryTreeNodeWithPath,
} from "./types";

// TODO: create controlled component

interface Props {
  root: DirectoryTreeNodeType;
  onSelect?: (selection: DirectoryTreeNodeWithPath) => void;
}

export function DirectoryTree({ root, onSelect }: Props) {
  const treeWithPaths = useMemo(() => generateDirectoryPaths([root]), [root]);

  // const [selectedPaths, setSelectedPaths] = useState(new Set<Key>());

  const tree = useTreeData({
    initialItems: treeWithPaths,
    getKey: (item) => item.path.join("/"),
    getChildren: (item) => item.children,
  });

  const [expandedPaths, setExpandedPaths] = useState(
    new Set(
      mapTree(
        (treeItem) => treeItem.children,
        (treeItem) => treeItem.key,
        tree.items
      )
    )
  );
  // const { dragAndDropHooks } = useDragAndDrop({
  //   getItems: (keys) =>
  //     [...keys].map((key) => ({
  //       "text/plain": list.getItem(key).name,
  //     })),
  //   onReorder(e) {
  //     if (e.target.dropPosition === "before") {
  //       list.moveBefore(e.target.key, e.keys);
  //     } else if (e.target.dropPosition === "after") {
  //       list.moveAfter(e.target.key, e.keys);
  //     }
  //   },
  // });

  const toggleExpandedNodeByPath = (path: Key) => {
    const { node } = tree.getItem(path).value;

    const updated = new Set([...expandedPaths]);

    if (expandedPaths.has(path)) {
      updated.delete(path);
    } else if (node.kind === "directory") {
      updated.add(path);
    }

    setExpandedPaths(updated);
  };

  const handleSelectionChange = (selection: Selection) => {
    if (selection === "all") {
      return;
    }

    const [path] = selection;

    if (!path) {
      // Currently selected path is selected again
      const [prev] = tree.selectedKeys;
      toggleExpandedNodeByPath(prev);
    } else {
      // New selection is made
      tree.setSelectedKeys(selection);
      onSelect?.(tree.getItem(path).value);
      toggleExpandedNodeByPath(path);
    }
  };

  const handleToggleAllExpanded = () => {
    if (expandedPaths.size > 0) {
      setExpandedPaths(new Set([]));
    } else {
      setExpandedPaths(
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

  // TODO: render empty state to be able to add new folders/files?
  return (
    <Table
      aria-label="Directory Tree"
      selectionBehavior="toggle"
      selectionMode="single"
      className="w-full"
      selectedKeys={tree.selectedKeys}
      onSelectionChange={handleSelectionChange}
      // dragAndDropHooks={dragAndDropHooks}
    >
      <TableHeader className="border-b text-sm">
        <TableHeaderColumn className="gap-1">
          <Button
            aria-label={expandedPaths.size > 0 ? "Collapse All" : "Expand All"}
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
            expandedPaths={expandedPaths}
          />
        ))}
      </TableBody>
    </Table>
  );
}
