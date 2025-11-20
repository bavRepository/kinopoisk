import { ShortMovieCategory } from '@/common/components/ShortMovieCategory/ShortMovieCategory.tsx'
import { useFetchPopularMoviesQuery } from '@/features/movies/api/moviesApi.ts'

export const PopularMovies = () => {
  const { data, isLoading } = useFetchPopularMoviesQuery({ params: { page: 1 } })
  return <ShortMovieCategory popularMovies={data} isLoading={isLoading} />
}
