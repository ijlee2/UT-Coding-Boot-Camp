DROP DATABASE IF EXISTS books_db;
CREATE DATABASE books_db;
USE books_db;

CREATE TABLE books (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    authorId INTEGER(11),
    title VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE authors (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    PRIMARY KEY (id)
);