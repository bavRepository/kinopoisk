import { Routing } from '@/common/routing'
import { Header } from '@/common/components'
import s from './app.module.css'
import { ToastContainer } from 'react-toastify'
// import { useGlobalLoading } from '@/common/hooks/useGlobalLoading.ts'
// import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'
import { useEffect, useState } from 'react'
import { Footer } from '@/common/components/Footer/Footer.tsx'
import { restoreState } from '@/common/localStorage/localStorage.ts'
import { useAppDispatch } from '@/common/hooks'
import { changeThemeModeAC } from '@/app/model/app-slice.ts'
import { SkeletonTheme } from 'react-loading-skeleton'

export const App = () => {
  const [loaded, setLoaded] = useState(false)
  const dispatch = useAppDispatch()
  const theme = restoreState('light')
  dispatch(changeThemeModeAC({ themeMode: theme }))
  // 'linear-gradient(90deg, #F3F4F6 40%, #FFFFFF 50%, #F3F4F6 60%)'
  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true))
  }, [])
  // const skeletonGradientAnimation = 'linear-gradient(90deg, transparent, var(--skeleton-highlight), transparent)'
  return (
    <SkeletonTheme baseColor={'#c1c0c8'} highlightColor={'#E5E7EB'}>
      <div className={`${s.contentWrapper} ${loaded ? s.loaded : ''}`}>
        <Header />
        {/*{isGlobalLoading && <LinearProgress />}*/}
        <Routing />
        <ToastContainer />
        <Footer />
      </div>
    </SkeletonTheme>
  )
}
