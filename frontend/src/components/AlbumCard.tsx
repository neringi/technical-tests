import React from "react";

interface AlbumCardProps {
  album: {
    id: number;
    album_name: string;
    artist: string;
    genre: string;
  };
  isExpanded: boolean;
  songs: { title: string; duration: number }[];
  error: string | null;
  onToggle: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, isExpanded, songs, error, onToggle }) => {
  return (
    <div className="album-card" onClick={onToggle}>
      <div className="album-icon">🎵</div>
      <div className="album-title">{album.album_name}</div>
      <div className="album-artist">{album.artist}</div>
      <div className="album-genre">{album.genre}</div>

      {/* Song List Dropdown */}
      {isExpanded && (
        <div className="song-dropdown">
          {error ? (
            <div className="song-item no-songs">{error}</div>
          ) : songs.length > 0 ? (
            songs.map((song, index) => (
              <div key={index} className="song-item">
                <span className="song-title">{song.title}</span>
                <span className="song-duration">{song.duration} sec</span>
              </div>
            ))
          ) : (
            <div className="song-item no-songs">Loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumCard;
