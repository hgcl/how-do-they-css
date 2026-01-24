import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const baseSchema = (config = {}) =>
  z.object({
    ...config,
    type: z.string().optional(),
    css: z.array(z.string()),
    interactiveCss: z
      .object({
        hover: z.record(z.string()).optional(),
        default: z.record(z.string())
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
