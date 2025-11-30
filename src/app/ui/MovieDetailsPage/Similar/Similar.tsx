import s from './similar.module.css'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import type { BaseMoviesResponse, SimilarMovieWithFavoriteType } from '@/features/movies/api/moviesApi.types.ts'
import type { ThemeMode } from '@/app/model/app-slice.ts'

type PropsType = {
  similarMovieResponse: BaseMoviesResponse<SimilarMovieWithFavoriteType[]> | undefined
  id: { id: number }
  isSimilarLoading: boolean
  currentTheme: ThemeMode
}
export const Similar = ({ similarMovieResponse, id, isSimilarLoading, currentTheme }: PropsType) => {
  const colorNightClass = currentTheme === 'dark' ? ' ' + s.night : ''
  return (
    <div className={s.similarMovies}>
      {similarMovieResponse && similarMovieResponse?.results.length > 0 ? (
        <h1 className={s.similarMoviesHeader + colorNightClass}>Similar Movies</h1>
      ) : null}
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
