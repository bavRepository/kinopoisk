import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { MoviesHeader } from '@/features/movies/ui/MoviesHeader/MoviesHeader.tsx'
import { useCategoryResponseData } from '@/common/hooks/useCategoryResponseData.ts'
import type { SubMovieNavItemsType } from '@/common/routing'
import { useUpdateCachedDataFavorite } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import { localStorageFavoriteKey, restoreState } from '@/common/localStorage/localStorage.ts'

type Props = {
  full?: boolean
  categoryMovieItem: SubMovieNavItemsType
  style?: React.CSSProperties
}

export const MoviesModel = ({ full = true, categoryMovieItem, style }: Props) => {
  const { data, isLoading } = useCategoryResponseData(categoryMovieItem.name)

  const changeFavoriteCacheData = useUpdateCachedDataFavorite()
  const favoriteMovieIdFromLS: number[] = restoreState([], localStorageFavoriteKey)

  data?.results.forEach((movie) => {
    if (favoriteMovieIdFromLS.includes(movie.id)) {
      changeFavoriteCacheData(categoryMovieItem.name, movie, true)
    }
  })

  return (
    <>
      <MoviesHeader full={full} categoryMovieItem={categoryMovieItem} />
      <MovieCategoryModel
        full={full}
        style={style}
        apiResponseData={data}
        isLoading={isLoading}
        categoryMovieItemName={categoryMovieItem.name}
      />
    </>
  )
}
