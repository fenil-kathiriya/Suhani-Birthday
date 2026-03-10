'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  onComplete?: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  // Initialize with zeroes to prevent server/client hydration mismatches
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 

    // Target Date: March 30, 2026 at 00:00:03 IST
    const targetDate = new Date('2026-03-30T00:00:03+05:30').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!isComplete) {
          setIsComplete(true);
          onComplete?.();
        }
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isComplete, onComplete]);

  const pad = (num: number) => String(num).padStart(2, '0');

  if (!isMounted) return null;

  return (
    <div className="w-full min-h-screen bg-[#fff0f3] flex items-center justify-center p-4">
      {/* Main Card - Reduced mobile padding slightly to give the row more room */}
      <div className="bg-white rounded-[2rem] shadow-sm p-4 sm:p-12 max-w-4xl w-full border border-pink-50">
        
        {/* Header with Sparkles/Hearts */}
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-[#642b42] mb-8 flex items-center justify-center gap-2">
          ✨💕 <span className="whitespace-nowrap">Countdown for Suhu's Birthday</span> 💕✨
        </h1>

        {/* Timer Container - Changed to flex-nowrap and tightened mobile gap */}
        <div className="flex flex-nowrap items-center justify-center gap-1 sm:gap-4 md:gap-6 mb-8 w-full">
          
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 flex items-center justify-center">
              <span className="text-xl sm:text-4xl md:text-5xl font-bold text-[#b03060]">{pad(timeLeft.days)}</span>
            </div>
            <p className="text-pink-300 text-[10px] sm:text-xs mt-2 sm:mt-3 uppercase tracking-wider font-medium">Days</p>
          </div>

          <span className="text-pink-200 text-lg sm:text-2xl mb-5 sm:mb-8 font-bold">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 flex items-center justify-center">
              <span className="text-xl sm:text-4xl md:text-5xl font-bold text-[#b03060]">{pad(timeLeft.hours)}</span>
            </div>
            <p className="text-pink-300 text-[10px] sm:text-xs mt-2 sm:mt-3 uppercase tracking-wider font-medium">Hours</p>
          </div>

          <span className="text-pink-200 text-lg sm:text-2xl mb-5 sm:mb-8 font-bold">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 flex items-center justify-center">
              <span className="text-xl sm:text-4xl md:text-5xl font-bold text-[#b03060]">{pad(timeLeft.minutes)}</span>
            </div>
            <p className="text-pink-300 text-[10px] sm:text-xs mt-2 sm:mt-3 uppercase tracking-wider font-medium">Mins</p>
          </div>

          <span className="text-pink-200 text-lg sm:text-2xl mb-5 sm:mb-8 font-bold">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 flex items-center justify-center">
              <span className="text-xl sm:text-4xl md:text-5xl font-bold text-[#b03060]">{pad(timeLeft.seconds)}</span>
            </div>
            <p className="text-pink-300 text-[10px] sm:text-xs mt-2 sm:mt-3 uppercase tracking-wider font-medium">Secs</p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-[#a37d8d] text-sm sm:text-base font-light">
          The celebration will be available when the timer reaches zero.
        </p>
      </div>
    </div>
  );
}