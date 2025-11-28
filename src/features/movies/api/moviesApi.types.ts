// Типы для данных фильма
import { moviesApi } from '@/features/movies/api/moviesApi.ts'
export type ApiEndpointName = keyof typeof moviesApi.endpoints

export type FetchMoviesArgs = {
  query?: string
  page?: number
  id?: number
}

export type Movie = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDomainType = Movie & { favorite: boolean }

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

// Single movie response

type Genre = {
  id: number
  name: string
}

type ProductionCompany = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

type ProductionCountry = {
  iso_3166_1: string
  name: string
}

type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}

export type MovieDetails = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetailsWithFavorite = MovieDetails & { favorite: boolean }

// cast movie response
export type CastMember = {
  adult: boolean
  gender: number // 1 — женский, 2 — мужской
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export type CastResponse<T = CastMember[]> = {
  id: number
  cast: T
}

export type CastMemberWithFavorite = CastMember & { favorite: boolean }

// response similar
export type SimilarMovie = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type ApiSimilarResponse = {
  page: number
  results: SimilarMovie[]
  total_pages: number
  total_results: number
}

export type SimilarMovieWithFavoriteType = SimilarMovie & { favorite: boolean }

export type ModifiedMovieType = {
  id: MovieDomainType['id'] | undefined
  title: MovieDomainType['title'] | undefined
  poster_path: MovieDomainType['poster_path'] | undefined
  vote_average: MovieDomainType['vote_average'] | undefined
  favorite?: boolean | undefined
}
