import { Key, TreeData } from "react-stately";
import { DirectoryTreeNode } from "./types";

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

export function getPathTo(
  key: Key,
  tree: TreeData<DirectoryTreeNode>
): string[] {
  const treeItem = tree.getItem(key);
  return treeItem.parentKey
    ? [...getPathTo(treeItem.parentKey, tree), treeItem.value.name]
    : [];
}
