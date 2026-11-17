<script setup>
import { RouterLink } from 'vue-router'

const links = [
  { to: '/', label: 'Catalogue' },
  { to: '/a-propos', label: 'À propos' },
]
</script>

<template>
  <header class="navbar">
    <nav class="container navbar__inner" aria-label="Navigation principale">
      <RouterLink to="/" class="navbar__brand" aria-label="MaPinte, retour à l'accueil">
        <svg
          class="navbar__glass"
          viewBox="0 0 20 24"
          width="16"
          height="19"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M3 2h14l-1.6 18.2A2 2 0 0 1 13.4 22H6.6a2 2 0 0 1-2-1.8L3 2z"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
          <path d="M4.2 8h11.6l-1 12H5.2l-1-12z" fill="var(--accent)" />
        </svg>
        <span>MaPinte</span>
      </RouterLink>

      <ul class="navbar__links">
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="link.to" class="navbar__link">{{ link.label }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nav-bg);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--separator);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
}

.navbar__brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.navbar__brand:hover {
  text-decoration: none;
}

.navbar__links {
  display: flex;
  gap: 4px;
  /* Compense le padding du dernier lien : le texte s'aligne sur le bord du conteneur */
  margin: 0 -12px 0 0;
  padding: 0;
  list-style: none;
}

.navbar__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 12px;
  color: var(--text-secondary);
  font-size: 14px;
  letter-spacing: -0.01em;
  transition: color 0.2s var(--ease);
}

.navbar__link:hover {
  color: var(--text);
  text-decoration: none;
}

.navbar__link.router-link-exact-active {
  color: var(--text);
  font-weight: 500;
}

@supports not (backdrop-filter: blur(1px)) {
  .navbar {
    background: var(--bg);
  }
}
</style>
