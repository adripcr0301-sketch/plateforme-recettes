-- ========================================================
-- Jeu de données de test (fixtures)
-- Plateforme de recettes de cuisine
-- ========================================================

USE plateforme_recettes;

-- --------------------------------------------------------
-- Catégories
-- --------------------------------------------------------
INSERT INTO categorie (nom, slug) VALUES
  ('Entrée',        'entree'),
  ('Plat principal','plat-principal'),
  ('Dessert',       'dessert'),
  ('Boisson',       'boisson'),
  ('Végétarien',    'vegetarien');

-- --------------------------------------------------------
-- Utilisateurs
-- Mots de passe hashés avec bcrypt (coût 10)
-- Mot de passe en clair : "Test1234!" pour tous
-- --------------------------------------------------------
INSERT INTO user (prenom, email, mot_de_passe, role) VALUES
  ('Admin',   'admin@recettes.fr',  '$2b$10$hashadmin000000000000000000000000000000000000000000000', 'admin'),
  ('Marie',   'marie@test.fr',      '$2b$10$hashmarie000000000000000000000000000000000000000000000', 'user'),
  ('Thomas',  'thomas@test.fr',     '$2b$10$hashthomas00000000000000000000000000000000000000000000', 'user');

-- --------------------------------------------------------
-- Ingrédients
-- --------------------------------------------------------
INSERT INTO ingredient (nom, unite) VALUES
  ('Farine',          'g'),
  ('Beurre',          'g'),
  ('Sucre',           'g'),
  ('Oeufs',           'pièce'),
  ('Lait',            'ml'),
  ('Levure chimique', 'g'),
  ('Pommes',          'pièce'),
  ('Crème fraîche',   'ml'),
  ('Sel',             'g'),
  ('Poulet',          'g'),
  ('Oignons',         'pièce'),
  ('Ail',             'gousse'),
  ('Tomates',         'pièce'),
  ('Huile d\'olive',  'ml'),
  ('Chocolat noir',   'g');

-- --------------------------------------------------------
-- Recettes
-- --------------------------------------------------------
INSERT INTO recette (titre, description, temps_preparation, difficulte, image_url, user_id, categorie_id) VALUES
  (
    'Tarte aux pommes',
    'Une délicieuse tarte aux pommes dorée, croustillante et fondante.',
    45, 'facile', NULL, 2, 3
  ),
  (
    'Poulet rôti aux herbes',
    'Un poulet rôti savoureux avec des herbes de Provence et de l\'ail.',
    90, 'moyen', NULL, 2, 2
  ),
  (
    'Salade niçoise',
    'Salade fraîche et colorée avec thon, olives, tomates et oeufs durs.',
    20, 'facile', NULL, 3, 1
  ),
  (
    'Moelleux au chocolat',
    'Gâteau fondant au chocolat noir, coeur coulant garanti.',
    30, 'moyen', NULL, 3, 3
  ),
  (
    'Soupe de légumes',
    'Soupe maison aux légumes de saison, légère et réconfortante.',
    40, 'facile', NULL, 1, 5
  );

-- --------------------------------------------------------
-- Recette - Ingrédients
-- --------------------------------------------------------
-- Tarte aux pommes (recette 1)
INSERT INTO recette_ingredient (recette_id, ingredient_id, quantite) VALUES
  (1, 1, '250'),
  (1, 2, '125'),
  (1, 3, '80'),
  (1, 4, '1'),
  (1, 7, '4');

-- Poulet rôti (recette 2)
INSERT INTO recette_ingredient (recette_id, ingredient_id, quantite) VALUES
  (2, 10, '1500'),
  (2, 12, '4'),
  (2, 14, '30'),
  (2, 9,  '5');

-- Moelleux au chocolat (recette 4)
INSERT INTO recette_ingredient (recette_id, ingredient_id, quantite) VALUES
  (4, 15, '200'),
  (4, 2,  '100'),
  (4, 3,  '100'),
  (4, 4,  '3'),
  (4, 1,  '50');

-- --------------------------------------------------------
-- Favoris
-- --------------------------------------------------------
INSERT INTO favori (user_id, recette_id) VALUES
  (2, 4),
  (3, 1),
  (3, 2);
