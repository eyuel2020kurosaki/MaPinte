import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // Page d'accueil chargée immédiatement (première page vue)
      component: HomeView,
    },
    {
      path: '/brewery/:id',
      name: 'brewery-detail',
      // Chargement différé : le code de la page n'est téléchargé qu'à la première visite
      component: () => import('../views/BreweryDetailView.vue'),
      // Le paramètre :id est transmis au composant comme prop
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  // Remonte en haut de page à chaque navigation (garde la position avec précédent/suivant)
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

export default router
