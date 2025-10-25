import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LookingForDriver = (props) => {
    return (
        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-t-3xl p-4 sm:p-6 md:p-8 flex flex-col min-h-screen relative overflow-hidden">
            
            {/* Animated background blobs */}
            <div className='absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none'></div>
            <div className='absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none'></div>
            <div className='absolute bottom-0 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none'></div>

            {/* Drag handle */}
            <div className="flex justify-center mb-4 sm:mb-6 relative z-10">
                <div className="w-12 h-1.5 bg-gray-400 rounded-full"></div>
            </div>

            {/* Header Section */}
            <div className="w-full text-center relative z-10 mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4 shadow-xl animate-bounce">
                    <i className="ri-steering-2-line text-3xl sm:text-4xl text-white"></i>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    Looking for a Driver
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">
                    We're finding the best driver for you!
                </p>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full px-2 sm:px-6 lg:px-32 mb-4 relative z-10">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full animate-loading"></div>
                </div>
                <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 animate-pulse">
                    Connecting to nearby drivers...
                </p>
            </div>

            {/* Vehicle Animation */}
            <div className="flex justify-center items-center my-4 sm:my-6 relative z-10">
                <div className="relative">
                    <img
                        className="w-32 sm:w-40 md:w-48 lg:w-56 object-contain drop-shadow-2xl animate-float"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ7Kt54z31PkbdlqmqnyWnaCjvcLYRG-T_8Q&s"
                        alt="Vehicle animation"
                    />
                    {/* Spinning dots around vehicle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 sm:w-48 md:w-56 lg:w-64 h-40 sm:h-48 md:h-56 lg:h-64 border-2 border-dashed border-blue-400 rounded-full animate-spin-slow"></div>
                    </div>
                </div>
            </div>

            {/* Trip Details Cards */}
            <div className="flex-1 overflow-y-auto w-full px-2 sm:px-6 lg:px-32 space-y-3 sm:space-y-4 relative z-10">
                
                {/* Pickup Location Card */}
                <div className="flex items-start bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-white/50">
                    <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-md">
                            <i className="ri-map-pin-user-fill text-xl sm:text-2xl text-white"></i>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 mb-1">
                            Pick-up Location
                        </h4>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 break-words leading-relaxed">
                            {props.pickup}
                        </p>
                    </div>
                </div>

                {/* Destination Card */}
                <div className="flex items-start bg-white/80 backdrop-blur-sm p-4 sm:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-white/50">
                    <div className="flex-shrink-0 mr-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                            <i className="ri-map-pin-2-fill text-xl sm:text-2xl text-white"></i>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base md:text-lg text-gray-800 mb-1">
                            Destination
                        </h4>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 break-words leading-relaxed">
                            {props.destination}
                        </p>
                    </div>
                </div>

                {/* Fare Card */}
                <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                            <i className="ri-money-rupee-circle-fill text-xl sm:text-2xl text-white"></i>
                        </div>
                        <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">Estimated Fare</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            ₹{props.fare[props.vehicleType]}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-600 font-medium">Cash Payment</span>
                    </div>
                </div>

                {/* Info Message */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-indigo-500 p-4 rounded-xl shadow-md">
                    <div className="flex items-start gap-3">
                        <i className="ri-information-fill text-indigo-600 text-xl sm:text-2xl flex-shrink-0 mt-0.5"></i>
                        <div>
                            <h4 className="text-sm sm:text-base font-bold text-indigo-900 mb-1">Please Wait</h4>
                            <p className="text-xs sm:text-sm text-indigo-700 leading-relaxed">
                                This usually takes less than a minute. Your driver will be assigned shortly!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cancel Button */}
            <div className="w-full px-2 sm:px-6 lg:px-32 pt-4 sm:pt-6 relative z-10">
                <button
                    onClick={() => props.setVehicleFound(false)}
                    className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                    <i className="ri-close-circle-line text-xl"></i>
                    Cancel Ride
                </button>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes loading {
                    0% { width: 0%; }
                    50% { width: 70%; }
                    100% { width: 100%; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -20px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(20px, 20px) scale(1.05); }
                }

                .animate-loading {
                    animation: loading 2s ease-in-out infinite;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
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
    )
}

export default LookingForDriver