<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getBreweryById } from '@/services/api'

const props = defineProps({
  id: { type: String, required: true },
})

const brewery = ref(null)
const loading = ref(false)
const error = ref('')

async function load(id) {
  loading.value = true
  error.value = ''
  brewery.value = null
  try {
    brewery.value = await getBreweryById(id)
  } catch (err) {
    error.value =
      err.response?.status === 404
        ? 'Cette brasserie est introuvable.'
        : 'Impossible de charger la brasserie. Réessayez plus tard.'
  } finally {
    loading.value = false
  }
}

// Recharge si l'id change alors que la page reste affichée (ex. /brewery/a -> /brewery/b)
watch(() => props.id, load, { immediate: true })
</script>

<template>
  <section class="container detail">
    <RouterLink to="/" class="detail__back">&larr; Retour à l'accueil</RouterLink>

    <p v-if="loading" aria-live="polite">Chargement…</p>
    <p v-else-if="error" class="detail__error" role="alert">{{ error }}</p>

    <article v-else-if="brewery" class="detail__card">
      <h1>{{ brewery.name }}</h1>
      <p class="detail__type">{{ brewery.brewery_type }}</p>
      <ul class="detail__info">
        <li v-if="brewery.street">{{ brewery.street }}</li>
        <li>
          {{
            [[brewery.postal_code, brewery.city].filter(Boolean).join(' '), brewery.state_province]
              .filter(Boolean)
              .join(', ')
          }}
        </li>
        <li>{{ brewery.country }}</li>
        <li v-if="brewery.phone">Tél. : {{ brewery.phone }}</li>
        <li v-if="brewery.website_url">
          <a :href="brewery.website_url" target="_blank" rel="noopener noreferrer">Site web</a>
        </li>
      </ul>
    </article>
  </section>
</template>

<style scoped>
.detail {
  padding-block: 32px 48px;
}

.detail__back {
  display: inline-block;
  margin-bottom: 24px;
  text-decoration: none;
  font-weight: 500;
}

.detail__card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 24px;
}

.detail__type {
  display: inline-block;
  margin: 0 0 16px;
  padding: 2px 12px;
  border-radius: 999px;
  background: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.detail__info {
  margin: 0;
  padding: 0;
  list-style: none;
}

.detail__error {
  color: #b3261e;
}
</style>
