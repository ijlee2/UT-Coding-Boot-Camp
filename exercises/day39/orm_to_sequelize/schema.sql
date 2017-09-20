-- Drops the todolist if it exists currently --
DROP DATABASE IF EXISTS todolist;
-- Creates the "todolist" database --
CREATE DATABASE todolist;

USE todolist;

CREATE TABLE todos (
    id       INT AUTO_INCREMENT NOT NULL,
    text     TEXT NOT NULL,
    complete BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO todos (text, complete) VALUES
("Eat dinner", true),
("Brush teeth", false);