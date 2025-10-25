import React, { useRef, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'
import { SocketContext } from '../context/SocketContext'
import logo1 from '../assets/logo1.png'

const CaptainRiding = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { socket } = React.useContext(SocketContext)
    const rideData = location.state?.ride
    
    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const [distance, setDistance] = useState(() => {
        return rideData?.distance ? `${rideData.distance} KM` : 'Calculating...'
    })
    const finishRidePanelRef = useRef(null)

    useEffect(() => {
        if (!rideData) {
            navigate('/captain-home')
        }
    }, [rideData, navigate])

    useEffect(() => {
        if (!socket) return;

        socket.on('ride-cancelled', () => {
            navigate('/captain-home')
        })

        return () => {
            socket.off('ride-cancelled')
        }
    }, [socket, navigate])

    const updateDistance = (newDistance) => {
        if (!newDistance && newDistance !== 0) {
            setDistance('Calculating...')
            return
        }
        const distanceInKM = (newDistance / 1000).toFixed(1)
        setDistance(`${distanceInKM} KM`)
    }

    useEffect(() => {
        if (rideData?.distance) {
            setDistance(`${rideData.distance} KM`)
        }
    }, [rideData])

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])

    if (!rideData) return null;

    return (
        <div className='h-screen relative flex flex-col justify-end'>
            <div className='fixed p-4 md:p-6 top-0 flex items-center justify-between w-screen z-10'>
                <img className='w-14 rounded-full md:w-16' src={logo1} alt="Easy Go" />
                <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div className='fixed bottom-0 w-full bg-yellow-400 p-4 md:p-6 rounded-t-3xl shadow-xl'
                onClick={() => setFinishRidePanel(true)}
            >
                <div className='flex flex-col items-center justify-center -mt-8 mb-4'>
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className='text-xl md:text-2xl font-bold'>{distance}</h4>
                        <p className='text-sm text-gray-700 mt-1'>{rideData.user?.fullname?.firstname || 'Passenger'}</p>
                    </div>
                    <button className='bg-green-600 text-white font-semibold p-3 md:p-4 px-6 md:px-10 rounded-lg shadow-md'>
                        Complete Ride
                    </button>
                </div>
            </div>

            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>

            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking ride={rideData} onDistanceUpdate={updateDistance} />
            </div>
        </div>
    )
}

export default CaptainRiding