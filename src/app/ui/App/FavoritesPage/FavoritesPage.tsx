import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import s from './favoritesPage.module.css'
import { Container } from '@/common/components/Container/Container.tsx'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { selectFavoriteMovies } from '@/features/movies/model/favoriteMovies-slice.ts'
import { getUniqMovies } from '@/common/utils/getUniqMovies.ts'

export const FavoritesPage = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const favoriteMovies = useAppSelector(selectFavoriteMovies)

  const trueFilteredDataFromSlice = getUniqMovies(favoriteMovies)

  const themeColors = s.title + (currentTheme === 'dark' ? ' ' + s.night : '')

  return (
    <section className={s.movieList + (currentTheme === 'dark' ? ' ' + s.night : '')}>
      <Container>
        <h1 className={themeColors}>Favorites movies</h1>

        <MovieCategoryModel
          options={{ full: true }}
          responseMovieApiData={trueFilteredDataFromSlice}
          isLoading={false}
        />
      </Container>
    </section>
  )
}
