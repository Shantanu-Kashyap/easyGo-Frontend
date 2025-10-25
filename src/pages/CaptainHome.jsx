import React, { useRef, useState, useEffect, useContext, useCallback } from "react";
import axios from '../axios.config'
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { Link } from "react-router-dom";
import logo1 from '../assets/logo1.png'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const [stats, setStats] = useState({
    totalRides: 0,
    totalEarnings: 0,
    totalDistance: 0,
    totalHours: 0,
    captain: null
  });

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  
  useEffect(() => {
    if (socket && captain?._id) {
      socket.emit('join', { userId: captain._id, userType: 'captain' });
      console.log('Captain joined socket room:', captain._id);
    }
  }, [socket, captain]);

  const fetchCaptainStats = useCallback(async () => {
    if (!captain?._id) return;
    try {
      const res = await axios.get('/captains/captain-stats', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.status === 200) {
        setStats(res.data);
      }
    } catch (err) {
      
    }
  }, [captain?._id]);

  useEffect(() => {
    fetchCaptainStats();
  }, [fetchCaptainStats]);

  useEffect(() => {
    if (!socket) return;

    const onNewRide = (payload) => {
      console.log('Received new-ride event:', payload);
      setRide(payload);
      setRidePopupPanel(true);
      setConfirmRidePopupPanel(false);
    };

    const onRideCompleted = (payload) => {
      fetchCaptainStats();
    };

    const onRideCompletedBroadcast = (payload) => {
      if (!payload) return;
      if (payload.captainId && captain && payload.captainId === captain._id) {
        fetchCaptainStats();
      } else {
        fetchCaptainStats();
      }
    };

    socket.on('new-ride', onNewRide);
    socket.on('ride-completed', onRideCompleted);
    socket.on('ride-completed-broadcast', onRideCompletedBroadcast);
    socket.on('ride-ended', onRideCompleted);

    return () => {
      socket.off('new-ride', onNewRide);
      socket.off('ride-completed', onRideCompleted);
      socket.off('ride-completed-broadcast', onRideCompletedBroadcast);
      socket.off('ride-ended', onRideCompleted);
    };
  }, [socket, captain, fetchCaptainStats]);

  useEffect(() => {
    if (socket && captain?._id) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        }
      );

      const locationInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
          }
        );
      }, 5000);

      return () => clearInterval(locationInterval);
    }
  }, [socket, captain]);

  async function confirmRide() {
    if (!ride?._id) return;
    try {
      const res = await axios.post('/rides/confirm', { rideId: ride._id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.status === 200) {
        setRide(res.data);
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
        fetchCaptainStats();
      }
    } catch (err) {
      alert('Could not confirm ride');
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden relative bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      
      {/* Animated Background Elements */}
      <div className='absolute top-0 left-0 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none'></div>
      <div className='absolute top-0 right-0 w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none'></div>
      <div className='absolute bottom-0 left-1/2 w-96 h-96 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none'></div>

      {/* Header with Logo */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-md shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 group">
            <img className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg object-cover ring-2 ring-white group-hover:scale-110 transition-transform duration-300" src={logo1} alt="EasyGo" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-800">EasyGo</h1>
              <p className="text-xs text-gray-600">Captain Dashboard</p>
            </div>
          </Link>

          {/* Online Status Badge */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-2 rounded-full border border-green-300 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-semibold text-green-700">Online</span>
          </div>
        </div>
      </div>
 
      {/* Map Section with Enhanced Border */}
      <div className="h-[50vh] sm:h-[52vh] w-full relative flex-shrink-0 mt-16 sm:mt-[4.5rem]">
        <div className="absolute inset-0 m-2 sm:m-3 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="Map"
          />
          {/* Map Overlay with Info */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <i className="ri-map-pin-line text-green-600 text-lg"></i>
              <span className="text-xs font-semibold text-gray-800">Live Location</span>
            </div>
          </div>
        </div>
      </div>

      {/* Captain Details Section - Fixed Bottom Spacing */}
      <div className="flex-1 w-full flex items-start justify-center px-3 sm:px-4 pt-3 pb-6 sm:pb-8 relative z-20 overflow-y-auto">
        <div className="w-full max-w-3xl transform transition-all duration-300 hover:scale-[1.02]">
          <CaptainDetails stats={stats} />
        </div>
      </div>

      {/* Ride Popup */}
      {ridePopupPanel && !confirmRidePopupPanel && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-end animate-fadeIn" onClick={() => setRidePopupPanel(false)}>
          <div className="w-full max-w-2xl mx-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
            {ride && (
              <RidePopUp ride={ride} setRidePopupPanel={setRidePopupPanel} confirmRide={confirmRide} />
            )}
          </div>
        </div>
      )}

      {/* Confirm Ride Popup */}
      {confirmRidePopupPanel && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-scaleIn">
            {ride && (
              <ConfirmRidePopUp ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
            )}
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CaptainHome;