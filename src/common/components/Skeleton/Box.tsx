import type { ReactNode } from 'react'
type Props = {
  children: ReactNode
  style?: React.CSSProperties
}

export const Box = ({ children, style }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '24px',
        width: '100%',
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
