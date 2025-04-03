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

  const handleAlbumClick = (albumId: number) => {
    if (expandedAlbumId === albumId) {
      setExpandedAlbumId(null); // Collapse if already expanded
      return;
    }

    setExpandedAlbumId(albumId);

    // If songs were already loaded, no need to fetch again
    if (albumSongs[albumId] !== undefined) return;

    fetch(`${API_URL}/music/albums/${albumId}/songs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Not Found");
        }
        return response.json();
      })
      .then((data) => {
        setAlbumSongs((prev) => ({ ...prev, [albumId]: data.length > 0 ? data : [] }));
        setErrorMessages((prev) => ({ ...prev, [albumId]: data.length === 0 ? "Not Found" : null }));
      })
      .catch(() => {
        setAlbumSongs((prev) => ({ ...prev, [albumId]: [] })); // Always set an array
        setErrorMessages((prev) => ({ ...prev, [albumId]: "Not Found" }));
      });
  };

  return (
    <div className="album-list">
      <h1 className="title">My Music Collection</h1>
      <div className="album-grid">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
            isExpanded={expandedAlbumId === album.id}
            songs={albumSongs[album.id] || []} // Always an array
            error={errorMessages[album.id]}
            onToggle={() => handleAlbumClick(album.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
