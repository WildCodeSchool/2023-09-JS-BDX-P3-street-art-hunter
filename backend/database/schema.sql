CREATE DATABASE IF NOT EXISTS street_art_hunters;

USE street_art_hunters;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, postcode VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, points INT NOT NULL DEFAULT 0, is_admin BOOLEAN DEFAULT false, PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS street_art (
    id INT NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, title VARCHAR(255) NOT NULL, image VARCHAR(255) NOT NULL, latitude DOUBLE NOT NULL, longitude DOUBLE NOT NULL, adress VARCHAR(255) NOT NULL, creation_date DATETIME NOT NULL, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users (id)
);

ALTER TABLE street_art RENAME COLUMN adress TO address;

CREATE TABLE IF NOT EXISTS awaiting_image (
    id INT NOT NULL AUTO_INCREMENT, user_id INT NOT NULL, latitude DECIMAL(10, 8) NOT NULL, longitude DECIMAL(11, 8) NOT NULL, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users (id)
);

ALTER TABLE awaiting_image RENAME TO pending_image;

ALTER TABLE pending_image
ADD COLUMN img_src VARCHAR(255),
ADD COLUMN upload_date DATE,
ADD COLUMN upload_time TIME;

CREATE TABLE IF NOT EXISTS artist (
    id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, biography TEXT NOT NULL, website VARCHAR(255) NOT NULL, PRIMARY KEY (id)
);

ALTER TABLE pending_image
ADD COLUMN street_art_id INT,
ADD CONSTRAINT fk_street_art_id FOREIGN KEY (street_art_id) REFERENCES street_art (id);

ALTER TABLE pending_image
ADD COLUMN status ENUM(
    'pending', 'validate', 'refused'
) DEFAULT 'pending';

CREATE TABLE IF NOT EXISTS artist_street_art (
    artist_id INT NOT NULL, street_art_id INT NOT NULL, PRIMARY KEY (artist_id, street_art_id), FOREIGN KEY (artist_id) REFERENCES artist (id), FOREIGN KEY (street_art_id) REFERENCES street_art (id)
);

SELECT * FROM users;

INSERT INTO
    users (
        username, email, postcode, city, password, points, is_admin
    )
VALUES (
        "kevin", "kevin@jean.com", "33000", "Bordeaux", "kevin", 0, 1
    );

INSERT INTO
    artist (name, biography, website)
