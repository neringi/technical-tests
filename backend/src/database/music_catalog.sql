-- Ensure you're connected to music_catalog db
-- \c music_catalog

-- Create the music schema
CREATE SCHEMA music;

-- Set path to music schema
SET search_path TO music, public;


-- Create the Album table
CREATE TABLE music.album (
  id SERIAL PRIMARY KEY,
  album_name VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  genre VARCHAR(255) NOT NULL,
  created_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Song table with FK to Album
-- many-to-one relationship between Song and Album 

CREATE TABLE music.song (
  id SERIAL PRIMARY KEY,
  album_id INT REFERENCES music.album(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  duration INT NOT NULL,  -- seconds
  created_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  
);

INSERT INTO music.album (album_name, artist, genre)
VALUES
  ('Album 1 Title', 'Artist 1', 'Genre 1'),
  ('Album 2 Title', 'Artist 2', 'Genre 2');


INSERT INTO music.song (album_id, title, duration)
VALUES
  (1, 'Song 1 of Album 1', 210),  -- 3 minutes 30 seconds = 210 seconds
  (1, 'Song 2 of Album 1', 240),  -- 4 minutes = 240 seconds
  (2, 'Song 1 of Album 2', 165);  -- 2 minutes 45 seconds = 165 seconds


-- Constraint where album and artist have to be unique. Some artists may rerelease their album however that is considered edge case here
-- Will not allow duplication
ALTER TABLE music.album
ADD CONSTRAINT unique_album_artist_name UNIQUE (artist, album_name);


-- -- Trigger Function to update `updated_dt` column
-- CREATE OR REPLACE FUNCTION updated_dt_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_dt = CURRENT_TIMESTAMP; 
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Create Trigger to automatically update `updated_dt` on any update
-- CREATE TRIGGER update_album_updated_dt
-- BEFORE UPDATE ON album
-- FOR EACH ROW
-- EXECUTE FUNCTION updated_dt_column();

-- CREATE TRIGGER update_song_updated_dt
-- BEFORE UPDATE ON song
-- FOR EACH ROW
-- EXECUTE FUNCTION updated_dt_column();



-- Grant USAGE and CREATE on the schema
-- GRANT USAGE, CREATE ON SCHEMA music TO postgres;

-- -- Grant ALTER on the album table
-- GRANT ALL PRIVILEGES ON TABLE music.album TO postgres;
