import s from './ratingRangeSlider.module.css'
import RangeSlider from 'react-range-slider-input'
import type { ThemeMode } from '@/app/model/app-slice.ts'

type PropsType = {
  currentTheme: ThemeMode
  range: [number, number]
  setRange: (arr: [number, number]) => void
}
export const RatingRangeSlider = ({ setRange, range, currentTheme }: PropsType) => {
  const nightColor = currentTheme === 'dark' ? ' ' + s.nightColor : ''
  const nightBgAndColor = currentTheme === 'dark' ? ' ' + s.nightBgAndColor : ''

  return (
    <div className={s.ratingRangeWrapper}>
      <div className={s.ratingHeader + nightColor}>
        <span>Rating</span>
        <span className={s.ratingCount}>
          <span>{range[0].toFixed(1)}</span> <span>-</span> <span>{range[1].toFixed(1)}</span>
        </span>
      </div>
      <div className={s.rangeSliderWrapper}>
        <RangeSlider
          min={0}
          max={10}
          step={0.1}
          value={range}
          onInput={(val) => setRange(val)}
          className={s.myRange + nightBgAndColor}
        />
      </div>
    </div>
  )
}
