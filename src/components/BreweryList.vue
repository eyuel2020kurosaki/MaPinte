<script setup>
import BreweryCard from '@/components/BreweryCard.vue'

defineProps({
  // Brasseries à afficher, telles que renvoyées par l'API Open Brewery DB
  breweries: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <ul class="brewery-list" role="list">
    <li v-for="brewery in breweries" :key="brewery.id" class="brewery-list__item">
      <BreweryCard :brewery="brewery" />
    </li>
  </ul>
</template>

<style scoped>
/* Maquette : 2 colonnes de cartes (la carte Leaflet occupera la droite au Sprint 2), 1 colonne sur mobile */
.brewery-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.brewery-list__item {
  min-width: 0;
}

@media (max-width: 640px) {
  .brewery-list {
    grid-template-columns: 1fr;
  }
}
</style>
