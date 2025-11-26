import { getPaginationPages } from '@/common/utils'
import s from './Pagination.module.css'
import { useAppSelector } from '@/common/hooks'
import { selectThemeMode } from '@/app/model/app-slice.ts'

type Props = {
  currentPage: number
  setCurrentPage: (page: number) => void
  pagesCount: number
  totalResults?: number
}

export const Pagination = (props: Props) => {
  const { currentPage, setCurrentPage, pagesCount, totalResults } = props
  const currentTheme = useAppSelector(selectThemeMode)
  if (pagesCount <= 1) return null

  const themeColor = currentTheme === 'dark' ? ' ' + s.colorNight : ''
  const pageButtonClasses = currentTheme === 'dark' ? ' ' + s.night : ''

  const pages = getPaginationPages(currentPage, pagesCount)

  return (
    <div className={s.container}>
      <div className={s.pagination}>
        {pages.map((page, idx) =>
          page === '...' ? (
            <span className={s.ellipsis} key={`ellipsis-${idx}`}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={
                page === currentPage
                  ? `${s.pageButton} ${s.active}${pageButtonClasses}`
                  : s.pageButton + pageButtonClasses
              }
              onClick={() => page !== currentPage && setCurrentPage(Number(page))}
              disabled={page === currentPage}
              type='button'
            >
              {page}
            </button>
          ),
        )}
      </div>
      {totalResults && <div className={s.typography + themeColor}>total: {totalResults}</div>}
    </div>
  )
}
