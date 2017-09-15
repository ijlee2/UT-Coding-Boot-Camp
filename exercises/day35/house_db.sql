DROP DATABASE IF EXISTS house_db;
CREATE DATABASE house_db;
USE house_db;

CREATE TABLE actors (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    coolness_points INT NOT NULL,
    attitude VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO actors (name, coolness_points, attitude) VALUES
("Hugh Laurie", 100, "mischievous"),
("Lisa Edelstein", 100, "friendly"),
("Robert Sean Leonard", 80, "friendly"),
("Omar Epps", 90, "mischeivous"),
("Jesse Spencer", 80, "mischievous"),
("Jennifer Morrison", 70, "warm-hearted");