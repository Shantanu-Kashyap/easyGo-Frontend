import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo1 from '../assets/logo1.png'

const Start = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className='h-screen overflow-hidden relative'>
      {/* Animated gradient orbs in background */}
      <div className='absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl animate-pulse pointer-events-none'></div>
      <div className='absolute bottom-20 right-10 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse pointer-events-none'></div>

      {/* Background with overlay */}
      <div className='absolute inset-0 bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60'></div>
      </div>

      {/* Content with centered max-width container */}
      <div className='relative h-full flex flex-col justify-between z-10 max-w-[1400px] mx-auto px-4 sm:px-6'>
        {/* Header with Logo */}
        <div className={`pt-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className='flex items-center gap-3'>
            <img 
              className='w-14 h-14 rounded-full object-cover shadow-xl ring-2 ring-white/30 hover:scale-110 transition-transform duration-300' 
              src={logo1} 
              alt="EasyGo Logo" 
            />
            <div>
              <h1 className='text-white text-2xl font-bold tracking-tight drop-shadow-lg'>
                EasyGo
              </h1>
              <p className='text-white/70 text-xs font-medium drop-shadow'>
                Your ride, your way
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`transition-all duration-1000 delay-300 mb-6 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Features Grid - Hidden on mobile, smaller on large screens */}
          <div className='hidden md:grid grid-cols-3 gap-4 mb-4 max-w-4xl mx-auto'>
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer'>
              <div className='w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-3 shadow-lg'>
                <i className="ri-map-pin-line text-2xl text-white"></i>
              </div>
              <h3 className='text-white font-semibold text-base mb-1'>Choose Location</h3>
              <p className='text-white/70 text-xs'>Pick your destination easily</p>
            </div>
            
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 delay-75 cursor-pointer'>
              <div className='w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-3 shadow-lg'>
                <i className="ri-car-line text-2xl text-white"></i>
              </div>
              <h3 className='text-white font-semibold text-base mb-1'>Select Ride</h3>
              <p className='text-white/70 text-xs'>Choose from multiple options</p>
            </div>
            
            <div className='bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 delay-150 cursor-pointer'>
              <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mb-3 shadow-lg'>
                <i className="ri-wallet-line text-2xl text-white"></i>
              </div>
              <h3 className='text-white font-semibold text-base mb-1'>Safe Payment</h3>
              <p className='text-white/70 text-xs'>Secure and hassle-free</p>
            </div>
          </div>

          {/* Main CTA Card - Smaller and more compact */}
          <div className='bg-gradient-to-br from-lime-50 to-yellow-50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-4 sm:p-5 relative z-20'>
            {/* Mobile Features */}
            <div className='grid grid-cols-3 gap-3 mb-4 md:hidden'>
              <div className='text-center'>
                <div className='w-10 h-10 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-1.5 shadow-md'>
                  <i className="ri-map-pin-line text-lg text-white"></i>
                </div>
                <p className='text-[10px] font-medium text-gray-700'>Location</p>
              </div>
              <div className='text-center'>
                <div className='w-10 h-10 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mb-1.5 shadow-md'>
                  <i className="ri-car-line text-lg text-white"></i>
                </div>
                <p className='text-[10px] font-medium text-gray-700'>Select</p>
              </div>
              <div className='text-center'>
                <div className='w-10 h-10 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mb-1.5 shadow-md'>
                  <i className="ri-wallet-line text-lg text-white"></i>
                </div>
                <p className='text-[10px] font-medium text-gray-700'>Payment</p>
              </div>
            </div>

            <div className='text-center sm:text-left'>
              <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight'>
                Get Started with <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>EasyGo</span>
              </h2>
              <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-5'>
                Book your ride in seconds. Safe, reliable, and affordable transportation at your fingertips.
              </p>
            </div>

            <Link 
              to='/login' 
              className='group relative flex items-center justify-center w-full bg-gradient-to-r from-black via-gray-900 to-black text-white py-3 sm:py-3.5 rounded-xl font-semibold text-base sm:text-lg shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer z-30 touch-manipulation'
            >
              <span className='relative z-10 flex items-center gap-2'>
                Continue
                <i className="ri-arrow-right-line text-xl group-hover:translate-x-2 transition-transform duration-300"></i>
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </Link>

            {/* Stats - Smaller */}
            <div className='grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-gray-200'>
              <div className='text-center'>
                <p className='text-xl sm:text-2xl font-bold text-gray-900'>Lot's of</p>
                <p className='text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1'>Happy Users</p>
              </div>
              <div className='text-center'>
                <p className='text-xl sm:text-2xl font-bold text-gray-900'>50+</p>
                <p className='text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1'>Rides Done</p>
              </div>
              <div className='text-center'>
                <p className='text-xl sm:text-2xl font-bold text-gray-900'>4.9★</p>
                <p className='text-[10px] sm:text-xs text-gray-600 mt-0.5 sm:mt-1'>Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start