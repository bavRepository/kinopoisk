import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/features/movies/api/moviesApi.ts'
import { MOVIES_CATEGORIES, type MoviesCategories } from '@/common/constants'
import type { FetchMoviesArgs } from '@/features/movies/api/moviesApi.types.ts'

export const useCategoryResponseData = (category: MoviesCategories, params: FetchMoviesArgs) => {
  const popularResponse = useGetPopularMoviesQuery(params)
  const topRatedResponse = useGetTopRatedMoviesQuery(params)
  const nowPlayingResponse = useGetNowPlayingMoviesQuery(params)
  const upcomingResponse = useGetUpcomingMoviesQuery(params)

  let response
  switch (category) {
    case `${MOVIES_CATEGORIES.NowPlayingMovies}`:
      response = nowPlayingResponse
      break
    case `${MOVIES_CATEGORIES.TopRatedMovies}`:
      response = topRatedResponse
      break
    case `${MOVIES_CATEGORIES.PopularMovies}`:
      response = popularResponse
      break
    case `${MOVIES_CATEGORIES.UpcomingMovies}`:
      response = upcomingResponse
      break
    default:
      response = popularResponse
  }
  return response
}
