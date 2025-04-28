"use client";

const BookingStepsHeader = ({ currentStep, title }) => {
  return (
    <div className="bg-gray-50 p-6 md:p-8 border-b border-gray-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-medium text-gray-800">{title}</h3>
      </div>
      
      <div className="flex items-center justify-center">
        <div className={`flex flex-col items-center relative z-10 ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
          <span className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}>
            1
          </span>
          <span className="text-xs mt-2 font-medium">Détails du trajet</span>
        </div>
        
        <div className={`w-16 md:w-24 h-0.5 transition-all duration-300 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
        
        <div className={`flex flex-col items-center relative z-10 ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
          <span className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}>
            2
          </span>
          <span className="text-xs mt-2 font-medium">Véhicule</span>
        </div>
        
        <div className={`w-16 md:w-24 h-0.5 transition-all duration-300 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
        
        <div className={`flex flex-col items-center relative z-10 ${currentStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>
          <span className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${currentStep >= 3 ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white'}`}>
            3
          </span>
          <span className="text-xs mt-2 font-medium">Confirmation</span>
        </div>
      </div>
    </div>
  );
};

export default BookingStepsHeader;