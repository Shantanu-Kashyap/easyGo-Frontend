import React, { useEffect, useRef, useState, useContext, useCallback } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from '../axios.config'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import logo1 from '../assets/logo1.png'

const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // FIXED: Use useRef for debounce timers
    const pickupTimerRef = useRef(null)
    const destinationTimerRef = useRef(null)

    const navigate = useNavigate()
    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    // FIXED: Proper search suggestions function
    const searchSuggestions = async (input, type) => {
        if (!input || input.length < 3) {
            if (type === 'pickup') {
                setPickupSuggestions([])
            } else {
                setDestinationSuggestions([])
            }
            setIsLoading(false)
            return
        }

        setIsLoading(true)

        try {
            console.log(`Fetching suggestions for ${type}:`, input) // Debug log
            
            const response = await axios.get(`/maps/get-suggestions`, {
                params: { input }
            })
            
            console.log(`Response for ${type}:`, response.data) // Debug log
            
            // Extract array from response
            let results = [];
            
            if (Array.isArray(response.data)) {
                results = response.data;
            } else if (response.data && Array.isArray(response.data.suggestions)) {
                results = response.data.suggestions;
            } else if (response.data && Array.isArray(response.data.data)) {
                results = response.data.data;
            }
            
            console.log(`Results for ${type}:`, results) // Debug log
            
            if (type === 'pickup') {
                setPickupSuggestions(results)
            } else {
                setDestinationSuggestions(results)
            }
        } catch (error) {
            console.error('Suggestion fetch error:', error)
            if (type === 'pickup') {
                setPickupSuggestions([])
            } else {
                setDestinationSuggestions([])
            }
        } finally {
            setIsLoading(false)
        }
    };

    // FIXED: Simplified debounced handlers
    const handlePickupChange = (e) => {
        const value = e.target.value;
        setPickup(value);
        setActiveField('pickup');
        
        // Clear previous timer
        if (pickupTimerRef.current) {
            clearTimeout(pickupTimerRef.current);
        }
        
        // Set new timer
        pickupTimerRef.current = setTimeout(() => {
            searchSuggestions(value, 'pickup');
        }, 300);
    }

    const handleDestinationChange = (e) => {
        const value = e.target.value;
        setDestination(value);
        setActiveField('destination');
        
        // Clear previous timer
        if (destinationTimerRef.current) {
            clearTimeout(destinationTimerRef.current);
        }
        
        // Set new timer
        destinationTimerRef.current = setTimeout(() => {
            searchSuggestions(value, 'destination');
        }, 300);
    }

    // Cleanup timers on unmount
    useEffect(() => {
        return () => {
            if (pickupTimerRef.current) {
                clearTimeout(pickupTimerRef.current);
            }
            if (destinationTimerRef.current) {
                clearTimeout(destinationTimerRef.current);
            }
        };
    }, []);

    const closeAllPanels = () => {
        setPanelOpen(false)
        setVehiclePanel(false)
        setConfirmRidePanel(false)
        setVehicleFound(false)
        setWaitingForDriver(false)
    }

    useEffect(() => {
        if (socket && user?._id) {
            try {
                socket.emit("join", { 
                    userType: "user", 
                    userId: user._id 
                });
            } catch (error) {}
        }
    }, [socket, user])

    useEffect(() => {
        if (socket && user?._id) {
            const rejoinSocket = () => {
                socket.emit("join", { 
                    userType: "user", 
                    userId: user._id 
                });
            };
            rejoinSocket();
            socket.on('connect', rejoinSocket);
            return () => {
                socket.off('connect', rejoinSocket);
            };
        }
    }, [socket, user]);

    useEffect(() => {
        if (!socket) return;

        const onRideConfirmed = (ride) => {
            closeAllPanels();
            setWaitingForDriver(true);
            setRide(ride);
        };

        const onRideStarted = (ride) => {
            closeAllPanels();
            const enhancedRide = {
                ...ride,
                vehicleType: vehicleType || ride.vehicleType
            };
            navigate('/riding', { 
                state: { 
                    pickup: ride.pickupAddress || pickup,
                    destination: ride.destinationAddress || destination,
                    ride: enhancedRide,
                    fare: fare,
                    vehicleType: vehicleType
                } 
            });
        };

        const onRideCompleted = (data) => {
            closeAllPanels();
            setRide(null);
            setPickup('');
            setDestination('');
            setVehicleType(null);
            setFare({});
            alert('Ride completed successfully!');
        };

        const onRideEnded = (data) => {
            closeAllPanels();
            setRide(null);
            setPickup('');
            setDestination('');
            setVehicleType(null);
            setFare({});
            alert('Ride ended successfully!');
        };

        const onRideCompletedBroadcast = (data) => {
            if (data.userId === user?._id) {
                onRideCompleted(data);
            }
        };

        socket.on('ride-confirmed', onRideConfirmed);
        socket.on('ride-started', onRideStarted);
        socket.on('ride-completed', onRideCompleted);  
        socket.on('ride-ended', onRideEnded);
        socket.on('ride-completed-broadcast', onRideCompletedBroadcast);

        return () => {
            socket.off('ride-confirmed', onRideConfirmed);
            socket.off('ride-started', onRideStarted);
            socket.off('ride-completed', onRideCompleted);
            socket.off('ride-ended', onRideEnded);
            socket.off('ride-completed-broadcast', onRideCompletedBroadcast);
        };
    }, [socket, navigate, vehicleType, pickup, destination, fare, user]);

    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            if (user?._id) {
                socket.emit("join", { 
                    userType: "user", 
                    userId: user._id 
                });
            }
        });

        socket.on('connect_error', (error) => {});

        socket.on('disconnect', (reason) => {});

        return () => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('disconnect');
        };
    }, [socket, user]);

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70vh',
                duration: 0.3,
                ease: "power2.out"
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1,
                duration: 0.3
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0vh',
                duration: 0.3,
                ease: "power2.out"
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0,
                duration: 0.3
            })
        }
    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, { 
                transform: 'translateY(0)',
                duration: 0.3,
                ease: "power2.out"
            })
        } else {
            gsap.to(vehiclePanelRef.current, { 
                transform: 'translateY(100%)',
                duration: 0.3,
                ease: "power2.out"
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, { 
                transform: 'translateY(0)',
                duration: 0.3,
                ease: "power2.out"
            })
        } else {
            gsap.to(confirmRidePanelRef.current, { 
                transform: 'translateY(100%)',
                duration: 0.3,
                ease: "power2.out"
            })
        }
    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, { 
                transform: 'translateY(0)',
                duration: 0.3,
                ease: "power2.out"
            })
        } else {
            gsap.to(vehicleFoundRef.current, { 
                transform: 'translateY(100%)',
                duration: 0.3,
                ease: "power2.out"
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)',
                duration: 0.3,
                ease: "power2.out"
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)',
                duration: 0.3,
                ease: "power2.out"
            })
        }
    }, [waitingForDriver])

    async function findTrip() {
        setPanelOpen(false)
        setVehiclePanel(true)
        try {
            const response = await axios.get(`/rides/get-fare`, {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setFare(response.data)
        } catch (error) {}
    }

    async function createRide() {
        try {
            await axios.post(`/rides/create`, {
                pickup,
                destination,
                vehicleType
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (error) {}
    }

    return (
        <div className="h-screen relative overflow-hidden bg-gray-50">
            {!panelOpen && !vehiclePanel && !confirmRidePanel && !vehicleFound && !waitingForDriver && (
                <img
                    className="w-12 md:w-16 absolute rounded-full left-4 top-4 md:left-6 md:top-6 z-10"
                    src={logo1}
                    alt="Uber"
                />
            )}

            <div className="h-full w-full">
                <LiveTracking />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
                {!vehiclePanel && !confirmRidePanel && !vehicleFound && !waitingForDriver && (
                    <div className="w-full bg-white relative px-4 py-6 md:px-6 md:py-8 rounded-t-3xl shadow-2xl pointer-events-auto">
                        <h5
                            ref={panelCloseRef}
                            onClick={() => setPanelOpen(false)}
                            className="absolute opacity-0 right-4 top-4 md:right-6 md:top-6 text-2xl cursor-pointer hover:text-gray-600 transition-colors"
                        >
                            <i className="ri-arrow-down-wide-line"></i>
                        </h5>

                        <h4 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Find a trip</h4>

                        <form className="relative space-y-4" onSubmit={submitHandler}>
                            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-4 bg-gray-400 rounded-full"></div>

                            <div className="relative">
                                <input
                                    onClick={() => {
                                        setPanelOpen(true);
                                        setActiveField("pickup");
                                    }}
                                    value={pickup}
                                    onChange={handlePickupChange}
                                    className="bg-gray-100 pl-12 pr-10 py-3 text-base md:text-lg rounded-xl w-full border border-gray-200 focus:border-black focus:outline-none transition-colors"
                                    type="text"
                                    placeholder="Add a pick-up location"
                                />
                                {isLoading && activeField === 'pickup' && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    onClick={() => {
                                        setPanelOpen(true);
                                        setActiveField("destination");
                                    }}
                                    value={destination}
                                    onChange={handleDestinationChange}
                                    className="bg-gray-100 pl-12 pr-10 py-3 text-base md:text-lg rounded-xl w-full border border-gray-200 focus:border-black focus:outline-none transition-colors"
                                    type="text"
                                    placeholder="Enter your destination"
                                />
                                {isLoading && activeField === 'destination' && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        </form>

                        <button
                            onClick={findTrip}
                            disabled={!pickup || !destination}
                            className="bg-black text-white px-6 py-3 rounded-xl mt-6 w-full text-base md:text-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                        >
                            Find Trip
                        </button>
                    </div>
                )}

                <div 
                    ref={panelRef} 
                    className="bg-white h-0 overflow-hidden pointer-events-auto border-t border-gray-200"
                    style={{ maxHeight: '70vh' }}
                >
                    <div className="px-4 py-6 md:px-6">
                        <LocationSearchPanel
                            suggestions={activeField === "pickup" ? pickupSuggestions : destinationSuggestions}
                            setPanelOpen={setPanelOpen}
                            setVehiclePanel={setVehiclePanel}
                            setPickup={setPickup}
                            setDestination={setDestination}
                            activeField={activeField}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>

            <div
                ref={vehiclePanelRef}
                className="fixed inset-x-0 bottom-0 bg-white px-4 py-6 md:px-6 md:py-8 rounded-t-3xl shadow-2xl transform translate-y-full z-40"
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            <div
                ref={confirmRidePanelRef}
                className="fixed inset-x-0 bottom-0 bg-white px-4 py-6 md:px-6 md:py-8 rounded-t-3xl shadow-2xl transform translate-y-full z-50"
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div
                ref={vehicleFoundRef}
                className="fixed inset-x-0 bottom-0 bg-white px-4 py-6 md:px-6 md:py-8 rounded-t-3xl shadow-2xl transform translate-y-full z-60"
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            <div
                ref={waitingForDriverRef}
                className="fixed inset-x-0 bottom-0 bg-white px-4 py-6 md:px-6 md:py-8 rounded-t-3xl shadow-2xl transform translate-y-full z-70"
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
            >
                {waitingForDriver && ride && (
                    <WaitingForDriver
                        ride={ride}
                        setWaitingForDriver={setWaitingForDriver}
                    />
                )}
            </div>
        </div>
    );
}

export default Home