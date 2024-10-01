export const isProduction = import.meta.env.MODE === 'production' //build no real
export const isProductionDev = import.meta.env.VITE_MODE === 'development' && import.meta.env.MODE === 'production' //build no beta
export const isDevelopment = import.meta.env.MODE === 'development' //desenvolvendo

export const API_BASE_URL = isProductionDev ? 'https://app.satc.edu.br/auth-desenv/public/api' : isDevelopment ? 'https://app.satc.edu.br/auth-desenv/public/api' : 'https://app.satc.edu.br/auth/public/api'
export const BASE_URL = isProductionDev ? '/acesso-unificado-dev/' : isDevelopment ? '/acesso-unificado-dev/' : '/acesso-unificado'