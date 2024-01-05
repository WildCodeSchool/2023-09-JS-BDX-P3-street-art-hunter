CREATE DATABASE IF NOT EXISTS street_art_hunters;

USE street_art_hunters;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    postcode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    points INT NOT NULL DEFAULT 0,
    is_admin BOOLEAN DEFAULT false,
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

INSERT INTO artist (name, biography, website)
VALUES ("Alber", "Alber est un graffeur français basé à Bordeaux.","https://www.instagram.com/alberoner/"),
("A-mo","A-mo est un artiste français de Bordeaux. Il est spécialisé dans la superposition de tags qu'il appelle 'paint-tag'.","https://www.instagram.com/amoarts/")
("Charles Foussard","Charles Foussard est né les pieds dans le sable, avec une vie partagée entre la Réunion et Bordeaux. Il a toujours nourri son âme des plus beaux dons de la nature: l'inattendu, le spectaculaire, l'énergie et l'abondance des formes et des couleurs.","https://www.instagram.com/charles_foussard/")
("Cost","Cost est un graffeur français basé à Paris et membre du collectif TPK.","https://laurispeinture.wixsite.com/costtpk")
("David Selor","David Selor est un artiste français de Cognac qui peint son animal «Mimil» dans de nombreuses situations.","https://www.instagram.com/s_e_l_o_r/?hl=fr")
("Derf","Derf est un graffeur français de Bordeaux.","https://www.instagram.com/derf_gallery/?hl=fr")
("Epis","Epis est membre fondateur du collectif Le Coktail, crée avec Nerone en 2007, avec lequel il voyage et évolut au travers de projets ambitieux mélant peintures, graphismes, vidéos, installations et performances ( Métroparadise, Dandy Bird, Fishboat ).","https://epis.one/")
("GZ","GZ est un artiste français originaire de Toulouse et habitant Bordeaux, moitié illustrateur moitié graffeur.","https://www.instagram.com/remgz/")
("Hopare","Hopare est le pseudonyme d’Alexandre Monteiro, un artiste parisien.","https://www.instagram.com/hopare1/")
("Jean Rooble","Issu de la culture hip-hop des années 1990, il commence le graffiti en 1999, travaillant d’abord le lettrage plutôt wildstyle, puis les personnages qui lui valent d’être rapidement remarqué.","https://www.instagram.com/jeanrooble/")
("Jef Aérosol","Né à Nantes en 1957, Jean-François Perroy alias Jef Aérosol, est un artiste peintre et graffeur français spécialisé dans le pochoir. Il appartient à la première vague des street artists.","https://www.instagram.com/jefaerosol/")
("Kronyk One","Artiste graffeur français.","https://www.instagram.com/_kronykone/?hl=fr")
("Lélé","Artiste graffeur et tatoueur.","https://www.instagram.com/dabanadadou/")
("MAS","Né à Bourges, c’est après avoir peint dans les capitales Européennes qu'il s’installe à Bordeaux pour y créer des fresques murales et des décorations intérieures.","https://www.instagram.com/mas.waner/")
("Mika","Michaël Husser alias Mika est né en 1983 en Alsace. Menuisier de formation, il est aujourd’hui graphiste & illustrateur basé à Bordeaux depuis début 2016.","https://www.instagram.com/mika_husser/")
("Monsieur Poulet","L'art de Monsieur Poulet se veut accessible, bienveillant, naïf, léger, apolitique, rempli d'humour, de joie et de couleurs, sans autre objectif que de faire sourire ceux qui le regardent.","https://www.instagram.com/philippe.poulet/")
("Ozer 974","Ozer est un artiste français.","https://www.instagram.com/ozer974/")
("Para cosm","Artiste graffeur français. ","https://www.facebook.com/Paracosmgraffiti")
("Rast","Artiste graffeur spécialisé en portraits texturés.","https://www.instagram.com/artisterast/")
("Rouge","Rouge est une artiste française venue de Bordeaux.","https://www.facebook.com/rouge.hartley/?locale=fr_FR")
("Scaf Abys","Scaf est un artiste français originaire de Nancy qui a débuté avec BBoys et qui est maintenant spécialisé dans les dessins animés ou le photoréalisme.","https://www.instagram.com/scaf_oner/")
("See Ya","See ya est un graffeur français de Bordeaux.","https://www.instagram.com/seeyagraffiti/")
("Tempo Nok","Né en 1982, Tempo Nok est un artiste peintre et plasticien. Ses thèmes tournent autour de la notion de temporalité au cœur de l'existence humaine.","https://www.instagram.com/tempo_nok/");