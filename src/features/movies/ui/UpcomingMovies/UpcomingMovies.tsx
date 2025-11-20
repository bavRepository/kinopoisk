import { ShortMovieCategory } from '@/common/components/ShortMovieCategory/ShortMovieCategory.tsx'
import { useGetUpcomingMoviesQuery } from '@/features/movies/api/moviesApi.ts'
import { MoviesHeader } from '@/features/movies/ui/MoviesHeader/MoviesHeader.tsx'

export const UpcomingMovies = () => {
  const { data, isLoading } = useGetUpcomingMoviesQuery()

  return (
    <>
      <MoviesHeader title={'Upcoming Movies'} />
      <ShortMovieCategory popularMovies={data} isLoading={isLoading} />
    </>
  )
}
