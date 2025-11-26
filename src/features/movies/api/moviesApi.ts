import { baseApi } from '@/app/api/baseApi.ts'
import type { BaseMoviesResponse, FetchMoviesArgs, Movie } from './moviesApi.types.ts'

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopularMovies: build.query<BaseMoviesResponse, FetchMoviesArgs>({
      query: (params: FetchMoviesArgs) => {
        return {
          url: '/movie/popular',
          params,
        }
      },
      transformResponse: (data: BaseMoviesResponse<Movie[]>): BaseMoviesResponse => {
        return {
          ...data,
          results: data.results.map((movie) => ({ ...movie, favorite: false })),
        }
      },
    }),
    getTopRatedMovies: build.query<BaseMoviesResponse, FetchMoviesArgs>({
      query: (params: FetchMoviesArgs) => {
        return {
          url: '/movie/top_rated',
          params,
        }
      },
      transformResponse: (data: BaseMoviesResponse<Movie[]>): BaseMoviesResponse => {
        return {
          ...data,
          results: data.results.map((movie) => ({ ...movie, favorite: false })),
        }
      },
    }),
    getUpcomingMovies: build.query<BaseMoviesResponse, FetchMoviesArgs>({
      query: (params: FetchMoviesArgs) => {
        return {
          url: '/movie/upcoming',
          params,
        }
      },
      transformResponse: (data: BaseMoviesResponse<Movie[]>): BaseMoviesResponse => {
        return {
          ...data,
          results: data.results.map((movie) => ({ ...movie, favorite: false })),
        }
      },
    }),
    getNowPlayingMovies: build.query<BaseMoviesResponse, FetchMoviesArgs>({
      query: (params: FetchMoviesArgs) => {
        return {
          url: '/movie/now_playing',
          params,
        }
      },
      transformResponse: (data: BaseMoviesResponse<Movie[]>): BaseMoviesResponse => {
        return {
          ...data,
          results: data.results.map((movie) => ({ ...movie, favorite: false })),
        }
      },
    }),

    getSearchMovie: build.query<BaseMoviesResponse, FetchMoviesArgs>({
      query: (params: FetchMoviesArgs) => {
        return {
          url: '/search/movie',
          params,
        }
      },
      transformResponse: (data: BaseMoviesResponse<Movie[]>): BaseMoviesResponse => {
        return {
          ...data,
          results: data.results.map((movie) => ({ ...movie, favorite: false })),
        }
      },
    }),

    getPromoMovies: build.query<BaseMoviesResponse, void>({
      query: () => '/movie/popular',
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
} = moviesApi
