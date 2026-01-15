import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.config'
import logo1 from '../assets/logo1.png'

const CaptainSignup = () => {
  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
  const [ error, setError ] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const captainData = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType
      }
    }

    try {
      const response = await axios.post(`/captains/register`, captainData)

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
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
        setError('Please fill in all required fields correctly, including vehicle information.')
      } else if (status === 409) {
        setError('This email is already registered as a captain. Please login or use a different email.')
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
    <div className='min-h-screen w-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center py-6 px-3 sm:px-4 md:px-6 relative overflow-hidden'>
      
      
      <div className='absolute top-0 left-0 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none'></div>
      <div className='absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none'></div>
      <div className='absolute -bottom-32 left-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none'></div>

    
      <Link to="/" className="fixed top-3 left-3 sm:top-4 sm:left-4 z-50">
        <img 
          src={logo1} 
          alt="EasyGo" 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg object-cover ring-2 ring-white hover:scale-110 transition-transform duration-300" 
        />
      </Link>

      <div className='relative w-full max-w-md z-10'>
        <div className='bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 border border-white/50 transform transition-all duration-300'>
          
      
          <div className='text-center mb-5 sm:mb-6'>
            <div className='inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl mb-3 sm:mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300'>
              <i className="ri-steering-2-line text-3xl sm:text-4xl text-white"></i>
            </div>
            <h2 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>Join as Captain</h2>
            <p className='text-sm sm:text-base text-gray-600'>Start earning with EasyGo</p>
          </div>

        
          <form onSubmit={submitHandler} className='space-y-4 sm:space-y-5'>
            
       
            <div className='space-y-3 sm:space-y-4'>
              <div className='flex items-center gap-2 pb-2 border-b border-gray-200'>
                <i className="ri-user-line text-amber-600"></i>
                <h3 className='text-sm font-bold text-gray-700'>Personal Information</h3>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5'>First Name</label>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className='w-full rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all'
                    type="text"
                    placeholder='John'
                  />
                </div>
                <div>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5'>Last Name</label>
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className='w-full rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all'
                    type="text"
                    placeholder='Doe'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5'>Email Address</label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none'>
                    <i className="ri-mail-line text-gray-400 text-lg"></i>
                  </div>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all'
                    type="email"
                    placeholder='captain@example.com'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5'>Password</label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none'>
                    <i className="ri-lock-line text-gray-400 text-lg"></i>
                  </div>
                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all'
                    type="password"
                    placeholder='Min. 6 characters'
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Details Section */}
            <div className='space-y-3 sm:space-y-4 pt-2'>
              <div className='flex items-center gap-2 pb-2 border-b border-gray-200'>
                <i className="ri-car-line text-amber-600"></i>
                <h3 className='text-sm font-bold text-gray-700'>Vehicle Details</h3>
              </div>

              {/* Vehicle Type - Beautiful Radio Cards */}
              <div>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-2'>Vehicle Type</label>
                <div className='grid grid-cols-3 gap-2 sm:gap-3'>
                  <label className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${vehicleType === 'car' ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-sm'}`}>
                    <input
                      type="radio"
                      name="vehicleType"
                      value="car"
                      checked={vehicleType === 'car'}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className='sr-only'
                      required
                    />
                    <i className={`ri-car-line text-2xl sm:text-3xl mb-1 sm:mb-2 transition-colors ${vehicleType === 'car' ? 'text-amber-600' : 'text-gray-400'}`}></i>
                    <span className={`text-xs sm:text-sm font-semibold transition-colors ${vehicleType === 'car' ? 'text-amber-700' : 'text-gray-600'}`}>Car</span>
                  </label>
                  
                  <label className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${vehicleType === 'auto' ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-sm'}`}>
                    <input
                      type="radio"
                      name="vehicleType"
                      value="auto"
                      checked={vehicleType === 'auto'}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className='sr-only'
                    />
                    <i className={`ri-taxi-line text-2xl sm:text-3xl mb-1 sm:mb-2 transition-colors ${vehicleType === 'auto' ? 'text-amber-600' : 'text-gray-400'}`}></i>
                    <span className={`text-xs sm:text-sm font-semibold transition-colors ${vehicleType === 'auto' ? 'text-amber-700' : 'text-gray-600'}`}>Auto</span>
                  </label>
                  
                  <label className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${vehicleType === 'moto' ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-gray-200 bg-white hover:border-amber-300 hover:shadow-sm'}`}>
                    <input
                      type="radio"
                      name="vehicleType"
                      value="moto"
                      checked={vehicleType === 'moto'}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className='sr-only'
                    />
                    <i className={`ri-motorbike-line text-2xl sm:text-3xl mb-1 sm:mb-2 transition-colors ${vehicleType === 'moto' ? 'text-amber-600' : 'text-gray-400'}`}></i>
                    <span className={`text-xs sm:text-sm font-semibold transition-colors ${vehicleType === 'moto' ? 'text-amber-700' : 'text-gray-600'}`}>Moto</span>
                  </label>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5'>Vehicle Color</label>
                  <input
                    required
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    className='w-full rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all'
                    type="text"
                    placeholder='Black'
                  />
                </div>
                <div>
                  <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5'>Plate Number</label>
                  <input
                    required
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className='w-full rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all uppercase'
                    type="text"
                    placeholder='AB-1234'
                  />
                </div>
              </div>

              <div>
                <label className='block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5'>Passenger Capacity</label>
                <input
                  required
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  className='w-full rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 text-sm sm:text-base focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all'
                  type="number"
                  placeholder='4'
                  min="1"
                  max="10"
                />
              </div>
            </div>

            {error && (
              <div className='bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-lg animate-shake'>
                <div className='flex items-center gap-2'>
                  <i className="ri-error-warning-line text-red-500"></i>
                  <p className="text-xs sm:text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className='w-full py-3 sm:py-3.5 rounded-xl text-white font-semibold text-base sm:text-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isLoading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-xl"></i>
                  Registering...
                </>
              ) : (
                <>
                  Register as Captain
                  <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className='mt-5 pt-5 border-t border-gray-200'>
            <p className='text-center text-xs sm:text-sm text-gray-600'>
              Already have an account? 
              <Link to='/captain-login' className='ml-1 text-amber-600 font-semibold hover:text-amber-700 hover:underline transition'>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainSignup