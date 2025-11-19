import { useFetchPopularMoviesQuery } from '@/features/movies/api/popularMoviesApi.ts'

export const PopularMovies = () => {
  const { data } = useFetchPopularMoviesQuery()
  console.log(data)
  return <div>HELLO</div>
}
