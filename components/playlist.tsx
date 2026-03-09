'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface PlaylistProps {
  onNext: () => void;
}

const songs = [
  {
    id: 1,
    title: 'Ek tu hi yaar mera',
    description: "This one's for you — my love",
    image: 'https://teddybearlife.jp/cdn/shop/files/wedding_8_1800x1800.jpg?v=1720422701',
    audioUrl: 'https://res.cloudinary.com/dpv49n41d/video/upload/v1773059110/Ek_Tu_Hi_Yaar_Mera_Song_mzdlrz.mp3', 
  },
  {
    id: 2,
    title: 'Kabhi Kabhi',
    description: "No matter what, I'd always find my way back to you",
    image: 'https://i.etsystatic.com/9758082/r/il/a370da/5786083239/il_fullxfull.5786083239_rjmo.jpg',
    audioUrl: 'https://res.cloudinary.com/dpv49n41d/video/upload/v1773058986/kabhi_kabhi_Aditi_lyrics_kabhi_kabhi_to_lage_zindegi_me_rahi_na_khusi_aur_na_maza_lyrical_video_nws6nk.mp3',
  },
  {
    id: 3,
    title: 'Until I found u',
    description: 'Songs that make us smile',
    image: 'https://i.pinimg.com/736x/60/5c/d3/605cd373a876b608fa6cf5cd4d2395d1.jpg',
    audioUrl: 'https://res.cloudinary.com/dpv49n41d/video/upload/v1773059108/I_would_never_fall_in_love_again_until_I_found_herMarvel_Edit_vnrjs3.mp3',
  },
];

export default function Playlist({ onNext }: PlaylistProps) {
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlaySong = (songId: number, audioUrl: string) => {
    // 1. If clicking the currently playing song, pause it
    if (selectedSong === songId) {
      audioRef.current?.pause();
      setSelectedSong(null);
      return;
    }

    // 2. Stop and cleanup any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ''; 
      audioRef.current.load(); // Force reset
    }

    // 3. Initialize and play new audio
    const newAudio = new Audio(audioUrl);
    newAudio.preload = "auto"; 
    audioRef.current = newAudio;
    
    newAudio.play().catch(error => {
      console.error("Playback failed. Please check the audio URL.", error);
    });
    
    setSelectedSong(songId);

    newAudio.onended = () => {
      setSelectedSong(null);
    };
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-yellow-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-4 text-4xl opacity-50 animate-pulse">✨</div>
      <div className="absolute bottom-16 right-4 text-4xl opacity-50 animate-pulse">☁️</div>

      <div className="w-full max-w-4xl z-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-pink-600 mb-2">
          A Dedicated Playlist For You
        </h1>
        <p className="text-center text-pink-400 mb-8 text-sm md:text-base italic">
          I hope you&apos;ll like it
        </p>

        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/50">
          <p className="text-center text-purple-500 mb-8 font-medium">
             {selectedSong ? "Vibing right now... 🎵" : "Choose a track to start vibing"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {songs.map((song) => (
              <button
                key={song.id}
                onClick={() => handlePlaySong(song.id, song.audioUrl)}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 text-left ${
                  selectedSong === song.id
                    ? 'border-pink-500 ring-4 ring-pink-100 scale-105'
                    : 'border-transparent'
                }`}
              >
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={song.image} 
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 text-center mb-1">
                    {song.title}
                  </h3>
                  <p className="text-pink-500 text-xs text-center italic">
                    {song.description}
                  </p>
                </div>

                {selectedSong === song.id && (
                  <div className="bg-pink-500 text-white py-2 text-center text-xs font-bold animate-pulse">
                    ⏸ Tap to Pause
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={() => {
              audioRef.current?.pause();
              onNext();
            }}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-12 py-6 text-lg font-bold shadow-xl transition-all"
          >
            Continue to Next →
          </Button>
        </div>
      </div>
    </div>
  );
}