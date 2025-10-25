import React, { useEffect, useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import LiveTracking from '../components/LiveTracking'
import axios from '../axios.config'

const loadRazorpay = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Razorpay SDK failed to load'))
    document.body.appendChild(script)
  })
}

const Riding = () => {
    const location = useLocation()
    const { pickup, destination, ride, fare, vehicleType } = location.state || {}
    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)
    const navigate = useNavigate()
    const [isPanelExpanded, setIsPanelExpanded] = useState(false)

    useEffect(() => {
        if (ride && vehicleType && !ride.vehicleType) {
            ride.vehicleType = vehicleType;
        }
    }, [ride, vehicleType]);

    useEffect(() => {
        if (!socket) {
            return;
        }

        if (user?._id) {
            socket.emit('join', {
                userId: user._id,
                userType: 'user'
            });
        }

        const handleRideEnd = (data) => {
            alert('Ride completed successfully!');
            navigate('/home', { replace: true });
        };

        const handleRideCompleted = (data) => {
            alert('Ride completed successfully!');
            navigate('/home', { replace: true });
        };
        socket.on('ride-ended', handleRideEnd);
        socket.on('ride-completed', handleRideCompleted);
   
        socket.on('ride-ended-broadcast', handleRideEnd);
        socket.on('ride-completed-broadcast', handleRideCompleted);

        const originalEmit = socket.emit;
        socket.emit = function(...args) {
            return originalEmit.apply(this, args);
        };

        const originalOnAny = socket.onAny || function() {};
        socket.onAny = function(event, ...args) {
            return originalOnAny.call(this, event, ...args);
        };

        return () => {
            socket.off('ride-ended', handleRideEnd);
            socket.off('ride-completed', handleRideCompleted);
            socket.off('ride-ended-broadcast', handleRideEnd);
            socket.off('ride-completed-broadcast', handleRideCompleted);
        };
    }, [socket, navigate, user]);

    const handlePayment = async () => {
       
        const amountValue = (fare && vehicleType && fare[vehicleType]) ? fare[vehicleType] : (ride?.fare || 0)
        if (!amountValue || amountValue <= 0) {
            alert('Invalid amount for payment')
            return
        }

        try {
            await loadRazorpay()

            const orderRes = await axios.post('/payment/order', {
                amount: amountValue,
                info: {
                    userId: user?._id,
                    rideId: ride?._id
                }
            })

            const order = orderRes?.data?.data
            if (!order || !order.id) {
                alert('Unable to create payment order')
                return
            }

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount || (amountValue * 100),
                currency: order.currency || 'INR',
                name: 'Easy Go',
                description: `Ride payment - ₹${amountValue}`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post('/payment/verify', {
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature
                        })
                        if (verifyRes?.data?.success) {
                            alert('Payment successful')
                            navigate('/home')
                        } else {
                            alert('Payment verification failed')
                        }
                    } catch (err) {
                        alert(err?.response?.data?.message || 'Verification error')
                    }
                },
                prefill: {
                    name: user?.fullname ? `${user.fullname.firstname} ${user.fullname.lastname}` : '',
                    email: user?.email || ''
                },
                theme: {
                    color: '#10b461'
                }
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (err) {
            alert(err?.message || 'Payment initialization failed')
        }
    }

    if (!ride) return null

    return (
        <div className='h-screen w-full relative overflow-hidden bg-gray-50'>
            {/* Home Button */}
            <Link 
                to='/home' 
                className='fixed right-4 top-4 z-50 h-12 w-12 bg-white shadow-lg flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110'
            >
                <i className="text-xl font-medium ri-home-5-line text-gray-700"></i>
            </Link>

            {/* Map Section */}
            <div className='h-[45vh] md:h-[50vh] lg:h-[55vh] w-full relative'>
                <LiveTracking 
                    ride={ride} 
                    pickup={pickup} 
                    destination={destination} 
                />
                {/* Gradient Overlay */}
                <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none'></div>
            </div>

            {/* Bottom Panel */}
            <div 
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-all duration-500 ease-out ${
                    isPanelExpanded ? 'h-[70vh]' : 'h-[55vh]'
                } md:h-[50vh] lg:h-[45vh] overflow-y-auto`}
            >
                {/* Drag Handle */}
                <div 
                    className='flex justify-center pt-3 pb-2 cursor-pointer md:hidden'
                    onClick={() => setIsPanelExpanded(!isPanelExpanded)}
                >
                    <div className='w-12 h-1.5 bg-gray-300 rounded-full'></div>
                </div>

                <div className='px-4 md:px-6 lg:px-8 pb-6'>
                    {/* Driver Info Card */}
                    <div className='bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 md:p-5 mb-4 shadow-sm border border-gray-100'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className='relative'>
                                    <img 
                                        className='h-16 w-16 md:h-20 md:w-20 rounded-2xl object-cover shadow-md border-2 border-white' 
                                        src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
                                        alt="Vehicle" 
                                    />
                                    <div className='absolute -bottom-1 -right-1 bg-green-500 h-5 w-5 rounded-full border-2 border-white'></div>
                                </div>
                                <div>
                                    <h2 className='text-lg md:text-xl font-bold text-gray-800 capitalize'>
                                        {ride?.captain?.fullname?.firstname || 'Captain'}
                                    </h2>
                                    <div className='flex items-center gap-2 mt-1'>
                                        <span className='bg-white px-2 py-0.5 rounded-full text-xs md:text-sm font-semibold text-gray-700 shadow-sm'>
                                            {ride?.captain?.vehicle?.plate || 'N/A'}
                                        </span>
                                    </div>
                                    <p className='text-xs md:text-sm text-gray-600 mt-1'>
                                        {ride?.captain?.vehicle?.model || 'Vehicle'}
                                    </p>
                                </div>
                            </div>
                            <div className='text-right'>
                                <div className='bg-white rounded-xl px-3 py-2 shadow-sm'>
                                    <i className="ri-car-line text-2xl md:text-3xl text-green-600"></i>
                                    <p className='text-xs text-gray-500 mt-1 capitalize'>
                                        {ride?.vehicleType || vehicleType || ride?.captain?.vehicle?.type || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trip Details */}
                    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4'>
                        {/* Pickup */}
                        <div className='flex items-start gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors'>
                            <div className='mt-1 bg-green-100 rounded-full p-2'>
                                <i className="text-lg ri-map-pin-2-fill text-green-600"></i>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-base md:text-lg font-semibold text-gray-800 mb-1'>Pickup Location</h3>
                                <p className='text-sm md:text-base text-gray-600 leading-relaxed'>
                                    {ride.pickup || pickup?.address}
                                </p>
                            </div>
                        </div>

                        {/* Route Line */}
                        <div className='flex items-center justify-center py-2 bg-gray-50'>
                            <div className='flex flex-col items-center gap-1'>
                                <div className='w-0.5 h-3 bg-gray-300'></div>
                                <div className='w-0.5 h-3 bg-gray-300'></div>
                                <div className='w-0.5 h-3 bg-gray-300'></div>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className='flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors'>
                            <div className='mt-1 bg-red-100 rounded-full p-2'>
                                <i className="text-lg ri-flag-2-fill text-red-600"></i>
                            </div>
                            <div className='flex-1'>
                                <h3 className='text-base md:text-lg font-semibold text-gray-800 mb-1'>Destination</h3>
                                <p className='text-sm md:text-base text-gray-600 leading-relaxed'>
                                    {ride.destination || destination?.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Fare Card */}
                    <div className='bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-5 mb-4 shadow-lg'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-white/20 backdrop-blur-sm rounded-full p-3'>
                                    <i className="ri-currency-line text-2xl text-white"></i>
                                </div>
                                <div>
                                    <p className='text-white/80 text-xs md:text-sm font-medium'>Total Fare</p>
                                    <h3 className='text-2xl md:text-3xl font-bold text-white'>
                                        ₹{fare?.[vehicleType] || ride?.fare || 0}
                                    </h3>
                                </div>
                            </div>
                            <div className='bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2'>
                                <p className='text-white text-xs md:text-sm font-semibold'>Cash</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <button 
                        onClick={handlePayment} 
                        className='w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-base md:text-lg py-4 md:py-5 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3'
                    >
                        <i className="ri-secure-payment-line text-xl"></i>
                        <span>Make Payment</span>
                        <i className="ri-arrow-right-line text-xl"></i>
                    </button>

                    {/* Safe Space for Bottom Nav */}
                    <div className='h-4 md:h-2'></div>
                </div>
            </div>
        </div>
    )
}

export default Riding