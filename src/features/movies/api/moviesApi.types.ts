import type { z } from 'zod'

import {
  castMemberSchema,
  castMemberWithFavoriteSchema,
  genresResponseSchema,
  movieDetailsSchema,
  movieDetailsWithFavoriteSchema,
  movieDomainSchema,
  movieSchema,
  similarMovieWithFavoriteSchema,
} from '../model/movies.shemas.ts'

export type Movie = z.infer<typeof movieSchema>
export type MovieDomainType = z.infer<typeof movieDomainSchema>
export type MovieDetails = z.infer<typeof movieDetailsSchema>
export type MovieDetailsWithFavorite = z.infer<typeof movieDetailsWithFavoriteSchema>

export type CastMember = z.infer<typeof castMemberSchema>
export type CastMemberWithFavorite = z.infer<typeof castMemberWithFavoriteSchema>
export type SimilarMovieWithFavoriteType = z.infer<typeof similarMovieWithFavoriteSchema>

export type genresType = z.infer<typeof genresResponseSchema>

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

export type FetchMoviesArgs = {
  query?: string
  page?: number
  id?: number
}

type SortByType =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'release.desc'
  | 'release.asc'
  | 'release_date.desc'
  | 'release_date.asc'
  | 'vote_average.desc'
  | 'vote_average.asc'
  | 'original_title.desc'
  | 'original_title.asc'

export type DiscoverMoviesArgs = {
  page?: number
  sort_by?: SortByType
  'vote_average.gte'?: number //
  'vote_average.lte'?: number //
  with_genres?: string
}

export type ModifiedMovieType = {
  id: MovieDomainType['id'] | undefined
  title: MovieDomainType['title'] | undefined
  poster_path: MovieDomainType['poster_path'] | undefined
  vote_average: MovieDomainType['vote_average'] | undefined
  favorite?: boolean | undefined
}
