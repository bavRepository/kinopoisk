import { useFetchPopularMoviesQuery } from '@/features/movies/api/popularMoviesApi.ts'
import { Promo } from '@/common/components/Promo/Promo.tsx'

export const MainPage = () => {
  const { data } = useFetchPopularMoviesQuery({ params: { page: 1 } })

  return (
    <>
      <Promo popularMovies={data} />
    </>
  )
}
