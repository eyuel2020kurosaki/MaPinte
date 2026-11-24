<script setup>
import { onBeforeUnmount } from 'vue'

// Modèle réactif partagé avec le composant parent via v-model
const searchQuery = defineModel({ type: String, default: '' })

// Événement émis vers le parent une fois le délai de debounce écoulé
const emit = defineEmits(['search'])

// Référence du timer pour annuler l'envoi précédent si l'utilisateur continue de taper
let debounceTimer = null

// Déclenche la recherche après 350 ms d'inactivité pour limiter les appels réseau
function handleInput() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search', searchQuery.value.trim())
  }, 350)
}

// Vide la saisie, annule le timer en cours et relance immédiatement une recherche vide
function clearSearch() {
  clearTimeout(debounceTimer)
  searchQuery.value = ''
  emit('search', '')
}

// Nettoie le timer si le composant est détruit avant la fin des 350 ms
onBeforeUnmount(() => {
  clearTimeout(debounceTimer)
})
</script>

<template>
  <div class="search-bar">
    <!-- Icône loupe décorative -->
    <svg
      class="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>

    <!-- Champ de recherche lié au v-model -->
    <input
      v-model="searchQuery"
      type="text"
      class="search-input"
      placeholder="Rechercher une brasserie..."
      aria-label="Rechercher une brasserie"
      @input="handleInput"
    />

    <!-- Bouton × affiché uniquement lorsqu'une saisie est présente -->
    <button
      v-if="searchQuery"
      type="button"
      class="clear-btn"
      aria-label="Effacer la recherche"
      @click="clearSearch"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  height: 44px;
  padding: 0 0.875rem;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

/* Mise en évidence de la barre quand le champ a le focus */
.search-bar:focus-within {
  background-color: #ffffff;
  border-color: #94a3b8;
  box-shadow: 0 0 0 3px rgba(148, 163, 184, 0.15);
}

.search-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: #64748b;
}

.search-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.9375rem;
  color: #0f172a;
}

.search-input::placeholder {
  color: #64748b;
}

.clear-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: #64748b;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.clear-btn:hover {
  background-color: #e2e8f0;
  color: #0f172a;
}

.clear-btn:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 2px;
}
</style>
