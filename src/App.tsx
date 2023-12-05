import { useState } from "react";
import { Key, TreeData } from "react-stately";
import { DirectoryTree } from "~/components/DirectoryTree/DirectoryTree";
import { DirectoryTreeNode } from "./components/DirectoryTree/types";
import { getPathTo } from "./components/DirectoryTree/helpers";

function App() {
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
        <DirectoryTree root={data} onSelect={handleSelect} />
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

const data = {
  name: "project",
  kind: "directory",
  children: [
    {
      name: "src",
      kind: "directory",
      children: [
        {
          name: "index.js",
          kind: "file",
          size: "1KB",
          modified: "2022-03-08 11:30:00",
        },
        {
          name: "components",
          kind: "directory",
          children: [
            {
              name: "Button.jsx",
              kind: "file",
              size: "2KB",
              modified: "2022-03-07 15:00:00",
            },
            {
              name: "Card.jsx",
              kind: "file",
              size: "3KB",
              modified: "2022-03-06 10:00:00",
            },
          ],
        },
        {
          name: "styles",
          kind: "directory",
          children: [
            {
              name: "index.css",
              kind: "file",
              size: "1KB",
              modified: "2022-03-07 09:00:00",
            },
            {
              name: "components.css",
              kind: "file",
              size: "2KB",
              modified: "2022-03-06 12:00:00",
            },
          ],
        },
      ],
    },
    {
      name: "public",
      kind: "directory",
      children: [
        {
          name: "index.html",
          kind: "file",
          size: "1KB",
          modified: "2022-03-08 10:00:00",
        },
        {
          name: "favicon.ico",
          kind: "file",
          size: "5KB",
          modified: "2022-03-07 16:00:00",
        },
      ],
    },
    {
      name: "package.json",
      kind: "file",
      size: "1KB",
      modified: "2022-03-08 12:00:00",
    },
    {
      name: "README.md",
      kind: "file",
      size: "2KB",
      modified: "2022-03-08 13:00:00",
    },
  ],
} satisfies DirectoryTreeNode;

export default App;
