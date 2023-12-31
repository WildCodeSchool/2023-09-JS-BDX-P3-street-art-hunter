CREATE DATABASE IF NOT EXISTS street_art_hunters;

USE street_art_hunters;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    postcode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    points INT NOT NULL,
    is_admin BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS street_art (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    adress VARCHAR(255) NOT NULL,
    creation_date DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS awaiting_image (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS artist (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    biography TEXT NOT NULL,
    website VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS artist_street_art (
    artist_id INT NOT NULL,
    street_art_id INT NOT NULL,
    PRIMARY KEY (artist_id, street_art_id),
    FOREIGN KEY (artist_id) REFERENCES artist(id),
    FOREIGN KEY (street_art_id) REFERENCES street_art(id)
);

SELECT * FROM users;

INSERT INTO users (username, email, postcode, city, password, points, is_admin)
VALUES ("kevin", "kevin@jean.com", "33000", "Bordeaux", "kevin", 0, 1);