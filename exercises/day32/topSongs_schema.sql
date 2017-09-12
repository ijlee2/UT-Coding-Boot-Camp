DROP DATABASE IF EXISTS topSongs_db;
CREATE DATABASE topSongs_db;
USE topSongs_db;

CREATE TABLE top5000 (
    position          INT NOT NULL,
    artist_name       VARCHAR(100),
    song_name         VARCHAR(100),
    year              INT,
    popularity_raw    DECIMAL(10, 4),
    popularity_us     DECIMAL(10, 4),
    popularity_uk     DECIMAL(10, 4),
    popularity_eu     DECIMAL(10, 4),
    popularity_global DECIMAL(10, 4),
    PRIMARY KEY (position)
);

SELECT * FROM top5000;