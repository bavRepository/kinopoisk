import s from './searchForm.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'

export const SearchForm = () => {
  const currentTheme = useAppSelector(selectThemeMode)
  const inputClasses = currentTheme === 'dark' ? s.searchInputNight : ''
  return (
    <form action='#'>
      <input className={s.searchInput + ' ' + inputClasses} type='search' placeholder={'Search for a movie'} />
      <button className={s.btnSearch} type={'submit'}>
        Search
      </button>
    </form>
  )
}
