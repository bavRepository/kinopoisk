import {
  delMovieFromLS,
  getFavoriteMoviesFromLs,
  localStorageFavoriteKey,
  saveState,
} from '@/common/localStorage/localStorage.ts'
import { isMovieWithProperty } from '@/common/utils/isErrorWithProperty.ts'

import type {
  CastMemberWithFavorite,
  ModifiedMovieType,
  MovieDomainType,
  SimilarMovieWithFavoriteType,
} from '@/features/movies/api/moviesApi.types.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import type { moviesApiUpdateQueryDataType } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import { getModifiedMovieForLS } from '@/common/utils/getModifiedMovie.ts'

type ChangingLocalStorageMovies = (params: {
  movie: MovieDomainType | ModifiedMovieType | SimilarMovieWithFavoriteType | CastMemberWithFavorite
  setFavoriteMoviesListFromLS?: React.Dispatch<
    React.SetStateAction<MovieDomainType[] | SimilarMovieWithFavoriteType[] | ModifiedMovieType[] | undefined>
  >
  params: OptionsType['params']
  isFavorite: OptionsType['isFavorite']
  changeFavoriteCacheData: moviesApiUpdateQueryDataType
}) => void

export const changingLocalStorageMovies: ChangingLocalStorageMovies = ({
  movie,
  isFavorite,
  setFavoriteMoviesListFromLS,
  changeFavoriteCacheData,
  params,
}): void => {
  const movieId = isMovieWithProperty(movie, 'id') ? movie.id : 0
  if (isFavorite) {
    // if (setFavoriteMoviesListFromLS) {
    //   setFavoriteMoviesListFromLS(delMovieFromLS(movieId))
    // } else
    delMovieFromLS(movieId)

    changeFavoriteCacheData(movieId, false, undefined, params)
  } else {
    if (movie?.favorite) {
      delMovieFromLS(movieId)
    } else {
      const moviesFromLS = getFavoriteMoviesFromLs()
      const index = moviesFromLS.findIndex((lsItem) => lsItem.id === movieId)

      if (index != -1) {
        changeFavoriteCacheData(movieId, !movie?.favorite, undefined, params)
        return
      }
      const modifiedMovie = getModifiedMovieForLS(movie)

      moviesFromLS.push(modifiedMovie)
      saveState(moviesFromLS, localStorageFavoriteKey)
    }
    changeFavoriteCacheData(movieId, !movie?.favorite, undefined, params)
  }
}
