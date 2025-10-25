import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField, isLoading }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        setPanelOpen(false)
    }

    const safeSuggestions = Array.isArray(suggestions) ? suggestions : [];

    return (
        <div>
            {isLoading && (
                <div className="flex items-center justify-center py-4">
                    <div className="flex items-center gap-2 text-gray-500">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                        <span className="text-sm">Searching...</span>
                    </div>
                </div>
            )}
            
            {!isLoading && safeSuggestions.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                    <p className="text-sm">Type at least 3 characters to search</p>
                </div>
            )}

            {!isLoading && safeSuggestions.map((elem, idx) => (
                <div 
                    key={idx} 
                    onClick={() => handleSuggestionClick(elem)} 
                    className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer hover:bg-gray-50 transition-colors'
                >
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className='font-medium text-sm'>{elem}</h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel