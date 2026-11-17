<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { getBreweryById } from '@/services/api'

const props = defineProps({
  id: { type: String, required: true },
})

const TYPE_LABELS = {
  micro: 'Microbrasserie',
  nano: 'Nanobrasserie',
  regional: 'Brasserie régionale',
  brewpub: 'Brewpub',
  large: 'Grande brasserie',
  planning: 'En projet',
  bar: 'Bar',
  contract: 'Brasserie sous contrat',
  proprietor: 'Brasserie propriétaire',
  taproom: 'Taproom',
  beergarden: 'Biergarten',
  cidery: 'Cidrerie',
  closed: 'Fermée',
}

const brewery = ref(null)
const loading = ref(false)
const error = ref('')

// Charge la brasserie à chaque changement d'id. La requête précédente est annulée
// pour qu'une réponse tardive ne remplace jamais une brasserie plus récente.
watch(
  () => props.id,
  async (id, _oldId, onCleanup) => {
    const controller = new AbortController()
    onCleanup(() => controller.abort())

    loading.value = true
    error.value = ''
    brewery.value = null
    try {
      brewery.value = await getBreweryById(id, { signal: controller.signal })
    } catch (err) {
      if (axios.isCancel(err)) return
      error.value =
        err.response?.status === 404
          ? 'Cette brasserie n’existe pas ou n’est plus référencée.'
          : 'Impossible de charger la brasserie. Vérifiez votre connexion et réessayez.'
    }
    loading.value = false
  },
  { immediate: true },
)

watchEffect(() => {
  if (brewery.value) document.title = `${brewery.value.name} · MaPinte`
  else if (error.value) document.title = 'Brasserie introuvable · MaPinte'
})

const typeLabel = computed(() => {
  const type = brewery.value?.brewery_type
  if (!type) return ''
  return TYPE_LABELS[type] ?? type.charAt(0).toUpperCase() + type.slice(1)
})

const location = computed(() => {
  const b = brewery.value
  if (!b) return ''
  return [b.city, b.state_province, b.country].filter(Boolean).join(', ')
})

const address = computed(() => {
  const b = brewery.value
  if (!b) return ''
  return [b.street, [b.postal_code, b.city].filter(Boolean).join(' ')].filter(Boolean).join(', ')
})

const mapUrl = computed(() => {
  const b = brewery.value
  if (!b?.latitude || !b?.longitude) return ''
  return `https://www.openstreetmap.org/?mlat=${b.latitude}&mlon=${b.longitude}#map=16/${b.latitude}/${b.longitude}`
})

const websiteHost = computed(() => {
  try {
    return new URL(brewery.value?.website_url).hostname.replace(/^www\./, '')
  } catch {
    return brewery.value?.website_url ?? ''
  }
})

const status = computed(() => {
  if (loading.value) return 'Chargement de la brasserie…'
  if (brewery.value) return `${brewery.value.name} chargée.`
  return ''
})
</script>

<template>
  <section class="detail" :class="{ 'detail--plain': error }" :aria-busy="loading">
    <p class="visually-hidden" role="status">{{ status }}</p>

    <div v-if="error" class="container detail__error" role="alert">
      <p class="eyebrow">Brasserie</p>
      <h1 class="headline">Brasserie introuvable.</h1>
      <p class="lead">{{ error }}</p>
      <div class="actions">
        <RouterLink to="/" class="btn">Retour au catalogue</RouterLink>
      </div>
    </div>

    <div v-else class="container detail__inner">
      <RouterLink to="/" class="detail__back">Catalogue</RouterLink>

      <div v-if="loading" class="skeleton" aria-hidden="true">
        <div class="skeleton__line skeleton__line--short"></div>
        <div class="skeleton__line skeleton__line--title"></div>
        <div class="skeleton__line skeleton__line--short"></div>
        <div class="skeleton__card"></div>
      </div>

      <article v-else-if="brewery">
        <header class="detail__header">
          <p v-if="typeLabel" class="eyebrow">{{ typeLabel }}</p>
          <h1 class="headline">{{ brewery.name }}</h1>
          <p v-if="location" class="lead">{{ location }}</p>
        </header>

        <h2 class="detail__section-title">Informations</h2>
        <dl class="list">
          <div v-if="address" class="list__row">
            <dt>Adresse</dt>
            <dd>{{ address }}</dd>
          </div>
          <div v-if="brewery.country" class="list__row">
            <dt>Pays</dt>
            <dd>{{ brewery.country }}</dd>
          </div>
          <div v-if="brewery.phone" class="list__row">
            <dt>Téléphone</dt>
            <dd>
              <a :href="`tel:${brewery.phone.replace(/\s+/g, '')}`">{{ brewery.phone }}</a>
            </dd>
          </div>
          <div v-if="brewery.website_url" class="list__row">
            <dt>Site web</dt>
            <dd>
              <a :href="brewery.website_url" target="_blank" rel="noopener noreferrer"
                >{{ websiteHost }}<span class="visually-hidden"> (nouvel onglet)</span></a
              >
            </dd>
          </div>
        </dl>

        <div v-if="mapUrl" class="detail__actions">
          <a :href="mapUrl" class="btn btn--tinted" target="_blank" rel="noopener noreferrer"
            >Voir sur la carte<span class="visually-hidden"> (nouvel onglet)</span></a
          >
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.detail {
  --row-inset: 20px;
  background: var(--bg-secondary);
  padding-block: 24px 80px;
}

.detail--plain {
  background: var(--bg);
}

.detail__inner {
  max-width: 732px;
}

.detail__back {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 17px;
}

.detail__back::before {
  content: '\2039';
  margin-right: 6px;
  font-size: 22px;
  line-height: 1;
}

.detail__header {
  padding-block: 24px 40px;
}

.detail__section-title {
  margin: 0 0 8px var(--row-inset);
  color: var(--text-secondary);
  font-family: var(--font);
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0;
}

/* Liste groupée façon Réglages iOS */
.list {
  margin: 0;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.list__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  min-height: 52px;
  padding: 14px var(--row-inset);
}

.list__row + .list__row {
  border-top: 1px solid var(--separator);
}

.list dt {
  flex-shrink: 0;
  color: var(--text);
}

.list dd {
  margin: 0;
  color: var(--text-secondary);
  text-align: right;
  overflow-wrap: anywhere;
}

.detail__actions {
  margin-top: 24px;
}

.detail__error {
  padding-block: clamp(48px, 12vw, 116px);
  text-align: center;
}

/* Squelette de chargement */
.skeleton {
  padding-top: 24px;
}

.skeleton__line,
.skeleton__card {
  border-radius: var(--radius-sm);
  background: linear-gradient(
    90deg,
    var(--separator) 25%,
    var(--surface-raised) 50%,
    var(--separator) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}

.skeleton__line--title {
  width: 70%;
  height: 52px;
  margin: 12px 0 16px;
}

.skeleton__line--short {
  width: 30%;
  height: 20px;
}

.skeleton__card {
  height: 200px;
  margin-top: 40px;
  border-radius: var(--radius);
}

@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}

@media (max-width: 734px) {
  .list__row {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  .list dd {
    text-align: left;
  }
}
</style>
