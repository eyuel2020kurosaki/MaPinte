<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** Objet brasserie tel que renvoyé par Open Brewery DB */
  brewery: {
    type: Object,
    required: true,
  },
})

/** Libellés français des types de brasserie */
const TYPE_LABELS = {
  micro: 'Micro',
  nano: 'Nanobrasserie',
  brewpub: 'Brewpub',
  regional: 'Regional',
  large: 'Grande brasserie',
  bar: 'Bar',
  contract: 'Sous contrat',
  proprietor: 'Propriétaire',
  planning: 'En projet',
  closed: 'Fermée',
}

const type = computed(() => props.brewery.brewery_type || 'unknown')
const typeLabel = computed(() => TYPE_LABELS[type.value] ?? 'Autre')
const location = computed(() =>
  [props.brewery.city, props.brewery.country].filter(Boolean).join(', '),
)
</script>

<template>
  <article class="card">
    <span class="badge" :class="`badge--${type}`">{{ typeLabel }}</span>

    <h3 class="card__name">{{ brewery.name }}</h3>

    <p v-if="location" class="card__location">
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
        <circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="2" />
      </svg>
      {{ location }}
    </p>

    <RouterLink
      :to="{ name: 'brewery-detail', params: { id: brewery.id } }"
      class="card__btn"
      :aria-label="`Voir la fiche de ${brewery.name}`"
    >
      Voir
    </RouterLink>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 16px;
  border-radius: 4px;
  background: var(--surface);
  border: 1px solid var(--separator);
  transition: box-shadow 0.2s var(--ease);
}

.card:hover {
  box-shadow: 0 4px 16px rgb(0 0 0 / 0.08);
}

.card__name {
  margin-top: 4px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
}

.card__location {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-secondary);
}

.card__location svg {
  flex-shrink: 0;
}

/* Bouton sombre et compact */
.card__btn {
  margin-top: auto;
  padding: 6px 14px;
  border-radius: 2px;
  background: #0f172a;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card__btn:hover {
  background: #1e293b;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  .card__btn {
    background: #f5f5f7;
    color: #0f172a;
  }

  .card__btn:hover {
    background: #ffffff;
  }
}

/* Badge de type : étiquette carrée en majuscules */
.badge {
  padding: 2px 6px;
  border-radius: 2px;
  font-family: ui-monospace, 'Cascadia Mono', Consolas, monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: var(--badge-bg, var(--bg-secondary));
  color: var(--badge-fg, var(--text-secondary));
}

.badge--micro {
  --badge-bg: #fdebc8;
  --badge-fg: #6b3a00;
}
.badge--nano {
  --badge-bg: #fbe3d6;
  --badge-fg: #7a2e0b;
}
.badge--brewpub {
  --badge-bg: #dce8f7;
  --badge-fg: #123e72;
}
.badge--regional {
  --badge-bg: #ddefd9;
  --badge-fg: #1e4d1a;
}
.badge--large {
  --badge-bg: #e7e0f5;
  --badge-fg: #3f2675;
}
.badge--closed {
  --badge-bg: #f1f1f2;
  --badge-fg: #55555a;
}
</style>
