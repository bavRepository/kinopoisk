import { useEffect } from 'react'
import { useLocation } from 'react-router'

export const ScrollToTop = () => {
  const { pathname, key } = useLocation() // key меняется при каждом шаге истории

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, key]) // добавляем key, чтобы срабатывало и при «Назад»

  return null
}
