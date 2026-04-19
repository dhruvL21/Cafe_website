'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Coffee, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SlideToUnlock = () => {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleSize = 48; // Corresponds to w-12, h-12
  const dragAreaWidth = containerWidth > 0 ? containerWidth - handleSize - 16 : 0; // 16 for padding (left-2 + right of handle)

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        if (entries[0]) {
          setContainerWidth(entries[0].contentRect.width);
        }
      });
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    if (dragAreaWidth > 0 && info.offset.x > dragAreaWidth * 0.75) {
      setUnlocked(true);
      setTimeout(() => {
        router.push('/specials');
      }, 300);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="relative w-full h-16 rounded-full bg-[#14181c] flex items-center justify-center text-white/50 border border-white/10 shadow-inner"
      >
        <motion.div
          className="absolute left-2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
          drag="x"
          dragConstraints={{ left: 0, right: dragAreaWidth > 0 ? dragAreaWidth : 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={
            unlocked 
              ? { x: dragAreaWidth, opacity: 0 } 
              : isDragging 
                ? {} 
                : { 
                    x: [0, 15, 0],
                  }
          }
          transition={
            isDragging 
              ? { type: 'spring', stiffness: 300, damping: 25 } 
              : { 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatDelay: 2,
                  ease: "easeInOut"
                }
          }
        >
          <Coffee className="text-white" size={24} />
          {/* Subtle glow effect behind the handle */}
          {!isDragging && !unlocked && (
            <motion.div 
              className="absolute inset-0 rounded-full bg-white/20 -z-10"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
        
        <div className="relative overflow-hidden px-12 text-center pointer-events-none">
          <motion.span
            className="tracking-[0.15em] text-sm sm:text-base font-bold whitespace-nowrap bg-gradient-to-r from-white/20 via-white to-white/20 bg-[length:200%_100%] bg-clip-text text-transparent uppercase"
            animate={{ 
              backgroundPosition: ['100% 0', '-100% 0'],
              opacity: isDragging ? 0 : 1 
            }}
            transition={{ 
              backgroundPosition: {
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              },
              opacity: { duration: 0.2 }
            }}
          >
            REVEAL SPECIALS
          </motion.span>
        </div>
        
        <motion.div
          className="absolute right-4"
          animate={{
            x: isDragging ? 10 : [0, 5, 0],
            opacity: isDragging ? 0 : [0.3, 1, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut',
          }}
        >
          <ArrowRight size={20} className="text-white/50" />
        </motion.div>
      </div>
    </div>
  );
};

export default SlideToUnlock;
