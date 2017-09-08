DROP DATABASE IF EXISTS animals_db;
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

-- Create new rows --
INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", true, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Jacob", true, "Misty", 10);

INSERT INTO people (name, has_pet)
VALUES ("Peter", true);

-- Update a row --
UPDATE people
SET has_pet = true, pet_name = "Franklin", pet_age = 2
WHERE id = 3;

SELECT * FROM people;