### Schema

CREATE DATABASE parties_db;

USE parties_db;

CREATE TABLE clients
(
	id int NOT NULL AUTO_INCREMENT,
	client_name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE parties
(
	id int NOT NULL AUTO_INCREMENT,
	party_name varchar(255) NOT NULL,
	party_type varchar(255) NOT NULL,
	party_cost int NOT NULL,
	client_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (client_id) REFERENCES clients(id)
);
