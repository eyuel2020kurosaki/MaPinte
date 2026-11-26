<!-- eslint-disable vue/multi-word-component-names -- nom imposé par le planning (Pagination.vue) -->
<script setup>
const props = defineProps({
  /** Numéro de la page affichée (commence à 1) */
  currentPage: {
    type: Number,
    required: true,
  },
  /** true s'il existe une page après la page courante */
  hasNextPage: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change-page'])

function goTo(page) {
  if (page < 1 || page === props.currentPage) return
  emit('change-page', page)
  // Remonte en haut de page pour afficher le début des nouveaux résultats
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <nav class="pagination" aria-label="Pagination">
    <button
      type="button"
      class="pagination__btn"
      :disabled="currentPage <= 1"
      @click="goTo(currentPage - 1)"
    >
      [ Précédent ]
    </button>

    <span class="pagination__current" aria-current="page">Page {{ currentPage }}</span>

    <button
      type="button"
      class="pagination__btn"
      :disabled="!hasNextPage"
      @click="goTo(currentPage + 1)"
    >
      [ Suivant ]
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 32px 0;
}

.pagination__btn {
  padding: 6px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 2px;
  background: #f1f5f9;
  color: #0f172a;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
}

.pagination__btn:hover:not(:disabled) {
  background: #e2e8f0;
}

.pagination__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination__btn:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 2px;
}

.pagination__current {
  padding: 6px 12px;
  border-radius: 2px;
  background: #0f172a;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}
</style>
