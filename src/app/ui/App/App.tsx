import { Routing } from '@/common/routing'
import { Header } from '@/common/components'
import s from './app.module.css'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Footer } from '@/common/components/Footer/Footer.tsx'
import { restoreState } from '@/common/localStorage/localStorage.ts'
import { useAppDispatch, useAppSelector } from '@/common/hooks'
import { changeThemeModeAC, selectAppStatus } from '@/app/model/app-slice.ts'
import { SkeletonTheme } from 'react-loading-skeleton'
import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'
import { ScrollToTop } from '@/common/components/ScrollToTop/ScrollToTop.tsx'
import { useNavigate } from 'react-router'

export const App = () => {
  const originalNavigate = useNavigate

  // const isGlobalLoading = useGlobalLoading()
  const dispatch = useAppDispatch()

  const [loaded, setLoaded] = useState(false)

  const theme = restoreState('light')
  const loadingStatus = useAppSelector(selectAppStatus)

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true))
    dispatch(changeThemeModeAC({ themeMode: theme }))
  }, [])

  return (
    <SkeletonTheme baseColor={'#c1c0c8'} highlightColor={'#E5E7EB'}>
      <div className={`${s.contentWrapper} ${loaded ? s.loaded : ''}`}>
        <ScrollToTop />
        <Header />

        {loadingStatus === 'loading' && <LinearProgress />}
        <Routing />
        <ToastContainer />
        <Footer />
      </div>
    </SkeletonTheme>
  )
}
