-- ========================================================
-- Création des utilisateurs MySQL avec droits restreints
-- À exécuter en tant que root
-- ========================================================

-- --------------------------------------------------------
-- Utilisateur applicatif (utilisé par l'API Node.js)
-- Droits restreints : lecture + écriture sur les données
-- --------------------------------------------------------
CREATE USER IF NOT EXISTS 'recettes_app'@'localhost'
  IDENTIFIED BY 'MotDePasseApp2026!';

GRANT SELECT, INSERT, UPDATE, DELETE
  ON plateforme_recettes.*
  TO 'recettes_app'@'localhost';

-- --------------------------------------------------------
-- Utilisateur admin (migrations, maintenance)
-- Droits complets sur la base uniquement
-- --------------------------------------------------------
CREATE USER IF NOT EXISTS 'recettes_admin'@'localhost'
  IDENTIFIED BY 'MotDePasseAdmin2026!';

GRANT ALL PRIVILEGES
  ON plateforme_recettes.*
  TO 'recettes_admin'@'localhost';

-- Appliquer les changements
FLUSH PRIVILEGES;

-- ========================================================
-- Vérification
-- ========================================================
-- SHOW GRANTS FOR 'recettes_app'@'localhost';
-- SHOW GRANTS FOR 'recettes_admin'@'localhost';
