import { Key, TreeData } from "react-stately";
import { DirectoryTreeFileRow } from "./DirectoryTreeFileRow";
import { DirectoryTreeFolderRow } from "./DirectoryTreeFolderRow";
import { DirectoryTreeNodeWithPath } from "./types";

type Props = {
  treeNode: TreeData<DirectoryTreeNodeWithPath>["items"][number];
  expandedPaths: Set<Key>;
};

export function DirectoryTreeNode({ treeNode, expandedPaths }: Props) {
  const node = treeNode.value.node;

  if (node.kind === "file") {
    return (
      <DirectoryTreeFileRow
        name={node.name}
        modifiedDate={node.modified}
        size={node.size}
        path={treeNode.value.path}
      />
    );
  }

  return (
    <DirectoryTreeFolderRow
      name={node.name}
      path={treeNode.value.path}
      isExpanded={expandedPaths.has(treeNode.key)}
    >
      {treeNode.children.map((treeNode) => {
        return (
          <DirectoryTreeNode
            key={treeNode.key}
            treeNode={treeNode}
            expandedPaths={expandedPaths}
          />
        );
      })}
    </DirectoryTreeFolderRow>
  );
}
