<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Objet brasserie tel que renvoyé par l'API Open Brewery DB
  brewery: {
    type: Object,
    required: true,
  },
  // Distance en km depuis la position de l'utilisateur (optionnelle, affichée en haut à droite)
  distance: {
    type: Number,
    default: null,
  },
})

// Famille de couleur du badge selon le type de brasserie
const BADGE_TONES = {
  micro: 'amber',
  nano: 'amber',
  brewpub: 'blue',
  bar: 'blue',
  taproom: 'blue',
  beergarden: 'blue',
  regional: 'indigo',
  large: 'indigo',
  closed: 'grey',
}

const typeLabel = computed(() => props.brewery.brewery_type || 'inconnu')
const badgeTone = computed(() => BADGE_TONES[props.brewery.brewery_type] || 'neutral')

// « Ville, Pays » en ignorant les champs vides
const location = computed(() =>
  [props.brewery.city, props.brewery.country].filter(Boolean).join(', '),
)

// L'API ne fournit pas de description : on affiche l'adresse postale à la place
const address = computed(() => {
  const street = props.brewery.address_1 || props.brewery.street
  const postal = [props.brewery.postal_code, props.brewery.city].filter(Boolean).join(' ')
  return [street, postal].filter(Boolean).join(', ')
})

const formattedDistance = computed(() =>
  props.distance === null ? '' : `${props.distance.toFixed(1)} km`,
)
</script>

<template>
  <article class="brewery-card">
    <header class="brewery-card__top">
      <span class="brewery-card__badge" :class="`brewery-card__badge--${badgeTone}`">
        {{ typeLabel }}
      </span>
      <span v-if="formattedDistance" class="brewery-card__distance">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 11 22 2l-9 19-2-8-8-2Z" />
        </svg>
        {{ formattedDistance }}
      </span>
    </header>

    <!-- Visuel décoratif : l'API ne fournit pas de photo -->
    <div
      class="brewery-card__visual"
      :class="`brewery-card__visual--${badgeTone}`"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24">
        <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
        <path d="M9 12v6" />
        <path d="M13 12v6" />
        <path
          d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"
        />
        <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
      </svg>
    </div>

    <div class="brewery-card__body">
      <h3 class="brewery-card__name">{{ brewery.name }}</h3>

      <p v-if="location" class="brewery-card__location">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {{ location }}
      </p>

      <p v-if="address" class="brewery-card__address">{{ address }}</p>
    </div>

    <RouterLink
      :to="`/brewery/${brewery.id}`"
      class="brewery-card__cta"
      :aria-label="`Voir la fiche de ${brewery.name}`"
    >
      Voir
    </RouterLink>
  </article>
</template>

<style scoped>
.brewery-card {
  --card-ink: #0b1527;
  --card-muted: #475569;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --card-mono: ui-monospace, 'SFMono-Regular', 'JetBrains Mono', Menlo, Consolas, monospace;

  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  box-shadow:
    0 1px 2px rgba(15, 23, 42, 0.06),
    0 4px 16px rgba(15, 23, 42, 0.04);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.brewery-card:hover {
  transform: translateY(-2px);
  box-shadow:
    0 2px 4px rgba(15, 23, 42, 0.08),
    0 12px 28px rgba(15, 23, 42, 0.08);
}

.brewery-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.brewery-card__badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--card-mono);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* Couleurs choisies pour garder un contraste ≥ 4.5:1 (WCAG AA) */
.brewery-card__badge--amber {
  background: #fde3cc;
  color: #7c3a0b;
}
.brewery-card__badge--blue {
  background: #dbe7fb;
  color: #1e3a8a;
}
.brewery-card__badge--indigo {
  background: #e0e3fa;
  color: #312e81;
}
.brewery-card__badge--grey {
  background: #e5e7eb;
  color: #374151;
}
.brewery-card__badge--neutral {
  background: #eef2f7;
  color: var(--card-ink);
}

.brewery-card__distance {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--card-mono);
  font-size: 0.8125rem;
  color: var(--card-muted);
}

.brewery-card__distance svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: #b8860b;
  stroke-width: 2;
  stroke-linejoin: round;
}

.brewery-card__visual {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
}

.brewery-card__visual svg {
  width: 56px;
  height: 56px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.8;
}

.brewery-card__visual--amber {
  background: linear-gradient(135deg, #fdf1e4, #f6d3ad);
  color: #9a4a12;
}
.brewery-card__visual--blue {
  background: linear-gradient(135deg, #eef4fd, #c9dbf7);
  color: #1e3a8a;
}
.brewery-card__visual--indigo {
  background: linear-gradient(135deg, #f0f1fd, #cdd2f5);
  color: #312e81;
}
.brewery-card__visual--grey,
.brewery-card__visual--neutral {
  background: linear-gradient(135deg, #f4f6f9, #dde3eb);
  color: #475569;
}

.brewery-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
}

.brewery-card__name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--card-ink);
}

.brewery-card__location {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  color: var(--card-muted);
}

.brewery-card__location svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}

.brewery-card__address {
  margin: 4px 0 0;
  font-size: 0.875rem;
  line-height: 1.45;
  color: var(--card-muted);
}

.brewery-card__cta {
  align-self: flex-start;
  margin-top: 4px;
  padding: 8px 20px;
  border-radius: 4px;
  background: var(--card-ink);
  color: #ffffff;
  font-family: var(--card-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.brewery-card__cta:hover {
  background: #1e2a44;
}

.brewery-card__cta:focus-visible {
  outline: 3px solid #b8860b;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .brewery-card,
  .brewery-card:hover {
    transform: none;
    transition: none;
  }
}
</style>
