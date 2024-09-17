import axios from 'axios'
import { API_BASE_URL } from './url'


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'withCredentials': true
  }
})

export default api