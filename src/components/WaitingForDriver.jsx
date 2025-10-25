import React from 'react';

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
  if (!ride || !ride.captain) {
    return (
      <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 text-center rounded-t-3xl shadow-2xl">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-3 animate-pulse">
          <i className="ri-loader-4-line text-2xl text-white animate-spin"></i>
        </div>
        <h3 className="text-base font-bold text-gray-800 mb-2">Loading Driver Details</h3>
        <p className="text-sm text-gray-600">Please wait while we fetch your driver information...</p>
      </div>
    );
  }

  const { captain } = ride;

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-t-3xl relative pb-4">
      
      {/* Animated Background Blobs */}
      <div className='absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none'></div>
      <div className='absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none'></div>
      <div className='absolute bottom-0 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none'></div>

      {/* Drag Handle */}
      <div className="flex justify-center pt-3 mb-3 relative z-10">
        <div className="w-12 h-1.5 bg-gray-400 rounded-full"></div>
      </div>

      {/* Header with Success Icon */}
      <div className="text-center mb-4 px-4 relative z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-3 shadow-xl animate-bounce-slow">
          <i className="ri-check-double-line text-2xl sm:text-3xl text-white"></i>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
          Driver Assigned!
        </h2>
        <p className="text-sm text-gray-600">Your ride is confirmed</p>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setWaitingForDriver(false)}
        className="absolute top-4 right-4 z-20 p-2 hover:bg-gray-100 rounded-full transition-all transform hover:scale-110"
      >
        <i className="ri-close-line text-xl text-gray-600"></i>
      </button>

      {/* Content Container - No overflow here */}
      <div className="px-4 space-y-4 relative z-10">
        
        {/* Driver Card with Animation */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 sm:p-5 border-2 border-white/50 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl">
          
          <div className="flex items-center gap-3 mb-4">
            {/* Driver Avatar with Ring */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
              <img
                className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover shadow-lg border-4 border-white"
                src={captain.profileImage || "https://via.placeholder.com/100"}
                alt="Captain"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <i className="ri-check-line text-white text-xs"></i>
              </div>
            </div>

            {/* Driver Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold capitalize text-gray-800 truncate">
                {captain.fullname.firstname} {captain.fullname.lastname}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                  <i className="ri-car-line text-sm text-gray-600"></i>
                  <span className="text-xs text-gray-600 font-medium capitalize">
                    {captain.vehicle.vehicleType || 'Car'}
                  </span>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded-lg">
                  <span className="text-xs font-bold text-gray-700 uppercase">
                    {captain.vehicle.plate}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating Badge */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-2.5 py-1 rounded-full shadow-md">
                <i className="ri-star-fill text-white text-xs"></i>
                <span className="text-sm font-bold text-white">4.8</span>
              </div>
              <span className="text-xs text-gray-500 mt-0.5">Rating</span>
            </div>
          </div>

          {/* OTP Section - Properly Sized */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-3 sm:p-4 text-center">
            <p className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">Your Ride OTP</p>
            <div className="bg-white rounded-lg px-4 py-2 sm:py-2.5 inline-block shadow-inner">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black tracking-wider bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {ride.otp}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
              <i className="ri-information-line"></i>
              Share this with your driver
            </p>
          </div>
        </div>
    
        <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg p-3 sm:p-4 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
              <i className="ri-map-pin-user-fill text-lg text-white"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5 font-medium">Pickup Location</p>
              <p className="text-sm font-semibold text-gray-800 break-words leading-relaxed">
                {ride.pickup}
              </p>
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="bg-white/90 backdrop-blur-xl rounded-xl shadow-lg p-3 sm:p-4 border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
              <i className="ri-map-pin-2-fill text-lg text-white"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-0.5 font-medium">Destination</p>
              <p className="text-sm font-semibold text-gray-800 break-words leading-relaxed">
                {ride.destination}
              </p>
            </div>
          </div>
        </div>

        {/* Fare */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-lg p-3 sm:p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                <i className="ri-money-rupee-circle-fill text-lg text-white"></i>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">Total Fare</p>
                <p className="text-xs text-gray-500">Cash Payment</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl sm:text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ₹{ride.fare}
              </p>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 rounded-lg p-3 sm:p-4 shadow-md">
          <div className="flex items-start gap-3">
            <i className="ri-information-fill text-indigo-600 text-lg flex-shrink-0 mt-0.5"></i>
            <div>
              <h4 className="text-sm font-bold text-indigo-900 mb-1">Driver is on the way!</h4>
              <p className="text-xs text-indigo-700 leading-relaxed">
                Please share the OTP <span className="font-bold text-orange-600">{ride.otp}</span> with your driver when they arrive to start your ride.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default WaitingForDriver;