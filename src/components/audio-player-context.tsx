'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  togglePlayPause: () => void;
  play: () => void;
  pause: () => void;
  currentTime: number;
  duration: number;
  seek: (timeSeconds: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(183);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userInteractedRef = useRef<boolean>(false);
  const userPausedRef = useRef<boolean>(false);

  const play = () => {
    if (!audioRef.current) return;
    userPausedRef.current = false;
    audioRef.current.muted = false;
    audioRef.current.volume = 0.35;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          userInteractedRef.current = true;
        })
        .catch(() => {});
    }
  };

  const pause = () => {
    if (!audioRef.current) return;
    userPausedRef.current = true;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (timeSeconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = timeSeconds;
      setCurrentTime(timeSeconds);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Bossa nova background music for the cafe website
    const audio = new Audio('/audio/hitslab-bossa-nova-bossa-nova-cafe-music-457829.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.35;
    audio.playbackRate = 0.92;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
          setDuration(audioRef.current.duration);
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleTimeUpdate);

    const unmuteAndPlay = () => {
      if (!audioRef.current) return;
      if (document.hidden || document.visibilityState === 'hidden') return;
      if (userPausedRef.current) return;

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
            // Muted fallback if browser strict policy blocks unmuted autoplay until first touch/scroll
            if (audioRef.current && !userPausedRef.current) {
              audioRef.current.muted = true;
              audioRef.current.play().catch(() => {});
            }
          });
      }
    };

    const pauseAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    // Attempt playback immediately on website load
    unmuteAndPlay();

    // Start playing on scroll/gesture UNLESS user explicitly paused
    const handleUserInteraction = () => {
      if (!document.hidden && document.visibilityState === 'visible' && !userPausedRef.current) {
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

    const handleVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        pauseAudio();
      } else if (!userPausedRef.current) {
        unmuteAndPlay();
      }
    };

    const handleBlur = () => {
      pauseAudio();
    };

    const handleFocus = () => {
      if (!document.hidden && document.visibilityState === 'visible' && !userPausedRef.current) {
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
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleTimeUpdate);
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
    <AudioContext.Provider
      value={{
        isPlaying,
        togglePlayPause,
        play,
        pause,
        currentTime,
        duration,
        seek,
      }}
    >
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
