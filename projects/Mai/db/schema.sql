DROP DATABASE IF EXISTS mai_db;
CREATE DATABASE mai_db;
USE mai_db;

-- Create users
CREATE TABLE users (
    id        INT NOT NULL AUTO_INCREMENT,
    fullname  VARCHAR(200) NOT NULL,
    email     VARCHAR(255) NOT NULL UNIQUE,
    username  VARCHAR(40)  NOT NULL UNIQUE,
    hash      VARCHAR(512) /* NOT NULL */,

    photo_url TEXT,
    flagged   BOOLEAN DEFAULT false,

    PRIMARY KEY (id)
);

-- Create stories
CREATE TABLE stories (
    id  INT NOT NULL AUTO_INCREMENT,
    url TEXT NOT NULL,

    PRIMARY KEY (id)
);

-- Create photos
CREATE TABLE photos (
    id      INT NOT NULL AUTO_INCREMENT,
    url     TEXT NOT NULL,
    caption TEXT,
    date DATETIME NOT NULL,

    PRIMARY KEY (id)
);

-- Create writers (following)
CREATE TABLE writers (
    id        INT NOT NULL AUTO_INCREMENT,
    user_id   INT NOT NULL,
    writer_id INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (writer_id) REFERENCES users(id)
);

-- Create readers (followers)
CREATE TABLE readers (
    id        INT NOT NULL AUTO_INCREMENT,
    user_id   INT NOT NULL,
    reader_id INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (reader_id) REFERENCES users(id)
);

-- Create users_to_stories
CREATE TABLE users_to_stories(
    id       INT NOT NULL AUTO_INCREMENT,
    user_id  INT NOT NULL,
    story_id INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (story_id) REFERENCES stories(id)
);

-- Create stories_to_photos
CREATE TABLE stories_to_photos(
    id       INT NOT NULL AUTO_INCREMENT, 
    story_id INT NOT NULL,
    photo_id INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (story_id) REFERENCES stories(id),
    FOREIGN KEY (photo_id) REFERENCES photos(id)
);