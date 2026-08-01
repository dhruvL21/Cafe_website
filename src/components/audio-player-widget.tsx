'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/components/audio-player-context';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, X, Music } from 'lucide-react';

export default function AudioPlayerWidget() {
  const { isPlaying, togglePlayPause, currentTime, duration, seek } = useAudio();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatRemainingTime = (current: number, dur: number) => {
    const rem = dur - current;
    if (isNaN(rem) || rem <= 0) return '-0:00';
    const mins = Math.floor(rem / 60);
    const secs = Math.floor(rem % 60);
    return `-${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = clickX / rect.width;
    const newTime = newPercent * duration;
    seek(newTime);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none outline-none focus:outline-none focus-visible:outline-none [-webkit-tap-highlight-color:transparent]">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* COLLAPSED CIRCULAR MATCHA BADGE */
          <motion.div
            key="collapsed-badge"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="relative cursor-pointer group select-none outline-none focus:outline-none focus-visible:outline-none [-webkit-tap-highlight-color:transparent]"
          >
            {/* Floating Matcha Cup Image directly without any highlight rings */}
            <div className="relative w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center select-none overflow-visible">
              <Image
                src="/logo_matcha.png"
                alt="Matcha Latte"
                width={85}
                height={105}
                className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] transition-transform duration-300 pointer-events-none select-none"
                priority
              />

              {/* Status Icon Badge (Play/Pause indicator) */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black border border-black/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform outline-none select-none">
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-black text-black" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-black text-black ml-0.5" />
                )}
              </div>
            </div>

            {/* Hover Tooltip */}
            <div className="absolute right-0 -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[10px] font-sans tracking-wider uppercase font-bold py-1 px-2.5 rounded-full whitespace-nowrap pointer-events-none border border-white/10 shadow-lg select-none">
              {isPlaying ? 'Now Playing • Click for Controls' : 'Click to Open Music Player'}
            </div>
          </motion.div>
        ) : (
          /* EXPANDED MUSIC PLAYER WIDGET CARD WITH MATCHA ARTWORK */
          <motion.div
            key="expanded-widget"
            initial={{ scale: 0.85, opacity: 0, y: 30, transformOrigin: 'bottom right' }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            className="relative bg-[#141210]/95 backdrop-blur-2xl border border-white/15 rounded-[28px] p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex items-center gap-3 sm:gap-5 w-[330px] sm:w-[410px] overflow-visible select-none outline-none focus:outline-none focus-visible:outline-none [-webkit-tap-highlight-color:transparent]"
          >
            {/* Collapse / Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-3 text-white/50 hover:text-white bg-white/5 hover:bg-white/15 rounded-full p-1.5 transition-all cursor-pointer z-20 outline-none focus:outline-none select-none"
              title="Minimize player"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Breakout Matcha Cup Image (Left Side) */}
            <div
              className="relative shrink-0 cursor-pointer group select-none outline-none"
              onClick={togglePlayPause}
              title={isPlaying ? 'Click to Pause' : 'Click to Play'}
            >
              <motion.div
                whileHover={{ scale: 1.04, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative -mt-6 -ml-3 w-28 sm:w-36 h-36 sm:h-44 flex items-center justify-center drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] select-none"
              >
                <Image
                  src="/logo_matcha.png"
                  alt="Matcha Latte Cup"
                  width={140}
                  height={180}
                  className="object-contain pointer-events-none select-none"
                  priority
                />
              </motion.div>
            </div>

            {/* Right Side Content & Controls */}
            <div className="flex-1 flex flex-col justify-between min-w-0 pr-1 sm:pr-2 select-none">
              {/* Title & Artist Header */}
              <div className="mb-2 select-none">
                <div className="flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <h4 className="text-lg sm:text-xl font-sans font-black tracking-wider text-white uppercase truncate select-none">
                    MATCHA LATTE
                  </h4>
                </div>
                <p className="text-[10px] sm:text-xs text-zinc-400 font-sans font-semibold uppercase tracking-widest truncate mt-0.5 select-none">
                  DE LA PAU COFFEE CO.
                </p>
              </div>

              {/* Interactive Progress Bar */}
              <div className="mb-3 select-none">
                <div
                  onClick={handleSeek}
                  className="relative h-1.5 w-full bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all overflow-hidden select-none outline-none"
                >
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-white rounded-full transition-all duration-150 select-none"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono mt-1 font-semibold select-none">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatRemainingTime(currentTime, duration)}</span>
                </div>
              </div>

              {/* Playback Controls Row */}
              <div className="flex items-center justify-between text-white/70 select-none">
                {/* Shuffle Button */}
                <button
                  className="hover:text-white transition-colors cursor-pointer p-1 outline-none select-none"
                  title="Shuffle"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                {/* Previous Track (Non-skipping) */}
                <button
                  className="hover:text-white/90 text-white/60 transition-colors cursor-pointer p-1 outline-none select-none"
                  title="Previous"
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </button>

                {/* Main Play / Pause White Button (No Outline / Highlight Ring) */}
                <button
                  onClick={togglePlayPause}
                  className="w-11 h-11 bg-white text-black rounded-full flex items-center justify-center active:scale-95 transition-transform cursor-pointer outline-none focus:outline-none focus-visible:outline-none [-webkit-tap-highlight-color:transparent] select-none border-none shadow-md"
                  title={isPlaying ? 'Pause Music' : 'Play Music'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-black text-black" />
                  ) : (
                    <Play className="w-5 h-5 fill-black text-black ml-0.5" />
                  )}
                </button>

                {/* Next Track (Non-skipping) */}
                <button
                  className="hover:text-white/90 text-white/60 transition-colors cursor-pointer p-1 outline-none select-none"
                  title="Next"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>

                {/* Repeat Button */}
                <button
                  className="hover:text-white transition-colors cursor-pointer p-1 outline-none select-none"
                  title="Repeat"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
