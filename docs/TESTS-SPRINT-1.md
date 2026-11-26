# Documentation des tests — Sprint 1 (US-1.1, US-1.2, US-1.3)

Ce document récapitule la procédure suivie pour valider les critères d'acceptation du **Sprint 1** sur la branche `dev` de **MaPinte**.

---

## 1. Environnement et vérifications techniques

Avant les tests manuels dans le navigateur, les vérifications suivantes ont été exécutées sur la branche `dev` à jour :

```bash
npm install
npm run lint    # oxlint + eslint : 0 erreur, 0 avertissement (18 fichiers)
npm run build   # vite build : compilation réussie
npm run dev     # serveur local sur http://localhost:5173
```

Navigateur utilisé : **Google Chrome** avec les outils de développement (`F12` → onglets **Network**, **Console** et mode responsive).

---

## 2. Résultats des tests d'acceptation (iceScrum)

### US-1.1 : Affichage du catalogue initial de brasseries

| # | Test | Protocole de test | Résultat |
| --- | --- | --- | --- |
| **6** | Chargement initial depuis l'API | Ouvrir `http://localhost:5173` avec l'onglet **Network** ouvert. Vérifier l'appel `GET /v1/breweries?page=1&per_page=12` (statut `200 OK`) et l'absence d'erreur dans la **Console**. | Validé |
| **7** | Affichage des informations sur chaque carte | Vérifier sur les cartes (`BreweryCard.vue`) la présence du badge de catégorie (`micro`, `brewpub`, `regional`…), du nom, de la ville/pays et du bouton **VOIR**, sans affichage de `null` ou `undefined` sur les champs absents. | Validé |
| **10** | Grille et compteur de résultats | Vérifier le compteur au-dessus de la liste (`12 brasseries trouvées`), la grille en **2 colonnes** sur Desktop et **1 colonne** en vue Mobile (`<= 640px` dans DevTools). | Validé |

---

### US-1.2 : Moteur de recherche dynamique

| # | Test | Protocole de test | Résultat |
| --- | --- | --- | --- |
| **8** | Recherche par mot-clé avec debounce | Taper rapidement un mot-clé (ex. `alpine` ou `zurich`) en observant l'onglet **Network** : une seule requête `GET /v1/breweries/search?page=1&per_page=12&query=...` part après **350 ms** d'inactivité et met à jour la grille. | Validé |
| **9** | Effacement rapide de la recherche | Vérifier l'apparition du bouton **`×`** dès qu'un texte est saisi. Cliquer sur **`×`** : le champ est vidé immédiatement et la liste initiale (`page=1&per_page=12`) est rechargée. | Validé |
| **11** | Gestion d'une recherche sans résultat | Saisir un terme absent de l'API Open Brewery DB (ex. `jorat`) : l'API renvoie `[]` et le message *« Aucune brasserie trouvée pour cette recherche »* s'affiche à la place de la grille, avec le bouton **Effacer la recherche**. | Validé |

---

### US-1.3 : Gestion du chargement, des erreurs et pagination

| # | Test | Protocole de test | Résultat |
| --- | --- | --- | --- |
| **12** | Indicateur de chargement | Dans DevTools (**Network**), activer le throttling **Slow 3G** puis recharger la page (`F5`) ou lancer une recherche : le composant `Loader.vue` (spinner + *« Chargement des brasseries… »*) remplace la grille tant que `isLoading === true`. | Validé |
| **13** | Gestion des erreurs réseau | Dans DevTools (**Network**), passer en mode **Offline** et recharger : le bandeau `ErrorBanner.vue` s'affiche avec un message lisible et le bouton **Réessayer**. Repasser en **No throttling** puis cliquer sur **Réessayer** : la requête repart et la liste s'affiche. | Validé |
| **14** | Navigation par pages | 1. Sur la page 1, vérifier que **`[ Précédent ]`** est désactivé et **`[ Suivant ]`** actif.<br>2. Cliquer sur **`[ Suivant ]`** : `Page 2` s'affiche, la requête `page=2&per_page=12` part, la page remonte en haut et **`[ Précédent ]`** devient actif.<br>3. Rechercher un terme avec moins de 12 résultats (ex. `zurich` → 2 résultats, ou `alpine` → 11 résultats) : **`[ Suivant ]`** est désactivé. | Validé |

---

## 3. Notes utiles pour les prochains tests

- **Données de l'API Open Brewery DB** : certaines brasseries suisses présentes sur la maquette Figma (comme *Brasserie du Jorat*) n'existent pas dans la base publique Open Brewery DB. Utiliser `zurich` (2 résultats) ou `alpine` (11 résultats) pour tester les pages incomplètes (`< 12` résultats), et `jorat` pour tester l'état vide (`0` résultat).
- **Simulation réseau dans Chrome** : le menu **Network → Throttling** (`Slow 3G` / `Offline`) permet de reproduire facilement les états de chargement et d'erreur sans modifier le code.
