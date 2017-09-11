DROP DATABASE IF EXISTS albums_db;
CREATE DATABASE albums_db;
USE albums_db;

CREATE TABLE albums (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO albums (title, artist, genre)
VALUES ("Reputation", "Taylor Swift", "Pop");

INSERT INTO albums (title, artist, genre)
VALUES ("Villains", "Queens of the Stone Age", "Rock");

INSERT INTO albums (title, artist, genre)
VALUES ("Mnq026", "S U R V I V E", "Electronic");

INSERT INTO albums (title, artist, genre)
VALUES ("St. Elsewhere", "Gnarls Barkley", "Soul");

INSERT INTO albums (title, artist, genre)
VALUES ("...Like Clockwork", "Queens of the Stone Age", "Rock");

INSERT INTO albums (title, artist, genre)
VALUES ("Our Endless Numbered Days", "Iron & Wine", "Folk");

INSERT INTO albums (title, artist, genre)
VALUES ("Songs for the Deaf", "Queens of the Stone Age", "Rock");

INSERT INTO albums (title, artist, genre)
VALUES ("Wish You Were Here", "Pink Floy", "Rock");

INSERT INTO albums (title, artist, genre)
VALUES ("Junip", "Junip", "Rock");

INSERT INTO albums (title, artist, genre)
VALUES ("Synthetica", "Metric", "New Wave");

INSERT INTO albums (title, artist, genre)
VALUES ("The 20/20 Experience", "Justin Timberlake", "Soul");

INSERT INTO albums (title, artist, genre)
VALUES ("The Shepherd's Dog", "Iron & Wine", "Folk");