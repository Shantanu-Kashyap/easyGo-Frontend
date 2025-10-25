import React from 'react';

const ConfirmRide = (props) => {
   
    const getFareValue = () => {
        if (typeof props.fare === 'object' && props.fare !== null) {
            return props.fare[props.vehicleType] || props.fare.fare || 0;
        }
        return props.fare || 0;
    };

    const getVehicleIcon = () => {
        switch(props.vehicleType) {
            case 'car':
                return 'ri-car-line';
            case 'moto':
                return 'ri-motorbike-line';
            case 'auto':
                return 'ri-taxi-line';
            default:
                return 'ri-car-line';
        }
    };

    const getVehicleName = () => {
        switch(props.vehicleType) {
            case 'car':
                return 'EasyGo';
            case 'moto':
                return 'EasyGo Moto';
            case 'auto':
                return 'EasyGo Auto';
            default:
                return 'EasyGo';
        }
    };

    const getEstimatedDistance = () => {
        if (props.distance) return `${props.distance} KM`;
        if (props.fare && typeof props.fare === 'object') {
            return '2-5 KM';
        }
        return 'Calculating...';
    };

    return (
        <div className="bg-white rounded-t-3xl shadow-lg flex flex-col">
            
            <div className="py-4 px-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Confirm Ride</h3>
                <button
                    onClick={() => props.setConfirmRidePanel(false)}
                    className="p-2 -mr-2 text-gray-400 hover:text-gray-600"
                >
                    <i className="ri-close-line text-2xl"></i>
                </button>
            </div>

            <div className="p-6 space-y-4">
              
                <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                            <i className={`${getVehicleIcon()} text-xl text-white`}></i>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800">
                                {getVehicleName()}
                                
                            </h4>
                            <p className="text-xs text-gray-600">
                                {props.vehicleType === 'car' ? '4 seats' : 
                                 props.vehicleType === 'auto' ? '3 seats' : 
                                 '1 seat'} • Affordable
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-base font-bold text-yellow-600">{getEstimatedDistance()}</p>
                        <p className="text-xs text-gray-500">Distance</p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl divide-y divide-gray-200">
                   
                    <div className="flex items-start gap-3 p-4">
                        <i className="ri-map-pin-line text-lg text-green-600"></i>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">Pickup</h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                                {props.pickup || 'Current location'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4">
                        <i className="ri-map-pin-2-line text-lg text-red-600"></i>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">Destination</h4>
                            <p className="text-xs text-gray-600 line-clamp-2">
                                {props.destination || 'Select destination'}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4">
                        <i className="ri-money-dollar-circle-line text-lg text-blue-600"></i>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">Total Fare</h4>
                            <p className="text-xs text-gray-600">
                                ₹{getFareValue()} (Cash Payment)
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4">
                        <i className="ri-time-line text-lg text-purple-600"></i>
                        <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-800">Estimated Time</h4>
                            <p className="text-xs text-gray-600">
                                {props.vehicleType === 'moto' ? '3-8 mins' : 
                                 props.vehicleType === 'auto' ? '5-10 mins' : 
                                 '5-12 mins'} arrival
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <i className="ri-information-line text-blue-600"></i>
                        <h4 className="text-sm font-medium text-blue-800">Trip Details</h4>
                    </div>
                    <div className="space-y-1 text-xs text-blue-700">
                        <p>• Driver will be assigned after confirmation</p>
                        <p>• You can track your ride in real-time</p>
                        <p>• Payment will be collected at the end of trip</p>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            props.setVehicleFound(true);
                            props.setConfirmRidePanel(false);
                            props.createRide();
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors duration-200 shadow-md"
                    >
                        Confirm Ride
                    </button>
                    <button
                        onClick={() => props.setConfirmRidePanel(false)}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg text-sm transition-colors duration-200 shadow-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRide;