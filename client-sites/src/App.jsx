import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, Outlet, Link, useLocation } from 'react-router-dom'
import { Expand, Minimize2 } from 'lucide-react'
import ErrorBoundary from './shared/components/ErrorBoundary'
import LoadingSpinner from './shared/components/LoadingSpinner'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
const Gym = lazy(() => import('./demos/gym/StrideStrengthClub'))
const Photographer = lazy(() => import('./demos/photographer/Photographer'))
const RealEstate = lazy(() => import('./demos/realestate/AureliaEstates'))
const Studio = lazy(() => import('./demos/studio/PalisadeStudio'))

// Code-split: car-rental's plain global CSS only loads on its own routes this way,
// instead of shipping on every page and risking class-name collisions with the others.
const CarRental = lazy(() => import('./demos/carrental/CarRental'))

function DemoLayout() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const syncFullscreen = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => document.removeEventListener('fullscreenchange', syncFullscreen)
  }, [])

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else {
      await document.documentElement.requestFullscreen()
    }
  }

  return (
    <>
      <div className="flex h-10 items-center justify-between bg-ink px-4 text-xs text-chalk sm:px-6">
        <Link to="/" className="font-semibold transition-opacity hover:opacity-75">
          ← Back to client sites
        </Link>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="inline-flex items-center gap-2 font-semibold transition-opacity hover:opacity-75"
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Expand size={14} />}
          {isFullscreen ? 'Exit full screen' : 'View in full screen'}
        </button>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<DemoLayout />}>
          <Route path="/gym" element={<Gym />} />
          <Route path="/photographer" element={<Photographer />} />
          <Route path="/real-estate" element={<RealEstate />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/car-rental/*" element={<CarRental />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  )
}
