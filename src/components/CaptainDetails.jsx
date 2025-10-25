import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const StatCard = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center py-2 px-3">
    <div className="text-xl font-bold text-gray-800 leading-tight">{value}</div>
    <div className="text-xs text-gray-500 mt-0.5">{label}</div>
  </div>
);

const CaptainDetails = ({ stats: propStats }) => {
  const { captain } = useContext(CaptainDataContext);
  const statsFromProps = propStats || {};
  const captainFromCtx = captain || {};

  const [display, setDisplay] = useState({
    totalRides: 0,
    totalEarnings: 0,
    totalDistance: 0,
    totalHours: 0
  });

  useEffect(() => {
  
    const rawDistance = statsFromProps.totalDistance ?? captainFromCtx?.stats?.totalDistance ?? 0;
    const roundedDistance = typeof rawDistance === 'number' ? parseFloat(rawDistance.toFixed(1)) : 0;

  
    const rawHours = statsFromProps.totalHours ?? captainFromCtx?.stats?.hoursOnline ?? 0;
    const roundedHours = typeof rawHours === 'number' ? parseFloat(rawHours.toFixed(1)) : 0;

    const s = {
      totalRides: statsFromProps.totalRides ?? captainFromCtx?.stats?.totalRides ?? 0,
      totalEarnings: statsFromProps.totalEarnings ?? captainFromCtx?.earnings?.today ?? 0,
      totalDistance: roundedDistance,
      totalHours: roundedHours
    };
    setDisplay(s);
  }, [propStats, captainFromCtx]);


  const firstname = captainFromCtx?.fullname?.firstname || captain?.fullname?.firstname || '';
  const lastname = captainFromCtx?.fullname?.lastname || captain?.fullname?.lastname || '';
  const name = firstname ? `${firstname} ${lastname}`.trim() : 'Captain';

  const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234ade80'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-auto p-4">
      {/* Header - Optimized spacing */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center shadow-md ring-2 ring-white flex-shrink-0">
            <img src={defaultAvatar} alt="Captain" className="w-7 h-7 object-contain" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-gray-800 text-base leading-tight truncate">{name}</div>
            <div className="text-xs text-gray-500 leading-tight">Your summary</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-lime-50 to-emerald-50 px-3 py-2 rounded-xl border border-lime-200 flex-shrink-0">
          <div className="text-right">
            <div className="font-bold text-xl text-emerald-600 leading-tight">₹{display.totalEarnings}</div>
            <div className="text-xs text-gray-600 leading-tight mt-0.5">Earned Today</div>
          </div>
        </div>
      </div>


      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 grid grid-cols-3 divide-x divide-gray-300">
        <StatCard label="Hours Online" value={display.totalHours} />
        <StatCard label="KM Driven" value={display.totalDistance} />
        <StatCard label="Total Rides" value={display.totalRides} />
      </div>


      <div className="mt-2.5 flex items-center justify-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-600 font-medium">Online & Ready</span>
      </div>
    </div>
  );
};

export default CaptainDetails;