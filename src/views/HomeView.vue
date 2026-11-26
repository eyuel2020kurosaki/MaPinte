<script setup>
import { onMounted, ref } from 'vue'
import Loader from '@/components/Loader.vue'
import ErrorBanner from '@/components/ErrorBanner.vue'
import BreweryList from '@/components/BreweryList.vue'
import { getBreweries } from '@/services/breweryService.js'

const breweries = ref([])
const isLoading = ref(false)
const error = ref(null)

async function loadBreweries() {
  isLoading.value = true
  error.value = null
  try {
    breweries.value = await getBreweries({ per_page: 12 })
  } catch {
    error.value = 'Impossible de charger les brasseries. Vérifiez votre connexion.'
    breweries.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(loadBreweries)
</script>

<template>
  <main class="home">
    <h1>Bienvenue sur Mapinte</h1>

    <section class="catalogue" :aria-busy="isLoading">
      <Loader v-if="isLoading" />
      <ErrorBanner v-else-if="error" :message="error" @retry="loadBreweries" />

      <template v-else>
        <p class="catalogue__count" role="status">
          <strong>{{ breweries.length }}</strong>
          {{ breweries.length > 1 ? 'brasseries trouvées' : 'brasserie trouvée' }}
        </p>
        <BreweryList :breweries="breweries" />
      </template>
    </section>
  </main>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}

.catalogue {
  margin-top: 24px;
}

/* Maquette : « 245 brasseries trouvées », nombre en gras, police monospace */
.catalogue__count {
  margin: 0 0 20px;
  color: #0b1527;
  font-family: ui-monospace, 'SFMono-Regular', 'JetBrains Mono', Menlo, Consolas, monospace;
  font-size: 0.8125rem;
}

.catalogue__count strong {
  font-weight: 700;
}
</style>
