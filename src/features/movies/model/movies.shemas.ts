import { z } from 'zod'

const datesSchema = z
  .object({
    maximum: z.string(),
    minimum: z.string(),
  })
  .optional()

const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

const productionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
})

const productionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
})

const spokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
})

export const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

export const movieDomainSchema = movieSchema.extend({ favorite: z.boolean().default(false) })

export const baseMoviesResponseSchema = <T extends z.ZodTypeAny>(resultSchema: T) =>
  z.object({
    results: resultSchema,
    dates: datesSchema,
    page: z.number().optional(),
    total_pages: z.number().optional(),
    total_results: z.number().optional(),
  })

export const moviesListResponseSchema = baseMoviesResponseSchema(z.array(movieDomainSchema))

export const movieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.null().optional(),
  budget: z.number(),
  genres: z.array(genreSchema),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(productionCompanySchema),
  production_countries: z.array(productionCountrySchema),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(spokenLanguageSchema),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

export const movieDetailsWithFavoriteSchema = movieDetailsSchema.extend({
  favorite: z.boolean().default(false),
})

export const castMemberSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string().nullable(),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
})

export const castMemberWithFavoriteSchema = castMemberSchema.extend({
  favorite: z.boolean().default(false),
})

export const castResponseSchema = <T extends z.ZodTypeAny>(castSchema: T) =>
  z.object({
    id: z.number(),
    cast: castSchema,
  })

export const castResponseWithFavoriteSchema = castResponseSchema(z.array(castMemberWithFavoriteSchema))

export const similarMovieWithFavoriteSchema = movieSchema.extend({
  favorite: z.boolean().default(false),
})

export const similarListResponseSchema = baseMoviesResponseSchema(z.array(similarMovieWithFavoriteSchema))

export const genresResponseSchema = z.object({
  genres: z.array(genreSchema),
})

export type Genre = z.infer<typeof genreSchema>
export type GenresResponse = z.infer<typeof genresResponseSchema>
