import { MoviesHeader } from '@/features/movies/ui/MoviesHeader/MoviesHeader.tsx'
import { useChooseResponseData } from '@/common/hooks/useCategoryResponseData.ts'
import type { SubMovieNavItemsType } from '@/common/routing'
import { useUpdateCachedDataFavorite } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import type { OptionsType } from '@/features/movies/ui/MoviesCategory.tsx'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { updateRequestCache } from '@/common/utils/updateRequestCache.ts'

type Props = {
  categoryMovieItem: SubMovieNavItemsType
  options?: OptionsType
}

export const MoviesModel = ({ options, categoryMovieItem }: Props) => {
  const { data, isLoading } = useChooseResponseData(categoryMovieItem.name, { page: 1 })
  const changeFavoriteCacheData = useUpdateCachedDataFavorite()
  updateRequestCache(data, changeFavoriteCacheData, categoryMovieItem.name)
  return (
    <>
      <MoviesHeader full={options?.full} categoryMovieItem={categoryMovieItem} />
      <MovieCategoryModel options={options} movies={data?.results} isLoading={isLoading} />
    </>
  )
}
