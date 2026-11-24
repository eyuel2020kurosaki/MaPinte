import api from './api.js'

/**
 * Récupère une liste paginée/filtrée de brasseries depuis l'API Open Brewery DB.
 * @param {Object} [params={}] - Paramètres de requête (page, per_page, by_type, by_country, by_city, by_dist, etc.)
 * @returns {Promise<Array>} Liste des brasseries
 */
export async function getBreweries(params = {}) {
  const response = await api.get('/', { params })
  return response.data
}

/**
 * Recherche des brasseries par mot-clé.
 * @param {string} query - Terme de recherche
 * @param {Object} [params={}] - Paramètres de requête complémentaires (page, per_page, etc.)
 * @returns {Promise<Array>} Liste des brasseries correspondantes
 */
export async function searchBreweries(query, params = {}) {
  const response = await api.get('/search', {
    params: { ...params, query },
  })
  return response.data
}
