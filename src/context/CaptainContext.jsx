import React, { createContext, useState, useEffect } from 'react'
import axios from '../axios.config'

export const CaptainDataContext = createContext()

export const CaptainDataProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const updateCaptain = (newCaptainData) => {
    setCaptain(newCaptainData)
    localStorage.setItem('captainData', JSON.stringify(newCaptainData))
  }

  const fetchCaptainData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const token = localStorage.getItem('token')
      if (!token) {
        setIsLoading(false)
        setError(new Error('Please login first'))
        return null
      }

      const response = await axios.get(
        `/captains/profile`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      const captainData = response.data
      
      localStorage.setItem('captainData', JSON.stringify(captainData))
      setCaptain(captainData)
      setError(null)
      setIsLoading(false)
      return captainData

    } catch (err) {
      setError(err)
      setIsLoading(false)
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('captainData')
        setCaptain(null)
        setError(new Error('Session expired. Please login again.'))
      }
      return null
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      setError(new Error('Please login to continue'))
      return
    }

    fetchCaptainData()
  }, [])

  return (
    <CaptainDataContext.Provider value={{ 
      captain, 
      setCaptain,
      updateCaptain,
      isLoading,
      error,
      refetch: fetchCaptainData 
    }}>
      {children}
    </CaptainDataContext.Provider>
  )
}


export default CaptainDataProvider