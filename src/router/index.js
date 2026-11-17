import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/** Événement émis par App.vue quand la nouvelle page commence à entrer (fin de la transition de sortie). */
export const PAGE_ENTER_EVENT = 'mapinte:page-enter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Page d'accueil chargée immédiatement (première page vue)
      component: HomeView,
      meta: { title: 'Catalogue' },
    },
    {
      path: '/brewery/:id',
      name: 'brewery-detail',
      // Chargement différé : le code de la page n'est téléchargé qu'à la première visite
      component: () => import('../views/BreweryDetailView.vue'),
      // Le paramètre :id est transmis au composant comme prop
      props: true,
      // Pas de titre fixe : la page affiche le nom de la brasserie une fois chargée
    },
    {
      path: '/a-propos',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'À propos' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Page introuvable' },
    },
  ],
  // Remonte en haut de page (ou restaure la position avec précédent/suivant)
  // seulement une fois l'ancienne page sortie, sinon la position est appliquée à la mauvaise page.
  scrollBehavior(to, from, savedPosition) {
    const position = savedPosition ?? { top: 0 }
    // Même page avec un autre paramètre (/brewery/a -> /brewery/b) : pas de transition
    if (!from.matched.length || to.matched[0] === from.matched[0]) return position
    return new Promise((resolve) => {
      const done = () => resolve(position)
      window.addEventListener(PAGE_ENTER_EVENT, done, { once: true })
      // Filet de sécurité si aucune transition ne se produit
      setTimeout(done, 400)
    })
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · MaPinte` : 'MaPinte'
})

export default router
