import { Key, TreeData } from "react-stately";
import { DirectoryTreeFileRow } from "./DirectoryTreeFileRow";
import { DirectoryTreeFolderRow } from "./DirectoryTreeFolderRow";
import { DirectoryTreeNode, FileAction, FolderAction } from "./types";

type Props = {
  treeNode: TreeData<DirectoryTreeNode>["items"][number];
  expandedKeys: Set<Key>;
  onFileAction: (action: FileAction, key: Key) => void;
  onFolderAction: (action: FolderAction, key: Key) => void;
  level?: number;
};

export function DirectoryTreeNode({
  treeNode,
  expandedKeys,
  onFileAction,
  onFolderAction,
  level = 0,
}: Props) {
  const node = treeNode.value;

  if (node.kind === "file") {
    return (
      <DirectoryTreeFileRow
        name={node.name}
        modifiedDate={node.modified}
        size={node.size}
        id={treeNode.key}
        level={level}
        onAction={(action) => onFileAction(action, treeNode.key)}
      />
    );
  }

  return (
    <DirectoryTreeFolderRow
      name={node.name}
      id={treeNode.key}
      level={level}
      isExpanded={expandedKeys.has(treeNode.key)}
      onAction={(action) => onFolderAction(action, treeNode.key)}
    >
      {treeNode.children.map((treeNode) => {
        return (
          <DirectoryTreeNode
            key={treeNode.key}
            treeNode={treeNode}
            expandedKeys={expandedKeys}
            onFileAction={onFileAction}
            onFolderAction={onFolderAction}
            level={level + 1}
          />
        );
      })}
    </DirectoryTreeFolderRow>
  );
}
