'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Bossa nova background music for the cafe website
    const audio = new Audio('/audio/hitslab-bossa-nova-bossa-nova-cafe-music-457829.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.35; // Pleasant, audible background volume
    audio.playbackRate = 0.92;
    audioRef.current = audio;

    // Start audio muted immediately (100% browser compliant, bypasses browser autoplay block)
    const startMutedPlayback = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = true;
      audioRef.current.play().catch(() => {});
    };

    const unmuteAndPlay = () => {
      if (!audioRef.current) return;
      if (document.hidden || document.visibilityState === 'hidden') return;

      audioRef.current.muted = false;
      audioRef.current.volume = 0.35;

      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            userInteractedRef.current = true;
          })
          .catch(() => {
            // Will play on user scroll or interaction
          });
      }
    };

    const pauseAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    // Initialize playback muted on mount
    startMutedPlayback();
    if (!document.hidden) {
      unmuteAndPlay();
    }

    // Unmute and play music on ANY scroll, wheel, mousemove, or gesture in desktop & mobile
    const handleUserInteraction = () => {
      if (!document.hidden && document.visibilityState === 'visible') {
        unmuteAndPlay();
      }
    };

    const events = [
      'scroll',
      'wheel',
      'mousemove',
      'pointermove',
      'mousedown',
      'touchstart',
      'touchmove',
      'click',
      'keydown',
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, handleUserInteraction, { passive: true });
      document.addEventListener(evt, handleUserInteraction, { passive: true });
    });

    // Pause audio when switching tabs, leaving browser, minimizing window, or locking mobile screen
    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        pauseAudio();
      } else if (userInteractedRef.current) {
        unmuteAndPlay();
      }
    };

    const handleBlur = () => {
      pauseAudio();
    };

    const handleFocus = () => {
      if (!document.hidden && document.visibilityState === 'visible' && userInteractedRef.current) {
        unmuteAndPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pagehide', pauseAudio);

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserInteraction);
        document.removeEventListener(evt, handleUserInteraction);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pagehide', pauseAudio);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <AudioContext.Provider value={{ isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
}

export function AudioPromptBanner() {
  return null;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
