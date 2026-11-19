import { defineStore } from 'pinia'
import api from '@/services/api'

export const useBreweryStore = defineStore('brewery', {
  state: () => ({
    breweries: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchBreweries(params = {}) {
      this.loading = true
      this.error = null

      try {
        const { data } = await api.get('', { params })
        this.breweries = data
      } catch (err) {
        this.error =
          err.message || 'Impossible de charger les brasseries. Vérifiez votre connexion.'
      } finally {
        this.loading = false
      }
    },
  },
})
