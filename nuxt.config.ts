// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/a11y', '@nuxt/content', '@nuxt/fonts'],
  css: ['~/assets/globals.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  fonts: {
    families: [
      { name: 'Inter', weights: [400, 500, 600, 800] },
      { name: 'Zalando Sans', weights: [400, 600] },
      { name: 'Zalando Sans Expanded', weights: [600] }
    ]
  },
  eslint: {
    config: {
      // Format with ESLint
      stylistic: true
    }
  },
  a11y: {
    // Enable/disable the module (default: true in dev mode)
    enabled: true,
    // Auto-highlight all violations when detected
    defaultHighlight: true,
    // Log violations to browser console
    logIssues: true
  }
})
