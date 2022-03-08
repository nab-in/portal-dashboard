import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

export const API = publicRuntimeConfig.API_URL
export const FRONT = publicRuntimeConfig.FORNT_URL
export const BACKEND = publicRuntimeConfig.BACKEND_URL
