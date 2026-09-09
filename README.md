# Plateforme de recettes de cuisine

Projet final TP DWWM — Plateforme communautaire de partage et découverte de recettes de cuisine.

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 + Vite + Bootstrap 5 + Sass |
| Backend | Node.js + Express 5 + Sequelize 6 |
| Base de données | MySQL 8 |
| Cache | Redis |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Tests | Jest + Supertest |
| Déploiement | Railway (API + MySQL) + Vercel (frontend) |

## Maquettes Figma

[Voir les maquettes sur Figma](https://www.figma.com/design/ug4O4m5dsF1v9TYMQ8ELEH/Recettes-de-cuisine)

Pages maquettées (Desktop / Tablette / Mobile) :
- Accueil
- Liste des recettes avec filtres
- Fiche recette détaillée
- Connexion / Inscription
- Interface Admin
- Schéma d'enchaînement des interfaces

## Milestones

| Milestone | Description | Statut |
|-----------|-------------|--------|
| 1 — Maquettes Figma | Design system + 6 pages maquettées | ✅ Terminée |
| 2 — Base de données | MCD, MLD, script SQL, utilisateurs MySQL | ✅ Terminée |
| 3 — Backend API | Express, Sequelize, JWT, Redis, tests Jest | ✅ Terminée |
| 4 — Frontend React | Intégration API, auth, favoris, admin, responsive | ✅ Terminée |
| 5 — Déploiement | Railway + Vercel + HTTPS + README | ✅ Terminée |
| 6 — Dossier + Diaporama | Dossier de projet + présentation jury | 🔜 À faire |

## Installation locale

### Prérequis

- Node.js 18+
- MySQL 8
- Redis (optionnel — le serveur fonctionne sans)

### 1. Cloner le repo

```bash
git clone https://github.com/adripcr0301-sketch/plateforme-recettes.git
cd plateforme-recettes
```

### 2. Base de données

Dans MySQL, exécuter dans l'ordre :

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p plateforme_recettes < database/fixtures.sql
```

### 3. Backend

```bash
cd server
cp .env.example .env
# Remplir les variables dans .env
npm install
npm run dev
```

Variables d'environnement (`server/.env`) :

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=plateforme_recettes
DB_USER=root
DB_PASSWORD=
JWT_SECRET=<secret_long_aleatoire>
JWT_EXPIRES_IN=7d
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### 4. Frontend

```bash
cd client
cp .env.example .env
# Définir VITE_API_URL=http://localhost:3000
npm install
npm run dev
```

Le site est disponible sur **http://localhost:5173**

## Déploiement

- **API + MySQL** : [Railway](https://railway.app) — service Node.js + plugin MySQL
- **Frontend** : [Vercel](https://vercel.com) — déploiement automatique depuis GitHub

Variables d'environnement de production à configurer sur Railway :

```
DB_HOST      → host Railway MySQL
DB_PORT      → port Railway MySQL
DB_NAME      → nom de la base
DB_USER      → utilisateur MySQL
DB_PASSWORD  → mot de passe MySQL
JWT_SECRET   → secret JWT (long et aléatoire)
JWT_EXPIRES_IN → 7d
REDIS_HOST   → host Redis (si activé)
REDIS_PORT   → 6379
```

## Structure du projet

```
plateforme-recettes/
├── client/                 # Frontend React + Vite
│   ├── src/
│   │   ├── components/     # Navbar, Footer
│   │   ├── context/        # AuthContext (JWT)
│   │   ├── pages/          # Accueil, Liste, Fiche, Login...
│   │   ├── services/       # Axios (api.js)
│   │   └── styles/         # main.scss (Bootstrap + charte)
│   └── vite.config.js
├── database/               # Scripts SQL
│   ├── schema.sql
│   ├── fixtures.sql
│   └── MCD.txt
└── server/                 # Backend Express
    ├── controllers/
    ├── middleware/
    ├── models/             # Sequelize
    ├── routes/
    ├── services/           # Redis
    └── tests/              # Jest + Supertest
```

## Compétences DWWM couvertes

| Code | Compétence | Milestone |
|------|-----------|-----------|
| C01 | Maquetter une application | M1 — Figma |
| C02 | Réaliser une interface utilisateur | M4 — React |
| C03 | Développer des composants métier | M4 — Auth, favoris |
| C04 | Contribuer à la gestion d'un projet | GitHub issues + milestones |
| C05 | Développer la partie back-end | M3 — Express + JWT |
| C06 | Élaborer et mettre en œuvre des composants dans une application | M3 — Redis + Sequelize |
