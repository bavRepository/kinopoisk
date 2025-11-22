import { NavLink } from 'react-router'
import { SubMovieNavItems } from '@/common/routing'
import s from './movieMenu.module.css'
import type { ThemeMode } from '@/app/model/app-slice.ts'

type Props = {
  theme: ThemeMode
}

export const MovieMenu = ({ theme }: Props) => {
  const isActiveMenuItemClasses = ({ isActive }: { isActive: boolean }) => {
    return s.link + (isActive ? ' ' + s.active : '') + (theme === 'dark' ? ' ' + s.night : '')
  }

  return (
    <>
      <nav className={s.nav}>
        <ul className={s.list}>
          {SubMovieNavItems.map((menuItem) => {
            return (
              <li key={menuItem.path}>
                <NavLink to={menuItem.path} className={isActiveMenuItemClasses}>
                  {menuItem.category}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
