import { DirectoryTreeNode, DirectoryTreeNodeWithPath } from "./types";

export function generateDirectoryPaths(
  tree: DirectoryTreeNode[],
  parentPath: string[] = []
): DirectoryTreeNodeWithPath[] {
  return tree.map((node) => {
    const path = [...parentPath, node.name];
    return {
      path,
      node,
      children:
        node.kind == "directory"
          ? generateDirectoryPaths(node.children, path)
          : [],
    };
  });
}

export function mapTree<T, R>(
  getChildren: (node: T) => T[],
  mapper: (node: T) => R,
  tree: T[]
): R[] {
  return tree.reduce<R[]>((results, node) => {
    results.push(mapper(node));
    results.push(...mapTree(getChildren, mapper, getChildren(node)));
    return results;
  }, []);
}
