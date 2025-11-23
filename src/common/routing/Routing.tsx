import { Route, Routes } from 'react-router'
import { MainPage } from '@/app/ui/MainPage/MainPage.tsx'
import { PageNotFound } from '@/common/components'
import { CategoryMoviesPage } from '@/app/ui/CategoryMoviesPage/CategoryMoviesPage.tsx'
import { MoviesModel } from '@/features/movies/ui/MoviesModel/MoviesModel.tsx'
import { MOVIES_CATEGORIES, type MoviesCategories } from '@/common/constants'

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
      {SubMovieNavItems.map((route) => {
        return (
          <Route
            path={route.path}
            element={<MoviesModel categoryMovieItem={route} style={{ width: '216px', height: '330.59px' }} />}
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
