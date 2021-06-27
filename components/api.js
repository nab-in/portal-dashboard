import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

export const API = publicRuntimeConfig.API_URL
