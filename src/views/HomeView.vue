<script setup>
import { computed, onMounted, ref } from 'vue'
import Loader from '@/components/Loader.vue'
import ErrorBanner from '@/components/ErrorBanner.vue'
import SearchBar from '@/components/SearchBar.vue'
import BreweryList from '@/components/BreweryList.vue'
import { getBreweries, searchBreweries } from '@/services/breweryService.js'

const PER_PAGE = 12

const breweries = ref([])
const isLoading = ref(false)
const error = ref(null)

// Texte saisi dans la SearchBar (v-model) et dernier terme réellement envoyé à l'API
const searchQuery = ref('')
const activeQuery = ref('')

// Page courante, remise à 1 à chaque nouvelle recherche (utilisée par Pagination.vue, US-1.3)
const currentPage = ref(1)

// Numéro de la dernière requête : ignore les réponses arrivées dans le désordre
let lastRequestId = 0

async function loadBreweries() {
  const requestId = ++lastRequestId
  isLoading.value = true
  error.value = null
  try {
    const query = activeQuery.value
    const params = { page: currentPage.value, per_page: PER_PAGE }
    const results = query ? await searchBreweries(query, params) : await getBreweries(params)
    if (requestId === lastRequestId) breweries.value = results
  } catch {
    if (requestId !== lastRequestId) return
    error.value = 'Impossible de charger les brasseries. Vérifiez votre connexion.'
    breweries.value = []
  } finally {
    if (requestId === lastRequestId) isLoading.value = false
  }
}

// Appelé par la SearchBar après le debounce (ou immédiatement avec '' via le bouton ×)
function onSearch(query) {
  activeQuery.value = query
  currentPage.value = 1
  loadBreweries()
}

function resetSearch() {
  searchQuery.value = ''
  onSearch('')
}

// Aucun résultat après un chargement réussi
const isEmpty = computed(() => !isLoading.value && !error.value && breweries.value.length === 0)

onMounted(loadBreweries)
</script>

<template>
  <main class="home">
    <h1>Bienvenue sur Mapinte</h1>

    <SearchBar v-model="searchQuery" class="home__search" @search="onSearch" />

    <section class="catalogue" :aria-busy="isLoading">
      <Loader v-if="isLoading" />
      <ErrorBanner v-else-if="error" :message="error" @retry="loadBreweries" />

      <div v-else-if="isEmpty" class="empty-state" role="status">
        <p class="empty-state__title">
          {{
            activeQuery
              ? 'Aucune brasserie trouvée pour cette recherche'
              : 'Aucune brasserie à afficher'
          }}
        </p>
        <p v-if="activeQuery" class="empty-state__hint">
          « {{ activeQuery }} » ne correspond à aucune brasserie. Vérifiez l'orthographe ou essayez
          un autre nom, une ville…
        </p>
        <button v-if="activeQuery" type="button" class="empty-state__reset" @click="resetSearch">
          Effacer la recherche
        </button>
      </div>

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

.home__search {
  margin-top: 16px;
  max-width: 480px;
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 16px;
  text-align: center;
}

.empty-state__title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
}

.empty-state__hint {
  margin: 0;
  color: #64748b;
}

.empty-state__reset {
  margin-top: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #0f172a;
  color: #fff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.empty-state__reset:hover {
  background: #1e293b;
}

.empty-state__reset:focus-visible {
  outline: 3px solid #b8860b;
  outline-offset: 2px;
}
</style>
