import { MoviesHeader } from '@/features/movies/ui/MoviesHeader/MoviesHeader.tsx'
import { useCategoryResponseData } from '@/common/hooks/useCategoryResponseData.ts'
import type { SubMovieNavItemsType } from '@/common/routing'
import { useUpdateCachedDataFavorite } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import { localStorageFavoriteKey, restoreState } from '@/common/localStorage/localStorage.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import type { MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import type { modifiedMovieType } from '@/common/components/MovieItem/MovieItem.tsx'

type Props = {
  categoryMovieItem: SubMovieNavItemsType
  options?: OptionsType
}

export const MoviesModel = ({ options, categoryMovieItem }: Props) => {
  const { data, isLoading } = useCategoryResponseData(categoryMovieItem.name)
  const changeFavoriteCacheData = useUpdateCachedDataFavorite()
  const favoriteMovieIdFromLS: modifiedMovieType[] = restoreState([], localStorageFavoriteKey)

  const movieList = data?.results

  // change every movie its field Favorite value in rtk query cache
  movieList?.forEach((movie: MovieDomainType) => {
    const index = favoriteMovieIdFromLS.findIndex((lsMovie) => lsMovie.id === movie.id)
    if (index !== -1) {
      changeFavoriteCacheData(movie.id, true, categoryMovieItem.name)
    }
  })

  return (
    <>
      <MoviesHeader full={options?.full} categoryMovieItem={categoryMovieItem} />
      <MovieCategoryModel options={options} movies={movieList} isLoading={isLoading} />
    </>
  )
}
