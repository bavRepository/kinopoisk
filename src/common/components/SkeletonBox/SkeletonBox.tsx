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
        gap: '22px',
        // lineHeight: 3,
        // marginBottom: '0.5rem',
        width: '100%',
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
