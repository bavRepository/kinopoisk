import { useMemo } from 'react'
import { getRandomBackgroundImageUrl } from '@/common/utils/getRandomImage.ts'
import { Container } from '@/common/components/Container/Container.tsx'
import s from './promo.module.css'
import type { PopularMovieApiResponse } from '@/features/movies/api/popularMoviesApi.types.ts'
import { SearchForm } from '@/common/components/SearchForm/SearchForm.tsx'

type Props = {
  popularMovies: PopularMovieApiResponse
}
export const Promo = ({ popularMovies }: Props) => {
  const backgroundPictureUrl = useMemo(() => {
    return getRandomBackgroundImageUrl(popularMovies?.results || [])
  }, [popularMovies?.results])

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
          <SearchForm />
        </div>
      </Container>
    </section>
  )
}
