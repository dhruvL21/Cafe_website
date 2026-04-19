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
        router.push('/menu');
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
          className="absolute left-2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: dragAreaWidth > 0 ? dragAreaWidth : 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{
            x: unlocked && dragAreaWidth > 0 ? dragAreaWidth : 0,
            opacity: unlocked ? 0 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
        >
          <Coffee className="text-white" size={24} />
        </motion.div>
        
        <motion.span
          className="tracking-widest text-base"
          animate={{ opacity: isDragging ? 0 : [1, 0.5, 1] }}
          transition={{ 
            opacity: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
           }}
        >
          MENU
        </motion.span>
        
        <motion.div
          className="absolute right-4"
          animate={{
            x: [0, 5, 0, 5, 0],
            opacity: isDragging ? 0 : [0.5, 1, 0.5, 1, 0.5],
          }}
          transition={{
            x: {
              repeat: Infinity,
              duration: 1.5,
              ease: 'easeInOut',
            },
            opacity: {
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear',
            }
          }}
        >
          <ArrowRight size={20} />
        </motion.div>
      </div>
    </div>
  );
};

export default SlideToUnlock;
