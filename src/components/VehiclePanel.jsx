import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div className="bg-white rounded-t-2xl px-4 py-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-center mb-4">
                <div 
                    className="w-12 h-1 bg-gray-300 rounded-full cursor-pointer"
                    onClick={() => props.setVehiclePanel(false)}
                ></div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">Choose a Vehicle</h3>
            
            <div className="space-y-3">
                <div 
                    onClick={() => {
                        props.setConfirmRidePanel(true)
                        props.setVehiclePanel(false)   
                        props.selectVehicle('car')
                    }}
                    className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 active:border-black transition-all duration-200 cursor-pointer bg-white shadow-sm"
                >
                    <div className="flex items-center flex-1">
                        <img 
                            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-lg" 
                            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
                            alt="UberGo" 
                        />
                        <div className="ml-3 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-base sm:text-lg text-gray-900">EasyGo Car</h4>
                                <span className="flex items-center text-gray-600 text-sm">
                                    <i className="ri-user-3-fill mr-1"></i>4
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">2 mins away</p>
                            <p className="text-xs text-gray-500 truncate">Affordable, compact rides</p>
                        </div>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">₹{props.fare.car}</h2>
                    </div>
                </div>

                <div 
                   onClick={() => {
                        props.setConfirmRidePanel(true)
                        props.setVehiclePanel(false)
                        props.selectVehicle('moto')
                    }}
                    className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 active:border-black transition-all duration-200 cursor-pointer bg-white shadow-sm"
                >
                    <div className="flex items-center flex-1">
                        <img 
                            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-lg" 
                            src="https://w7.pngwing.com/pngs/149/1021/png-transparent-motorcycle-cartoon-motorcycle-poster-motorcycle-vector-motorcycle-cartoon-thumbnail.png" 
                            alt="Moto" 
                        />
                        <div className="ml-3 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-base sm:text-lg text-gray-900">Moto</h4>
                                <span className="flex items-center text-gray-600 text-sm">
                                    <i className="ri-user-3-fill mr-1"></i>1
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">3 mins away</p>
                            <p className="text-xs text-gray-500 truncate">Affordable motorcycle rides</p>
                        </div>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">₹{props.fare.moto}</h2>
                    </div>
                </div>

                <div 
                    onClick={() => {
                        props.setConfirmRidePanel(true)
                        props.setVehiclePanel(false)
                        props.selectVehicle('auto')
                    }}
                    className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 active:border-black transition-all duration-200 cursor-pointer bg-white shadow-sm"
                >
                    <div className="flex items-center flex-1">
                        <img 
                            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-lg" 
                            src="https://e7.pngegg.com/pngimages/81/588/png-clipart-auto-rickshaw-car-electric-vehicle-three-wheeler-auto-rickshaw-van-car-thumbnail.png" 
                            alt="UberAuto" 
                        />
                        <div className="ml-3 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-base sm:text-lg text-gray-900">Auto</h4>
                                <span className="flex items-center text-gray-600 text-sm">
                                    <i className="ri-user-3-fill mr-1"></i>3
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">3 mins away</p>
                            <p className="text-xs text-gray-500 truncate">Affordable Auto rides</p>
                        </div>
                    </div>
                    <div className="ml-4">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">₹{props.fare.auto}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel;