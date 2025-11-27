import s from './similar.module.css'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import type { BaseMoviesResponse, SimilarMovieWithFavoriteType } from '@/features/movies/api/moviesApi.types.ts'

type PropsType = {
  similarMovieResponse: BaseMoviesResponse<SimilarMovieWithFavoriteType[]> | undefined
  id: { id: number }
  isSimilarLoading: boolean
}
export const Similar = ({ similarMovieResponse, id, isSimilarLoading }: PropsType) => {
  return (
    <div className={s.similarMovies}>
      <div className={s.similarMoviesHeader}>Similar Movies</div>
      <div className={s.similarMoviesContent}>
        <MovieCategoryModel
          movies={similarMovieResponse?.results}
          options={{
            full: false,
            skeleton: true,
            params: id,
          }}
          isLoading={isSimilarLoading}
        />
      </div>
    </div>
  )
}
