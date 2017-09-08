CREATE DATABASE animals_db;
USE animals_db;

CREATE TABLE people(
	id       INTEGER(11) AUTO_INCREMENT NOT NULL,
    name     VARCHAR(30) NOT NULL,
    has_pet  BOOLEAN NOT NULL,
    pet_name VARCHAR(30),
    pet_age  INTEGER(10),
    PRIMARY KEY (id)
);