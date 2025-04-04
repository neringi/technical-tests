import { useState } from "react";
import { addAlbum } from "../api/api";
import "./AddForm.css";  

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
    <div className="form-container album-form">
      <h2 className="form-title">Add New Album</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="album_name"
          value={formData.album_name}
          onChange={handleChange}
          placeholder="Album Name"
          required
          className="input-field form-input"
        />
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          placeholder="Artist"
          required
          className="input-field form-input"
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
          className="input-field form-input"
        />
        <button
          type="submit"
          className="submit-button form-button"
        >
          Add Album
        </button>
      </form>
    </div>
  );
};

export default AddAlbumForm;
