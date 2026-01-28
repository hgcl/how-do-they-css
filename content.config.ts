import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

const baseSchema = (config = {}) =>
  z.object({
    ...config,
    source: z.string(),
    comment: z.string(),
    html: z.string(),
    css: z.array(
      z.object({
        selector: z.string(),
        parent: z.object({ selector: z.string(), direct: z.boolean() }).optional(),
        code: z.array(z.string())
      })
    ),
    dateModified: z.string()
  })

export default defineContentConfig({
  collections: {
    buttons: defineCollection({
      type: 'data',
      source: 'buttons/**.json',
      schema: baseSchema()
    }),
    loading: defineCollection({
      type: 'data',
      source: 'loading/**.json',
      schema: baseSchema()
    }),
    shadows: defineCollection({
      type: 'data',
      source: 'shadows/**.json',
      schema: baseSchema()
    })
  }
})
