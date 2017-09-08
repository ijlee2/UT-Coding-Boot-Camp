DROP DATABASE IF EXISTS programming_db;
CREATE DATABASE programming_db;

USE programming_db;

CREATE TABLE programming_languages(
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    language VARCHAR(30) NOT NULL,
    rating INTEGER(10),
    primary key (id)
);

INSERT INTO programming_languages VALUES
    (1, "HTML", 6),
    (2, "CSS", 7),
    (3, "JavaScript", 9),
    (4, "jQuery", 10);

UPDATE programming_languages
SET rating = 8
WHERE id = 4;

SELECT * FROM programming_languages;

ALTER TABLE programming_languages
ADD mastered BOOLEAN DEFAULT true;

SELECT * FROM programming_languages;