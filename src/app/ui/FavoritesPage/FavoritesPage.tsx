import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import s from './favoritesPage.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { localStorageFavoriteKey, restoreState } from '@/common/localStorage/localStorage.ts'

export const FavoritesPage = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const moviesFromLS = restoreState([], localStorageFavoriteKey)

  const themeColors = s.title + (currentTheme === 'dark' ? ' ' + s.night : '')

  return (
    <section className={s.movieList + (currentTheme === 'dark' ? ' ' + s.night : '')}>
      <Container>
        <h1 className={themeColors}>Favorites movies</h1>
        <MovieCategoryModel options={{ full: true, isFavorite: true }} movies={moviesFromLS} isLoading={false} />
      </Container>
    </section>
  )
}
