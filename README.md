# MaPinte

**MaPinte** est une application web frontend développée en **Vue.js 3** permettant d'explorer, rechercher et filtrer des brasseries artisanales et bars à bière à travers le monde. 

Ce projet est réalisé dans le cadre du module Frontend (CPNV - Filière Informatique, classe SI-CA2a) selon une méthodologie Agile Scrum.

---

## Membre
- Eyuel Worku
- Taveeporn Matta
- Amin Torrisi
- Farah Mohamed Ahmed

## Fonctionnalités

- Recherche de brasseries par nom
- Filtrage par type de brasserie
- Filtrage par pays et ville
- Tri des résultats
- Consultation des détails d'une brasserie
- Gestion des favoris
- Brasserie aléatoire
- Affichage de la localisation sur une carte

---
## Technologies utilisées

- Vue.js 3
- Vue Router
- Pinia
- Axios
- Open Brewery DB API
- HTML / CSS / JavaScript

---

## Installation et lancement en local

### Prérequis
* **Node.js** 22.22+ ou 24.15+ (voir `engines` dans `package.json`)
* **npm**

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/eyuel2020kurosaki/MaPinte.git
   cd MaPinte
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```
   Puis ouvrir http://localhost:5173

### Autres commandes

| Commande          | Rôle                                           |
| ----------------- | ---------------------------------------------- |
| `npm run build`   | Génère la version de production dans `dist/`   |
| `npm run preview` | Sert localement la version de production       |
| `npm run lint`    | Vérifie et corrige le code (oxlint + ESLint)   |
| `npm run format`  | Formate le code avec Prettier                  |

---

## Routes

| URL             | Vue                     | Description                                 |
| --------------- | ----------------------- | ------------------------------------------- |
| `/`             | `HomeView.vue`          | Page d'accueil                              |
| `/brewery/:id`  | `BreweryDetailView.vue` | Détail d'une brasserie (`:id` passé en prop) |
| `/a-propos`     | `AboutView.vue`         | Présentation du projet et de l'équipe       |
| autre           | `NotFoundView.vue`      | Page 404                                    |

## Design

Style inspiré des Human Interface Guidelines d'Apple : police système (SF Pro sur Mac/iPhone,
Segoe UI Variable sur Windows), beaucoup d'espace, barre de navigation translucide, surfaces sans
bordure et une seule couleur d'accent (ambre). Mode sombre automatique.

Toutes les couleurs, rayons et espacements sont des variables CSS dans `src/assets/main.css`
(`--text`, `--text-secondary`, `--bg-secondary`, `--accent`, `--radius`…). Utilisez-les dans vos
composants plutôt que des valeurs en dur. Classes utilitaires : `.container`, `.btn`, `.btn--tinted`,
`.link-chevron`, `.visually-hidden`.

## Structure

```
src/
├── assets/main.css         # Styles globaux et variables de couleur
├── components/
│   ├── Navbar.vue          # Barre de navigation (logo cliquable, liens)
│   └── Footer.vue          # Pied de page avec crédits
├── router/index.js         # Déclaration des routes
├── services/api.js         # Client Axios pour Open Brewery DB
├── views/                  # Pages
├── App.vue                 # Mise en page : Navbar + RouterView + Footer
└── main.js
```
