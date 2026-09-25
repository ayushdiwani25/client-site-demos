import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Gym from './demos/gym/Gym'

// Add the next demos here, e.g. <Route path="/clinic" element={<Clinic />} />
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gym" element={<Gym />} />
    </Routes>
  )
}
