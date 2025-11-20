import { ShortMovieCategory } from '@/common/components/ShortMovieCategory/ShortMovieCategory.tsx'
import { useGetNowPlayingMoviesQuery } from '@/features/movies/api/moviesApi.ts'
import { MoviesHeader } from '@/features/movies/ui/MoviesHeader/MoviesHeader.tsx'

export const NowPlayingMovies = () => {
  const { data, isLoading } = useGetNowPlayingMoviesQuery()

  return (
    <>
      <MoviesHeader title={'Now Playing Movies'} />
      <ShortMovieCategory popularMovies={data} isLoading={isLoading} />
    </>
  )
}
