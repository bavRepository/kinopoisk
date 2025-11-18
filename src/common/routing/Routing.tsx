import { Route, Routes } from 'react-router'
import { MainPage } from '@/app/ui/MainPage/MainPage.tsx'
import { PageNotFound } from '@/common/components'

export const Path = {
  Main: '/',
  Movies: '/movies',
  FilteredMovies: '/filtered-movies',
  Search: '/search',
  Favorites: '/favorites',
  NotFound: '*',
} as const

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    {/*<Route path={Path.Playlists} element={<PlaylistsPage />} />*/}
    {/*<Route path={Path.Tracks} element={<TracksPage />} />*/}
    {/*<Route path={Path.Profile} element={<ProfilePage />} />*/}
    {/*<Route path={Path.OauthRedirect} element={<OAuthCallback />} />*/}
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
)
