import AddAlbumForm from "./components/AddAlbumForm";
import AlbumList from "./pages/AlbumList";


function App() {
  return (
    <>
      <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Neringify</h1>
        <AlbumList />
      </div>

      <div className="flex flex-col items-center p-6">
        
        <AddAlbumForm />
      </div>
    </>
  );
}

export default App;
