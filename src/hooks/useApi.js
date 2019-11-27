import axios from 'axios'
import { useContext } from 'react'

import { Config } from 'bigcorp/src/contexts'

const useApi = () => {
  const config = useContext(Config)

  return {
    ceo: async () => {
      let ceo = {}
      try {
        const response = await axios.get(`${config.api}?manager=0`)
        ceo = (response.status === 200 && response.data.length && response.data[0]) || ceo
      } catch (error) {
        console.error(error.toString())
      }
      return ceo
    },
    staff: async (id) => {
      const staff = []
      try {
        const response = await axios.get(`${config.api}?manager=${id}`)
        if (response.status === 200 && response.data.length) {
          for (const employee of response.data) {
            staff.push(employee)
          }
        }
      } catch (error) {
        console.error(error.toString())
      }
      return staff
    }
  }
}

export default useApi
