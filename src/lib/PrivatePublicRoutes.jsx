import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './utils'

// Loading component with a basic spinner
const LoadingScreen = () => (
  <div className='flex min-h-screen items-center justify-center'>
    <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900' />
  </div>
)

// Protected Route wrapper component
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    // Save the attempted location for redirecting back after login
    return <Navigate to='/sign-in' state={{ from: location }} replace />
  }

  return children
}

// Public Route wrapper component
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen />
  }

  if (isAuthenticated) {
    // Redirect to the attempted protected page or homepage
    return <Navigate to={location.state?.from?.pathname || '/'} replace />
  }

  return children
}
