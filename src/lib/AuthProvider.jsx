import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate, useLocation } from 'react-router-dom'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .get('http://localhost:9000/api/v1/auth/me', {
          headers: { authorization: `bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data.user)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:9000/api/v1/auth/login',
        { email, password }
      )
      const { token, user } = response.data
      localStorage.setItem('token', token)
      setUser(user)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const isAuthenticated = () => !!user

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// Protected route wrapper component
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated()) {
    return <Navigate to='/sign-in' state={{ from: location }} replace />
  }

  return children
}

// Public route wrapper component (for auth pages)
export const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated()) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />
  }

  return children
}
