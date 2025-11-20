import { useGetTopRatedMoviesQuery } from '@/features/movies/api/moviesApi.ts'
import { ShortMovieCategory } from '@/common/components/ShortMovieCategory/ShortMovieCategory.tsx'
import { MoviesHeader } from '@/features/movies/ui/MoviesHeader/MoviesHeader.tsx'

export const TopMovies = () => {
  const { data, isLoading } = useGetTopRatedMoviesQuery()

  return (
    <>
      <MoviesHeader title={'Top Rated Movies'} />
      <ShortMovieCategory popularMovies={data} isLoading={isLoading} />
    </>
  )
}
