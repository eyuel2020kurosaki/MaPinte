import axios from 'axios'

// Pas d'en-tête Content-Type : sur des requêtes GET il est inutile
// et force le navigateur à envoyer une requête CORS "preflight" en plus.
const api = axios.create({
  baseURL: 'https://api.openbrewerydb.org/v1/breweries',
  timeout: 10000,
})

/**
 * Récupère une brasserie par son identifiant.
 * @param {string} id
 * @param {import('axios').AxiosRequestConfig} [config] options axios (ex. { signal } pour annuler)
 */
export async function getBreweryById(id, config) {
  const { data } = await api.get(`/${encodeURIComponent(id)}`, config)
  return data
}

export default api
