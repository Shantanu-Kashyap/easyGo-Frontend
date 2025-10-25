import React from 'react';

const RidePopUp = (props) => {

  const defaultUserAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236b7280'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

  const ride = props.ride || {};
  const user = ride.user || {};
  const pickup = ride.pickup || 'Pickup location';
  const destination = ride.destination || 'Destination';
  const fare = ride.fare || 0;
  const distance = ride.distance ? parseFloat(ride.distance).toFixed(1) : '0';

  const userName = user.fullname 
    ? `${user.fullname.firstname || ''} ${user.fullname.lastname || ''}`.trim() 
    : 'User';

  return (
    <div className="bg-white rounded-t-3xl shadow-2xl p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">New Ride Request</h2>

      {/* User Info Card */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-300 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center shadow-lg ring-2 ring-white">
            <img 
              src={defaultUserAvatar} 
              alt={userName} 
              className="w-9 h-9 object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">{userName}</h3>
            <p className="text-xs text-gray-500">Passenger</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800">{distance} KM</div>
          <div className="text-xs text-gray-500">Distance</div>
        </div>
      </div>

      {/* Pickup Location */}
      <div className="mb-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
            <i className="ri-map-pin-fill text-green-600 text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-700 text-sm mb-1">Pickup</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{pickup}</p>
          </div>
        </div>
      </div>

      {/* Destination */}
      <div className="mb-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
            <i className="ri-map-pin-fill text-red-600 text-lg"></i>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-700 text-sm mb-1">Destination</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{destination}</p>
          </div>
        </div>
      </div>

      {/* Fare Info */}
      <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 mb-6">
        <i className="ri-wallet-fill text-blue-600 text-2xl"></i>
        <div>
          <div className="text-3xl font-bold text-gray-800">₹{fare}</div>
          <div className="text-xs text-gray-600">Cash Payment</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            props.confirmRide && props.confirmRide();
          }}
          className="py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Accept Ride
        </button>
        <button
          onClick={() => {
            props.setRidePopupPanel && props.setRidePopupPanel(false);
          }}
          className="py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;