import { Route, Routes } from 'react-router'
import { MainPage } from '@/app/ui/MainPage/MainPage.tsx'
import { PageNotFound } from '@/common/components'
import { CategoryMoviesPage } from '@/app/ui/CategoryMoviesPage/CategoryMoviesPage.tsx'
import { MOVIES_CATEGORIES, type MoviesCategories } from '@/common/constants'
import { FavoritesPage } from '@/app/ui/App/FavoritesPage/FavoritesPage.tsx'
import { PopularMovies } from '@/app/ui/CategoryMoviesPage/PopularMovies/PopularMovies.tsx'
import { UpcomingMovies } from '@/app/ui/CategoryMoviesPage/UpcomingMovies/UpcomingMovies.tsx'
import { TopRatedMovies } from '@/app/ui/CategoryMoviesPage/TopRatedMovies/TopRatedMovies.tsx'
import { NowPlayingMovies } from '@/app/ui/CategoryMoviesPage/NowPlayingMovies/NowPlayingMovies.tsx'
import { SearchPage } from '@/app/ui/SearchPage/SearchPage.tsx'

export const Path = {
  Main: '/',
  Movies: '/movies',
  FilteredMovies: '/filtered-movies',
  Search: '/search',
  Favorites: '/favorites',
  Popular: 'popular',
  TopRated: 'top-rated',
  Upcoming: 'upcoming',
  NowPlaying: 'now-playing',
  NotFound: '*',
} as const

export const SubMovieNavItems = [
  { path: Path.Popular, name: MOVIES_CATEGORIES.PopularMovies },
  { path: Path.TopRated, name: MOVIES_CATEGORIES.TopRatedMovies },
  { path: Path.Upcoming, name: MOVIES_CATEGORIES.UpcomingMovies },
  { path: Path.NowPlaying, name: MOVIES_CATEGORIES.NowPlayingMovies },
]

export type SubMovieNavItemsType = { path: string; name: MoviesCategories }

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Movies} element={<CategoryMoviesPage />}>
      <Route path={Path.Popular} element={<PopularMovies />} />
      <Route path={Path.Upcoming} element={<UpcomingMovies />} />
      <Route path={Path.TopRated} element={<TopRatedMovies />} />
      <Route path={Path.NowPlaying} element={<NowPlayingMovies />} />
    </Route>
    <Route path={Path.Search} element={<SearchPage />} />
    <Route path={Path.Favorites} element={<FavoritesPage />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)
