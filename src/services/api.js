import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.openbrewerydb.org/v1/breweries',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api