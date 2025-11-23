import { baseApi } from '@/app/api/baseApi.ts'
import type { BaseMoviesResponse, Movie } from './moviesApi.types.ts'

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPopularMovies: build.query<BaseMoviesResponse, void>({
      query: () => {
        return {
          url: '/movie/popular',
        }
      },
      transformResponse: (data: BaseMoviesResponse<Movie[]>): BaseMoviesResponse => {
        return {
          ...data,
          results: data.results.map((movie) => ({ ...movie, favorite: false })),
        }
      },
    }),
    getTopRatedMovies: build.query<BaseMoviesResponse, void>({
      query: () => {
        return {
          url: '/movie/top_rated',
        }
      },
      transformResponse: (data: BaseMoviesResponse<Movie[]>): BaseMoviesResponse => {
        return {
          ...data,
          results: data.results.map((movie) => ({ ...movie, favorite: false })),
        }
      },
    }),
    getUpcomingMovies: build.query<BaseMoviesResponse, void>({
      query: () => {
        return {
          url: '/movie/upcoming',
        }
      },
      transformResponse: (data: BaseMoviesResponse<Movie[]>): BaseMoviesResponse => {
        return {
          ...data,
          results: data.results.map((movie) => ({ ...movie, favorite: false })),
        }
      },
    }),
    getNowPlayingMovies: build.query<BaseMoviesResponse, void>({
      query: () => {
        return {
          url: '/movie/now_playing',
        }
      },
      transformResponse: (data: BaseMoviesResponse<Movie[]>): BaseMoviesResponse => {
        return {
          ...data,
          results: data.results.map((movie) => ({ ...movie, favorite: false })),
        }
      },
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} = moviesApi
