import { MovieMenu } from '@/common/components/MovieMenu/MovieMenu.tsx'
import s from './categoryMoviesPage.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { Container } from '@/common/components/Container/Container.tsx'
import { Outlet } from 'react-router'

export const CategoryMoviesPage = () => {
  const theme = useAppSelector(selectThemeMode)

  return (
    <section className={s.movieList + (theme === 'dark' ? ' ' + s.night : '')}>
      <Container>
        <MovieMenu theme={theme} />
        <Outlet />
      </Container>
    </section>
  )
}
