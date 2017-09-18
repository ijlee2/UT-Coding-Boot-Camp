/*
To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"
*/

DROP DATABASE IF EXISTS wishes_db;
CREATE DATABASE wishes_db;
USE wishes_db;

CREATE TABLE wishes (
    id   int NOT NULL AUTO_INCREMENT,
    wish varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO wishes (wish) VALUES
("Be a great programmer."),
("Be a great cook."),
("Be a great friend.");