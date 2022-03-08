const withPWA = require("next-pwa")

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  publicRuntimeConfig: {
    API_URL: "http://localhost:5000/api",
    FRONT_URL: "http://localhost:3000",
    BACKEND_URL: "http://localhost:5000",
  },
})

// copy paste to next.config.js
// change port to the backend port
