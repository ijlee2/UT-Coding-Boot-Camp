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
