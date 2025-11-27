import { Link, NavLink } from 'react-router'
import s from './header.module.css'
import { Path } from '@/common/routing'
import logo from '@/assets/images/logo_blue.svg'
import SunIcon from '@/assets/images/sun.svg'
import MoonIcon from '@/assets/images/moon.svg'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { changeThemeModeAC, selectThemeMode } from '@/app/model/app-slice.ts'
import { Container } from '@/common/components/Container/Container.tsx'
import { saveState } from '@/common/localStorage/localStorage.ts'
export const Header = () => {
  const navItems = [
    { to: Path.Main, label: 'Main' },
    { to: Path.Movies + '/' + Path.Popular, label: 'Category movies' },
    { to: Path.FilteredMovies, label: 'Filtered movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },
  ]

  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(selectThemeMode)

  const changeThemeHandler = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    dispatch(changeThemeModeAC({ themeMode: newTheme }))
    saveState(newTheme)
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `${s.link} ${isActive ? (currentTheme === 'dark' ? s.active + ' ' + s.night : s.active + ' ' + s.day) : currentTheme === 'dark' ? s.night : ''}`

  return (
    <header className={`${s.wrapper} ${currentTheme === 'dark' ? s.backgroundNight : ''}`}>
      <Container>
        <div className={s.contentWrapper}>
          <Link to={Path.Main} aria-label={'Go to home page'}>
            <img className={s.logo} src={logo} alt='logo' />
          </Link>

          <nav>
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
            className={`${s.btnChangeMode} ${currentTheme === 'dark' ? s.night : +' '}`}
            onClick={changeThemeHandler}
          >
            <img src={currentTheme === 'light' ? MoonIcon : SunIcon} alt='icon' />
          </button>
        </div>
      </Container>
    </header>
  )
}
