import * as z from 'zod'

export const searchSchema = z.object({
  query: z.string().min(1, 'Type a movie name for searching'),
})