VALUES (
        "Alber", "Alber est un graffeur français basé à Bordeaux.", "https://www.instagram.com/alberoner/"
    ),
    (
        "A-mo", "A-mo est un artiste français de Bordeaux. Il est spécialisé dans la superposition de tags qu'il appelle 'paint-tag'.", "https://www.instagram.com/amoarts/"
    ),
    (
        "Charles Foussard", "Charles Foussard est né les pieds dans le sable, avec une vie partagée entre la Réunion et Bordeaux. Il a toujours nourri son âme des plus beaux dons de la nature: l'inattendu, le spectaculaire, l'énergie et l'abondance des formes et des couleurs.", "https://www.instagram.com/charles_foussard/"
    ),
    (
        "Cost", "Cost est un graffeur français basé à Paris et membre du collectif TPK.", "https://laurispeinture.wixsite.com/costtpk"
    ),
    (
        "David Selor", "David Selor est un artiste français de Cognac qui peint son animal «Mimil» dans de nombreuses situations.", "https://www.instagram.com/s_e_l_o_r/?hl=fr"
    ),
    (
        "Derf", "Derf est un graffeur français de Bordeaux.", "https://www.instagram.com/derf_gallery/?hl=fr"
    ),
    (
        "Epis", "Epis est membre fondateur du collectif Le Coktail, crée avec Nerone en 2007, avec lequel il voyage et évolut au travers de projets ambitieux mélant peintures, graphismes, vidéos, installations et performances ( Métroparadise, Dandy Bird, Fishboat ).", "https://epis.one/"
    ),
    (
        "GZ", "GZ est un artiste français originaire de Toulouse et habitant Bordeaux, moitié illustrateur moitié graffeur.", "https://www.instagram.com/remgz/"
    ),
    (
        "Hopare", "Hopare est le pseudonyme d’Alexandre Monteiro, un artiste parisien.", "https://www.instagram.com/hopare1/"
    ),
    (
        "Jean Rooble", "Issu de la culture hip-hop des années 1990, il commence le graffiti en 1999, travaillant d’abord le lettrage plutôt wildstyle, puis les personnages qui lui valent d’être rapidement remarqué.", "https://www.instagram.com/jeanrooble/"
    ),
    (
        "Jef Aérosol", "Né à Nantes en 1957, Jean-François Perroy alias Jef Aérosol, est un artiste peintre et graffeur français spécialisé dans le pochoir. Il appartient à la première vague des street artists.", "https://www.instagram.com/jefaerosol/"
    ),
    (
        "Kronyk One", "Artiste graffeur français.", "https://www.instagram.com/_kronykone/?hl=fr"
    ),
    (
        "Lélé", "Artiste graffeur et tatoueur.", "https://www.instagram.com/dabanadadou/"
    ),
    (
        "MAS", "Né à Bourges, c’est après avoir peint dans les capitales Européennes qu'il s’installe à Bordeaux pour y créer des fresques murales et des décorations intérieures.", "https://www.instagram.com/mas.waner/"
    ),
    (
        "Mika", "Michaël Husser alias Mika est né en 1983 en Alsace. Menuisier de formation, il est aujourd’hui graphiste & illustrateur basé à Bordeaux depuis début 2016.", "https://www.instagram.com/mika_husser/"
    ),
    (
        "Monsieur Poulet", "L'art de Monsieur Poulet se veut accessible, bienveillant, naïf, léger, apolitique, rempli d'humour, de joie et de couleurs, sans autre objectif que de faire sourire ceux qui le regardent.", "https://www.instagram.com/philippe.poulet/"
    ),
    (
        "Ozer 974", "Ozer est un artiste français.", "https://www.instagram.com/ozer974/"
    ),
    (
        "Para cosm", "Artiste graffeur français. ", "https://www.facebook.com/Paracosmgraffiti"
    ),
    (
        "Rast", "Artiste graffeur spécialisé en portraits texturés.", "https://www.instagram.com/artisterast/"
    ),
    (
        "Rouge", "Rouge est une artiste française venue de Bordeaux.", "https://www.facebook.com/rouge.hartley/?locale=fr_FR"
    ),
    (
        "Scaf Abys", "Scaf est un artiste français originaire de Nancy qui a débuté avec BBoys et qui est maintenant spécialisé dans les dessins animés ou le photoréalisme.", "https://www.instagram.com/scaf_oner/"
    ),
    (
        "See Ya", "See ya est un graffeur français de Bordeaux.", "https://www.instagram.com/seeyagraffiti/"
    ),
    (
        "Tempo Nok", "Né en 1982, Tempo Nok est un artiste peintre et plasticien. Ses thèmes tournent autour de la notion de temporalité au cœur de l'existence humaine.", "https://www.instagram.com/tempo_nok/"
    );

ALTER TABLE street_art ADD COLUMN author VARCHAR(100);

ALTER TABLE street_art DROP FOREIGN KEY street_art_ibfk_1;

SHOW CREATE TABLE pending_image;

-- Ligne 2
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Pigeon', 'https://www.street-artwork.com/uploads/document/63f74a685c6b9775130667.JPG', 44.822000, -0.555000, '1 Rue d''Armagnac 33800 Bordeaux France', '2023-02-23', 'A-mo'
    );

-- Ligne 3
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Cosmic Visitor', 'https://www.street-artwork.com/uploads/document/5c7d3ce59cdbb387150263.jpg', 44.825882, -0.548732, '1 Rue de la Seigliere 33800 Bordeaux France', '2019-03-04', 'Inconnu'
    );

-- Ligne 4
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Plaisir de faire', 'https://www.street-artwork.com/uploads/document/5ba7cef2f23c3139271885.jpg', 44.83358, -0.565358, '1 Rue Planterose 33800 Bordeaux France', '2018-09-23', 'inconnu'
    );

-- Ligne 5
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Poulet et renard', 'https://www.street-artwork.com/uploads/document/6427faa8f220f202972888.jpeg', 44.826325, -0.565389, '12 Rue Billaudel 33800 Bordeaux France', '2023-04-01', 'Monsieur Poulet'
    );

