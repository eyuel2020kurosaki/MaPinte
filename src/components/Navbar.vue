<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <nav class="container navbar__inner" aria-label="Navigation principale">
      <RouterLink to="/" class="navbar__logo" aria-label="MaPinte - retour à l'accueil">
        <svg
          class="navbar__icon"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M6 9h16v17a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V9z" fill="#e8a33d" />
          <path
            d="M5 8.5C5 5.5 7.5 4 10 4.5 11 3 13.5 2.5 15 3.5 16.5 2.5 19.5 3 20.5 5 23 5 24 7 23 8.5 22 10 6 10 5 8.5z"
            fill="#fff8ec"
          />
          <path
            d="M22 12h3a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-3"
            fill="none"
            stroke="#e8a33d"
            stroke-width="2.5"
          />
        </svg>
        <span>Ma<strong>Pinte</strong></span>
      </RouterLink>

      <ul class="navbar__links">
        <li><RouterLink to="/">Accueil</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--color-dark);
  color: var(--color-bg);
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.15);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64px;
  gap: 16px;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem;
  color: var(--color-bg);
  text-decoration: none;
}

.navbar__logo strong {
  color: var(--color-primary);
}

.navbar__icon {
  flex-shrink: 0;
}

.navbar__links {
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navbar__links a {
  color: var(--color-bg);
  text-decoration: none;
  font-weight: 500;
  padding-block: 4px;
  border-bottom: 2px solid transparent;
}

.navbar__links a:hover,
.navbar__links a.router-link-exact-active {
  border-bottom-color: var(--color-primary);
}
</style>
