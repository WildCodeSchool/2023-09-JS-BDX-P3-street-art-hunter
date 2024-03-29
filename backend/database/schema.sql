-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: street_art_hunters
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `artist`
--
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE IF NOT EXISTS `artist` (
    `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `biography` text NOT NULL, `website` varchar(255) NOT NULL, PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 24 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */
;

INSERT IGNORE INTO
    `artist`
VALUES (
        1, 'Alber', 'Alber est un graffeur français basé à Bordeaux.', 'https://www.instagram.com/alberoner/'
    ),
    (
        2, 'A-mo', 'A-mo est un artiste français de Bordeaux. Il est spécialisé dans la superposition de tags qu\'il appelle \'paint-tag\'.', 'https://www.instagram.com/amoarts/'
    ),
    (
        3, 'Charles Foussard', 'Charles Foussard est né les pieds dans le sable, avec une vie partagée entre la Réunion et Bordeaux. Il a toujours nourri son âme des plus beaux dons de la nature: l\'inattendu, le spectaculaire, l\'énergie et l\'abondance des formes et des couleurs.', 'https://www.instagram.com/charles_foussard/'
    ),
    (
        4, 'Cost', 'Cost est un graffeur français basé à Paris et membre du collectif TPK.', 'https://laurispeinture.wixsite.com/costtpk'
    ),
    (
        5, 'David Selor', 'David Selor est un artiste français de Cognac qui peint son animal «Mimil» dans de nombreuses situations.', 'https://www.instagram.com/s_e_l_o_r/?hl=fr'
    ),
    (
        6, 'Derf', 'Derf est un graffeur français de Bordeaux.', 'https://www.instagram.com/derf_gallery/?hl=fr'
    ),
    (
        7, 'Epis', 'Epis est membre fondateur du collectif Le Coktail, crée avec Nerone en 2007, avec lequel il voyage et évolut au travers de projets ambitieux mélant peintures, graphismes, vidéos, installations et performances ( Métroparadise, Dandy Bird, Fishboat ).', 'https://epis.one/'
    ),
    (
        8, 'GZ', 'GZ est un artiste français originaire de Toulouse et habitant Bordeaux, moitié illustrateur moitié graffeur.', 'https://www.instagram.com/remgz/'
    ),
    (
        9, 'Hopare', 'Hopare est le pseudonyme d’Alexandre Monteiro, un artiste parisien.', 'https://www.instagram.com/hopare1/'
    ),
    (
        10, 'Jean Rooble', 'Issu de la culture hip-hop des années 1990, il commence le graffiti en 1999, travaillant d’abord le lettrage plutôt wildstyle, puis les personnages qui lui valent d’être rapidement remarqué.', 'https://www.instagram.com/jeanrooble/'
    ),
    (
        11, 'Jef Aérosol', 'Né à Nantes en 1957, Jean-François Perroy alias Jef Aérosol, est un artiste peintre et graffeur français spécialisé dans le pochoir. Il appartient à la première vague des street artists.', 'https://www.instagram.com/jefaerosol/'
    ),
    (
        12, 'Kronyk One', 'Artiste graffeur français.', 'https://www.instagram.com/_kronykone/?hl=fr'
    ),
    (
        13, 'Lélé', 'Artiste graffeur et tatoueur.', 'https://www.instagram.com/dabanadadou/'
    ),
    (
        14, 'MAS', 'Né à Bourges, c’est après avoir peint dans les capitales Européennes qu\'il s’installe à Bordeaux pour y créer des fresques murales et des décorations intérieures.', 'https://www.instagram.com/mas.waner/'
    ),
    (
        15, 'Mika', 'Michaël Husser alias Mika est né en 1983 en Alsace. Menuisier de formation, il est aujourd’hui graphiste & illustrateur basé à Bordeaux depuis début 2016.', 'https://www.instagram.com/mika_husser/'
    ),
    (
        16, 'Monsieur Poulet', 'L\'art de Monsieur Poulet se veut accessible, bienveillant, naïf, léger, apolitique, rempli d\'humour, de joie et de couleurs, sans autre objectif que de faire sourire ceux qui le regardent.', 'https://www.instagram.com/philippe.poulet/'
    ),
    (
        17, 'Ozer 974', 'Ozer est un artiste français.', 'https://www.instagram.com/ozer974/'
    ),
    (
        18, 'Para cosm', 'Artiste graffeur français. ', 'https://www.facebook.com/Paracosmgraffiti'
    ),
    (
        19, 'Rast', 'Artiste graffeur spécialisé en portraits texturés.', 'https://www.instagram.com/artisterast/'
    ),
    (
        20, 'Rouge', 'Rouge est une artiste française venue de Bordeaux.', 'https://www.facebook.com/rouge.hartley/?locale=fr_FR'
    ),
    (
        21, 'Scaf Abys', 'Scaf est un artiste français originaire de Nancy qui a débuté avec BBoys et qui est maintenant spécialisé dans les dessins animés ou le photoréalisme.', 'https://www.instagram.com/scaf_oner/'
    ),
    (
        22, 'See Ya', 'See ya est un graffeur français de Bordeaux.', 'https://www.instagram.com/seeyagraffiti/'
    ),
    (
        23, 'Tempo Nok', 'Né en 1982, Tempo Nok est un artiste peintre et plasticien. Ses thèmes tournent autour de la notion de temporalité au cœur de l\'existence humaine.', 'https://www.instagram.com/tempo_nok/'
    );
/*!40000 ALTER TABLE `artist` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `artist_street_art`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE IF NOT EXISTS `artist_street_art` (
    `artist_id` int NOT NULL, `street_art_id` int NOT NULL, PRIMARY KEY (`artist_id`, `street_art_id`), KEY `street_art_id` (`street_art_id`), CONSTRAINT `artist_street_art_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`), CONSTRAINT `artist_street_art_ibfk_2` FOREIGN KEY (`street_art_id`) REFERENCES `street_art` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `artist_street_art`
--

LOCK TABLES `artist_street_art` WRITE;
/*!40000 ALTER TABLE `artist_street_art` DISABLE KEYS */
;

INSERT IGNORE INTO
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
/*!40000 ALTER TABLE `artist_street_art` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `pending_image`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE IF NOT EXISTS `pending_image` (
    `id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `latitude` decimal(10, 8) NOT NULL, `longitude` decimal(11, 8) NOT NULL, `img_src` varchar(255) DEFAULT NULL, `upload_date` date DEFAULT NULL, `upload_time` time DEFAULT NULL, `street_art_id` int DEFAULT NULL, `status` enum(
        'pending', 'validate', 'refused'
    ) DEFAULT 'pending', PRIMARY KEY (`id`), KEY `user_id` (`user_id`), KEY `fk_street_art_id` (`street_art_id`), CONSTRAINT `fk_street_art_id` FOREIGN KEY (`street_art_id`) REFERENCES `street_art` (`id`), CONSTRAINT `pending_image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 71 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `pending_image`
--

LOCK TABLES `pending_image` WRITE;
/*!40000 ALTER TABLE `pending_image` DISABLE KEYS */
;
/*!40000 ALTER TABLE `pending_image` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `street_art`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE IF NOT EXISTS `street_art` (
    `id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `title` varchar(255) NOT NULL, `image` varchar(255) NOT NULL, `latitude` double NOT NULL, `longitude` double NOT NULL, `address` varchar(255) NOT NULL, `creation_date` datetime NOT NULL, `author` varchar(100) DEFAULT NULL, PRIMARY KEY (`id`), KEY `user_id` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 31 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `street_art`
--

LOCK TABLES `street_art` WRITE;
/*!40000 ALTER TABLE `street_art` DISABLE KEYS */
;

INSERT IGNORE INTO
    `street_art`
VALUES (
        1, 1, 'Pigeon', 'https://www.street-artwork.com/uploads/document/63f74a685c6b9775130667.JPG', 44.822, -0.555, '1 Rue d\'Armagnac 33800 Bordeaux France', '2023-02-23 00:00:00', 'A-mo'
    ),
    (
        2, 1, 'Cosmic Visitor', 'https://www.street-artwork.com/uploads/document/5c7d3ce59cdbb387150263.jpg', 44.825882, -0.548732, '1 Rue de la Seigliere 33800 Bordeaux France', '2019-03-04 00:00:00', 'Inconnu'
    ),
    (
        3, 1, 'Plaisir de faire', 'https://www.street-artwork.com/uploads/document/5ba7cef2f23c3139271885.jpg', 44.83358, -0.565358, '1 Rue Planterose 33800 Bordeaux France', '2018-09-23 00:00:00', 'inconnu'
    ),
    (
        4, 1, 'Poulet et renard', 'https://www.street-artwork.com/uploads/document/6427faa8f220f202972888.jpeg', 44.826325, -0.565389, '12 Rue Billaudel 33800 Bordeaux France', '2023-04-01 00:00:00', 'Monsieur Poulet'
    ),
    (
        5, 1, 'Amazonia', 'https://www.street-artwork.com/uploads/document/6213fbc66b935847715039.jpg', 44.849823, -0.559558, '12 Rue du Maréchal Niel 33100 Bordeaux France', '2022-02-21 00:00:00', 'Epis'
    ),
    (
        6, 1, 'Al Pacino', 'https://www.street-artwork.com/uploads/document/6213fa753fbf9579103328.jpg', 44.849823, -0.559558, '12 Rue du Maréchal Niel 33100 Bordeaux France', '2022-02-21 00:00:00', 'Rast'
    ),
    (
        7, 1, 'Robert De Niro', 'https://www.street-artwork.com/uploads/document/6213fa56d94d2227795612.jpg', 44.849815, -0.559568, '12 Rue du Maréchal Niel 33100 Bordeaux France', '2022-02-21 00:00:00', 'Rast'
    ),
    (
        8, 1, 'Glaçons', 'https://www.street-artwork.com/uploads/document/5f55364b069a2853620745.jpg', 44.861179, -0.558924, '127 Rue Dupaty 33300 Bordeaux France', '2020-09-06 00:00:00', 'inconnu'
    ),
    (
        9, 1, 'Petite fille au coeur', 'https://www.street-artwork.com/uploads/document/6420333db5c73764695889.JPG', 44.846, -0.55, '170 Av. Thiers 33100 Bordeaux France', '2023-03-26 00:00:00', 'MAS'
    ),
    (
        10, 1, 'Indien', 'https://www.street-artwork.com/uploads/document/642033e8a61e2202127063.JPG', 44.846, -0.55, '183 Av. Thiers 33100 Bordeaux France', '2023-03-26 00:00:00', 'MAS'
    ),
    (
        11, 1, 'T-shirt relevé', 'https://www.street-artwork.com/uploads/document/642026c94a844945884104.JPG', 44.828056, -0.55851, '19 Pass. Grenier 33800 Bordeaux France', '2023-03-26 00:00:00', 'Rouge'
    ),
    (
        12, 1, 'Femme à tresse', 'https://street-artwork.com/uploads/document/5c5c44c40cc9e072960780.jpg', 44.82672, -0.554343, '2 Rue de Son-Tay 33800 Bordeaux France', '2019-02-07 00:00:00', 'inconnu'
    ),
    (
        13, 1, 'Fresque Bleu', 'https://www.street-artwork.com/uploads/document/5c5c4505d826d378184252.jpg', 44.8279, -0.554499, '20 Rue des Terres de Borde 33800 Bordeaux France', '2019-02-07 00:00:00', 'inconnu'
    ),
    (
        14, 1, 'L\'ours et le Perroquet', 'https://www.street-artwork.com/uploads/document/641c297681527694008521.JPG', 44.832444, -0.5653, '21 Rue des Vignes 33800 Bordeaux France', '2023-03-20 00:00:00', 'A-mo'
    ),
    (
        15, 1, 'Visage femme multicolore', 'https://www.street-artwork.com/uploads/document/63f7450114399181757485.JPG', 44.863425, -0.559492, '276 Cr Balguerie Stuttenberg 33300 Bordeaux France', '2023-02-23 00:00:00', 'Alber'
    ),
    (
        16, 1, 'Qui mange la vie', 'https://ik.imagekit.io/streetartwork/artworks-images_prod/1b8b2941-5066-4512-96d9-4682aad1a32d_P16GutBuP.jpg', 44.85, -0.582, '29 Rue Emile Zola 33000 Bordeaux France', '2023-04-07 00:00:00', 'Selor'
    ),
    (
        17, 1, 'L\'homme au rouge à lèvres', 'https://www.street-artwork.com/uploads/document/641ecf9c6f70f986055711.jpg', 44.836944, -0.5875, '30 Rue Claude Bonnier 33000 Bordeaux France', '2023-03-25 00:00:00', 'Jean Rooble'
    ),
    (
        18, 1, 'Rouge à lèvres rose', 'https://www.street-artwork.com/uploads/document/641ed2d225c92033213194.jpg', 44.836944, -0.5875, '30 Rue Claude Bonnier 33000 Bordeaux France', '2023-03-25 00:00:00', 'Jean Rooble'
    ),
    (
        19, 1, 'Le Lion', 'https://www.street-artwork.com/uploads/document/641c2a326ebb6628307910.JPG', 44.832558, -0.565133, '30 Rue des Vignes 33800 Bordeaux France', '2023-03-23 00:00:00', 'A-mo'
    ),
    (
        20, 1, 'Bulles', 'https://www.street-artwork.com/uploads/document/64209b82ef404449708244.JPG', 44.83, -0.565, '34 Rue Jules Guesde 33800 Bordeaux France', '2023-03-26 00:00:00', 'tempo Nok'
    ),
    (
        21, 1, 'Fresque Mother', 'https://www.street-artwork.com/uploads/document/5c5b492a7cb47113975633.jpg', 44.823086, -0.55413, '4 Allée Eugène Delacroix 33800 Bordeaux France', '2019-02-06 00:00:00', 'inconnu'
    ),
    (
        22, 1, 'Lémurien', 'https://www.street-artwork.com/uploads/document/6420835968196215480659.jpg', 44.835833, -0.571389, '43 Rue Saint-James 33000 Bordeaux France', '2023-03-26 00:00:00', 'A-mo'
    ),
    (
        23, 1, 'Gorille violet', 'https://www.street-artwork.com/uploads/document/642080cd2fb55597469317.jpg', 44.836667, -0.574167, '44 Rue des Ayres 33000 Bordeaux France', '2023-03-26 00:00:00', 'A-mo'
    ),
    (
        24, 1, 'Humain est nôtre', 'https://www.street-artwork.com/uploads/document/5c7d61f8059c1962277545.jpg', 44.82597, -0.5488, '6 Rue de Belcier 33800 Bordeaux France', '2019-03-04 00:00:00', 'Cost'
    ),
    (
        25, 1, 'Taureau fou', 'https://www.street-artwork.com/uploads/document/64201c595653e324059781.JPG', 44.840214, -0.580236, '6 Rue Toulouse Lautrec 33000 Bordeaux France', '2023-03-26 00:00:00', 'Charles Foussard'
    ),
    (
        26, 1, 'Cigogne Japonaise', 'https://www.street-artwork.com/uploads/document/64201e654032c609215989.JPG', 44.816906, -0.574344, '60 Rue Brun 33800 Bordeaux France', '2023-03-26 00:00:00', 'Derf'
    ),
    (
        27, 1, 'Renard d\'eau', 'https://www.street-artwork.com/uploads/document/641ed358e3fcc099240903.JPG', 44.816889, -0.57425, '60 Rue Brun 33800 Bordeaux France', '2023-03-25 00:00:00', 'GZ'
    ),
    (
        28, 1, 'Les yeux colorés', 'https://www.street-artwork.com/uploads/document/641ed46bafe62762363115.jpg', 44.85611, -0.549167, '65 Quai de Brazza 33100 Bordeaux France', '2023-03-25 00:00:00', 'Derf'
    ),
    (
        29, 1, 'This is not art', 'https://www.street-artwork.com/uploads/document/5c7d047643f3a137814268.jpg', 44.829014, -0.556686, '7 Rue Cazaubon 33800 Bordeaux France', '2019-03-04 00:00:00', 'Selor'
    ),
    (
        30, 1, 'La balaine bleue', 'https://www.street-artwork.com/uploads/document/64208dc1daabd529309338.jpg', 44.853, -0.567, '76 Quai des Chartrons 33000 Bordeaux France', '2023-03-26 00:00:00', 'A-mo'
    );
/*!40000 ALTER TABLE `street_art` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE IF NOT EXISTS `users` (
    `id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `postcode` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `points` int NOT NULL DEFAULT '0', `is_admin` tinyint(1) DEFAULT '0', PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */
;

INSERT IGNORE INTO
    `users`
VALUES (
        2, 'raph', 'raph@raph.fr', '33400', 'talence', '$2b$05$SnWuUiI7h/Rz2aMv2eYR0uvFzs6YAZEZMpYO8uh2IbhBsqCwZJjSS', 2800, 1
    );
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping routines for database 'street_art_hunters'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2024-01-29 14:25:14