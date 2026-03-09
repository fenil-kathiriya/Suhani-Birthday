'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface GreetingProps {
  onNext: () => void;
}

export default function Greeting({ onNext }: GreetingProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(onNext, 500);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 sm:top-10 left-4 sm:left-10 text-4xl sm:text-5xl lg:text-6xl opacity-50 animate-pulse">✨</div>
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 text-4xl sm:text-5xl lg:text-6xl opacity-50 animate-pulse">💕</div>
      <div className="absolute top-1/3 right-4 sm:right-5 text-3xl sm:text-4xl lg:text-5xl opacity-40">💜</div>
      <div className="absolute bottom-10 left-4 sm:left-5 text-3xl sm:text-4xl lg:text-5xl opacity-40">🎁</div>

      <div className={`bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 max-w-2xl w-full transform transition-all duration-500 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Window controls */}
        <div className="flex gap-2 mb-6 sm:mb-8">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-pink-300"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-300"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-300"></div>
        </div>

        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-3 sm:mb-4">
          Happy Birthday Baby!
        </h1>

        <div className="text-center text-4xl sm:text-5xl lg:text-6xl mb-6 sm:mb-8">🤗</div>

        <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
          I wanted to do something special for you, so I made this little surprise...
        </p>

        <p className="text-center text-pink-500 text-sm sm:text-base md:text-lg font-semibold mb-6 sm:mb-8">
          Click below to see what it is!
        </p>

        <div className="flex justify-center mb-6 sm:mb-8">
          <Button
            onClick={handleClick}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            Click here for present 🎁
          </Button>
        </div>

        <p className="text-center text-pink-400 text-xs sm:text-sm">
          Made with love, just for you
        </p>
      </div>
    </div>
  );
}
