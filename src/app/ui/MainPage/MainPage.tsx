import { useGetPopularMoviesQuery } from '@/features/movies/api/moviesApi.ts'
import { Promo } from '@/common/components/Promo/Promo.tsx'
import { Movies } from '@/features/movies/ui/Movies.tsx'

export const MainPage = () => {
  const { data, isLoading } = useGetPopularMoviesQuery()

  return (
    <>
      <Promo popularMovies={data} isLoading={isLoading} />
      <Movies />
    </>
  )
}
