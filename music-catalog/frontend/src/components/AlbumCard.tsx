import { useState } from "react";
import { addSong, deleteSong } from "../api/api"; // Import delete function

interface AlbumCardProps {
  album: { id: number; album_name: string; artist: string; genre: string };
  isExpanded: boolean;
  songs: { id: number; title: string; duration: number }[]; // Ensure each song has an ID
  error: string | null;
  onToggle: () => void;
  refreshSongs: (albumId: number) => void; 
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, isExpanded, songs, error, onToggle, refreshSongs }) => {
  const [showAddSong, setShowAddSong] = useState(false);
  const [formData, setFormData] = useState({ title: "", duration: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); 

    try {
      await addSong(album.id, {
        title: formData.title,
        duration: parseInt(formData.duration),
      });
      setFormData({ title: "", duration: "" });
      setShowAddSong(false);
      await refreshSongs(album.id); 
    } catch (error) {
      alert("Error adding song");
    }
  };

  const handleDeleteSong = async (songId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this song?");
    if (!confirmDelete) return;

    try {
      await deleteSong(songId); 
      alert("Song deleted successfully");
      await refreshSongs(album.id); 
    } catch (error) {
      alert("Error deleting song");
    }
  };

  return (
    <div className="album-card">
      <div className="album-header" onClick={onToggle}>
        <div className="album-icon">🎵</div>
        <div className="album-title">{album.album_name}</div>
        <div className="album-artist">{album.artist}</div>
        <div className="album-genre">{album.genre}</div>
      </div>

      {isExpanded && (
        <div className="song-dropdown" onClick={(e) => e.stopPropagation()}>
          {error ? (
            <div className="song-item no-songs">{error}</div>
          ) : songs.length > 0 ? (
            songs.map((song) => (
              <div key={song.id} className="song-item">
                <span className="song-title">{song.title}</span>
                <span className="song-duration">{song.duration} sec</span>
                <button className="delete-song-button" onClick={() => handleDeleteSong(song.id)}>➖</button> 
              </div>
            ))
          ) : (
            <div className="song-item no-songs">No songs found</div>
          )}

          <button onClick={(e) => { e.stopPropagation(); setShowAddSong(!showAddSong); }} className="add-song-btn">
            {showAddSong ? "Cancel" : "Add Song"}
          </button>

          {showAddSong && (
            <form onSubmit={handleSubmit} className="add-song-form">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Song Title"
                required
              />
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration (seconds)"
                required
              />
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
