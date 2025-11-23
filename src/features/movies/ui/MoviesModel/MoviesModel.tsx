import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { MoviesHeader } from '@/features/movies/ui/MoviesHeader/MoviesHeader.tsx'
import { useCategoryResponseData } from '@/common/hooks/useCategoryResponseData.ts'
import type { SubMovieNavItemsType } from '@/common/routing'

type Props = {
  full?: boolean
  categoryMovieItem: SubMovieNavItemsType
  style?: React.CSSProperties
}

export const MoviesModel = ({ full = true, categoryMovieItem, style }: Props) => {
  const { data, isLoading } = useCategoryResponseData(categoryMovieItem.name)
  return (
    <>
      <MoviesHeader full={full} categoryMovieItem={categoryMovieItem} />
      <MovieCategoryModel full={full} style={style} data={data} isLoading={isLoading} />
    </>
  )
}
