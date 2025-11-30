import { MOVIES_CATEGORIES, type MoviesCategories } from '@/common/constants'
import type {
  BaseMoviesResponse,
  FetchMoviesArgs,
  MovieDomainType,
  MoviesApiEndpointName,
} from '@/features/movies/api/moviesApi.types.ts'
import { getEndPointName } from '@/common/utils/getEndPointName.ts'
import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { moviesApi } from '@/features/movies/api/moviesApi.ts'

export const useUpdateCachedDataFavorite = () => {
  const dispatch = useAppDispatch()

  return (
    movieId: MovieDomainType['id'] | undefined,
    favorite: boolean,

    categoryName: MoviesCategories | undefined,
    params: FetchMoviesArgs = { page: 1 },
  ) => {
    const moviesApiUpdateQueryData = (category: MoviesCategories) => {
      const endPointName: MoviesApiEndpointName = getEndPointName(category)

      dispatch(
        moviesApi.util.updateQueryData(endPointName, params, (data) => {
          if (data && 'results' in data) {
            const response = data as BaseMoviesResponse
            const index = response.results.findIndex((cachedMovie) => movieId === cachedMovie.id)
            if (index !== -1) {
              response.results[index].favorite = favorite
            }
          }
        }),
      )
    }
    // У нас и так есть уже цикл который перебирает наши 4 главные запроса за фильмами в main page
    // Поэтому мы уже внутри цикла и передаем одну категорию
    // else все остальные страницы где мы не в цикле обращаемся к серверу цикл запускаем уже здесь
    if (categoryName) {
      moviesApiUpdateQueryData(categoryName)
    } else {
      Object.values(MOVIES_CATEGORIES).forEach((category) => {
        moviesApiUpdateQueryData(category)
      })
    }
  }
}

export type moviesApiUpdateQueryDataType = ReturnType<typeof useUpdateCachedDataFavorite>
