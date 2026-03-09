'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SpecialCardsProps {
  onNext: () => void;
}

const cards = [
  {
    id: 1,
    // Changed .heic to .jpg so it renders in all browsers
    image: 'https://res.cloudinary.com/dpv49n41d/image/upload/v1773058847/IMG_3877_hzaacm.jpg',
    revealed: 'You make me smile every day with your presence',
  },
  {
    id: 2,
    // Changed .heic to .jpg so it renders in all browsers
    image: 'https://res.cloudinary.com/dpv49n41d/image/upload/v1773058846/IMG_0601_g5vwpe.jpg',
    revealed: 'Your laugh is my favorite sound in the world',
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dpv49n41d/image/upload/v1773058845/20979dad-b06f-4cbd-ba1a-ed73ef2baafe_njluea.jpg',
    revealed: 'Together we create the best memories',
  },
];

export default function SpecialCards({ onNext }: SpecialCardsProps) {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());

  const toggleCard = (id: number) => {
    const newRevealed = new Set(revealedCards);
    if (newRevealed.has(id)) {
      newRevealed.delete(id);
    } else {
      newRevealed.add(id);
    }
    setRevealedCards(newRevealed);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 sm:top-10 left-4 sm:left-10 text-4xl sm:text-5xl lg:text-6xl opacity-50 animate-pulse">✨</div>
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 text-4xl sm:text-5xl lg:text-6xl opacity-50 animate-pulse">☁️</div>
      <div className="absolute top-1/4 left-4 sm:left-5 text-3xl sm:text-4xl lg:text-5xl opacity-40">💕</div>
      <div className="absolute bottom-1/4 right-4 sm:right-5 text-3xl sm:text-4xl lg:text-5xl opacity-40">💕</div>

      <div className="w-full max-w-4xl">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-2 sm:mb-3">
          Some Special Cards For You
        </h1>
        <p className="text-center text-pink-400 mb-8 sm:mb-12 text-xs sm:text-sm md:text-base">
          Click each card to reveal a special memory
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`h-40 sm:h-48 cursor-pointer relative rounded-lg sm:rounded-2xl shadow-lg transition-all transform duration-500 active:scale-95 border-4 ${
                revealedCards.has(card.id)
                  ? 'bg-white border-pink-300'
                  : 'bg-gradient-to-br from-pink-100 to-purple-100 border-white hover:scale-105'
              }`}
              type="button"
            >
              {/* Card back (unrevealed) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 rounded-lg sm:rounded-2xl ${
                  revealedCards.has(card.id) ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl sm:text-6xl mb-2">✨</div>
                  <p className="text-pink-600 font-semibold text-xs sm:text-sm">Tap!</p>
                </div>
              </div>

              {/* Card front (revealed) */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-500 rounded-lg sm:rounded-2xl ${
                  revealedCards.has(card.id) ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Replaced emoji text with a rounded image container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 rounded-full overflow-hidden shadow-inner flex-shrink-0 border-2 border-pink-100">
                  <img 
                    src={card.image} 
                    alt="Special memory" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-800 font-semibold text-center text-xs sm:text-sm italic leading-relaxed">
                  {card.revealed}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <Button
            onClick={onNext}
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-xs sm:text-sm md:text-lg font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            Continue to Next →
          </Button>
        </div>
      </div>
    </div>
  );
}