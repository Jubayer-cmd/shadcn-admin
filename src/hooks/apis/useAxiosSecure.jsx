import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

import useAuth from './useAuth'

const axiosSecure = axios.create({
  baseURL: 'https://empower-u-server.vercel.app/',
})

const useAxiosSecure = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem('access-token')
      config.headers.authorization = `bearer ${token}`
      return config
    })
    return () => axios.interceptors.request.eject(reqInterceptor)
  }, [])

  useEffect(() => {
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error.response.status
        if (status === 401 || status === 403) {
          await logOut()
          navigate('/signin')
        }
        return Promise.reject(error)
      }
    )
    return () => axios.interceptors.request.eject(resInterceptor)
  }, [])
  return axiosSecure
}

export default useAxiosSecure
