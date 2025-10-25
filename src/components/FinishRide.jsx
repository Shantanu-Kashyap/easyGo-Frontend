import React, { useContext } from 'react' 
import { SocketContext } from '../context/SocketContext' 
import axios from '../axios.config'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate()
    const { socket } = useContext(SocketContext)

  
    const defaultUserAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236b7280'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";

    async function endRide() {
        try {
            const response = await axios.post(`/rides/end-ride`, {
                rideId: props.ride?._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                props.setFinishRidePanel(false);
                navigate('/captain-home');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                alert('Authentication failed. Please login again.');
                navigate('/captain-login');
            } else if (error.response?.status === 404) {
                alert('Ride not found or already completed.');
                navigate('/captain-home');
            } else {
                alert(`Failed to end ride: ${error.response?.data?.message || error.message}`);
            }
        }
    }

    if (!props.ride) {
        return <div>Loading ride details...</div>
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setFinishRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
            <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <div className='h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
                        <img 
                            className='h-full w-full object-cover' 
                            src={defaultUserAvatar} 
                            alt="User avatar" 
                        />
                    </div>
                    <h2 className='text-lg font-medium capitalize'>
                        {props.ride?.user?.fullname?.firstname || 'User'}
                    </h2>
                </div>
                <h5 className='text-lg font-semibold'>
                    {props.ride?.distance ? `${props.ride.distance} KM` : 'Calculating...'}
                </h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup || 'N/A'}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination || 'N/A'}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare || '0'}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>

                <div className='mt-10 w-full'>
                    <button
                        onClick={endRide}
                        className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition-colors'
                    >
                        Finish Ride
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinishRide