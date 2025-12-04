import type { RootState } from '@/app/model/store.ts'
import { useSelector } from 'react-redux'
import { moviesApi } from '@/features/movies/api/moviesApi.ts'

// Список эндпоинтов для исключения из глобального индикатора
const excludedEndpoints: any = [
  moviesApi.endpoints.getSearchMovie.name,
  moviesApi.endpoints.getGenres.name,
  moviesApi.endpoints.getMovieConfiguration.name,
  moviesApi.endpoints.getMovieListByFilter.name,
]
export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    const queries = Object.values(state.baseApi.queries || {})
    const mutations = Object.values(state.baseApi.mutations || {})

    const hasActiveQueries = queries.some((query) => {
      if (!query || query.status !== 'pending') return false
      return !excludedEndpoints.includes(query.endpointName)
    })

    const hasActiveMutations = mutations.some((mutation) => mutation?.status === 'pending')

    return hasActiveQueries || hasActiveMutations
  })
}
