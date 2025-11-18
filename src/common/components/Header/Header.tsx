import { NavLink } from 'react-router'
import s from './header.module.css'
import s2 from '@/common/styles/container.module.css'
import { Path } from '@/common/routing'
import logo from '@/assets/images/logo_blue.svg'
import SunIcon from '@/assets/images/sun.svg' // иконка солнца (день)
export const Header = () => {
  const navItems = [
    { to: Path.Main, label: 'Main' },
    { to: Path.Movies, label: 'Category movies' },
    { to: Path.FilteredMovies, label: 'Filtered movies' },
    { to: Path.Search, label: 'Search' },
    { to: Path.Favorites, label: 'Favorites' },

    // { to: Path.Profile, label: 'Profile' },
  ]

  // const { data } = useGetMeQuery()
  // const [logout] = useLogoutMutation()
  // const logoutHandler = () => logout()
  return (
    <header className={s.wrapper}>
      <div className={s2.container}>
        <div className={s.contentWrapper}>
          <img className={s.logo} src={logo} alt='logo' />
          <nav>
            <ul className={s.list}>
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `${s.link} ${isActive ? s.activeDayLink : ''}`.trim()}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button className={s.btnDayNight}>
            <img src={SunIcon} alt='icon' />
          </button>
        </div>
      </div>
      {/*{data && (*/}
      {/*  <div className={s.loginContainer}>*/}
      {/*    <Link to={Path.Profile}>{data.login}</Link>*/}
      {/*    <button onClick={logoutHandler}>logout</button>*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{!data && <Login />}*/}
    </header>
  )
}
