import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'

const MAX_STACK = 999

export const useAppHistory = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 1. Если в state есть backTo – берём его, иначе – текущий pathname
  const initialPath = (location.state as any)?.backTo ?? location.pathname

  const stack = useRef<string[]>([initialPath])

  useEffect(() => {
    const last = stack.current[stack.current.length - 1]
    if (last !== location.pathname) {
      stack.current.push(location.pathname)
      if (stack.current.length > MAX_STACK) stack.current.shift()
    }
  }, [location.pathname])

  const canGoBack = () => stack.current.length > 1
  const canGoForward = () => false

  const back = () => canGoBack() && navigate(-1)
  const go = (delta: number) => navigate(delta)

  return { stack: stack.current, canGoBack, back, canGoForward, go }
}
