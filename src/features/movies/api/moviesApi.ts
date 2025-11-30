import { baseApi } from '@/app/api/baseApi'
import { withZodCatch } from '@/common/utils/withZodCatch'
import {
  castResponseWithFavoriteSchema,
  type GenresResponse,
  genresResponseSchema,
  movieDetailsWithFavoriteSchema,
  moviesListResponseSchema,
  similarListResponseSchema,
} from '../model/movies.shemas.ts'
import type {
  BaseMoviesResponse,
  CastResponse,
  Movie,
  MovieDetailsWithFavorite,
} from '@/features/movies/api/moviesApi.types.ts'

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopularMovies: build.query({
      query: (params) => ({ url: '/movie/popular', params }),
      transformResponse: (res) => ({
        ...res,
        results: res.results.map((m: BaseMoviesResponse<Movie[]>) => ({ ...m, favorite: false })),
      }),
      ...withZodCatch(moviesListResponseSchema),
    }),

    getTopRatedMovies: build.query({
      query: (params) => ({ url: '/movie/top_rated', params }),
      transformResponse: (res) => ({
        ...res,
        results: res.results.map((m: BaseMoviesResponse<Movie[]>) => ({ ...m, favorite: false })),
      }),
      ...withZodCatch(moviesListResponseSchema),
    }),

    getUpcomingMovies: build.query({
      query: (params) => ({ url: '/movie/upcoming', params }),
      transformResponse: (res) => ({
        ...res,
        results: res.results.map((m: BaseMoviesResponse<Movie[]>) => ({ ...m, favorite: false })),
      }),
      ...withZodCatch(moviesListResponseSchema),
    }),

    getNowPlayingMovies: build.query({
      query: (params) => ({ url: '/movie/now_playing', params }),
      transformResponse: (res) => ({
        ...res,
        results: res.results.map((m: BaseMoviesResponse<Movie[]>) => ({ ...m, favorite: false })),
      }),
      ...withZodCatch(moviesListResponseSchema),
    }),

    getSearchMovie: build.query({
      query: (params) => ({ url: '/search/movie', params }),
      transformResponse: (res) => ({
        ...res,
        results: res.results.map((m: BaseMoviesResponse<Movie[]>) => ({ ...m, favorite: false })),
      }),
      ...withZodCatch(moviesListResponseSchema),
    }),

    getMovie: build.query({
      query: ({ id }) => ({ url: `movie/${id}` }),
      transformResponse: (res: MovieDetailsWithFavorite) => ({ ...res, favorite: false }),
      ...withZodCatch(movieDetailsWithFavoriteSchema),
    }),

    getCredits: build.query({
      query: ({ id }) => ({ url: `movie/${id}/credits` }),
      transformResponse: (res) => ({
        ...res,
        cast: res.cast.map((c: CastResponse) => ({ ...c, favorite: false })),
      }),
      ...withZodCatch(castResponseWithFavoriteSchema),
    }),

    getSimilar: build.query({
      query: ({ id }) => ({ url: `movie/${id}/similar` }),
      transformResponse: (res) => ({
        ...res,
        results: res.results.map((s: BaseMoviesResponse<Movie[]>) => ({ ...s, favorite: false })),
      }),
      ...withZodCatch(similarListResponseSchema),
    }),

    getPromoMovies: build.query({
      query: () => '/movie/popular',
      ...withZodCatch(moviesListResponseSchema),
    }),

    getMovieListByFilter: build.query({
      query: (params) => ({ url: '/discover/movie', params }),
      transformResponse: (res) => ({
        ...res,
        results: res.results.map((s: BaseMoviesResponse<Movie[]>) => ({ ...s, favorite: false })),
      }),
      ...withZodCatch(moviesListResponseSchema),
    }),

    getGenres: build.query<GenresResponse, void>({
      query: () => ({ url: `/genre/movie/list` }),
      ...withZodCatch(genresResponseSchema),
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetPromoMoviesQuery,
  useGetSearchMovieQuery,
  useGetMovieQuery,
  useGetCreditsQuery,
  useGetSimilarQuery,
  useGetGenresQuery,
  useGetMovieListByFilterQuery,
} = moviesApi
