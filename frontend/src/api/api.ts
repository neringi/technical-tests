const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const addAlbum = async (album: {
  album_name: string;
  artist: string;
  genre: string;
}) => {
  const response = await fetch(`${API_URL}/music/albums`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(album),
  });

  if (!response.ok) {
    throw new Error("Failed to add album");
  }

  return response.json();
};

export const addSong = async (albumId: number, song: { title: string; duration: number }) => {
  const response = await fetch(`${API_URL}/music/albums/${albumId}/addsong`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(song),
  });

  if (!response.ok) {
    throw new Error("Failed to add song");
  }

  return response.json();
};

export const deleteSong = async (songId: number) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  
  const response = await fetch(`${API_URL}/music/songs/${songId}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete song");
  }
};