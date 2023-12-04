export type DirectoryTreeFile = {
  kind: "file";
  name: string;
  size: string;
  modified: string;
};

export type DirectoryTreeFolder = {
  kind: "directory";
  name: string;
  children: DirectoryTreeNode[];
};

export type DirectoryTreeNode = DirectoryTreeFile | DirectoryTreeFolder;

export type DirectoryTreeNodeWithPath = {
  path: string[];
  node: DirectoryTreeNode;
  children: DirectoryTreeNodeWithPath[];
};

export enum FolderActionType {
  NewFolder = "new-folder",
  NewFile = "new-file",
  AssignName = "assign-name",
}

export type FolderAction =
  | { type: FolderActionType.NewFolder }
  | { type: FolderActionType.NewFile }
  | { type: FolderActionType.AssignName; data: { name: string } };
