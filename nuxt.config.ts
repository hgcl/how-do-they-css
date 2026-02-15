import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/a11y', '@nuxt/content', '@nuxt/fonts'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        // Cloudflare analytics
        {
          defer: true,
          src: 'https://static.cloudflareinsights.com/beacon.min.js',
          'data-cf-beacon': '{"token": "4126f489474b5ea2bdfff3d1f71406"}'
        }
      ]
    }
  },
  css: ['~/assets/globals.css'],
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'cloudflare'
  },
  a11y: {
    // Enable/disable the module (default: true in dev mode)
    enabled: true,
    // Auto-highlight all violations when detected
    defaultHighlight: true,
    // Log violations to browser console
    logIssues: true
  },
  eslint: {
    config: {
      // Format with ESLint
      stylistic: true
    }
  },
  fonts: {
    families: [
      { name: 'Inter', weights: [400, 500, 600, 800] },
      { name: 'Zalando Sans', weights: [400, 600] },
      { name: 'Zalando Sans Expanded', weights: [600] }
    ]
  }
})
