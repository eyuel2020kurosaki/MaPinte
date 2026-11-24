<!-- eslint-disable vue/multi-word-component-names -- nom imposé par le planning (Loader.vue) -->
<script setup>
defineProps({
  message: {
    type: String,
    default: 'Chargement des brasseries…',
  },
})
</script>

<template>
  <div class="loader" role="status" aria-live="polite">
    <span class="loader__spinner" aria-hidden="true"></span>
    <p class="loader__message">{{ message }}</p>
  </div>
</template>

<style scoped>
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 16px;
}

.loader__spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e5e5;
  border-top-color: #b8860b;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loader__message {
  margin: 0;
  color: #666;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader__spinner {
    animation-duration: 2s;
  }
}
</style>
