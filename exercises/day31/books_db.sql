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

INSERT INTO authors (firstName, lastName) values ("Jane", "Austen");
INSERT INTO authors (firstName, lastName) values ("Mark", "Twain");
INSERT INTO authors (firstName, lastName) values ("Lewis", "Carroll");

INSERT INTO books (title, authorId) values("Pride and Prejudice", 1);
INSERT INTO books (title, authorId) values("Emma", 1);
INSERT INTO books (title, authorId) values("The Adventures of Tom Sawyer", 2);
INSERT INTO books (title, authorId) values("Adventures of Huckleberry Finn", 2);
INSERT INTO books (title, authorId) values("Alice's Adventures in Wonderland", 3);
INSERT INTO books (title, authorId) values("Dracula", null);

SELECT * FROM authors;
SELECT * FROM books;

SELECT title, firstName, lastName
FROM books
INNER JOIN authors ON books.authorId = authors.id;

SELECT title, firstName, lastName
FROM books
LEFT JOIN authors ON books.authorId = authors.id;

INSERT INTO authors (firstName, lastName) values ("Eric", "Scott");

SELECT title, firstName, lastName
FROM books
RIGHT JOIN authors ON books.authorId = authors.id;