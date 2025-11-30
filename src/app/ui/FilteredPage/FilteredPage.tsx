import 'react-range-slider-input/dist/style.css'
import s from './filteredPage.module.css'
import { useAppSelector, useDebounceValue } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { Container } from '@/common/components/Container/Container.tsx'
import { type ChangeEvent, useState } from 'react'
import { useGetGenresQuery, useGetMovieListByFilterQuery } from '@/features/movies/api/moviesApi.ts'
import { Pagination, Spinner } from '@/common/components'
import { SortControl } from '@/app/ui/FilteredPage/SortControl/SortControl.tsx'
import { RatingRangeSlider } from '@/app/ui/FilteredPage/RatingWrapper/RatingRangeSlider.tsx'
import { Genres } from '@/app/ui/FilteredPage/Genres/Genres.tsx'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'

export const sortQueryName = {
  Popularity: { desc: 'popularity.desc', asc: 'popularity.asc' },
  Rating: { desc: 'vote_average.gte', asc: 'vote_average.lte' },
  ReleaseDate: { desc: 'release_date.desc', asc: 'release_date.asc' },
  TITLE: { desc: 'original_title.desc', asc: 'original_title.asc' },
}

export const SortMovies = [
  { name: 'Popularity ↓', value: 'popularity.desc' },
  { name: 'Popularity ↑', value: 'popularity.asc' },
  { name: 'Rating ↓', value: 'vote_average.gte' },
  { name: 'Rating ↑', value: 'vote_average.lte' },
  { name: 'Release Date ↓', value: 'release_date.desc' },
  { name: 'Release Date ↑', value: 'release_date.asc' },
  { name: 'TITLE A-Z', value: 'original_title.desc' },
  { name: 'TITLE Z-A', value: 'original_title.asc' },
]
export type GenreWithClicked = {
  id: number
  name: string
  isClicked: boolean
}
export const FilteredPage = () => {
  const [sortBy, setSortBy] = useState(sortQueryName.Popularity.desc)
  const [range, setRange] = useState<[number, number]>([0, 10])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const currentTheme = useAppSelector(selectThemeMode)

  const debounceRange = useDebounceValue(range)
  const debounceGenres = useDebounceValue(selectedGenres)

  const { data: genresResp, isFetching: genresLoading } = useGetGenresQuery()

  const queryParams = {
    sort_by: sortBy,
    [sortQueryName.Rating.desc]: debounceRange[0],
    [sortQueryName.Rating.asc]: debounceRange[1],
    with_genres: debounceGenres.join(','),
    page: currentPage,
  }

  const { data: moviesData, isFetching: moviesLoading } = useGetMovieListByFilterQuery(queryParams, {
    skip: !selectedGenres.length && !sortBy,
  })

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)

  const toggleGenre = (id: number) =>
    setSelectedGenres((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]))

  const genresWithState =
    genresResp?.genres.map((genre) => ({
      ...genre,
      isClicked: selectedGenres.includes(genre.id),
    })) ?? []

  const nightColor = currentTheme === 'dark' ? ' ' + s.nightColor : ''
  const nightBgAndColor = currentTheme === 'dark' ? ' ' + s.nightBgAndColor : ''

  return (
    <section className={s.filteredMovies + nightBgAndColor}>
      <Container>
        <div className={s.contentWrapper}>
          <aside className={s.filters + nightBgAndColor}>
            <h1 className={s.title + nightColor}>Filters / Sort</h1>
            <SortControl
              sortMovies={SortMovies}
              currentTheme={currentTheme}
              currentValue={sortBy}
              sortHandler={handleSort}
            />
            <RatingRangeSlider range={range} setRange={setRange} currentTheme={currentTheme} />
            <Genres
              areGenresFetching={genresLoading}
              genreListWithIsClickedField={genresWithState}
              onGenreHandler={toggleGenre}
              currentTheme={currentTheme}
            />
            <button
              className={s.resetBtn}
              onClick={() => {
                setSortBy('popularity.desc')
                setRange([0, 10])
                setSelectedGenres([])
              }}
            >
              Reset filters
            </button>
          </aside>

          <div className={s.movies}>
            {moviesLoading ? (
              <Spinner />
            ) : (
              <MovieCategoryModel
                isLoading={false}
                movies={moviesData?.results ?? []}
                options={{ full: true, params: queryParams }}
              />
            )}
          </div>
        </div>
        <div className={s.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagesCount={moviesData?.total_pages || 0}
            totalResults={moviesData?.total_results}
          />
        </div>
      </Container>
    </section>
  )
}
