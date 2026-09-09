# Jeu d'essai — Plateforme de recettes de cuisine

**Projet :** Plateforme de recettes de cuisine — TP DWWM  
**URL de test :** https://plateforme-recettes.vercel.app  
**API :** https://plateforme-recettes-production.up.railway.app  
**Date :** Septembre 2026

---

## Données de test

### Comptes utilisateurs

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Administrateur | admin@recettes.fr | Test1234! |
| Utilisateur | marie@test.fr | Test1234! |
| Utilisateur | thomas@test.fr | Test1234! |

### Recettes en base

| ID | Titre | Catégorie | Difficulté |
|----|-------|-----------|------------|
| 1 | Tarte aux pommes | Dessert | facile |
| 2 | Poulet rôti aux herbes | Plat principal | moyen |
| 3 | Salade niçoise | Entrée | facile |
| 4 | Moelleux au chocolat | Dessert | moyen |
| 5 | Soupe de légumes | Végétarien | facile |

---

## Scénarios de test

### MODULE 1 — Authentification

---

#### T01 — Inscription d'un nouvel utilisateur

**Pré-condition :** Aucun compte avec l'email utilisé  
**URL :** `/register`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Accéder à `/register` | Formulaire d'inscription affiché |
| 2 | Saisir Prénom : `Jean` | Champ rempli |
| 3 | Saisir Email : `jean@test.fr` | Champ rempli |
| 4 | Saisir Mot de passe : `Test1234!` | Champ rempli (masqué) |
| 5 | Cliquer sur "S'inscrire" | Redirection vers `/login`, message de succès |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T02 — Inscription avec email déjà existant

**Pré-condition :** Le compte `marie@test.fr` existe  
**URL :** `/register`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Saisir Email : `marie@test.fr` | Champ rempli |
| 2 | Saisir les autres champs valides | Champs remplis |
| 3 | Cliquer sur "S'inscrire" | Message d'erreur "Email déjà utilisé", pas de redirection |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T03 — Connexion avec identifiants valides

**Pré-condition :** Compte `marie@test.fr` / `Test1234!` existant  
**URL :** `/login`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Accéder à `/login` | Formulaire de connexion affiché |
| 2 | Saisir `marie@test.fr` | Champ rempli |
| 3 | Saisir `Test1234!` | Champ rempli (masqué) |
| 4 | Cliquer sur "Se connecter" | Redirection vers `/`, navbar affiche le prénom "Marie" et le lien "Mes favoris" |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T04 — Connexion avec mot de passe incorrect

**URL :** `/login`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Saisir `marie@test.fr` | Champ rempli |
| 2 | Saisir `MauvaisMotDePasse` | Champ rempli |
| 3 | Cliquer sur "Se connecter" | Message d'erreur "Identifiants incorrects", pas de redirection |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T05 — Déconnexion

**Pré-condition :** Être connecté en tant que Marie  

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Cliquer sur "Déconnexion" dans la navbar | Redirection vers `/login`, navbar affiche "Connexion" / "Inscription" |
| 2 | Accéder à `/favoris` | Redirection automatique vers `/login` |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

### MODULE 2 — Navigation et affichage des recettes

---

#### T06 — Page d'accueil

**Pré-condition :** Aucune (accessible sans connexion)  
**URL :** `/`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Accéder à `/` | Section hero affichée avec titre et bouton "Voir les recettes" |
| 2 | Observer la section recettes | 5 recettes affichées avec titre, catégorie, difficulté, temps |
| 3 | Cliquer sur une recette | Redirection vers `/recettes/:id` |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T07 — Liste des recettes avec recherche

**URL :** `/recettes`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Accéder à `/recettes` | Les 5 recettes sont listées |
| 2 | Saisir "pommes" dans le champ recherche | Seule "Tarte aux pommes" est affichée |
| 3 | Effacer la recherche | Les 5 recettes réapparaissent |
| 4 | Saisir "xyz" (aucun résultat) | Message "Aucune recette trouvée" affiché |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T08 — Filtrage par catégorie

**URL :** `/recettes`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Sélectionner "Dessert" dans le filtre catégorie | Seules "Tarte aux pommes" et "Moelleux au chocolat" sont affichées |
| 2 | Sélectionner "Toutes" | Les 5 recettes réapparaissent |
| 3 | Combiner filtre "Entrée" + recherche "niçoise" | Seule "Salade niçoise" est affichée |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T09 — Fiche recette détaillée

**URL :** `/recettes/2` (Poulet rôti)

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Accéder à `/recettes/2` | Titre "Poulet rôti aux herbes" affiché |
| 2 | Observer les badges | Badge catégorie "Plat principal", badge difficulté "moyen" (orange) |
| 3 | Observer les ingrédients | Tableau avec Poulet (1500), Ail (4 gousses), Huile d'olive (30 ml), Sel (5 g) |
| 4 | Observer le bouton favori (non connecté) | Bouton "☆ Ajouter aux favoris" visible |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T10 — Page 404

**URL :** `/page-inexistante`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Accéder à `/page-inexistante` | Page 404 affichée avec message et lien retour accueil |
| 2 | Accéder à `/recettes/9999` | Page 404 affichée (recette inexistante) |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

### MODULE 3 — Favoris

---

#### T11 — Ajout d'une recette aux favoris

**Pré-condition :** Être connecté en tant que `thomas@test.fr`  
**URL :** `/recettes/4` (Moelleux au chocolat)

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Accéder à `/recettes/4` | Bouton "☆ Ajouter aux favoris" affiché |
| 2 | Cliquer sur le bouton | Bouton passe à "★ Favori" (fond jaune) |
| 3 | Accéder à `/favoris` | La recette "Moelleux au chocolat" apparaît dans la liste |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T12 — Suppression d'un favori

