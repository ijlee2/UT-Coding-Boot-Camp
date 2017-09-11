DROP DATABASE IF EXISTS ebay_db;
CREATE DATABASE ebay_db;
USE ebay_db;

CREATE TABLE items (
    id INT AUTO_INCREMENT NOT NULL ,
    name VARCHAR(30) NOT NULL,
    current_bid DECIMAL(10, 2) NOT NULL DEFAULT 0.01,
    uid INT,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL, 
    PRIMARY KEY(id)
);

INSERT INTO users (name, password) VALUES
("mark", "originmaster");

INSERT INTO items (name, current_bid, uid) VALUES
("shoes", 10.00, 1),
("couch", 100.00, null),
("TV", 80.00, null);

SELECT * FROM items;
SELECT * FROM users;