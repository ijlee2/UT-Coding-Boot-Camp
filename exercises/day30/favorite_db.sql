-- Drops the favorite_db if it exists currently --
DROP DATABASE IF EXISTS favorite_db;
-- Creates the "favorite_db" database --
CREATE DATABASE favorite_db;

-- Make it so all of the following code will affect favorite_db --
USE favorite_db;

-- Creates the table "favorite_foods" within favorite_db --
CREATE TABLE favorite_foods (
    -- Make a string column called "food" which cannot contain null --
    food VARCHAR(50) NOT NULL,
    -- Make an numeric column called "score" --
    score INTEGER(10)
);

CREATE TABLE favorite_songs (
    -- Make a string column called "song" which cannot contain null --
    song VARCHAR(50) NOT NULL,    
    -- Make a string column called "artist" --
    artist VARCHAR(50),
    -- Make an integer column called "score" --
    score INTEGER(10)
);

CREATE TABLE favorite_movies (
    -- Create a numeric column called "id" which automatically increments and cannot be null --
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    -- Create a string column called "movie" which cannot be null --
    movie VARCHAR(50) NOT NULL,
    -- Create a boolean column called "five_times" that sets the default value to FALSE if nothing is entered --
    five_times BOOLEAN DEFAULT false,
    -- Make an integer column called "score" --
    score INTEGER(10),
    -- Set the primary key of the table to id --
    PRIMARY KEY (id)
);

INSERT INTO favorite_foods VALUES
    ("kiwi", 8),
    ("orange", 10),
    ("banana", 7);

INSERT INTO favorite_songs VALUES
    ("Look Alive Sunshine", "My Chemical Romance", 9),
    ("Feet Don't Fail Me", "Queens of the Stone Age", 10),
    ("Hourglass", "S U R V I V E", 9);
    
INSERT INTO favorite_movies VALUES
    (1, "The Bourne Ultimatum", true, 9),
    (2, "Charlie and the Chocolate Factory", false, 3),
    (3, "Inception", true, 8);

SELECT * FROM favorite_foods;
SELECT * FROM favorite_songs;
SELECT * FROM favorite_movies;