import { Routing } from '@/common/routing'
import { Header } from '@/common/components'
import s from './app.module.css'
import { ToastContainer } from 'react-toastify'
// import { useGlobalLoading } from '@/common/hooks/useGlobalLoading.ts'
// import { LinearProgress } from '@/common/components/LinearProgress/LinearProgress.tsx'
import { useEffect, useState } from 'react'
import { Footer } from '@/common/components/Footer/Footer.tsx'

export const App = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true))
  }, [])

  // const isGlobalLoading = useGlobalLoading()
  return (
    <div className={`${s.contentWrapper} ${loaded ? s.loaded : ''}`}>
      <Header />
      {/*{isGlobalLoading && <LinearProgress />}*/}
      <Routing />
      <ToastContainer />
      <Footer />
    </div>
  )
}
