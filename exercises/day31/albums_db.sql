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

INSERT INTO albums (title, artist, genre) VALUES
("Reputation", "Taylor Swift", "Pop"),
("Villains", "Queens of the Stone Age", "Rock"),
("Mnq026", "S U R V I V E", "Electronic"),
("St. Elsewhere", "Gnarls Barkley", "Soul"),("...Like Clockwork", "Queens of the Stone Age", "Rock"),
("Our Endless Numbered Days", "Iron & Wine", "Folk"),
("Songs for the Deaf", "Queens of the Stone Age", "Rock"),
("Wish You Were Here", "Pink Floyd", "Rock"),
("Life in Cartoon Motion", "Mika", "Pop"),
("Junip", "Junip", "Rock"),
("Synthetica", "Metric", "New Wave"),
("The 20/20 Experience", "Justin Timberlake", "Soul"),
("The Shepherd's Dog", "Iron & Wine", "Folk");