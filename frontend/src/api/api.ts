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

  return response.json();
};
