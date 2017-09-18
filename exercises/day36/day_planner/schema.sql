/*
To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"
*/

-- Create the database day_planner_db and specified it for use.
DROP DATABASE IF EXISTS day_planner_db;
CREATE DATABASE day_planner_db;
USE day_planner_db;

-- Create the table plans.
CREATE TABLE plans (
    id   int NOT NULL AUTO_INCREMENT,
    plan varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO plans (plan) VALUES ("Plan to fight a ninja.");