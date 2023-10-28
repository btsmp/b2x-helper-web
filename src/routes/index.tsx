import { BrowserRouter } from 'react-router-dom'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export function Routes() {
  const { tokenData } = useContext(AuthContext)
  return (
    <BrowserRouter>{tokenData ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
  )
}