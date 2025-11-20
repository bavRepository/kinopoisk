import { useFetchPopularMoviesQuery } from '@/features/movies/api/moviesApi.ts'
import { Promo } from '@/common/components/Promo/Promo.tsx'
import { Movies } from '@/features/movies/ui/Movies.tsx'

export const MainPage = () => {
  const { data, isLoading } = useFetchPopularMoviesQuery({ params: { page: 1 } })

  return (
    <>
      <Promo popularMovies={data} isLoading={isLoading} />
      <Movies />
    </>
  )
}
