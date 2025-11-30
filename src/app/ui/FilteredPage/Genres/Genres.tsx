import s from './genres.module.css'
import { Spinner } from '@/common/components'
import type { GenreWithClicked } from '@/app/ui/FilteredPage/FilteredPage.tsx'
import { type ThemeMode } from '@/app/model/app-slice.ts'

type PropsType = {
  areGenresFetching: boolean
  genreListWithIsClickedField: GenreWithClicked[]
  onGenreHandler: (id: number) => void
  currentTheme: ThemeMode
}
export const Genres = ({ genreListWithIsClickedField, areGenresFetching, onGenreHandler, currentTheme }: PropsType) => {
  const nightColor = currentTheme === 'dark' ? ' ' + s.nightColor : ''
  const nightBgAndColor = currentTheme === 'dark' ? ' ' + s.nightBgAndColor : ''

  return (
    <div className={s.genres + nightColor}>
      {areGenresFetching ? (
        <Spinner style={{ paddingTop: '0', width: '100px', height: '100px' }} />
      ) : (
        genreListWithIsClickedField?.map((genre) => {
          return (
            <button
              key={genre.id}
              className={s.genre + nightBgAndColor + (genre.isClicked ? ' ' + s.clicked : '')}
              onClick={() => onGenreHandler(genre.id)}
            >
              {genre.name}
            </button>
          )
        })
      )}
    </div>
  )
}
