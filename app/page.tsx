'use client';

import { useState } from 'react';
import Countdown from '@/components/countdown';
import Greeting from '@/components/greeting';
import Celebration from '@/components/celebration';
import Envelope from '@/components/envelope';
import LoveLetter from '@/components/love-letter';
import Playlist from '@/components/playlist';
import SpecialCards from '@/components/special-cards';
import FinalLetter from '@/components/final-letter';

type PageType =
  | 'countdown'
  | 'greeting'
  | 'celebrate-light'
  | 'celebrate-dark'
  | 'envelope'
  | 'love-letter'
  | 'playlist'
  | 'special-cards'
  | 'final-letter';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('countdown');

  const handleNavigation = (page: PageType) => {
    setCurrentPage(page);
  };

  const handleRestart = () => {
    setCurrentPage('countdown');
  };

  return (
    <main className="w-full min-h-screen">
      {currentPage === 'countdown' && (
        <Countdown onComplete={() => handleNavigation('greeting')} />
      )}

      {currentPage === 'greeting' && (
        <Greeting onNext={() => handleNavigation('celebrate-light')} />
      )}

      {currentPage === 'celebrate-light' && (
        <Celebration isDark={false} onNext={() => handleNavigation('celebrate-dark')} />
      )}

      {currentPage === 'celebrate-dark' && (
        <Celebration isDark={true} onNext={() => handleNavigation('envelope')} />
      )}

      {currentPage === 'envelope' && (
        <Envelope onOpen={() => handleNavigation('love-letter')} />
      )}

      {currentPage === 'love-letter' && (
        <LoveLetter onNext={() => handleNavigation('playlist')} />
      )}

      {currentPage === 'playlist' && (
        <Playlist onNext={() => handleNavigation('special-cards')} />
      )}

      {currentPage === 'special-cards' && (
        <SpecialCards onNext={() => handleNavigation('final-letter')} />
      )}

      {currentPage === 'final-letter' && (
        <FinalLetter onRestart={handleRestart} />
      )}
    </main>
  );
}
