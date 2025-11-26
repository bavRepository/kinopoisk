import type { modifiedMovieType } from '@/common/components/MovieItem/MovieItem.tsx'
import type { MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'

const LOCAL_STORAGE_KEY = 'theme'

export const localStorageFavoriteKey = 'favorites'

export function saveState<T>(state: T, key: string = LOCAL_STORAGE_KEY) {
  const stateAsString = JSON.stringify(state)
  localStorage.setItem(key, stateAsString)
}

export function restoreState<T>(defaultState: T, key: string = LOCAL_STORAGE_KEY) {
  let state = defaultState
  const stateAsString = localStorage.getItem(key)
  if (stateAsString !== null) state = JSON.parse(stateAsString) as T
  return state
}

export const getFavoriteMoviesFromLs = (): modifiedMovieType[] => {
  return restoreState([], localStorageFavoriteKey)
}

export const delMovieFromLS = (movieId: MovieDomainType['id']) => {
  let favoriteMovieFromLS = getFavoriteMoviesFromLs()

  const index = favoriteMovieFromLS.findIndex((lsMovie) => lsMovie.id === movieId)
  if (index) favoriteMovieFromLS = favoriteMovieFromLS?.filter((movieLS) => movieLS.id !== movieId)
  saveState(favoriteMovieFromLS, localStorageFavoriteKey)
  const resultItemsFromLS = getFavoriteMoviesFromLs()
  !!resultItemsFromLS.length && localStorage.removeItem(localStorageFavoriteKey)
  return favoriteMovieFromLS
}
