DROP DATABASE IF EXISTS twoTables_db;
CREATE DATABASE twoTables_db;
USE twoTables_db;

CREATE TABLE topSongs (
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

CREATE TABLE topAlbums (
    position    INT NOT NULL,
    artist_name VARCHAR(100),
    album_name  VARCHAR(100),
    year        INT,
    raw_total   DECIMAL(10, 4),
    raw_usa     DECIMAL(10, 4),
    raw_uk      DECIMAL(10, 4),
    raw_europe  DECIMAL(10, 4),
    raw_global  DECIMAL(10, 4),
    PRIMARY KEY (position)
);