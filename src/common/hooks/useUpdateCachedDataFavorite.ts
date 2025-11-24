import { MOVIES_CATEGORIES, type MoviesCategories } from '@/common/constants'
import type { ApiEndpointName, MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'
import { getEndPointName } from '@/common/utils/getEndPointName.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { moviesApi } from '@/features/movies/api/moviesApi.ts'

export const useUpdateCachedDataFavorite = () => {
  const dispatch = useAppDispatch()

  return (movieId: MovieDomainType['id'], favorite: boolean, categoryName: MoviesCategories = undefined) => {
    const moviesApiUpdateQueryData = (category: MoviesCategories) => {
      const endPointName: ApiEndpointName = getEndPointName(category)
      dispatch(
        moviesApi.util.updateQueryData(endPointName, undefined, (data) => {
          const index = data.results.findIndex((cachedMovie: MovieDomainType) => movieId === cachedMovie.id)
          if (index !== -1) {
            data.results[index].favorite = favorite
          }
        }),
      )
    }

    if (categoryName) {
      moviesApiUpdateQueryData(categoryName)
    }

    Object.values(MOVIES_CATEGORIES).forEach((category) => {
      moviesApiUpdateQueryData(category)
    })
  }
}
