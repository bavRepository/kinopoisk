import { Link, NavLink } from 'react-router'
import s from './header.module.css'
import { Path } from '@/common/routing'
import logo from '@/assets/images/logo_blue.svg'
import SunIcon from '@/assets/images/sun.svg'
import MoonIcon from '@/assets/images/moon.svg'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { changeThemeModeAC, selectThemeMode } from '@/app/model/app-slice.ts'
import { Container } from '@/common/components/Container/Container.tsx'
export const Header = () => {
  const navItems = [
    { to: Path.Main, label: 'Main' },
    { to: Path.Movies, label: 'Category movies' },
    { to: Path.FilteredMovies, label: 'Filtered movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },

    // { to: Path.Profile, label: 'Profile' },
  ]

  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(selectThemeMode)

  // const { data } = useGetMeQuery()
  // const [logout] = useLogoutMutation()
  // const logoutHandler = () => logout()

  const changeThemeHandler = () => {
    dispatch(changeThemeModeAC({ themeMode: currentTheme === 'dark' ? 'light' : 'dark' }))
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `${s.link} ${isActive ? (currentTheme === 'light' ? s.activeDayLink + ' ' + s.linkDay : s.activeNightLink + ' ' + s.linkNight) : currentTheme === 'light' ? s.linkDay : s.linkNight}`

  return (
    <header className={`${s.wrapper} ${currentTheme === 'light' ? s.backgroundDay : s.backgroundNight}`}>
      <Container>
        <div className={s.contentWrapper}>
          <Link to={Path.Main} aria-label={'Go to home page'}>
            <img className={s.logo} src={logo} alt='logo' />
          </Link>

          <nav>
            {/*<ul className={s.list}>*/}
            {/*  {navItems.map((item, index) => (*/}
            {/*    <li key={item.to}>*/}
            {/*      <NavLink to={item.to} className={navLinkClasses}>*/}
            {/*        {item.label}*/}
            {/*      </NavLink>*/}
            {/*      {index !== navItems.length - 1 && <span className={s.separator}>|</span>}*/}
            {/*    </li>*/}
            {/*  ))}*/}
            {/*</ul>*/}
            {navItems.map((item, index) => (
              <div key={item.to} className={s.list}>
                <NavLink to={item.to} className={navLinkClasses}>
                  {item.label}
                </NavLink>
                {index !== navItems.length - 1 && <span className={s.separator}>|</span>}
              </div>
            ))}
          </nav>
          <button
            className={`${s.btnChangeMode} ${currentTheme === 'light' ? s.activeDayLink : s.activeNightLink + ' ' + s.btnChangeModeNight}`}
            onClick={changeThemeHandler}
          >
            <img src={currentTheme === 'light' ? MoonIcon : SunIcon} alt='icon' />
          </button>
        </div>
        {/*{data && (*/}
        {/*  <div className={s.loginContainer}>*/}
        {/*    <Link to={Path.Profile}>{data.login}</Link>*/}
        {/*    <button onClick={logoutHandler}>logout</button>*/}
        {/*  </div>*/}
        {/*)}*/}
        {/*{!data && <Login />}*/}
      </Container>
    </header>
  )
}
