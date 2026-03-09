'use client';

import { useState } from 'react';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 sm:top-10 left-4 sm:left-10 text-4xl sm:text-5xl lg:text-6xl opacity-50 animate-pulse">✨</div>
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 text-4xl sm:text-5xl lg:text-6xl opacity-50 animate-pulse">☁️</div>
      <div className="absolute top-1/3 left-4 sm:left-5 text-3xl sm:text-4xl lg:text-5xl opacity-40">💕</div>
      <div className="absolute bottom-10 right-4 sm:right-5 text-3xl sm:text-4xl lg:text-5xl opacity-40">💕</div>

      <div className="w-full max-w-2xl">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-3 sm:mb-4">
          A Love Letter
        </h1>

        <p className="text-center text-pink-400 mb-8 sm:mb-12 text-xs sm:text-sm md:text-base">
          From someone who loves you
        </p>

        {/* Envelope */}
        <div className="flex justify-center mb-8">
          <div
            onClick={handleClick}
            className={`relative cursor-pointer transition-all duration-700 ${
              isOpening ? 'scale-110' : 'hover:scale-105'
            }`}
            style={{
              perspective: '1000px',
            }}
          >
            {/* Envelope body */}
            <div
              className={`w-56 sm:w-80 h-32 sm:h-48 bg-pink-200 rounded-lg sm:rounded-xl shadow-2xl relative transition-all duration-700 ${
                isOpening ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {/* Envelope flap */}
              <div
                className={`absolute top-0 left-0 right-0 w-full h-1/2 sm:h-24 bg-pink-300 rounded-t-lg sm:rounded-t-xl transform transition-all duration-700 origin-top ${
                  isOpening ? '-rotate-180' : 'rotate-0'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                }}
              >
                <div
                  className="absolute top-1 sm:top-2 left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-16 sm:h-16 bg-pink-400 rounded-full flex items-center justify-center text-lg sm:text-3xl shadow-lg"
                >
                  💌
                </div>
              </div>

              {/* Heart decoration */}
              <div className="absolute -top-3 right-6 sm:right-8 text-lg sm:text-2xl animate-bounce">💕</div>

              {/* Text on envelope */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-pink-600 font-semibold text-xs sm:text-lg">Click to open</p>
                <p className="text-pink-500 text-xs mt-0.5 sm:mt-1">Special Delivery</p>
              </div>
            </div>

            {/* Opened envelope content */}
            {isOpening && (
              <div className="absolute inset-0 w-56 sm:w-80 h-32 sm:h-48 flex items-center justify-center">
                <div className="text-4xl sm:text-6xl animate-bounce">💌</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
