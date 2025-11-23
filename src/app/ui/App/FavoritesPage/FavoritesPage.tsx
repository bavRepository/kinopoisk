import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { localStorageFavoriteKey, restoreState } from '@/common/localStorage/localStorage.ts'
import type { movieForLsType } from '@/common/components/MovieItem/MovieItem.tsx'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import s from './favoritesPage.module.css'
import { Container } from '@/common/components/Container/Container.tsx'

export const FavoritesPage = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const getFavoritesFromLS = restoreState(undefined, localStorageFavoriteKey)
  const favoritesFromLS: { results: movieForLsType[] } = { results: getFavoritesFromLS || [] }

  const themeColors = s.title + (currentTheme === 'dark' ? ' ' + s.night : '')

  return (
    <section className={s.movieList + (currentTheme === 'dark' ? ' ' + s.night : '')}>
      <Container>
        <h1 className={themeColors}>Favorites movies</h1>
        <MovieCategoryModel data={favoritesFromLS} />
      </Container>
    </section>
  )
}
