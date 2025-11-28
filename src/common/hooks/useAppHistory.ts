// useAppHistory.ts
import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'

const MAX_STACK = 10

export const useAppHistory = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const stack = useRef<string[]>([location.pathname])

  useEffect(() => {
    // при смене location добавляем новый путь, но не дублируем подряд
    const last = stack.current[stack.current.length - 1]
    if (last !== location.pathname) {
      stack.current.push(location.pathname)
      if (stack.current.length > MAX_STACK) stack.current.shift()
    }
  }, [location.pathname])

  const canGoBack = () => stack.current.length > 1
  const canGoForward = () => false // упрощённо, без «вперёд»

  const back = () => canGoBack() && navigate(-1)
  const go = (delta: number) => navigate(delta)

  return { stack: stack.current, canGoBack, back, canGoForward, go }
}
