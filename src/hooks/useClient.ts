import axios from 'axios'
import { useRef } from 'react'

import { BASE_URL } from '@/config'

const useClient = () => {
  const client = useRef(axios.create({
    baseURL: BASE_URL,
    headers: {
    }
  }))

  return client.current
}

export default useClient
