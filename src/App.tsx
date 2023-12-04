import { DirectoryTree } from "~/components/DirectoryTree/DirectoryTree";
import { useDirectoryTreeStore } from "./stores/directoryTreeStore";
import { useState } from "react";
import { DirectoryTreeNodeWithPath } from "./components/DirectoryTree/types";

function App() {
  const directoryTreeRoot = useDirectoryTreeStore((state) => state.root);

  const [selected, setSelected] = useState<DirectoryTreeNodeWithPath>();

  return (
    <div className="h-screen flex flex-col items-center p-8">
      <div className="border bg-background shadow max-w-xl w-full">
        <DirectoryTree root={directoryTreeRoot} onSelect={setSelected} />
      </div>
      <div className="mt-8">
        Selection: {JSON.stringify(selected?.path.join("/"))}
      </div>
    </div>
  );
}

export default App;
