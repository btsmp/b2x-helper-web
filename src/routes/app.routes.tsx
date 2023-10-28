import { Route, Routes } from 'react-router-dom'
import { Home } from '../components/Home'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}