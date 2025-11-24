import { MoviesHeader } from '@/features/movies/ui/MoviesHeader/MoviesHeader.tsx'
import { useCategoryResponseData } from '@/common/hooks/useCategoryResponseData.ts'
import type { SubMovieNavItemsType } from '@/common/routing'
import { useUpdateCachedDataFavorite } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import { localStorageFavoriteKey, restoreState } from '@/common/localStorage/localStorage.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import type { MovieDomainType } from '@/features/movies/api/moviesApi.types.ts'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { useAppDispatch } from '@/common/hooks'
import { setFavoriteMovies } from '@/features/movies/model/favoriteMovies-slice.ts'
import { getUniqMovies } from '@/common/utils/getUniqMovies.ts'

type Props = {
  categoryMovieItem: SubMovieNavItemsType
  options?: OptionsType
}

export const MoviesModel = ({ options, categoryMovieItem }: Props) => {
  const { data, isLoading } = useCategoryResponseData(categoryMovieItem.name)
  const dispatch = useAppDispatch()
  const changeFavoriteCacheData = useUpdateCachedDataFavorite()
  const favoriteMovieIdFromLS: number[] = restoreState([], localStorageFavoriteKey)

  const movieList = data?.results

  // change every movie its field Favorite value in rtk query cache
  movieList?.forEach((movie: MovieDomainType) => {
    if (favoriteMovieIdFromLS.includes(movie.id)) {
      changeFavoriteCacheData(movie.id, true, categoryMovieItem.name)
    }
  })

  const setFavoriteMoviesInLocalStorage = () => {
    const uniqMovieList = getUniqMovies(data?.results)

    dispatch(setFavoriteMovies({ movies: uniqMovieList }))
  }
  setFavoriteMoviesInLocalStorage()
  return (
    <>
      {!options?.favoritesOnly && <MoviesHeader full={options?.full} categoryMovieItem={categoryMovieItem} />}
      <MovieCategoryModel options={options} responseMovieApiData={movieList} isLoading={isLoading} />
    </>
  )
}
