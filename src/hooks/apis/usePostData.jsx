import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const usePostData = (onSuccess = () => {}) => {
  const axiosSecure = useAxiosSecure()

  return useMutation({
    mutationFn: (object) => {
      const { method, url, data = null } = object
      if (method === 'post') return axiosSecure.post(url, data)
      if (method === 'patch') return axiosSecure.patch(url, data)
      if (method === 'delete') return axiosSecure.delete(url)
    },
    onSuccess,
  })
}

export default usePostData
