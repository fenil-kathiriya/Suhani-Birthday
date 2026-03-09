'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
// To use confetti, run: npm install canvas-confetti & npm install -D @types/canvas-confetti
import confetti from 'canvas-confetti'; 

interface FinalLetterProps {
  onRestart: () => void;
}

export default function FinalLetter({ onRestart }: FinalLetterProps) {
  const [isSealing, setIsSealing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleSeal = () => {
    setIsSealing(true);
    
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ec4899', '#facc15', '#8b5cf6']
    });

    setTimeout(() => {
      setIsSealing(false);
      setIsFinished(true);
    }, 1800);
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-white to-purple-100 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-x-hidden font-serif">
      
      {/* Animated Floating background shapes - Hidden on very small screens for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-[10%] left-[5%] text-4xl sm:text-6xl opacity-20"
        >
          ✨
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[10%] right-[5%] text-4xl sm:text-6xl opacity-20"
        >
          🌸
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg md:max-w-2xl relative z-10"
      >
        {/* Paper Stack Effect (Subtle for Mobile) */}
        <div className="absolute inset-0 bg-white/60 transform rotate-1 rounded-[2rem] shadow-sm -z-10" />
        
        <div className="bg-[#fffefe] rounded-[2rem] shadow-2xl p-6 sm:p-10 md:p-12 border border-rose-50 relative overflow-hidden">
          
          {/* Header Section */}
          <div className="flex flex-col items-center mb-6 sm:mb-10">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-50 rounded-full flex items-center justify-center mb-3 shadow-inner"
            >
              <span className="text-2xl sm:text-3xl">💌</span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight text-center leading-tight">
              A Special Note for <br className="sm:hidden" />
              <span className="text-rose-500">Madam Ji</span>
            </h2>
          </div>

          {/* Letter Body - Fluid Typography */}
          <div className="space-y-5 sm:space-y-6 text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed">
            <p className="font-semibold text-rose-600 italic">Dearest Madam Ji,</p>
            
            <p className="text-gray-800">
              If life is repeated a thousand times, I would still <span className="underline decoration-rose-200 decoration-2 underline-offset-4 font-medium">choose you</span> as my love, over and over again.
            </p>

            <div className="italic bg-amber-50/50 p-4 sm:p-5 rounded-2xl border-l-4 border-amber-200 my-4 text-gray-600 text-sm sm:text-lg">
              "Very soon, Suhani Fenilbhai Kathiriya will not just be a name, but my forever."
            </div>

            <p className="text-gray-800">
              And I will come to meet you for sure. You aren't just a dream—<span className="font-bold">you mean everything to me.</span>
            </p>

            <div className="py-4 text-center">
              <motion.p 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-rose-500 via-purple-500 to-orange-400 bg-clip-text text-transparent"
              >
                Happiest Birthday Baby Girl!! 🎂
              </motion.p>
            </div>
          </div>

          {/* Action Buttons - Stacked on Mobile, Row on Desktop */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-12">
            {!isFinished ? (
              <Button
                onClick={handleSeal}
                disabled={isSealing}
                className="flex-[2] bg-rose-500 hover:bg-rose-600 text-white rounded-2xl py-6 sm:py-8 text-lg sm:text-xl font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-200"
              >
                {isSealing ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin text-xl">⏳</span> Sealing...
                  </span>
                ) : 'Seal with Love 💋'}
              </Button>
            ) : (
              <motion.div 
                initial={{ y: 10 }} animate={{ y: 0 }}
                className="flex-[2] text-center py-4 bg-green-50 rounded-2xl border border-green-100 text-green-700 font-bold"
              >
                Sent with a Kiss! 💌
              </motion.div>
            )}

            <Button
              onClick={onRestart}
              variant="outline"
              className="flex-1 py-6 sm:py-8 rounded-2xl border-2 border-gray-100 hover:bg-gray-50 text-gray-400 font-bold transition-all order-last sm:order-none"
            >
              Restart 🔄
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Sealing Overlay (Full Screen) */}
      <AnimatePresence>
        {isSealing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-rose-950/60 backdrop-blur-md flex items-center justify-center z-[100] p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl max-w-xs w-full"
            >
              <div className="text-6xl mb-4 animate-bounce">🕯️</div>
              <h3 className="text-xl font-bold text-gray-800">Dripping the wax...</h3>
              <p className="text-gray-500 mt-2">Making it yours forever.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}