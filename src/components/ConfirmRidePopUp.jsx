import React, { useState } from 'react'
import axios from '../axios.config'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

 
  const defaultUserAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236b7280'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `/rides/start-ride`,
        {
          params: { rideId: props.ride?._id, otp },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false)
        navigate('/captain-riding', {
          state: { ride: response.data }
        })
      }
    } catch (err) {
      alert('Invalid OTP or error starting ride')
    }
  }

  const userName = props.ride?.user?.fullname?.firstname || 'User';
  const distance = props.ride?.distance || props.ride?.estimatedDistance || 0;

  return (
    <div className="bg-white rounded-3xl p-6 max-w-2xl w-full">
   
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Confirm Ride</h3>
        <button
          onClick={() => props.setConfirmRidePopupPanel(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <i className="ri-close-line text-2xl text-gray-600"></i>
        </button>
      </div>

      {/* User Info Card */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-300 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center shadow-md ring-2 ring-white">
            <img src={defaultUserAvatar} alt={userName} className="w-8 h-8 object-contain" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 capitalize">{userName}</h2>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800">{Number(distance).toFixed(1)} KM</div>
          <div className="text-xs text-gray-500">Distance</div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="ri-map-pin-user-fill text-green-600"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-700 text-sm mb-1">Pickup</h4>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{props.ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="ri-map-pin-2-fill text-red-600"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-700 text-sm mb-1">Destination</h4>
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{props.ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <i className="ri-wallet-fill text-blue-600"></i>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-800">₹{props.ride?.fare}</div>
            <div className="text-xs text-gray-600">Cash Payment</div>
          </div>
        </div>
      </div>

      {/* OTP Form */}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP to Start Ride</label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent font-mono text-lg text-center"
            placeholder="• • • •"
            maxLength="6"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="submit"
            className="py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => props.setConfirmRidePopupPanel(false)}
            className="py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConfirmRidePopUp