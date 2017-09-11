-- Create a database
DROP DATABASE IF EXISTS database_db;
CREATE DATABASE database_db;

-- Select the database
USE database_db;

-- Create a table
CREATE TABLE authors (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    middleName VARCHAR(100),
    lastName VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

-- Display the contents of the table
SELECT * FROM authors;

-- Add information to the table
INSERT INTO authors (firstName, lastName)
VALUES ("Eric", "Scott");

-- Update information in the table
UPDATE authors SET firstName = "Derick"
WHERE firstName = "Eric";

-- Delete information from the table
DELETE FROM authors
WHERE firstName = "Derick";