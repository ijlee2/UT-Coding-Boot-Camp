DROP DATABASE IF EXISTS movie_planner_db;
CREATE DATABASE movie_planner_db;
USE movie_planner_db;

-- Create the table plans.
CREATE TABLE movies (
    id    int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO movies (title) VALUES
("Inception"),
("Spider-Man Homecoming"),
("The Bourne Ultimatum");