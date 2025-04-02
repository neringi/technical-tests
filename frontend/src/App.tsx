import AddAlbumForm from "./components/AddAlbumForm";

function App() {
  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Music Catalog</h1>
      <AddAlbumForm />
    </div>
  );
}

export default App;
