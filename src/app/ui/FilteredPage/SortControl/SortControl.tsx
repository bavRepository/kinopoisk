import s from './sortControl.module.css'
import type { ThemeMode } from '@/app/model/app-slice.ts'
import type { ChangeEvent } from 'react'

type PropsType = {
  currentTheme: ThemeMode
  currentValue: string
  SortMoviesOptionsForSelect: Array<{
    name: string
    value: string
  }>
  sortHandler: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SortControl = ({ SortMoviesOptionsForSelect, currentTheme, sortHandler, currentValue }: PropsType) => {
  const nightColor = currentTheme === 'dark' ? ' ' + s.nightColor : ''
  const nightBgAndColor = currentTheme === 'dark' ? ' ' + s.nightBgAndColor : ''

  return (
    <label className={s.filterLabel + nightColor}>
      Sort by
      <select className={s.sortSelect + nightBgAndColor} value={currentValue} onChange={sortHandler}>
        {SortMoviesOptionsForSelect.map((sort) => (
          <option key={sort.value} value={sort.value}>
            {sort.name}
          </option>
        ))}
      </select>
    </label>
  )
}