-- Ligne 6
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Amazonia', 'https://www.street-artwork.com/uploads/document/6213fbc66b935847715039.jpg', 44.849823, -0.559558, '12 Rue du Maréchal Niel 33100 Bordeaux France', '2022-02-21', 'Epis'
    );

-- Ligne 7
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Al Pacino', 'https://www.street-artwork.com/uploads/document/6213fa753fbf9579103328.jpg', 44.849823, -0.559558, '12 Rue du Maréchal Niel 33100 Bordeaux France', '2022-02-21', 'Rast'
    );

-- Ligne 8
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Robert De Niro', 'https://www.street-artwork.com/uploads/document/6213fa56d94d2227795612.jpg', 44.849815, -0.559568, '12 Rue du Maréchal Niel 33100 Bordeaux France', '2022-02-21', 'Rast'
    );

-- Ligne 9
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Glaçons', 'https://www.street-artwork.com/uploads/document/5f55364b069a2853620745.jpg', 44.861179, -0.558924, '127 Rue Dupaty 33300 Bordeaux France', '2020-09-06', 'inconnu'
    );

-- Ligne 10
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Petite fille au coeur', 'https://www.street-artwork.com/uploads/document/6420333db5c73764695889.JPG', 44.846000, -0.550000, '170 Av. Thiers 33100 Bordeaux France', '2023-03-26', 'MAS'
    );

-- Ligne 11
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Indien', 'https://www.street-artwork.com/uploads/document/642033e8a61e2202127063.JPG', 44.846000, -0.550000, '183 Av. Thiers 33100 Bordeaux France', '2023-03-26', 'MAS'
    );

-- Ligne 12
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'T-shirt relevé', 'https://www.street-artwork.com/uploads/document/642026c94a844945884104.JPG', 44.828056, -0.55851, '19 Pass. Grenier 33800 Bordeaux France', '2023-03-26', 'Rouge'
    );

-- Ligne 13
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Femme à tresse', 'https://street-artwork.com/uploads/document/5c5c44c40cc9e072960780.jpg', 44.82672, -0.554343, '2 Rue de Son-Tay 33800 Bordeaux France', '2019-02-07', 'inconnu'
    );

-- Ligne 14
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Fresque Bleu', 'https://www.street-artwork.com/uploads/document/5c5c4505d826d378184252.jpg', 44.827900, -0.554499, '20 Rue des Terres de Borde 33800 Bordeaux France', '2019-02-07', 'inconnu'
    );

-- Ligne 15
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'L''ours et le Perroquet', 'https://www.street-artwork.com/uploads/document/641c297681527694008521.JPG', 44.832444, -0.565300, '21 Rue des Vignes 33800 Bordeaux France', '2023-03-20', 'A-mo'
    );

-- Ligne 16
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Visage femme multicolore', 'https://www.street-artwork.com/uploads/document/63f7450114399181757485.JPG', 44.863425, -0.559492, '276 Cr Balguerie Stuttenberg 33300 Bordeaux France', '2023-02-23', 'Alber'
    );

-- Ligne 17
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Qui mange la vie', 'https://ik.imagekit.io/streetartwork/artworks-images_prod/1b8b2941-5066-4512-96d9-4682aad1a32d_P16GutBuP.jpg', 44.850000, -0.582000, '29 Rue Emile Zola 33000 Bordeaux France', '2023-04-07', 'Selor'
    );

-- Ligne 18
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'L''homme au rouge à lèvres', 'https://www.street-artwork.com/uploads/document/641ecf9c6f70f986055711.jpg', 44.836944, -0.587500, '30 Rue Claude Bonnier 33000 Bordeaux France', '2023-03-25', 'Jean Rooble'
    );

-- Ligne 19
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Rouge à lèvres rose', 'https://www.street-artwork.com/uploads/document/641ed2d225c92033213194.jpg', 44.836944, -0.587500, '30 Rue Claude Bonnier 33000 Bordeaux France', '2023-03-25', 'Jean Rooble'
    );

-- Ligne 20
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Le Lion', 'https://www.street-artwork.com/uploads/document/641c2a326ebb6628307910.JPG', 44.832558, -0.565133, '30 Rue des Vignes 33800 Bordeaux France', '2023-03-23', 'A-mo'
    );

