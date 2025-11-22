import { Route, Routes } from 'react-router'
import { MainPage } from '@/app/ui/MainPage/MainPage.tsx'
import { PageNotFound } from '@/common/components'
import { CategoryMoviesPage } from '@/app/ui/CategoryMoviesPage/CategoryMoviesPage.tsx'
import { MoviesModel } from '@/features/movies/ui/MoviesModel/MoviesModel.tsx'
import { MOVIES_CATEGORIES } from '@/common/constants'

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
  { path: Path.Popular, category: MOVIES_CATEGORIES.PopularMovies },
  { path: Path.TopRated, category: MOVIES_CATEGORIES.TopRatedMovies },
  { path: Path.Upcoming, category: MOVIES_CATEGORIES.UpcomingMovies },
  { path: Path.NowPlaying, category: MOVIES_CATEGORIES.NowPlayingMovies },
]

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Movies} element={<CategoryMoviesPage />}>
      {SubMovieNavItems.map((route) => {
        const { path, category } = route
        return (
          <Route
            path={path}
            element={<MoviesModel category={category} style={{ width: '216px', minHeight: '330.59px' }} />}
          />
        )
      })}
    </Route>

    {/*<Route path='profile/*' element={<Profile />}>*/}
    {/*  <Route path='info' element={<ProfileInfo />} />*/}
    {/*  <Route path='settings' element={<ProfileSettings />} />*/}
    {/*</Route>*/}

    {/*<Route path={Path.Tracks} element={<TracksPage />} />*/}
    {/*<Route path={Path.Profile} element={<ProfilePage />} />*/}
    {/*<Route path={Path.OauthRedirect} element={<OAuthCallback />} />*/}
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)
