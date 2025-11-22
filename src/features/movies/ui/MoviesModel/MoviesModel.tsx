import { type MoviesCategories } from '@/common/constants'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { MoviesHeader } from '@/features/movies/ui/MoviesHeader/MoviesHeader.tsx'

type Props = {
  full?: boolean
  category: MoviesCategories
  style?: React.CSSProperties
}

export const MoviesModel = ({ full = true, category, style }: Props) => {
  return (
    <>
      <MoviesHeader full={full} title={category} />
      <MovieCategoryModel full={full} style={style} category={category} />
    </>
  )
}
