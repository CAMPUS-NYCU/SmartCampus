import { useState } from 'react'

const useToken = () => {
  const [token, setToken] = useState('')
  return { token, setToken }
}

export default useToken
