import type { ModifiedMovieType, MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'

const LOCAL_STORAGE_KEY = 'theme'

export const localStorageFavoriteKey = 'favorites'
export const filterSettingsKey = 'movies-filter'

export function saveState<T>(state: T, key: string = LOCAL_STORAGE_KEY) {
  const stateAsString = JSON.stringify(state)
  localStorage.setItem(key, stateAsString)
  broadcastFavUpdate()
}

export function restoreState<T>(defaultState: T, key: string = LOCAL_STORAGE_KEY) {
  let state = defaultState
  const stateAsString = localStorage.getItem(key)
  if (stateAsString !== null) state = JSON.parse(stateAsString) as T
  return state
}

export const delMovieFromLS = (movieId: MovieDomainType['id']) => {
  let favoriteMovieFromLS: ModifiedMovieType[] = restoreState([], localStorageFavoriteKey)

  const index = favoriteMovieFromLS.findIndex((lsMovie) => lsMovie.id === movieId)
  if (index != -1) favoriteMovieFromLS = favoriteMovieFromLS?.filter((movieLS) => movieLS.id !== movieId)
  saveState(favoriteMovieFromLS, localStorageFavoriteKey)
  const resultItemsFromLS = restoreState([], localStorageFavoriteKey)
  resultItemsFromLS.length === 0 && localStorage.removeItem(localStorageFavoriteKey)
  return favoriteMovieFromLS
}

export const FAV_UPDATED_EVENT = 'fav-updated'

export function broadcastFavUpdate() {
  window.dispatchEvent(new Event(FAV_UPDATED_EVENT))
}
