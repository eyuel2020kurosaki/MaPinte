<!-- eslint-disable vue/multi-word-component-names -- nom imposé par le planning (Navbar.vue) -->
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <nav class="navbar__inner" aria-label="Navigation principale">
      <RouterLink to="/" class="navbar__brand">MAPINTE</RouterLink>

      <ul class="navbar__links">
        <li>
          <RouterLink to="/" class="navbar__link" exact-active-class="is-active">
            Catalogue
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="navbar__link" active-class="is-active">
            À propos
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #ffffff;
  border-bottom: 1px solid rgb(0 0 0 / 0.08);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 56px;
  margin: 0 auto;
  padding: 0 16px;
}

.navbar__brand {
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.08em;
  color: #0f172a;
  text-decoration: none;
}

.navbar__links {
  display: flex;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navbar__link {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 2px;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
}

.navbar__link:hover {
  background: #f1f5f9;
}

.navbar__link.is-active {
  background: #0f172a;
  color: #ffffff;
}

.navbar__link:focus-visible,
.navbar__brand:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 2px;
}
</style>
