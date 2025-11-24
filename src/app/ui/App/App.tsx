import { Routing } from '@/common/routing'
import { Header } from '@/common/components'
import s from './app.module.css'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Footer } from '@/common/components/Footer/Footer.tsx'
import { restoreState } from '@/common/localStorage/localStorage.ts'
import { useAppDispatch } from '@/common/hooks'
import { changeThemeModeAC } from '@/app/model/app-slice.ts'
import { SkeletonTheme } from 'react-loading-skeleton'
import { useGlobalLoading } from '@/common/hooks/useGlobalLoading.ts'
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'
import { ScrollToTop } from '@/common/components/ScrollToTop/ScrollToTop.tsx'

export const App = () => {
  const isGlobalLoading = useGlobalLoading()
  const [loaded, setLoaded] = useState(false)
  const dispatch = useAppDispatch()
  const theme = restoreState('light')
  dispatch(changeThemeModeAC({ themeMode: theme }))
  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true))
  }, [])

  return (
    <SkeletonTheme baseColor={'#c1c0c8'} highlightColor={'#E5E7EB'}>
      <div className={`${s.contentWrapper} ${loaded ? s.loaded : ''}`}>
        <ScrollToTop />
        <Header />
        {isGlobalLoading && <LinearProgress />}
        <Routing />
        <ToastContainer />
        <Footer />
      </div>
    </SkeletonTheme>
  )
}
