import s from './movieCategoryModel.module.css'
import { MovieItem } from '@/common/components/MovieItem/MovieItem.tsx'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Box } from '@/common/components/SkeletonBox/SkeletonBox.tsx'
import { Container } from '@/common/components/Container/Container.tsx'
import { MOVIES_CATEGORIES, type MoviesCategories } from '@/common/constants'
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from '@/features/movies/api/moviesApi.ts'

const FULL_MOVIES_SIZE_ON_PAGE = 20
const BRIEF_MOVIES_SIZE_ON_PAGE = 6

type Props = {
  full: boolean
  style?: React.CSSProperties
  category: MoviesCategories
}

export const MovieCategoryModel = ({ full, style, category }: Props) => {
  const popularResponse = useGetPopularMoviesQuery()
  const topRatedResponse = useGetTopRatedMoviesQuery()
  const nowPlayingResponse = useGetNowPlayingMoviesQuery()
  const upcomingResponse = useGetUpcomingMoviesQuery()

  let response
  switch (category) {
    case `${MOVIES_CATEGORIES.NowPlayingMovies}`:
      response = nowPlayingResponse
      break
    case `${MOVIES_CATEGORIES.TopRatedMovies}`:
      response = topRatedResponse
      break
    case `${MOVIES_CATEGORIES.PopularMovies}`:
      response = popularResponse
      break
    case `${MOVIES_CATEGORIES.UpcomingMovies}`:
      response = upcomingResponse
      break
    default:
      response = popularResponse
  }
  const { data, isLoading } = response
  const movieList = data?.results

  const formatedMovieList = full ? movieList : movieList?.slice(0, BRIEF_MOVIES_SIZE_ON_PAGE)

  const skeletonWrapped = (
    <Box>
      {Array(full ? FULL_MOVIES_SIZE_ON_PAGE : BRIEF_MOVIES_SIZE_ON_PAGE)
        .fill(null)
        .map((_, id) => (
          <div key={id}>
            <Skeleton
              count={1}
              width={style?.width ? style.width : 175}
              height={style?.minHeight ? style.minHeight : 265}
              borderRadius={16}
            />
            <Skeleton count={1} width={110} height={24} borderRadius={6} />
          </div>
        ))}
    </Box>
  )

  return (
    <Container>
      {isLoading ? (
        skeletonWrapped
      ) : (
        <div className={s.movies}>
          {formatedMovieList?.map((movie) => {
            return <MovieItem key={movie.id} movie={movie} style={style} />
          })}
        </div>
      )}
    </Container>
  )
}
