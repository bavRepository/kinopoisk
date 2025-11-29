import type { z } from 'zod'
import type { moviesApi } from '@/features/movies/api/moviesApi'
import {
  movieSchema,
  movieDomainSchema,
  moviesListResponseSchema,
  movieDetailsSchema,
  movieDetailsWithFavoriteSchema,
  castMemberSchema,
  castMemberWithFavoriteSchema,
  castResponseWithFavoriteSchema,
  similarMovieWithFavoriteSchema,
  similarListResponseSchema,
} from '../model/movies.shemas.ts'

export type MoviesApiEndpointName = keyof typeof moviesApi.endpoints

export type Movie = z.infer<typeof movieSchema>
export type MovieDomainType = z.infer<typeof movieDomainSchema>
export type MovieDetails = z.infer<typeof movieDetailsSchema>
export type MovieDetailsWithFavorite = z.infer<typeof movieDetailsWithFavoriteSchema>

export type CastMember = z.infer<typeof castMemberSchema>
export type CastMemberWithFavorite = z.infer<typeof castMemberWithFavoriteSchema>
export type SimilarMovieWithFavoriteType = z.infer<typeof similarMovieWithFavoriteSchema>

export type BaseMoviesResponse<T = MovieDomainType[]> = {
  results: T
  dates?: {
    maximum: string
    minimum: string
  }
  page?: number
  total_pages?: number
  total_results?: number
}

export type CastResponse<T = CastMember[]> = {
  id: number
  cast: T
}

export type MoviesListResponse = z.infer<typeof moviesListResponseSchema>

export type CastResponseWithFavorite = z.infer<typeof castResponseWithFavoriteSchema>

export type SimilarListResponse = z.infer<typeof similarListResponseSchema>

export type FetchMoviesArgs = {
  query?: string
  page?: number
  id?: number
}

export type ModifiedMovieType = {
  id: MovieDomainType['id'] | undefined
  title: MovieDomainType['title'] | undefined
  poster_path: MovieDomainType['poster_path'] | undefined
  vote_average: MovieDomainType['vote_average'] | undefined
  favorite?: boolean | undefined
}
