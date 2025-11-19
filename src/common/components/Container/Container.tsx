import type { ReactNode } from 'react'
import s from './container.module.css'
type Props = {
  children?: ReactNode
  style?: React.CSSProperties
}
export const Container = ({ children, style }: Props) => {
  return (
    <div className={s.container} style={style}>
      {children ? children : null}
    </div>
  )
}
