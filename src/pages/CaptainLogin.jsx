import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.config'
import { CaptainDataContext } from '../context/CaptainContext'
import logo1 from '../assets/logo1.png'

const Captainlogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const captain = {
      email: email,
      password
    }

    try {
      const response = await axios.post(`/captains/login`, captain)

      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch (err) {
      const status = err?.response?.status
      if (status === 400 || status === 401) {
        setError('Invalid email or password')
      } else if (status === 404) {
        setError('Captain account not found')
      } else {
        setError('Server error — please try again later')
      }
    } finally {
      setPassword('')
      setIsLoading(false)
    }
  }

  return (
    <div className='h-screen w-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-3 sm:p-4 relative overflow-hidden'>
      
      {/* Animated background elements */}
      <div className='absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none'></div>
      <div className='absolute top-0 right-0 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none'></div>
      <div className='absolute bottom-0 left-1/2 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none'></div>

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
        <div className='bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 border border-white/50'>
          
          {/* Header */}
          <div className='text-center mb-5 sm:mb-6'>
            <div className='inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl mb-3 shadow-lg'>
              <i className="ri-steering-2-line text-2xl sm:text-3xl text-white"></i>
            </div>
            <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-1'>Captain Login</h2>
            <p className='text-xs sm:text-sm text-gray-600'>Welcome back, Captain</p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className='space-y-3 sm:space-y-4'>
            <div>
              <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5'>Email</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none'>
                  <i className="ri-mail-line text-gray-400 text-base sm:text-lg"></i>
                </div>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 text-sm sm:text-base focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all'
                  type="email"
                  placeholder='captain@example.com'
                />
              </div>
            </div>

            <div>
              <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5'>Password</label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none'>
                  <i className="ri-lock-line text-gray-400 text-base sm:text-lg"></i>
                </div>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 text-sm sm:text-base focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all'
                  type="password"
                  placeholder='Enter password'
                />
              </div>
            </div>

            {error && (
              <div className='bg-red-50 border-l-4 border-red-500 p-3 rounded-lg'>
                <div className='flex items-center gap-2'>
                  <i className="ri-error-warning-line text-red-500 text-sm"></i>
                  <p className="text-xs sm:text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className='w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-white font-semibold text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className='relative my-4 sm:my-5'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-200'></div>
            </div>
            <div className='relative flex justify-center text-xs'>
              <span className='px-3 bg-white text-gray-500 font-medium'>or</span>
            </div>
          </div>

          {/* Footer Links */}
          <div className='space-y-3'>
            <p className='text-center text-xs sm:text-sm text-gray-600'>
              Want to join as Captain? 
              <Link to='/captain-signup' className='ml-1 text-green-600 font-semibold hover:text-green-700 hover:underline'>
                Register here
              </Link>
            </p>
            
            <Link 
              to='/login' 
              className='flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl px-4 py-2.5 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base'
            >
              <i className="ri-user-line"></i>
              Sign in as User
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Captainlogin