import { useState } from "react";
import { Key, TreeData } from "react-stately";
import { DirectoryTree } from "~/components/DirectoryTree/DirectoryTree";
import { DirectoryTreeNode } from "./components/DirectoryTree/types";
import { useDirectoryTreeStore } from "./stores/directoryTreeStore";
import { getPathTo } from "./components/DirectoryTree/helpers";

function App() {
  const directoryTreeRoot = useDirectoryTreeStore((state) => state.root);

  const [selected, setSelected] = useState<{
    path: string[];
    node: DirectoryTreeNode;
  }>();

  const handleSelect = (key: Key, tree: TreeData<DirectoryTreeNode>) => {
    const treeItem = tree.getItem(key);

    if (treeItem) {
      setSelected({ path: getPathTo(key, tree), node: treeItem.value });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center p-8">
      <div className="border bg-background shadow max-w-xl w-full">
        <DirectoryTree root={directoryTreeRoot} onSelect={handleSelect} />
      </div>
      {selected && (
        <div className="mt-8 flex flex-col border p-2">
          <div>Name: {selected.node.name}</div>
          <div>Kind: {selected.node.kind}</div>
          <div>Path: {[".", ...selected.path].join("/")}</div>
        </div>
      )}
    </div>
  );
}

export default App;
