import { useState } from "react";
import { addAlbum } from "../api/api";

const AddAlbumForm = () => {
  const [formData, setFormData] = useState({
    album_name: "",
    artist: "",
    genre: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAlbum(formData);
      alert("Album added successfully!");
      setFormData({ album_name: "", artist: "", genre: "" });
    } catch (error) {
      alert("Error adding album");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-96">
      <h2 className="text-lg font-bold mb-2">Add New Album</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="album_name"
          value={formData.album_name}
          onChange={handleChange}
          placeholder="Album Name"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          placeholder="Artist"
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Album
        </button>
      </form>
    </div>
  );
};

export default AddAlbumForm;
