'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Bossa nova background music for the cafe website
    const audio = new Audio('/audio/hitslab-bossa-nova-bossa-nova-cafe-music-457829.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.muted = false; // Always unmuted
    audio.volume = 0.35; // Pleasant, audible background volume
    audio.playbackRate = 0.92;
    audioRef.current = audio;

    const playAudio = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false;
      audioRef.current.volume = 0.35;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          removeListeners();
        })
        .catch(() => {
          // Will play on first scroll or touch gesture
        });
    };

    // Attempt playing unmuted audio immediately on mount
    playAudio();

    // Listen for scroll, touchmove, wheel, click or keypress in desktop and mobile view
    const handleScrollOrGesture = () => {
      playAudio();
    };

    const events = [
      'scroll',
      'wheel',
      'touchmove',
      'touchstart',
      'mousemove',
      'pointermove',
      'click',
      'keydown',
    ];

    const removeListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleScrollOrGesture);
        document.removeEventListener(evt, handleScrollOrGesture);
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, handleScrollOrGesture, { passive: true });
      document.addEventListener(evt, handleScrollOrGesture, { passive: true });
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      removeListeners();
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
}

export function AudioPromptBanner() {
  // No banner needed; audio starts seamlessly on scroll/interaction
  return null;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
