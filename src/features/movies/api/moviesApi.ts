import { baseApi } from '@/app/api/baseApi.ts'
import type {
  BaseMoviesResponse,
  CastMemberWithFavorite,
  CastResponse,
  FetchMoviesArgs,
  Movie,
  MovieDetails,
  MovieDetailsWithFavorite,
  SimilarMovie,
  SimilarMovieWithFavoriteType,
} from './moviesApi.types.ts'

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
    getMovie: build.query<MovieDetailsWithFavorite, { id: number }>({
      query: ({ id }: FetchMoviesArgs) => {
        return {
          url: `movie/${id}`,
        }
      },
      transformResponse: (movie: MovieDetails): MovieDetailsWithFavorite => {
        return {
          ...movie,
          favorite: false,
        }
      },
    }),
    getCredits: build.query<CastResponse<CastMemberWithFavorite[]>, { id: number }>({
      query: ({ id }: FetchMoviesArgs) => {
        return {
          url: `movie/${id}/credits`,
        }
      },
      transformResponse: (data: CastResponse): CastResponse<CastMemberWithFavorite[]> => {
        return {
          ...data,
          cast: data.cast.map((castMember) => ({ ...castMember, favorite: false })),
        }
      },
    }),

    getSimilar: build.query<BaseMoviesResponse<SimilarMovieWithFavoriteType[]>, { id: number }>({
      query: ({ id }) => ({
        url: `movie/${id}/similar`,
      }),
      transformResponse: (
        data: BaseMoviesResponse<SimilarMovie[]>,
      ): BaseMoviesResponse<SimilarMovieWithFavoriteType[]> => {
        return {
          ...data,
          results: data.results.map((similar) => ({ ...similar, favorite: false })),
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
  useGetMovieQuery,
  useGetCreditsQuery,
  useGetSimilarQuery,
} = moviesApi
