'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PartyPopper, Sparkles, Gift, Loader2, Music } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  onNext: () => void;
}

// 1. GLOBAL VARIABLE: Stores state outside the component
// This resets on page reload (browser refresh) but persists if the component just re-renders.
let hasCelebratedSession = false;

export default function Celebration({ onNext }: CelebrationProps) {
  // 2. Initialize state based on the global variable
  const [isLit, setIsLit] = useState(hasCelebratedSession);
  const [isNavigating, setIsNavigating] = useState(hasCelebratedSession);
  
  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Attempt to play audio immediately on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.warn("Autoplay was blocked by the browser. Waiting for user interaction.", error);
      });
    }
  }, []);

  // 3. Auto-forward if we mounted in a "celebrated" state
  useEffect(() => {
    if (hasCelebratedSession) {
      const timer = setTimeout(() => {
        onNext();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [onNext]);

  // Trigger confetti when lit
  useEffect(() => {
    if (isLit) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isLit]);

  const handleOpen = () => {
    if (isNavigating) return;

    // Ensure audio plays when the user clicks (bypasses browser autoplay restrictions)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }

    // 4. Update the global variable so we remember this click
    hasCelebratedSession = true;

    setIsLit(true);
    setIsNavigating(true);
    
    setTimeout(() => onNext(), 3000); 
  };

  return (
    <div className={`w-full min-h-screen transition-all duration-[1500ms] flex items-center justify-center p-6 relative overflow-hidden ${
      isLit ? 'bg-[#faf5ff]' : 'bg-[#050505]'
    }`}>
      
      {/* BACKGROUND AUDIO */}
      <audio 
        ref={audioRef} 
        src="https://res.cloudinary.com/dpv49n41d/video/upload/v1773060920/happy_birthday_gsfzay.mp3" 
        preload="auto"
      />

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        {isLit ? (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-200/40 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 rounded-full blur-[120px] animate-pulse" />
            
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -40, 0],
                  x: [0, 20, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-rose-100 to-indigo-100 opacity-40 blur-xl"
                style={{ top: `${i * 15}%`, left: `${i * 12}%` }}
              />
            ))}
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black" />
        )}
      </div>

      <div className="w-full max-w-2xl z-10">
        <AnimatePresence mode="wait">
          {!isLit ? (
            <motion.div 
              key="wait"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              className="text-center space-y-8"
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-zinc-800 p-8 rounded-[3rem] border border-zinc-700 shadow-2xl"
                >
                  <Gift size={64} className="text-rose-500" />
                </motion.div>
                <Sparkles className="absolute -top-4 -right-4 text-yellow-500 animate-bounce" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-zinc-500 uppercase tracking-[0.4em] text-xs font-bold">Waiting for the magic</h2>
                <p className="text-zinc-400 font-serif italic">Something wonderful is inside...</p>
              </div>

              <Button
                onClick={handleOpen}
                disabled={isNavigating}
                className="bg-white text-black hover:bg-rose-50 rounded-full px-12 py-8 text-sm font-black uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-transform active:scale-95 disabled:opacity-70"
              >
                {isNavigating ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    Starting...
                  </>
                ) : (
                  "Tap to Celebrate"
                )}
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="celebrate"
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="mb-12 relative">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                >
                  <span className="inline-block px-4 py-1 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    Today is the day
                  </span>
                  <h1 className="text-6xl md:text-[10rem] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-stone-900 via-stone-800 to-stone-600 tracking-tighter leading-none">
                    Suhani
                  </h1>
                </motion.div>
                
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="h-[2px] w-48 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mt-6" 
                />
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/60 backdrop-blur-2xl border border-white/80 p-10 rounded-[4rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      >
                        <PartyPopper size={24} className="text-rose-400" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-stone-600 text-lg font-medium tracking-tight">
                    Happy Birthday! We&apos;ve been <br />
                    <span className="italic text-rose-500 font-serif">expecting you.</span>
                  </p>

                  <Button
                    disabled
                    className="bg-rose-500 text-white rounded-full px-10 py-7 uppercase text-[10px] font-black tracking-widest"
                  >
                    <Loader2 className="mr-2 animate-spin" size={16} />
                    Preparing your message...
                  </Button>
                </div>

                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Music size={120} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}