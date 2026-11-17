<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="container not-found">
    <h1>Page introuvable</h1>
    <p>Cette page n'existe pas ou a été déplacée.</p>
    <RouterLink to="/" class="btn">Retour à l'accueil</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  padding-block: 64px;
  text-align: center;
}
</style>
