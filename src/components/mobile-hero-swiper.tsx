'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const banners = [
  /* BANNER 1: ESCAFE MATCHA (Reference Image 4) */
  {
    id: 'matcha',
    bgClass: 'bg-[#0b0f0d] text-white',
    content: (
      <div className="w-full h-full flex flex-col justify-between p-6 relative select-none">
        {/* Top Header Row */}
        <div className="flex justify-between items-start pt-1">
          <div className="text-[10px] font-sans font-extrabold tracking-wider uppercase text-zinc-300 leading-tight">
            <p>PREMIUM</p>
            <p>JAPANESE MATCHA</p>
          </div>
          <div className="text-[10px] font-sans font-extrabold tracking-wider uppercase text-zinc-300 text-right leading-tight">
            <p>NO OTHER.</p>
            <p>NO ADDITIVES. JUST TEA.</p>
          </div>
        </div>

        {/* Center Main Headline */}
        <div className="text-center my-auto pt-2">
          <div className="flex items-center justify-center gap-1.5 inline-flex">
            <h2 className="text-5xl xs:text-6xl font-sans font-black tracking-tighter text-white uppercase leading-none">
              ESCAFE
            </h2>
            <span className="bg-[#1b432c] border border-emerald-400/40 text-white font-black text-2xl xs:text-3xl px-2 py-0.5 rounded-lg shadow-xl inline-block transform rotate-3">
              !
            </span>
          </div>
          <p className="text-xs text-zinc-300 font-sans tracking-wide mt-2 font-medium">
            take one cup of matcha everyday
          </p>
        </div>

        {/* Center Matcha Image Section with Bottom Details */}
        <div className="relative w-full flex flex-col items-center justify-end pb-2">
          <div className="relative w-52 h-52 xs:w-60 xs:h-60 flex items-center justify-center my-1">
            <Image
              src="/matcha.png"
              alt="Premium Japanese Matcha"
              width={260}
              height={260}
              className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.95)]"
              priority
            />
          </div>

          {/* Bottom Left & Right Overlay Badges */}
          <div className="w-full flex justify-between items-end text-[9px] xs:text-[10px] font-sans font-bold tracking-widest uppercase text-zinc-400 pt-2 px-1">
            <div className="leading-tight text-left">
              <p>KYOTO JAPAN</p>
              <p>PERFECT MATCHA</p>
            </div>
            <div className="leading-tight text-right">
              <p>KEEP IN A COOL, DRY PLACE</p>
              <p>HOLD IT TIGHTLY</p>
            </div>
          </div>
        </div>
      </div>
    )
  },

  /* BANNER 2: NASI GORENG / SPECIAL DISH CARD (Reference Image 1) */
  {
    id: 'nasi-goreng',
    bgClass: 'bg-[#121619] text-white',
    content: (
      <div className="w-full h-full flex flex-col justify-between p-6 relative select-none items-center text-center">
        {/* Top Dish Image Burst */}
        <div className="relative -mt-10 w-44 h-44 xs:w-48 xs:h-48 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.9)] flex items-center justify-center overflow-visible">
          <Image
            src="/pasta.png"
            alt="Nasi Goreng Special"
            width={210}
            height={210}
            className="object-cover rounded-full border-2 border-white/20 drop-shadow-2xl"
          />
        </div>

        {/* Dish Title & Description */}
        <div className="my-auto px-2">
          <h2 className="text-3xl xs:text-4xl font-serif italic text-zinc-100 tracking-wide mb-3">
            nasi goreng
          </h2>
          <p className="text-xs xs:text-sm text-zinc-300 font-sans leading-relaxed max-w-xs mx-auto font-light">
            The quintessential Indonesian fried rice, packed with a special mix of tripe, gizzards, meatballs, and sausage, served with fresh cucumber pickles and crispy crackers.
          </p>
        </div>

        {/* Price Tag */}
        <div className="mb-4">
          <span className="text-3xl font-sans font-light tracking-tight text-white">
            ₹375
          </span>
        </div>
      </div>
    )
  },

  /* BANNER 3: TIRAMISU POSTER (Reference Image 2) */
  {
    id: 'tiramisu',
    bgClass: 'bg-[#f4efe8] text-[#3d2314]',
    content: (
      <div className="w-full h-full flex flex-col justify-between p-6 relative select-none overflow-hidden text-center">
        {/* Typography Grid Background */}
        <div className="absolute inset-0 flex flex-col justify-center items-center opacity-90 pointer-events-none select-none py-4">
          <h2 className="text-5xl xs:text-6xl font-black tracking-tighter text-[#4a2817] leading-none uppercase">
            TIRAMISU
          </h2>
          <h2 className="text-5xl xs:text-6xl font-black tracking-tighter text-[#4a2817] leading-none uppercase">
            TIRAMISU
          </h2>
          <h2 className="text-5xl xs:text-6xl font-black tracking-tighter text-[#4a2817] leading-none uppercase">
            TIRAMISU
          </h2>
          <h2 className="text-5xl xs:text-6xl font-black tracking-tighter text-[#4a2817] leading-none uppercase">
            TIRAMISU
          </h2>
        </div>

        {/* Center Dish Image */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center">
          <div className="w-48 h-48 xs:w-56 xs:h-56 relative flex items-center justify-center">
            <Image
              src="/tiramisu.png"
              alt="Classic Tiramisu"
              width={240}
              height={240}
              className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            />
          </div>
        </div>

        {/* Bottom Tagline & Price */}
        <div className="relative z-10 mb-2">
          <p className="text-xs xs:text-sm font-sans font-extrabold uppercase tracking-wide text-[#3d2314]">
            LET EVERY BITE LIFT YOU UP
          </p>
          <p className="text-xs font-sans font-black uppercase text-[#6b3e24] tracking-widest mt-0.5">
            IT'S TIRAMISU TIME! • ₹300
          </p>
        </div>
      </div>
    )
  },

  /* BANNER 4: BUY 1 GET 1 OFFER (Reference Image 3) */
  {
    id: 'bogo',
    bgClass: 'bg-[#faf9f6] text-black',
    content: (
      <div className="w-full h-full flex flex-col justify-between p-6 relative select-none text-center">
        {/* Top Header */}
        <div className="pt-2">
          <h2 className="text-4xl xs:text-5xl font-black tracking-tight text-black leading-none">
            Buy 1 Get 1
          </h2>
          <p className="text-lg xs:text-xl font-sans font-medium text-zinc-700 tracking-wide mt-1">
            Black Friday Special
          </p>
        </div>

        {/* Center Side by Side Drinks with Handwritten Arrows */}
        <div className="relative my-auto flex items-center justify-center gap-2 py-2">
          {/* Iced Drink */}
          <div className="relative flex flex-col items-center">
            <div className="w-28 h-36 xs:w-32 xs:h-40 relative">
              <Image
                src="/iced_latte.png"
                alt="Iced Drink"
                width={140}
                height={170}
                className="object-contain drop-shadow-xl"
              />
            </div>
            <span className="text-xs font-bold text-zinc-900 font-sans mt-1">
              ↙ Iced drink
            </span>
          </div>

          {/* Hot Drink */}
          <div className="relative flex flex-col items-center">
            <div className="w-28 h-36 xs:w-32 xs:h-40 relative">
              <Image
                src="/latte.png"
                alt="Hot Drink"
                width={140}
                height={170}
                className="object-contain drop-shadow-xl"
              />
            </div>
            <span className="text-xs font-bold text-zinc-900 font-sans mt-1">
              Hot drink ↘
            </span>
          </div>
        </div>

        {/* Bottom Tag */}
        <div className="mb-2">
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-zinc-600 bg-zinc-200/70 py-1 px-3 rounded-full">
            CUP O' JOY COFFEE CO.
          </span>
        </div>
      </div>
    )
  },

  /* BANNER 5: WOOD-FIRED PIZZA */
  {
    id: 'pizza',
    bgClass: 'bg-[#18110e] text-white',
    content: (
      <div className="w-full h-full flex flex-col justify-between p-6 relative select-none text-center">
        {/* Top Header */}
        <div className="pt-2">
          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
            ARTISANAL WOOD-FIRED
          </span>
          <h2 className="text-3xl xs:text-4xl font-headline text-white mt-3 uppercase tracking-tight">
            MARGHERITA PIZZA
          </h2>
        </div>

        {/* Center Pizza Image */}
        <div className="relative my-auto flex items-center justify-center">
          <div className="w-48 h-48 xs:w-56 xs:h-56 relative flex items-center justify-center">
            <Image
              src="/margherita.png"
              alt="Margherita Pizza"
              width={240}
              height={240}
              className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>

        {/* Bottom Description & Price */}
        <div className="mb-2">
          <p className="text-xs text-zinc-400 font-sans max-w-xs mx-auto mb-2">
            San Marzano tomato, fresh mozzarella & fresh basil.
          </p>
          <span className="text-2xl font-light text-primary">
            ₹450
          </span>
        </div>
      </div>
    )
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
              className={`absolute inset-0 w-full h-full ${banners[activeIndex].bgClass}`}
            >
              {banners[activeIndex].content}
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