**Pré-condition :** Être connecté en tant que `thomas@test.fr`, "Moelleux au chocolat" en favori  
**URL :** `/recettes/4`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Observer le bouton | Bouton "★ Favori" (fond jaune) |
| 2 | Cliquer sur "★ Favori" | Bouton repasse à "☆ Ajouter aux favoris" |
| 3 | Accéder à `/favoris` | La recette n'apparaît plus dans la liste |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T13 — Accès aux favoris sans connexion

**Pré-condition :** Ne pas être connecté  
**URL :** `/favoris`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Accéder à `/favoris` | Redirection automatique vers `/login` |
| 2 | Cliquer sur "☆ Ajouter aux favoris" sur une fiche recette | Redirection vers `/login` |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

### MODULE 4 — Administration

---

#### T14 — Accès à l'interface admin

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Accéder à `/admin` sans connexion | Redirection vers `/login` |
| 2 | Se connecter avec `marie@test.fr` (rôle user) et accéder à `/admin` | Redirection vers `/` (accès refusé) |
| 3 | Se connecter avec `admin@recettes.fr` et accéder à `/admin` | Interface admin affichée avec formulaire et liste des recettes |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T15 — Création d'une recette (Admin)

**Pré-condition :** Connecté en tant qu'admin  
**URL :** `/admin`

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Remplir "Titre" : `Quiche lorraine` | Champ rempli |
| 2 | Remplir "Temps" : `60` | Champ rempli |
| 3 | Sélectionner Difficulté : `Moyen` | Sélectionné |
| 4 | Sélectionner Catégorie : `Plat principal` | Sélectionné |
| 5 | Remplir "Description" : `Une quiche savoureuse.` | Champ rempli |
| 6 | Cliquer "Créer" | Message "Recette créée.", recette apparaît dans le tableau |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T16 — Modification d'une recette (Admin)

**Pré-condition :** Connecté en tant qu'admin, recette "Quiche lorraine" créée au T15  

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Cliquer "Modifier" sur "Quiche lorraine" | Formulaire pré-rempli avec les données de la recette, titre du formulaire change en "Modifier la recette" |
| 2 | Changer le titre en `Quiche lorraine maison` | Champ modifié |
| 3 | Cliquer "Mettre à jour" | Message "Recette mise à jour.", tableau mis à jour |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T17 — Suppression d'une recette (Admin)

**Pré-condition :** Connecté en tant qu'admin, recette "Quiche lorraine maison" existante  

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Cliquer "Supprimer" sur "Quiche lorraine maison" | Fenêtre de confirmation apparaît |
| 2 | Cliquer "Annuler" | Recette non supprimée, toujours dans le tableau |
| 3 | Cliquer à nouveau "Supprimer" puis "OK" | Message "Recette supprimée.", recette disparaît du tableau |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

### MODULE 5 — API (tests directs)

---

#### T18 — GET /api/recettes (public)

**Outil :** Navigateur ou Postman  

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | GET `https://plateforme-recettes-production.up.railway.app/api/recettes` | Réponse 200, tableau JSON de 5 recettes avec `id`, `titre`, `Categorie`, `Ingredients` |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T19 — GET /api/recettes/:id (public)

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | GET `/api/recettes/1` | Réponse 200, objet JSON "Tarte aux pommes" avec ses ingrédients |
| 2 | GET `/api/recettes/9999` | Réponse 404, message "Recette non trouvée" |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

#### T20 — Protection des routes API authentifiées

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | GET `/api/favoris` sans token | Réponse 401 "Token manquant" |
| 2 | POST `/api/recettes` sans token | Réponse 401 "Token manquant" |
| 3 | DELETE `/api/recettes/1` sans token | Réponse 401 "Token manquant" |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

### MODULE 6 — Responsive design

---

#### T21 — Affichage mobile (375px)

| Étape | Action | Résultat attendu |
|-------|--------|-----------------|
| 1 | Ouvrir DevTools → 375px de large | Navbar affiche le bouton hamburger |
| 2 | Cliquer sur le hamburger | Menu se déplie avec tous les liens |
| 3 | Page `/recettes` | Les cartes recettes s'affichent en colonne unique |
| 4 | Fiche recette | Les ingrédients passent sous la description |

**Résultat obtenu :** ☐ Conforme ☐ Non conforme  
**Observations :** _______________

---

## Récapitulatif

| ID | Module | Description | Statut |
|----|--------|-------------|--------|
| T01 | Auth | Inscription valide | ☐ |
| T02 | Auth | Inscription email existant | ☐ |
| T03 | Auth | Connexion valide | ☐ |
| T04 | Auth | Connexion mot de passe incorrect | ☐ |
| T05 | Auth | Déconnexion | ☐ |
| T06 | Navigation | Page d'accueil | ☐ |
| T07 | Navigation | Recherche textuelle | ☐ |
| T08 | Navigation | Filtrage catégorie | ☐ |
| T09 | Navigation | Fiche recette | ☐ |
| T10 | Navigation | Page 404 | ☐ |
| T11 | Favoris | Ajout favori | ☐ |
| T12 | Favoris | Suppression favori | ☐ |
| T13 | Favoris | Accès sans connexion | ☐ |
| T14 | Admin | Contrôle d'accès | ☐ |
| T15 | Admin | Création recette | ☐ |
| T16 | Admin | Modification recette | ☐ |
| T17 | Admin | Suppression recette | ☐ |
| T18 | API | GET /api/recettes | ☐ |
| T19 | API | GET /api/recettes/:id | ☐ |
| T20 | API | Routes protégées | ☐ |
| T21 | Responsive | Mobile 375px | ☐ |

**Total : 21 scénarios**  
**Conformes : ___ / 21**
