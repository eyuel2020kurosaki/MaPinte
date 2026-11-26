# MaPinte

**MaPinte** est une application web frontend en **Vue.js 3** pour explorer, rechercher et filtrer des
brasseries artisanales et des bars à bière du monde entier, à partir de l'API publique
[Open Brewery DB](https://www.openbrewerydb.org/).

Projet du module Frontend (CPNV, filière informatique, classe SI-CA2a), mené en Scrum avec un suivi
des sprints dans iceScrum (projet `MAPINTE`).

## Équipe

- Eyuel Worku
- Taveeporn Matta
- Amin Torrisi
- Farah Mohamed Ahmed

## Ce qui fonctionne (branche `dev`)

| Fonction                                               | Fichiers                                             | Story  |
| ------------------------------------------------------ | ---------------------------------------------------- | ------ |
| Catalogue de 12 brasseries en cartes + compteur        | `HomeView.vue`, `BreweryList.vue`, `BreweryCard.vue` | US-1.1 |
| Recherche par mot-clé (debounce 350 ms) + état vide    | `SearchBar.vue`, `HomeView.vue`                      | US-1.2 |
| Indicateur de chargement, message d'erreur + Réessayer | `Loader.vue`, `ErrorBanner.vue`                      | US-1.3 |
| Barre de navigation et pied de page                    | `Navbar.vue`, `Footer.vue`, `App.vue`                | US-1.1 |
| Page « À propos »                                      | `AboutView.vue`, route `/about`                      | US-2.1 |

À venir : pagination (US-1.3), fiche détaillée, page 404, carte Leaflet et géolocalisation (Sprint 3),
favoris et filtres avec Pinia (Sprint 4). Le détail des tâches du Sprint 3 est dans
[`docs/SPRINT-3.md`](docs/SPRINT-3.md).

## Installation et lancement

Prérequis : **Node.js** `^22.18` ou `>=24.12` (voir `engines` dans `package.json`) et **npm**.

```bash
git clone https://github.com/eyuel2020kurosaki/MaPinte.git
cd MaPinte
git switch dev
npm install
npm run dev
```

Puis ouvrir http://localhost:5173.

| Commande          | Rôle                                         |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Serveur de développement avec rechargement   |
| `npm run build`   | Version de production dans `dist/`           |
| `npm run preview` | Sert localement la version de production     |
| `npm run lint`    | Vérifie et corrige le code (oxlint + ESLint) |
| `npm run format`  | Formate `src/` avec Prettier                 |

## Comment on travaille (Git)

1. **Partir de `dev` à jour** : `git switch dev && git pull`
2. **Une branche par tâche iceScrum** : `git switch -c feat/us-2.2-brewery-detail`
   - `feat/…` nouvelle fonctionnalité, `fix/…` correction, `docs/…` documentation
3. **Commits courts au format** `type(portée): description` en français, par ex.
   `feat(detail): afficher l'adresse complète`
4. **Avant de pousser** : `npm run lint` et `npm run build` doivent passer
5. **Pull request vers `dev`** (jamais vers `main`). Le modèle de PR se remplit tout seul :
   tâche iceScrum, ce qui change, comment tester
6. **Dans iceScrum** : passer la tâche en _In progress_ en commençant, en _Done_ quand la PR est
   fusionnée, et cocher les tests d'acceptation vérifiés

`main` ne reçoit que des versions stables de `dev`, en fin de sprint.

## Structure

```
src/
├── App.vue                  # Navbar + RouterView + Footer, styles globaux du body
├── main.js                  # Création de l'app, Pinia, Router
├── router/index.js          # Routes : / (home), /about
├── services/
│   ├── api.js               # Instance Axios, baseURL https://api.openbrewerydb.org/v1/breweries
│   └── breweryService.js    # getBreweries(params), searchBreweries(query, params)
├── views/
│   ├── HomeView.vue         # Catalogue : recherche, chargement, erreur, état vide, liste
│   └── AboutView.vue        # Page « À propos »
├── components/
│   ├── Navbar.vue           # Liens Catalogue / À propos (classe is-active)
│   ├── Footer.vue
│   ├── SearchBar.vue        # v-model + événement search (debounce 350 ms)
│   ├── BreweryList.vue      # Grille 2 colonnes (1 sur mobile) de BreweryCard
│   ├── BreweryCard.vue      # Une brasserie : badge, nom, lieu, adresse, bouton VOIR
│   ├── Loader.vue
│   └── ErrorBanner.vue
└── stores/counter.js        # Exemple du template Vue, sera remplacé par le store du Sprint 4
```

## Composants réutilisables

| Composant     | Props                                                          | Événements      |
| ------------- | -------------------------------------------------------------- | --------------- |
| `BreweryCard` | `brewery` (Object, requis), `distance` (Number, km, optionnel) | —               |
| `BreweryList` | `breweries` (Array, requis)                                    | —               |
| `SearchBar`   | `v-model` (String)                                             | `search(query)` |
| `Loader`      | `message` (String)                                             | —               |
| `ErrorBanner` | `message` (String), `retryable` (Boolean, `true`)              | `retry`         |

Exemple :

```vue
<Loader v-if="isLoading" />
<ErrorBanner v-else-if="error" :message="error" @retry="load" />
<BreweryList v-else :breweries="breweries" />
```

## API Open Brewery DB

`api.js` pointe déjà sur `/v1/breweries`, donc les chemins sont relatifs à cette adresse :

| Besoin                      | Appel Axios                                                |
| --------------------------- | ---------------------------------------------------------- |
| Liste paginée               | `api.get('/', { params: { page, per_page } })`             |
| Recherche                   | `api.get('/search', { params: { query } })`                |
| Une brasserie par id        | ``api.get(`/${id}`)``                                      |
| Les plus proches d'un point | ``api.get('/', { params: { by_dist: `${lat},${lng}` } })`` |
| Filtres                     | `by_type`, `by_country`, `by_city`, `sort`                 |

Champs utiles d'une brasserie : `id`, `name`, `brewery_type`, `address_1`, `postal_code`, `city`,
`state_province`, `country`, `latitude`, `longitude`, `phone`, `website_url`. Beaucoup peuvent être
`null` : toujours prévoir un affichage de repli.

## Design

La maquette de référence est dans [`docs/maquette.jpg`](docs/maquette.jpg) (desktop à gauche, mobile à droite). Couleurs utilisées dans le code :
encre `#0b1527`, texte secondaire `#475569`, bordure `#e2e8f0`, accent ambre `#b8860b`,
police monospace pour les petites étiquettes (badges, compteur). Garder un focus clavier visible
(`outline` au `:focus-visible`) sur tout élément cliquable.
