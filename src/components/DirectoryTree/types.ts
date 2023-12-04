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

export enum FolderActionType {
  NewFolder = "new-folder",
  NewFile = "new-file",
  AssignName = "assign-folder-name",
}

export enum FileActionType {
  AssignName = "assign-file-name",
}

export type FolderAction =
  | { type: FolderActionType.NewFolder }
  | { type: FolderActionType.NewFile }
  | { type: FolderActionType.AssignName; data: { name: string } };

export type FileAction = {
  type: FileActionType.AssignName;
  data: { name: string };
};
