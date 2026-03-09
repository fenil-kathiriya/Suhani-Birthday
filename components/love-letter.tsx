'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface LoveLetterProps {
  onNext: () => void;
}

export default function LoveLetter({ onNext }: LoveLetterProps) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 sm:top-10 left-4 sm:left-10 text-4xl sm:text-5xl lg:text-6xl opacity-50 animate-pulse">✨</div>
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 text-4xl sm:text-5xl lg:text-6xl opacity-50 animate-pulse">☁️</div>
      <div className="absolute top-1/4 left-4 sm:left-5 text-3xl sm:text-4xl lg:text-5xl opacity-40">💕</div>
      <div className="absolute bottom-1/4 right-4 sm:right-5 text-3xl sm:text-4xl lg:text-5xl opacity-40">💕</div>

      <div className="w-full max-w-3xl">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-2 sm:mb-3">
          A Love Letter
        </h1>
        <p className="text-center text-pink-400 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base">
          From someone who loves you
        </p>

        {/* Letter content */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border-2 sm:border-4 border-yellow-200 relative">
          {/* Cat decoration */}
          <div className="absolute -top-8 sm:-top-12 right-4 sm:right-8 text-4xl sm:text-6xl lg:text-7xl">🐱</div>

          {/* Window controls on letter */}
          <div className="flex gap-2 mb-6 sm:mb-8">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-pink-300"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-300"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-300"></div>
          </div>

          {/* Letter icon */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm sm:text-lg flex-shrink-0">
              💌
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">To My Dearest Love</h2>
          </div>

          {/* Letter content */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <p className="text-gray-700 italic text-center text-xs sm:text-sm md:text-base leading-relaxed">
              Happy Birthday! I hope your day is full of smiles, good vibes, and lots of cake. Wishing you a year filled with happiness, peace, and fun moments. You are such an amazing person, and I'm genuinely in love with you. Just enjoy life, relax, and keep smiling. You truly deserve all the good things coming your way. As someone who loves you, know that I'm always here for you. Enjoy your special day and stay happy always!
            </p>

            {/* Heart decoration */}
            <div className="flex justify-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl">💝</div>
            </div>

            <p className="text-pink-500 text-center text-sm sm:text-base md:text-lg italic font-semibold">
              with all my love, Always here for you
            </p>
          </div>

          {/* Signature area */}
          <div className="border-t-2 border-pink-200 pt-4 sm:pt-6 mt-6 sm:mt-8">
            <p className="text-pink-400 text-xs sm:text-sm italic">Sealing will finish the experience.</p>
          </div>
        </div>

        {/* Continue button */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-xs sm:text-sm md:text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            Continue To See More →
          </Button>
        </div>
      </div>
    </div>
  );
}
