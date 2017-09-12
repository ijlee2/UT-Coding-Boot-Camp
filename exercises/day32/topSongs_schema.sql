DROP DATABASE IF EXISTS topSongs_db;
CREATE DATABASE topSongs_db;
USE topSongs_db;

CREATE TABLE top5000 (
    position    INT NOT NULL,
    artist_name VARCHAR(100),
    song_name   VARCHAR(100),
    year        INT,
    raw_total   DECIMAL(10, 4),
    raw_usa     DECIMAL(10, 4),
    raw_uk      DECIMAL(10, 4),
    raw_europe  DECIMAL(10, 4),
    raw_global  DECIMAL(10, 4),
    PRIMARY KEY (position)
);

SELECT * FROM top5000;