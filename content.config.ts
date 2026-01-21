import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const baseSchema = (config = {}) =>
  z.object({
    ...config,
    css: z.array(z.string()),
    cssHover: z
      .object({
        defaultBackgroundColor: z.string(),
        hoverBackgroundColor: z.string()
      })
      .optional(),
    source: z.string(),
    comment: z.string(),
    dateModified: z.string()
  })

export default defineContentConfig({
  collections: {
    buttons: defineCollection({
      type: 'data',
      source: 'buttons/**.json',
      schema: baseSchema()
    }),
    shadows: defineCollection({
      type: 'data',
      source: 'shadows/**.json',
      schema: baseSchema()
    })
  }
})
