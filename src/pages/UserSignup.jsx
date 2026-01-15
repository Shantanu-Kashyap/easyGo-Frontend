import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axios.config'
import { UserDataContext } from '../context/UserContext'
import logo1 from '../assets/logo1.png'

const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`/users/register`, newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (err) {
      const errorData = err?.response?.data
      const status = err?.response?.status
      
      if (errorData?.description) {
        // Use the detailed description from backend
        setError(errorData.description)
      } else if (errorData?.message) {
        // Fallback to message if no description
        setError(errorData.message)
      } else if (status === 400) {
        setError('Please fill in all required fields correctly.')
      } else if (status === 409) {
        setError('This email is already registered. Please login or use a different email.')
      } else if (status >= 500) {
        setError('Server error. Our servers are experiencing issues. Please try again later.')
      } else {
        setError('Registration failed. Please check your information and try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='h-screen w-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden'>
      
      {/* Animated background elements */}
      <div className='absolute top-0 left-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none'></div>
      <div className='absolute top-0 right-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none'></div>
      <div className='absolute bottom-0 left-1/2 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none'></div>

      {/* Logo - Top Left */}
      <Link to="/" className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50">
        <img 
          src={logo1} 
          alt="EasyGo" 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg object-cover ring-2 ring-white hover:scale-110 transition-transform duration-300" 
        />
      </Link>

      {/* Main Card */}
      <div className='relative w-full max-w-md z-10'>
        <div className='bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 border border-white/50'>
          
          {/* Header - Compact */}
          <div className='text-center mb-4 sm:mb-5'>
            <div className='inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl mb-2 sm:mb-3 shadow-lg'>
              <i className="ri-user-add-line text-2xl sm:text-3xl text-white"></i>
            </div>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-1'>Create Account</h2>
            <p className='text-xs sm:text-sm text-gray-600'>Join EasyGo today</p>
          </div>

          {/* Form - Compact */}
          <form onSubmit={submitHandler} className='space-y-2.5 sm:space-y-3'>
            <div className='grid grid-cols-2 gap-2 sm:gap-3'>
              <div>
                <label className='block text-xs font-semibold text-gray-700 mb-1'>First Name</label>
                <input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='w-full rounded-lg pl-3 pr-3 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all'
                  type="text"
                  placeholder='John'
                />
              </div>
              <div>
                <label className='block text-xs font-semibold text-gray-700 mb-1'>Last Name</label>
                <input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='w-full rounded-lg pl-3 pr-3 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all'
                  type="text"
                  placeholder='Doe'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1'>Email</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <i className="ri-mail-line text-gray-400 text-base"></i>
                </div>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full rounded-lg pl-10 pr-3 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all'
                  type="email"
                  placeholder='email@example.com'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs font-semibold text-gray-700 mb-1'>Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <i className="ri-lock-line text-gray-400 text-base"></i>
                </div>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full rounded-lg pl-10 pr-3 py-2 sm:py-2.5 bg-gray-50 border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all'
                  type="password"
                  placeholder='Enter password'
                />
              </div>
            </div>

            {error && (
              <div className='bg-red-50 border-l-4 border-red-500 p-2.5 rounded-lg'>
                <div className='flex items-center gap-2'>
                  <i className="ri-error-warning-line text-red-500 text-sm"></i>
                  <p className="text-xs text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className='w-full py-2.5 rounded-lg text-white font-semibold text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Creating...
                </>
              ) : (
                <>
                  Create Account
                  <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='mt-4'>
            <p className='text-center text-xs sm:text-sm text-gray-600'>
              Already have an account? 
              <Link to='/login' className='ml-1 text-emerald-600 font-semibold hover:text-emerald-700 hover:underline'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignup