import { useMemo } from 'react'
import { getRandomBackgroundImageUrl } from '@/common/utils/getRandomImage.ts'
import { Container } from '@/common/components/Container/Container.tsx'
import s from './search.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import type { PopularMovieApiResponse, Movie } from '@/features/movies/api/popularMoviesApi.types.ts'
type Props = {
  popularMovies: PopularMovieApiResponse
}
export const Search = ({ popularMovies }: Props) => {
  const currentTheme = useAppSelector(selectThemeMode)
  const backgroundPictureUrl = useMemo(() => {
    return getRandomBackgroundImageUrl(popularMovies?.results || [])
  }, [])
  const inputClasses = currentTheme === 'light' ? s.searchInputDay : s.searchInputNight
  return (
    <section
      className={s.search + ' ' + s.backgroundImage}
      style={{
        backgroundImage: `linear-gradient(rgba(4, 21, 45, 0) 0%, rgb(18, 18, 18) 79.17%), url("http://image.tmdb.org/t/p/original/${backgroundPictureUrl}")`,
      }}
    >
      <Container style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div className={s.contentWrapper}>
          <h1 className={s.title}>Welcome</h1>
          <h2 className={s.subtitle}>Browse highlighted titles from TMDB</h2>
          <form action='#'>
            <input className={s.searchInput + ' ' + inputClasses} type='search' placeholder={'Search for a movie'} />
            <button className={s.btnSearch} type={'submit'}>
              Search
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}
