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
        lineHeight: 3,
        padding: '1rem',
        marginBottom: '0.5rem',
        width: 100,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
