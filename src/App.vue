<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { PAGE_ENTER_EVENT } from './router'

const main = ref(null)
let firstPage = true

// Signale au routeur que la nouvelle page entre : il peut appliquer le défilement
function onBeforeEnter() {
  window.dispatchEvent(new Event(PAGE_ENTER_EVENT))
}

// Après un changement de page, le focus clavier va au contenu principal
// (les lecteurs d'écran annoncent ainsi la nouvelle page). Pas au premier chargement.
function onAfterEnter() {
  if (firstPage) {
    firstPage = false
    return
  }
  main.value?.focus({ preventScroll: true })
}
</script>

<template>
  <div class="app">
    <a href="#contenu" class="skip-link">Aller au contenu</a>
    <Navbar />
    <main id="contenu" ref="main" class="app__main" tabindex="-1">
      <RouterView v-slot="{ Component }">
        <Transition
          name="page"
          mode="out-in"
          @before-enter="onBeforeEnter"
          @after-enter="onAfterEnter"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

.app__main {
  display: flex;
  flex-direction: column;
  flex: 1;
  outline: none;
}

/* La page affichée occupe toute la hauteur disponible (pas de bande vide avant le footer) */
.app__main > * {
  flex: 1;
}

.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  z-index: 200;
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  background: var(--text);
  color: var(--bg);
}

.skip-link:focus {
  top: 8px;
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.25s var(--ease),
    transform 0.25s var(--ease);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
}
</style>
