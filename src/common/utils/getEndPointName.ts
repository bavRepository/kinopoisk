import { MOVIES_CATEGORIES, type MoviesCategories } from '@/common/constants'
import { moviesApi } from '@/features/movies/api/moviesApi.ts'
import type { MoviesApiEndpointName } from '@/features/movies/api/moviesApi.types.ts'

export const getEndPointName = (category: MoviesCategories) => {
  let actionType
  switch (category) {
    case MOVIES_CATEGORIES.PopularMovies:
      actionType = moviesApi.endpoints.getPopularMovies.name
      break
    case MOVIES_CATEGORIES.UpcomingMovies:
      actionType = moviesApi.endpoints.getUpcomingMovies.name
      break
    case MOVIES_CATEGORIES.TopRatedMovies:
      actionType = moviesApi.endpoints.getTopRatedMovies.name
      break
    case MOVIES_CATEGORIES.NowPlayingMovies:
      actionType = moviesApi.endpoints.getNowPlayingMovies.name
      break
    case MOVIES_CATEGORIES.SearchMovies:
      actionType = moviesApi.endpoints.getSearchMovie.name
      break
    case MOVIES_CATEGORIES.SimilarMovies:
      actionType = moviesApi.endpoints.getSimilar.name
      break
    case MOVIES_CATEGORIES.FilteredMovies:
      actionType = moviesApi.endpoints.getMovieListByFilter.name
      break
    default:
      actionType = moviesApi.endpoints.getPopularMovies.name
  }

  return actionType as MoviesApiEndpointName
}
