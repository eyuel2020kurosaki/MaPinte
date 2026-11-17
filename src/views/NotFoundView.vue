<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="container not-found">
    <p class="eyebrow">Erreur 404</p>
    <h1 class="headline">Cette page est introuvable.</h1>
    <p class="lead">Elle n'existe pas ou a été déplacée.</p>
    <div class="actions">
      <RouterLink to="/" class="btn">Retour au catalogue</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  padding-block: clamp(72px, 14vw, 140px);
  text-align: center;
}
</style>
