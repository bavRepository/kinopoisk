import { useFetchPopularMoviesQuery } from '@/features/movies/api/popularMoviesApi.ts'
import { Search } from '@/common/components/Search/Search.tsx'

export const MainPage = () => {
  const { data } = useFetchPopularMoviesQuery({ params: { page: 1 } })

  return (
    <>
      <Search popularMovies={data} />
    </>
  )
}
