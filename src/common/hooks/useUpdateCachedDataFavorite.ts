import type { MoviesCategories } from '@/common/constants'
import type { ApiEndpointName, MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'
import { changeFavorite } from '@/common/utils/getEndPointName.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { moviesApi } from '@/features/movies/api/moviesApi.ts'

export const useUpdateCachedDataFavorite = () => {
  const dispatch = useAppDispatch()
  return (categoryName: MoviesCategories, movie: MovieDomainType, favorite: boolean) => {
    const endPointName: ApiEndpointName = changeFavorite(categoryName)

    dispatch(
      moviesApi.util.updateQueryData(endPointName, undefined, (data) => {
        const index = data.results.findIndex((cachedMovie) => movie.id === cachedMovie.id)
        data.results[index].favorite = favorite
      }),
    )
  }
}
