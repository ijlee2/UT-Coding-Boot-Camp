DROP DATABASE IF EXISTS chirpy;
CREATE DATABASE chirpy;
USE chirpy;

CREATE TABLE chirps (
    id           INT AUTO_INCREMENT NOT NULL,
    author       VARCHAR(30) NOT NULL,
    chirp        VARCHAR(140) NOT NULL,
    time_created DATETIME NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO chirps (author, chirp, time_created) VALUES
("Bob"  , "Hello, World!", "2017-09-17 13:10:08"),
("Susan", "Hi there!"    , "2017-09-17 13:15:08");