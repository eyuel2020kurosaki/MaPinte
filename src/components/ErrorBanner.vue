<script setup>
defineProps({
  message: {
    type: String,
    default: 'Une erreur est survenue. Réessayez plus tard.',
  },
  // Affiche le bouton « Réessayer » qui émet l'événement `retry`
  retryable: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['retry'])
</script>

<template>
  <div class="error-banner" role="alert">
    <p class="error-banner__message">
      <span aria-hidden="true">⚠️</span>
      {{ message }}
    </p>
    <button v-if="retryable" type="button" class="error-banner__retry" @click="$emit('retry')">
      Réessayer
    </button>
  </div>
</template>

<style scoped>
.error-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 20px;
  border: 1px solid #f5c2c7;
  border-radius: 12px;
  background: #fdecee;
  color: #842029;
}

.error-banner__message {
  margin: 0;
}

.error-banner__retry {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: #842029;
  color: #fff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.error-banner__retry:hover {
  background: #6a1a21;
}

.error-banner__retry:focus-visible {
  outline: 3px solid #b8860b;
  outline-offset: 2px;
}
</style>
