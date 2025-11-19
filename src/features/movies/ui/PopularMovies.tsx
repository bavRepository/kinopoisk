import { useFetchPopularMoviesQuery } from '@/features/movies/api/popularMoviesApi.ts'

type Props = {}
export const PopularMovies = (props: Props) => {
  const { data } = useFetchPopularMoviesQuery()
  console.log(data)
  return <div>HELLO</div>
}