-- Ligne 21
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Bulles', 'https://www.street-artwork.com/uploads/document/64209b82ef404449708244.JPG', 44.830000, -0.565000, '34 Rue Jules Guesde 33800 Bordeaux France', '2023-03-26', 'Tempo Nok'
    );

-- Ligne 22
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Fresque Mother', 'https://www.street-artwork.com/uploads/document/5c5b492a7cb47113975633.jpg', 44.823086, -0.55413, '4 Allée Eugène Delacroix 33800 Bordeaux France', '2019-02-06', 'inconnu'
    );

-- Ligne 23
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Lémurien', 'https://www.street-artwork.com/uploads/document/6420835968196215480659.jpg', 44.835833, -0.571389, '43 Rue Saint-James 33000 Bordeaux France', '2023-03-26', 'A-mo'
    );

-- Ligne 24
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Gorille violet', 'https://www.street-artwork.com/uploads/document/642080cd2fb55597469317.jpg', 44.836667, -0.574167, '44 Rue des Ayres 33000 Bordeaux France', '2023-03-26', 'A-mo'
    );

-- Ligne 25
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Humain est nôtre', 'https://www.street-artwork.com/uploads/document/5c7d61f8059c1962277545.jpg', 44.825970, -0.548800, '6 Rue de Belcier 33800 Bordeaux France', '2019-03-04', 'Cost'
    );

-- Ligne 26
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Taureau fou', 'https://www.street-artwork.com/uploads/document/64201c595653e324059781.JPG', 44.840214, -0.580236, '6 Rue Toulouse Lautrec 33000 Bordeaux France', '2023-03-26', 'Charles Foussard'
    );

-- Ligne 27
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Cigogne Japonaise', 'https://www.street-artwork.com/uploads/document/64201e654032c609215989.JPG', 44.816906, -0.574344, '60 Rue Brun 33800 Bordeaux France', '2023-03-26', 'Derf'
    );

-- Ligne 28
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Renard d''eau', 'https://www.street-artwork.com/uploads/document/641ed358e3fcc099240903.JPG', 44.816889, -0.574250, '60 Rue Brun 33800 Bordeaux France', '2023-03-25', 'GZ'
    );

-- Ligne 29
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'Les yeux colorés', 'https://www.street-artwork.com/uploads/document/641ed46bafe62762363115.jpg', 44.85611, -0.549167, '65 Quai de Brazza 33100 Bordeaux France', '2023-03-25', 'Derf'
    );

-- Ligne 30
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'This is not art', 'https://www.street-artwork.com/uploads/document/5c7d047643f3a137814268.jpg', 44.829014, -0.556686, '7 Rue Cazaubon 33800 Bordeaux France', '2019-03-04', 'Selor'
    );

-- Ligne 31
INSERT INTO
    street_art (
        user_id, title, image, latitude, longitude, address, creation_date, author
    )
VALUES (
        1, 'La baleine bleue', 'https://www.street-artwork.com/uploads/document/64208dc1daabd529309338.jpg', 44.853000, -0.567000, '76 Quai des Chartrons 33000 Bordeaux France', '2023-03-26', 'A-mo'
    );

SELECT * FROM pending_image;

SELECT
    pending_image.id,
    pending_image.user_id,
    pending_image.status,
    pending_image.img_src,
    pending_image.latitude,
    pending_image.longitude,
    pending_image.upload_date,
    pending_image.upload_time,
    pending_image.street_art_id,
    street_art.image as street_art_image,
    street_art.latitude as street_art_latitude,
    street_art.longitude as steet_art_longitude,
    users.username as username
FROM
    pending_image
    LEFT JOIN street_art ON pending_image.street_art_id = street_art.id
    LEFT JOIN users ON pending_image.user_id = users.id
WHERE
    pending_image.status = 'pending';

UPDATE users SET is_admin = 1 WHERE id = 2;

INSERT INTO
    artist_street_art (artist_id, street_art_id)
VALUES (2, 1),
    (16, 4),
    (7, 5),
    (19, 6),
    (19, 7),
    (14, 9),
    (14, 10),
    (20, 11),
    (2, 14),
    (1, 15),
    (10, 17),
    (10, 18),
    (2, 19),
    (23, 20),
    (2, 22),
    (2, 23),
    (3, 25),
    (6, 26),
    (8, 27),
    (6, 28),
    (4, 24),
    (2, 30);