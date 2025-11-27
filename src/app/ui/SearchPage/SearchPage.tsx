import { SearchForm } from '@/common/components/SearchForm/SearchForm.tsx'
import { useGetSearchMovieQuery } from '@/features/movies/api/moviesApi.ts'
import { MovieCategoryModel } from '@/common/MovieCategoryModel/MovieCategoryModel.tsx'
import { movieItemsStyleBig } from '@/common/styles'
import s from './searchPage.module.css'
import { Pagination } from '@/common/components'
import { useEffect, useState } from 'react'
import { Container } from '@/common/components/Container/Container.tsx'
import { useUpdateCachedDataFavorite } from '@/common/hooks/useUpdateCachedDataFavorite.ts'
import { updateRequestCache } from '@/common/utils/updateRequestCache.ts'
import { MOVIES_CATEGORIES } from '@/common/constants'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'
import { useSearchParams } from 'react-router'

export const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchParams] = useSearchParams()
  const currentTheme = useAppSelector(selectThemeMode)
  const [skip, setSkip] = useState(true)
  const { data, isLoading } = useGetSearchMovieQuery({ query: searchQuery, page: currentPage }, { skip })

  useEffect(() => {
    const q = searchParams.get('query') ?? ''
    if (q.trim()) {
      setSearchQuery(q)
      setSkip(false)
    }
  }, [searchParams])

  const changeFavoriteCacheData = useUpdateCachedDataFavorite()
  updateRequestCache(data, changeFavoriteCacheData, MOVIES_CATEGORIES.SearchMovies, {
    query: searchQuery,
    page: currentPage,
  })
  const themeBgColorClasses = currentTheme === 'dark' ? ' ' + s.bgColorNight : ''
  const themeColorClasses = currentTheme === 'dark' ? ' ' + s.colorNight : ''
  return (
    <section className={s.contentWrapper + themeBgColorClasses}>
      <Container>
        <div className={s.infoContainer}>
          <h1 className={s.title + themeColorClasses}>Search Results</h1>
          <SearchForm setSkip={setSkip} searchQueryOuter={searchQuery} />
          {data && <h2 className={s.searchResults + themeColorClasses}>Results for "{searchQuery}"</h2>}
        </div>

        <MovieCategoryModel
          movies={data?.results}
          options={{
            style: movieItemsStyleBig,
            full: true,
            skeleton: false,
            params: {
              query: searchQuery,
              page: currentPage,
            },
          }}
          isLoading={isLoading}
        />
        {skip && <p className={s.desc + themeColorClasses}>Enter a movie title to start searching.</p>}
        <div className={s.paginationWrapper}>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagesCount={data?.total_pages || 0}
            totalResults={data?.total_results}
          />
        </div>
      </Container>
    </section>
  )
}
