### Schema
CREATE DATABASE pets_db;
USE pets_db;

CREATE TABLE buyers
(
	id int NOT NULL AUTO_INCREMENT,
	buyer_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE pets
(
	id int NOT NULL AUTO_INCREMENT,
	animal_breed varchar(255) NOT NULL,
	animal_name varchar(255) NOT NULL,
	price int NOT NULL,
	buyer_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (buyer_id) REFERENCES buyers(id)
);
