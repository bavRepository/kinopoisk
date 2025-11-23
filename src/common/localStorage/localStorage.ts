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
