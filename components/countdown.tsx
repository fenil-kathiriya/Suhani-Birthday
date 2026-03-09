'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  onComplete?: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 2 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
          setIsComplete(true);
          onComplete?.();
          return prev;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const pad = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="w-full min-h-screen bg-[#fff0f3] flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="bg-white rounded-[2rem] shadow-sm p-8 sm:p-12 max-w-2xl w-full border border-pink-50">
        
        {/* Header with Sparkles/Hearts */}
        <h1 className="text-center text-xl sm:text-2xl md:text-3xl font-bold text-[#642b42] mb-8 flex items-center justify-center gap-2">
          ✨💕 <span className="whitespace-nowrap">Countdown for Birthday</span> 💕✨
        </h1>

        {/* Timer Container */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-8">
          
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 flex items-center justify-center">
              <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#b03060]">{pad(timeLeft.hours)}</span>
            </div>
            <p className="text-pink-300 text-[10px] sm:text-xs mt-3 uppercase tracking-wider font-medium">Hours</p>
          </div>

          <span className="text-pink-200 text-2xl mb-6 sm:mb-8 font-bold">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 flex items-center justify-center">
              <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#b03060]">{pad(timeLeft.minutes)}</span>
            </div>
            <p className="text-pink-300 text-[10px] sm:text-xs mt-3 uppercase tracking-wider font-medium">Minutes</p>
          </div>

          <span className="text-pink-200 text-2xl mb-6 sm:mb-8 font-bold">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 flex items-center justify-center">
              <span className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#b03060]">{pad(timeLeft.seconds)}</span>
            </div>
            <p className="text-pink-300 text-[10px] sm:text-xs mt-3 uppercase tracking-wider font-medium">Seconds</p>
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