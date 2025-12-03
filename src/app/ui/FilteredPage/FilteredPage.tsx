import 'react-range-slider-input/dist/style.css'
import s from './filteredPage.module.css'
import { useAppSelector, useDebounceValue } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { Container } from '@/common/components/Container/Container.tsx'
import { type ChangeEvent, useEffect, useState } from 'react'
import { useGetGenresQuery, useGetMovieListByFilterQuery } from '@/features/movies/api/moviesApi.ts'
import { Pagination, Spinner } from '@/common/components'
import { SortControl } from '@/app/ui/FilteredPage/SortControl/SortControl.tsx'
import { RatingRangeSlider } from '@/app/ui/FilteredPage/RatingWrapper/RatingRangeSlider.tsx'
import { Genres } from '@/app/ui/FilteredPage/Genres/Genres.tsx'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { filterSettingsKey, restoreState, saveState } from '@/common/localStorage/localStorage.ts'
import type { filterSettingsObjType, SortValuesType } from '@/app/ui/FilteredPage/filteredPage.types.ts'
import noResults from '@/assets/images/no_results_found.png'
export const sortOptionChoice = {
  Popularity: { desc: 'popularity.desc', asc: 'popularity.asc' },
  Rating: { desc: 'vote_average.gte', asc: 'vote_average.lte' },
  ReleaseDate: { desc: 'release_date.desc', asc: 'release_date.asc' },
  TITLE: { desc: 'original_title.desc', asc: 'original_title.asc' },
} as const

export const SortMoviesOptionsForSelect = [
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

const defaultRangeValues: [number, number] = [0, 10]

export const FilteredPage = () => {
  const [sortBy, setSortBy] = useState<SortValuesType>(sortOptionChoice.Popularity.desc)
  const [range, setRange] = useState(defaultRangeValues)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const currentTheme = useAppSelector(selectThemeMode)

  const debounceRange = useDebounceValue(range)
  const debounceGenres = useDebounceValue(selectedGenres)

  const { data: genresResp, isFetching: genresLoading } = useGetGenresQuery()

  const filterSettingsObj: filterSettingsObjType = {
    sortBy: sortBy,
    selectedGenres: selectedGenres,
    page: currentPage,
    range: range,
  }

  useEffect(() => {
    const { sortBy, page, selectedGenres, range }: filterSettingsObjType = restoreState(
      filterSettingsObj,
      filterSettingsKey,
    )
    setSortBy(sortBy)
    setCurrentPage(page)
    setRange(range)
    setSelectedGenres(selectedGenres)
  }, [])

  const queryParams = {
    sort_by: sortBy,
    [sortOptionChoice.Rating.desc]: debounceRange[0],
    [sortOptionChoice.Rating.asc]: debounceRange[1],
    with_genres: debounceGenres.join(','),
    page: currentPage,
  } as const

  const { data: moviesData, isFetching: moviesLoading } = useGetMovieListByFilterQuery(queryParams, {
    skip: !selectedGenres.length && !sortBy,
  })

  const genresWithState =
    genresResp?.genres.map((genre) => ({
      ...genre,
      isClicked: selectedGenres.includes(genre.id),
    })) ?? []

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortValuesType
    setSortBy(newSort)
    filterSettingsObj.sortBy = newSort
    saveState(filterSettingsObj, filterSettingsKey)
  }

  const toggleGenre = (id: number) => {
    const filterSettingsObjFromLS: filterSettingsObjType = restoreState(filterSettingsObj, filterSettingsKey)
    const updatedSettings = {
      ...filterSettingsObjFromLS,
      selectedGenres: filterSettingsObjFromLS.selectedGenres.includes(id)
        ? filterSettingsObjFromLS.selectedGenres.filter((genre) => genre !== id)
        : [...filterSettingsObjFromLS.selectedGenres, id],
    }
    saveState(updatedSettings, filterSettingsKey)
    setSelectedGenres((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]))
  }

  const setCurrentPageHandler = (page: number) => {
    setCurrentPage(page)
    filterSettingsObj.page = currentPage
    saveState(filterSettingsObj, filterSettingsKey)
  }

  const setCurrentRangeHandler = (range: [number, number]) => {
    setRange(range)
    filterSettingsObj.range = range
    saveState(filterSettingsObj, filterSettingsKey)
  }

  const resetHandler = () => {
    localStorage.removeItem(filterSettingsKey)
    setSortBy(sortOptionChoice.Popularity.desc)
    setRange(defaultRangeValues)
    setSelectedGenres([])
  }

  const nightColor = currentTheme === 'dark' ? ' ' + s.nightColor : ''
  const nightBgAndColor = currentTheme === 'dark' ? ' ' + s.nightBgAndColor : ''

  return (
    <section className={s.filteredMovies + nightBgAndColor}>
      <Container>
        <div className={s.contentWrapper}>
          <aside className={s.filters + nightBgAndColor}>
            <h1 className={s.title + nightColor}>Filters / Sort</h1>
            <SortControl
              SortMoviesOptionsForSelect={SortMoviesOptionsForSelect}
              currentTheme={currentTheme}
              currentValue={sortBy}
              sortHandler={handleSort}
            />
            <RatingRangeSlider range={range} setRange={setCurrentRangeHandler} currentTheme={currentTheme} />
            <Genres
              areGenresFetching={genresLoading}
              genreListWithIsClickedField={genresWithState}
              onGenreHandler={toggleGenre}
              currentTheme={currentTheme}
            />
            <button className={s.resetBtn} onClick={resetHandler}>
              Reset filters
            </button>
          </aside>

          <div className={s.movies}>
            {moviesLoading ? (
              <Spinner />
            ) : (
              <>
                {moviesData?.results.length === 0 ? (
                  <img className={s.noResults} src={noResults} alt='no results found' />
                ) : (
                  <MovieCategoryModel
                    isLoading={false}
                    movies={moviesData?.results ?? []}
                    options={{ full: true, params: queryParams }}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {!moviesLoading && (
          <div className={s.paginationWrapper}>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPageHandler}
              pagesCount={moviesData?.total_pages || 0}
              totalResults={moviesData?.total_results}
            />
          </div>
        )}
      </Container>
    </section>
  )
}
