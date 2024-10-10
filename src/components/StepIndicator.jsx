import React from 'react';

const StepIndicator = ({ steps, currentStep }) => {
    return (
            <div className="flex items-center justify-around relative">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center relative">
                        <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                                index === currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                            }`}
                        >
                            {index + 1}
                        </div>
                        
                        <span className={`${index === currentStep ? 'text-blue-500' : 'text-gray-600'} ml-2`}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>
    );
};

export default StepIndicator;
