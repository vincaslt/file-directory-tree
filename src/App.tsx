import { DirectoryTree } from "./components/DirectoryTree";

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border rounded bg-background p-4">
        <DirectoryTree />
      </div>
    </div>
  );
}

export default App;
