import { MOVIES_CATEGORIES } from '@/common/constants'
import s from '../categoryMoviesPage.module.css'
import { useGetPopularMoviesQuery } from '@/features/movies/api/moviesApi.ts'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { Pagination } from '@/common/components'
import { useState } from 'react'
import { movieItemSize } from '@/common/styles'

export const PopularMovies = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isFetching } = useGetPopularMoviesQuery({ page: currentPage })

  const currentTheme = useAppSelector(selectThemeMode)
  const themeColor = currentTheme === 'dark' ? ' ' + s.colorNight : ''
  return (
    <div className={s.contentWrapper}>
      <h1 className={s.title + themeColor}>{MOVIES_CATEGORIES.PopularMovies}</h1>
      <MovieCategoryModel
        movies={data?.results}
        options={{
          style: movieItemSize.categoryPageMovieItemSize,
          movieGridCellSize: movieItemSize.categoryPageMovieItemSize.width,
          full: true,
          params: { page: currentPage },
        }}
        isLoading={isFetching}
      />
      <div className={s.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagesCount={data?.total_pages || 0}
          totalResults={data?.total_results}
        />
      </div>
    </div>
  )
}
