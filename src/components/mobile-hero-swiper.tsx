'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const banners = [
  {
    id: 'banner-1',
    src: '/banner-1.png',
    alt: 'Banner 1'
  },
  {
    id: 'banner-2',
    src: '/banner-2.png',
    alt: 'Banner 2'
  },
  {
    id: 'banner-3',
    src: '/banner-3.png',
    alt: 'Banner 3'
  }
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export default function MobileHeroSwiper() {
  const [[page, direction], setPage] = useState([0, 0]);

  const activeIndex = Math.abs(page % banners.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto Swipe every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 pt-20 pb-12 select-none">
      {/* Main Outer Box Card Container */}
      <div className="relative w-full max-w-[360px] xs:max-w-[390px] h-[520px] xs:h-[560px] rounded-[36px] border border-white/20 bg-[#12161a]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col justify-between">
        
        {/* Banner Content Container with AnimatePresence */}
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -100) {
                  paginate(1);
                } else if (swipe > 100) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full bg-black"
            >
              <Image
                src={banners[activeIndex].src}
                alt={banners[activeIndex].alt}
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center gap-2 pointer-events-auto">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const dir = idx > activeIndex ? 1 : -1;
                setPage([idx, dir]);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex
                  ? 'w-6 bg-white shadow-md'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
