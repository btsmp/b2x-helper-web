import { Routes, Route } from 'react-router-dom'
import { Login } from '../components/Login'

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  )
}