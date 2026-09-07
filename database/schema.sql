-- ========================================================
-- Plateforme de recettes de cuisine
-- Script de création de la base de données
-- ========================================================

CREATE DATABASE IF NOT EXISTS plateforme_recettes
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE plateforme_recettes;

-- --------------------------------------------------------
-- Table : categorie
-- --------------------------------------------------------
CREATE TABLE categorie (
  id        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom       VARCHAR(100) NOT NULL,
  slug      VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table : user
-- --------------------------------------------------------
CREATE TABLE user (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  prenom        VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe  VARCHAR(255) NOT NULL,
  role          ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table : recette
-- --------------------------------------------------------
CREATE TABLE recette (
  id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titre               VARCHAR(255) NOT NULL,
  description         TEXT NOT NULL,
  temps_preparation   SMALLINT UNSIGNED NOT NULL COMMENT 'en minutes',
  difficulte          ENUM('facile', 'moyen', 'difficile') NOT NULL DEFAULT 'facile',
  image_url           VARCHAR(500) DEFAULT NULL,
  created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id             INT UNSIGNED NOT NULL,
  categorie_id        INT UNSIGNED NOT NULL,
  CONSTRAINT fk_recette_user
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  CONSTRAINT fk_recette_categorie
    FOREIGN KEY (categorie_id) REFERENCES categorie(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table : ingredient
-- --------------------------------------------------------
CREATE TABLE ingredient (
  id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nom     VARCHAR(150) NOT NULL,
  unite   VARCHAR(50)  NOT NULL COMMENT 'g, ml, pièce, cuillère...'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table pivot : recette_ingredient
-- --------------------------------------------------------
CREATE TABLE recette_ingredient (
  recette_id      INT UNSIGNED NOT NULL,
  ingredient_id   INT UNSIGNED NOT NULL,
  quantite        VARCHAR(50)  NOT NULL,
  PRIMARY KEY (recette_id, ingredient_id),
  CONSTRAINT fk_ri_recette
    FOREIGN KEY (recette_id) REFERENCES recette(id) ON DELETE CASCADE,
  CONSTRAINT fk_ri_ingredient
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table pivot : favori
-- --------------------------------------------------------
CREATE TABLE favori (
  user_id     INT UNSIGNED NOT NULL,
  recette_id  INT UNSIGNED NOT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, recette_id),
  CONSTRAINT fk_favori_user
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
  CONSTRAINT fk_favori_recette
    FOREIGN KEY (recette_id) REFERENCES recette(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
