# Sprint 3 : guide de démarrage par tâche

Sprint 3 (21.11 → 04.12) : **navigation entre les pages, fiche détaillée d'une brasserie, carte
interactive avec géolocalisation.** Ce document dit, pour chaque tâche iceScrum, ce qui existe déjà,
quels fichiers créer ou modifier, et quels tests d'acceptation doivent passer. Prendre une tâche =
s'assigner dans iceScrum, créer la branche indiquée depuis `dev`, coder, ouvrir une PR vers `dev`.

Maquette : [`maquette.jpg`](maquette.jpg). Conventions Git et API : [`README.md`](../README.md).

## Ordre conseillé

```
#16 Routes ──┬──> #18 Fiche détaillée ──> #19 CategoryBadge
             └──> #17 Page 404
#20 useGeolocation ──> #21 BreweryMap (+ branchement dans HomeView)
```

`#16`, `#17` et `#20` peuvent démarrer tout de suite, en parallèle. `#18` a besoin de la route
`/brewery/:id` de `#16`. `#21` utilise `useGeolocation` de `#20`.

Reste du Sprint 2 encore ouvert : **#15 Pagination (Farah)**. `HomeView.vue` a déjà
`const currentPage = ref(1)`, envoyé à l'API et remis à 1 à chaque recherche : la pagination n'a qu'à
le modifier puis appeler `loadBreweries()`.

---

## US-2.1 · Routage et navigation SPA

Tests d'acceptation (iceScrum) :

- **Routes fonctionnelles sans rechargement** : `/`, `/brewery/:id` et `/about` chargent leur vue ;
  le bouton VOIR d'une carte ouvre `/brewery/{id}`.
- **URLs inconnues (404)** : `/nimporte-quoi` affiche `NotFoundView.vue` avec un lien vers le catalogue.
- **État actif dans la Navbar** : le lien de la page en cours est mis en évidence.

### Tâche #16 · Configurer les routes (Tavee) · branche `feat/us-2.1-routes`

Déjà fait :

- `/` (`home`) et `/about` (`about`, chargée à la demande) existent dans `src/router/index.js`.
- Le bouton VOIR de `BreweryCard.vue` est déjà un `<RouterLink :to="`/brewery/${brewery.id}`">`.
- `Navbar.vue` met déjà la classe `is-active` sur le lien courant (`exact-active-class` pour Catalogue).

À faire dans `src/router/index.js` :

```js
{
  path: '/brewery/:id',
  name: 'brewery-detail',
  component: () => import('../views/BreweryDetailView.vue'),
  props: true, // la vue reçoit l'id en prop : defineProps({ id: String })
},
{
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: () => import('../views/NotFoundView.vue'),
},
```

La route catch-all doit rester **en dernier**. Tant que `#17` et `#18` ne sont pas fusionnées, créer
deux vues minimales (un `<h1>`) pour que le build passe : elles seront remplacées.

Vérifier : cliquer sur VOIR → l'URL devient `/brewery/…` sans rechargement (l'onglet ne clignote pas,
la Navbar reste en place).

### Tâche #17 · AboutView et NotFoundView · branche `feat/us-2.1-not-found`

