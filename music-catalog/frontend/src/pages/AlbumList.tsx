import { useEffect, useState } from "react";
import AlbumCard from "../components/AlbumCard";
import "./albumList.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AlbumList = () => {
  const [albums, setAlbums] = useState<
    { id: number; album_name: string; artist: string; genre: string }[]
  >([]);
  const [expandedAlbumId, setExpandedAlbumId] = useState<number | null>(null);
  const [albumSongs, setAlbumSongs] = useState<{ [key: number]: { title: string; duration: number }[] }>({});
  const [errorMessages, setErrorMessages] = useState<{ [key: number]: string | null }>({});

  useEffect(() => {
    fetch(`${API_URL}/music/albums`)
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.error("Error fetching albums:", error));
  }, []);

  const handleAlbumClick = async (albumId: number) => {
    if (expandedAlbumId === albumId) {
      setExpandedAlbumId(null); 
      return;
    }

    setExpandedAlbumId(albumId);
    await refreshSongs(albumId);
  };

  const refreshSongs = async (albumId: number) => {
    try {
      const response = await fetch(`${API_URL}/music/albums/${albumId}/songs`);
      if (!response.ok) throw new Error("Not Found");
      
      const data = await response.json();
      setAlbumSongs((prev) => ({ ...prev, [albumId]: data.length > 0 ? data : [] }));
      setErrorMessages((prev) => ({ ...prev, [albumId]: data.length === 0 ? "Not Found" : null }));
    } catch {
      setAlbumSongs((prev) => ({ ...prev, [albumId]: [] }));
      setErrorMessages((prev) => ({ ...prev, [albumId]: "Not Found" }));
    }
  };

  return (
    <div className="album-list">
      <h1 className="title">Music Collection</h1>
      <div className="album-grid">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            isExpanded={expandedAlbumId === album.id}
            songs={albumSongs[album.id] || []} 
            error={errorMessages[album.id]}
            onToggle={() => handleAlbumClick(album.id)}
            refreshSongs={refreshSongs}  
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
