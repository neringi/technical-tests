import { useState } from "react";
import { addSong, addAlbum } from "../api/api";
import "./AddForm.css";

const AddSongForm = () => {
  const [formData, setFormData] = useState({
    albumName: "",
    artist: "",
    genre: "",
    title: "",
    duration: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add new album first
      const albumResponse = await addAlbum({
        album_name: formData.albumName,
        artist: formData.artist,
        genre: formData.genre,
      });

      // Add the new song with the newly created album ID
      const albumId = albumResponse.id; // Assuming the API responds with the new album's ID
      await addSong(albumId, {
        title: formData.title,
        duration: parseInt(formData.duration),
      });

      alert("Song and Album added successfully!");
      setFormData({
        albumName: "",
        artist: "",
        genre: "",
        title: "",
        duration: "",
      });
    } catch (error) {
      alert("Error adding song and album");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add New Song and Album</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="albumName"
          value={formData.albumName}
          onChange={handleChange}
          placeholder="Album Name"
          required
          className="input-field"
        />
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          placeholder="Artist"
          required
          className="input-field"
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
          className="input-field"
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Song Title"
          required
          className="input-field"
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (seconds)"
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Add Song and Album
        </button>
      </form>
    </div>
  );
};

export default AddSongForm;