- **AboutView.vue : déjà fait** (PR #12). Il ne reste que la page 404.
- Créer `src/views/NotFoundView.vue` : titre « Page introuvable », une phrase d'explication, un
  `<RouterLink to="/">Retour au catalogue</RouterLink>`. S'inspirer de la mise en page et du bouton
  « Retour » d'`AboutView.vue` (même largeur max, même style de bouton).
- Vérifier : `/nimporte-quoi` et `/brewery` (sans id) affichent la 404, Navbar et Footer restent visibles.

---

## US-2.2 · Fiche détaillée d'une brasserie

Tests d'acceptation :

- **Chargement des détails par ID** : `GET /breweries/{id}`, affichage du nom, du badge de type, de
  l'adresse complète (rue, code postal, ville, région, pays), du téléphone (`tel:`) et du site web
  (`target="_blank" rel="noopener"`).
- **Données partielles et erreurs** : téléphone ou site absent → « Non renseigné » ; id inexistant
  (404 de l'API) → `ErrorBanner` avec un bouton retour.
- **Réutilisation** : la vue utilise `CategoryBadge`, `Loader`, `ErrorBanner` et un bouton
  « Retour au catalogue ».

### Tâche #18 · getBreweryById + BreweryDetailView · branche `feat/us-2.2-brewery-detail`

1. Dans `src/services/breweryService.js`, ajouter (même style que les deux fonctions existantes) :

   ```js
   export async function getBreweryById(id) {
     const response = await api.get(`/${id}`)
     return response.data
   }
   ```

2. Créer `src/views/BreweryDetailView.vue`, sur le modèle de `HomeView.vue` :
   - `const props = defineProps({ id: { type: String, required: true } })`
   - `brewery`, `isLoading`, `error` en `ref`, une fonction `load()` appelée dans `onMounted`
   - **et** dans un `watch(() => props.id, load)` (si on navigue d'une fiche à une autre, le
     composant est réutilisé et `onMounted` ne repasse pas)
   - template : `<Loader v-if>` → `<ErrorBanner v-else-if="error" @retry="load">` → la fiche
   - erreur 404 : `catch (e)` puis `e.response?.status === 404` → message « Cette brasserie n'existe
     pas » ; sinon message réseau habituel
   - téléphone : `<a :href="`tel:${brewery.phone}`">`, ou « Non renseigné »
   - site : `<a :href="brewery.website_url" target="_blank" rel="noopener noreferrer">`, ou
     « Non renseigné »
   - adresse : assembler `address_1`, `postal_code` + `city`, `state_province`, `country` en
     ignorant les champs vides (`[...].filter(Boolean).join(', ')`, comme dans `BreweryCard.vue`)
   - mise en page : deux colonnes sur desktop (infos à gauche ; à droite un lien
     `https://www.google.com/maps?q=${latitude},${longitude}` si les coordonnées existent), une
     colonne en dessous de 640 px

Id de test qui existe : prendre l'id de n'importe quelle carte du catalogue (bouton VOIR).
Id de test inexistant : `/brewery/nexiste-pas`.

### Tâche #19 · CategoryBadge · branche `feat/us-2.2-category-badge`

Aujourd'hui la logique du badge est dans `src/components/BreweryCard.vue` :

- l'objet `BADGE_TONES` (type → `amber`, `blue`, `indigo`, `grey`, `neutral` par défaut)
- les classes CSS `.brewery-card__badge` et `.brewery-card__badge--{ton}`

À faire :

1. Créer `src/components/CategoryBadge.vue` avec une prop `type` (String), y **déplacer**
   `BADGE_TONES`, le texte (`type || 'inconnu'`) et le CSS des badges (renommer les classes en
   `.category-badge`, `.category-badge--amber`, etc.).
2. Dans `BreweryCard.vue`, remplacer le `<span class="brewery-card__badge">` par
   `<CategoryBadge :type="brewery.brewery_type" />` et supprimer le code déplacé. **Garder**
   `badgeTone` dans la carte : il sert aussi à colorer le visuel (`.brewery-card__visual--{ton}`).
   Le plus simple : exporter `BADGE_TONES` depuis un petit fichier `src/utils/breweryTypes.js`
   importé par les deux composants.
3. L'utiliser dans `BreweryDetailView.vue`.

Vérifier : les cartes du catalogue ont exactement le même rendu qu'avant (comparer avec une
capture prise avant la modification).

---

## US-2.3 · Carte interactive et géolocalisation

Tests d'acceptation :

- **Marqueurs** : carte Leaflet dans le panneau de droite sur desktop ; chaque brasserie avec
  latitude/longitude valides a un marqueur cliquable (infobulle : nom, type, lien vers la fiche).
- **Géolocalisation** : clic sur « Ma position actuelle » → demande d'autorisation ; si acceptée,
  marqueur bleu, carte recentrée, brasseries chargées via `by_dist={lat},{lng}`.
- **Refus** : refus ou navigateur sans géolocalisation → message discret, rien de bloqué.

### Tâche #20 · useGeolocation · branche `feat/us-2.3-geolocation`

Créer `src/composables/useGeolocation.js` :

```js
import { ref } from 'vue'

export function useGeolocation() {
  const coords = ref(null) // { lat, lng }
  const geoError = ref(null) // message lisible en français
  const isLocating = ref(false)

  function locate() {
    // navigator.geolocation.getCurrentPosition(succès, erreur, { timeout: 10000 })
    // succès → coords.value = { lat: pos.coords.latitude, lng: pos.coords.longitude }
    // erreur → code 1 : « Localisation refusée », sinon « Position indisponible »
    // pas de navigator.geolocation → « Votre navigateur ne gère pas la géolocalisation »
  }

  return { coords, geoError, isLocating, locate }
}

// Distance à vol d'oiseau en km (formule de Haversine, rayon de la Terre 6371 km)
export function distanceKm(a, b) {
  /* … */
}
```

`BreweryCard` accepte déjà une prop `distance` (en km) et l'affiche en haut à droite avec une flèche :
il suffira de passer `:distance="distanceKm(coords, { lat: +b.latitude, lng: +b.longitude })"`
depuis `BreweryList`. Attention : l'API renvoie `latitude`/`longitude` en **chaînes**, souvent `null`.

La géolocalisation ne fonctionne qu'en `https` ou sur `localhost` : `npm run dev` convient.

### Tâche #21 · Leaflet + BreweryMap · branche `feat/us-2.3-brewery-map`

1. `npm install leaflet` (committer `package.json` **et** `package-lock.json`).
2. Créer `src/components/BreweryMap.vue` :
   - `import L from 'leaflet'` et `import 'leaflet/dist/leaflet.css'`
   - props : `breweries` (Array), `userLocation` (Object `{ lat, lng }` ou `null`)
   - `onMounted` : `L.map(el).setView([46.8, 8.2], 7)` (Suisse) + tuiles
     `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` avec l'attribution OpenStreetMap
   - un `L.layerGroup()` pour les marqueurs, vidé puis rempli dans un
     `watch(() => props.breweries, …, { immediate: true })` ; ignorer les brasseries sans coordonnées
   - infobulle : nom, type, `<a href="/brewery/${id}">Voir la fiche</a>`
   - marqueur utilisateur bleu (`L.circleMarker`) + `map.setView` quand `userLocation` change
   - `onBeforeUnmount` : `map.remove()`
   - piège connu : avec Vite, les icônes par défaut de Leaflet ne s'affichent pas ; utiliser
     `L.circleMarker` pour tout, ou importer les images `leaflet/dist/images/marker-icon.png`
3. Dans `HomeView.vue`, mettre la liste et la carte côte à côte (grille 2 colonnes : liste à gauche,
   carte collante à droite, hauteur ~ 600 px ; carte sous la liste en dessous de 1024 px), et
   ajouter le bouton « Ma position actuelle » à côté de la `SearchBar`. Au succès de `locate()` :
   `getBreweries({ by_dist: `${lat},${lng}`, per_page: 12 })`. Afficher `geoError` en petit texte
   gris sous le bouton (pas d'`ErrorBanner`, le test demande un message discret).

---

## Avant d'ouvrir la PR

- [ ] `npm run lint` et `npm run build` passent
- [ ] testé dans le navigateur avec de vraies données (et le cas d'erreur / de donnée manquante)
- [ ] focus clavier visible sur les nouveaux liens et boutons
- [ ] PR vers `dev`, modèle rempli (numéro de tâche iceScrum, comment tester)
- [ ] dans iceScrum : tâche en _Done_ après la fusion, tests d'acceptation vérifiés cochés
