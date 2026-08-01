'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuData } from '@/lib/full-menu';
import type { MenuItem as MenuItemType } from '@/lib/full-menu';
import { cn } from '@/lib/utils';
import { Sparkles, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const CoffeeBeansIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        width="36"
        height="22"
        viewBox="0 0 36 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M10.5 2.13401C11.6033 1.94239 12.7563 1.83337 13.9375 1.83337C18.6358 1.83337 22.8858 3.52087 25.9608 6.40254C29.0475 9.29587 30.7917 13.4359 30.7917 18.0001" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M17.375 20.1667C12.6767 20.1667 8.42667 18.4792 5.35167 15.5975C2.265 12.7042 0.520836 8.56421 0.520836 4.00004C0.520836 2.68421 0.733336 1.40587 1.12167 0.166708" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M13.9375 1.83337C10.7417 5.16671 10.45 10.6084 13.2417 14.8334C16.0333 19.0584 20.9333 21.1667 25.1333 20.1667" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

const MenuItem = ({ name, description, price, isSpecial }: { name: string, description: string, price: string, isSpecial: boolean }) => {
    return (
        <div className="bg-transparent mb-3.5 sm:mb-5 last:mb-0">
            <div className="flex justify-between items-baseline gap-2">
                <h3 className="text-sm sm:text-lg font-poiret-one tracking-wider text-foreground uppercase flex items-center gap-2 font-bold">
                    <span>{name}</span>
                    {isSpecial && <Sparkles className="size-3.5 text-primary shrink-0" />}
                </h3>
                <div className="flex-grow border-b border-dotted border-border/50"></div>
                <span className="text-sm sm:text-lg font-sans font-extrabold text-primary shrink-0">{price}</span>
            </div>
            <p className="text-muted-foreground text-xs mt-0.5 sm:mt-1 leading-relaxed">{description}</p>
        </div>
    );
};

const PagePanel = ({ title, items, specialItemIds, pageNum }: { title: string; items: MenuItemType[]; specialItemIds: string[]; pageNum: number }) => {
    return (
        <div className="w-full flex flex-col justify-start p-1 sm:p-2">
            {/* Signature Cafe Name Logo at Top of Book Page - Fixed Header */}
            <div className="text-center pt-5 sm:pt-2 md:pt-2 mb-2 sm:mb-3 md:mb-4 shrink-0">
                <h1 className="font-splash text-xl sm:text-2xl md:text-3xl text-primary drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] leading-relaxed py-0.5 mb-0.5 md:mb-2">Cup o' Joy</h1>
                <h2 className="text-base sm:text-xl md:text-2xl font-limelight tracking-wider text-foreground uppercase mt-0.5 md:mt-2">{title}</h2>
                <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-1.5 md:mt-3 rounded-full"></div>
            </div>

            {/* Menu Items List */}
            <div className="space-y-3 sm:space-y-4 pt-1">
                {items.map((item) => (
                    <MenuItem
                        key={item.id}
                        name={item.name}
                        description={item.description}
                        price={`₹${item.price}`}
                        isSpecial={specialItemIds.includes(item.id)}
                    />
                ))}
            </div>

            {/* Page Footer Number - Visible on Desktop View Only */}
            <div className="hidden md:block pt-3 mt-2 border-t border-white/10 text-center text-[11px] sm:text-xs font-sans text-primary/90 uppercase tracking-widest font-bold shrink-0">
                Page {pageNum}
            </div>
        </div>
    );
};

export default function MenuPage() {
    const specialItemIds = [
      'coffee1', 'coffee2', 'coffee3', 'coffee4', 'coffee5', 'coffee6', 'coffee7', 'coffee8', 'coffee9', 'coffee11',
      'pasta1', 'pasta2', 'pasta3',
      'pizza1', 'pizza2', 'pizza3',
      'dessert1', 'dessert2', 'dessert3'
    ];

    const coffeeItems = menuData.filter(item => item.category === 'Coffee');
    const pastaItems = menuData.filter(item => item.category === 'Pasta');
    const pizzaItems = menuData.filter(item => item.category === 'Pizza');
    const dessertItems = menuData.filter(item => item.category === 'Dessert');

    // Spreads for 2-Page Open Menu Book Layout
    const spreads = [
      {
        id: 'spread-1',
        title: 'Coffee & Brews',
        left: { title: 'Espresso & Coffees', items: coffeeItems.slice(0, 5), pageNum: 1 },
        right: { title: 'Lattes & Cold Brews', items: coffeeItems.slice(5), pageNum: 2 },
      },
      {
        id: 'spread-2',
        title: 'Pastas & Pizzas',
        left: { title: 'Artisanal Pastas', items: pastaItems, pageNum: 3 },
        right: { title: 'Wood-Fired Pizzas', items: pizzaItems, pageNum: 4 },
      },
      {
        id: 'spread-3',
        title: 'Desserts & Sweets',
        left: { title: 'Handcrafted Desserts', items: dessertItems, pageNum: 5 },
        right: { title: 'House Specials', items: coffeeItems.slice(0, 4), pageNum: 6 },
      },
    ];

    // Single Pages array for Mobile Touch Swipe View
    const mobilePages = [
      { title: 'Espresso & Coffees', items: coffeeItems.slice(0, 5), pageNum: 1, spreadIdx: 0 },
      { title: 'Lattes & Cold Brews', items: coffeeItems.slice(5), pageNum: 2, spreadIdx: 0 },
      { title: 'Artisanal Pastas', items: pastaItems, pageNum: 3, spreadIdx: 1 },
      { title: 'Wood-Fired Pizzas', items: pizzaItems, pageNum: 4, spreadIdx: 1 },
      { title: 'Handcrafted Desserts', items: dessertItems, pageNum: 5, spreadIdx: 2 },
      { title: 'House Specials', items: coffeeItems.slice(0, 4), pageNum: 6, spreadIdx: 2 },
    ];

    const [spreadIndex, setSpreadIndex] = useState(0);
    const [previousSpreadIndex, setPreviousSpreadIndex] = useState(0);
    const [mobilePageIndex, setMobilePageIndex] = useState(0);
    const [mobileSwipeDir, setMobileSwipeDir] = useState<number>(1);
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipDir, setFlipDir] = useState<'next' | 'prev'>('next');

    const handleSpreadTurn = (targetIndex: number) => {
      if (isFlipping || targetIndex === spreadIndex || targetIndex < 0 || targetIndex >= spreads.length) return;
      
      const dir = targetIndex > spreadIndex ? 'next' : 'prev';
      setFlipDir(dir);
      setPreviousSpreadIndex(spreadIndex);
      setSpreadIndex(targetIndex);
      setMobileSwipeDir(targetIndex > spreadIndex ? 1 : -1);
      setMobilePageIndex(targetIndex * 2);
      setIsFlipping(true);

      setTimeout(() => {
        setIsFlipping(false);
      }, 2200);
    };

    const handleMobilePageTurn = (targetPageIndex: number) => {
      if (targetPageIndex < 0 || targetPageIndex >= mobilePages.length || targetPageIndex === mobilePageIndex) return;
      const dir = targetPageIndex > mobilePageIndex ? 1 : -1;
      setMobileSwipeDir(dir);
      setMobilePageIndex(targetPageIndex);
      const targetSpread = mobilePages[targetPageIndex].spreadIdx;
      if (targetSpread !== spreadIndex) {
        setPreviousSpreadIndex(spreadIndex);
        setSpreadIndex(targetSpread);
      }
    };

    const nextSpread = () => handleSpreadTurn(spreadIndex + 1);
    const prevSpread = () => handleSpreadTurn(spreadIndex - 1);

    const currentSpread = spreads[spreadIndex];
    const previousSpread = spreads[previousSpreadIndex];
    const currentMobilePage = mobilePages[mobilePageIndex];

    // 3D Physical Book Page Flip Variants for Mobile Touch View - Smooth & Slow
    const mobilePageVariants = {
      enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        rotateY: direction > 0 ? 45 : -45,
        opacity: 0,
        scale: 0.95,
        transformOrigin: direction > 0 ? 'left center' : 'right center',
      }),
      center: {
        x: '0%',
        rotateY: 0,
        opacity: 1,
        scale: 1,
        transformOrigin: 'left center',
        transition: {
          duration: 0.85, // Smooth, slow, unhurried page turn
          ease: [0.22, 1, 0.36, 1], // Natural paper curl arc
        },
      },
      exit: (direction: number) => ({
        x: direction > 0 ? '-100%' : '100%',
        rotateY: direction > 0 ? -45 : 45,
        opacity: 0,
        scale: 0.95,
        transformOrigin: direction > 0 ? 'left center' : 'right center',
        transition: {
          duration: 0.85, // Smooth, slow, unhurried page turn
          ease: [0.22, 1, 0.36, 1],
        },
      }),
    };

    return (
        <div className="bg-[#090b0d] text-foreground min-h-screen py-20 md:py-24 overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl xl:max-w-7xl">
                
                {/* Header Title & Beans Icon */}
                <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-muted-foreground text-2xl md:text-3xl meie-script-regular">
                        Handcrafted with passion, from our kitchen to your table.
                    </p>
                    <div className="flex justify-center my-3">
                        <div className="w-20 h-px bg-primary/50"></div>
                        <CoffeeBeansIcon className="h-6 w-9 text-primary/80 mx-4" />
                        <div className="w-20 h-px bg-primary/50"></div>
                    </div>
                </motion.div>

                {/* Section Book Spread Tabs - Desktop Only */}
                <div className="hidden md:flex justify-center flex-wrap gap-2.5 mb-8">
                  {spreads.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => handleSpreadTurn(idx)}
                      disabled={isFlipping}
                      className={cn(
                        'px-5 py-2 rounded-full text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border select-none',
                        idx === spreadIndex
                          ? 'bg-primary/20 text-primary border-primary/40 shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105'
                          : 'bg-white/5 text-muted-foreground border-white/10 hover:text-foreground hover:bg-white/10'
                      )}
                    >
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>{s.title}</span>
                    </button>
                  ))}
                </div>

                {/* MOBILE TOUCH SWIPE MENU BOOK VIEW */}
                <div className="block md:hidden max-w-md mx-auto relative px-1">
                  
                  {/* Page Counter & Animated Swipe Guidance */}
                  <div className="flex flex-col items-center gap-2 mb-4">
                    {/* Minimal Page Counter Pill */}
                    <div className="flex justify-center items-center gap-2 text-xs font-sans tracking-widest uppercase font-bold text-primary/90 bg-white/5 border border-white/10 py-1.5 px-4 rounded-full w-fit shadow-md select-none">
                      <BookOpen className="w-3.5 h-3.5 text-primary" />
                      <span>Page {mobilePageIndex + 1} of {mobilePages.length}</span>
                    </div>

                    {/* Animated Touch Swipe Indicator Badge */}
                    <motion.div 
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="flex items-center gap-2 text-[11px] font-sans tracking-wider uppercase font-semibold text-muted-foreground bg-primary/10 border border-primary/20 py-1 px-3.5 rounded-full shadow-sm select-none"
                    >
                      <motion.div 
                        animate={{ x: [-3, 3, -3] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                      >
                        <ChevronLeft className="w-3.5 h-3.5 text-primary" />
                      </motion.div>
                      <span className="text-primary/90">Swipe left or right to turn page</span>
                      <motion.div 
                        animate={{ x: [3, -3, 3] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-primary" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Outer Hardcover Binder Frame */}
                  <div className="relative bg-[#090b0d] border-2 border-white/15 rounded-[28px] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden [perspective:1200px]">
                    <AnimatePresence mode="wait" initial={false} custom={mobileSwipeDir}>
                      <motion.div
                        key={mobilePageIndex}
                        custom={mobileSwipeDir}
                        variants={mobilePageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.25}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipeThreshold = 35;
                          if (offset.x < -swipeThreshold || velocity.x < -250) {
                            // Swiped Left -> Turn Next Page
                            if (mobilePageIndex < mobilePages.length - 1) {
                              handleMobilePageTurn(mobilePageIndex + 1);
                            }
                          } else if (offset.x > swipeThreshold || velocity.x > 250) {
                            // Swiped Right -> Turn Prev Page
                            if (mobilePageIndex > 0) {
                              handleMobilePageTurn(mobilePageIndex - 1);
                            }
                          }
                        }}
                        className="relative w-full bg-[#090b0d] rounded-[20px] border border-white/10 p-4 sm:p-5 shadow-2xl flex flex-col justify-start cursor-grab active:cursor-grabbing touch-pan-y overflow-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        {/* Top Right Corner Page Number Badge - Mobile Only */}
                        <div className="absolute top-3 right-3 z-30 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/15 border border-primary/35 text-primary text-[11px] font-sans font-bold uppercase tracking-widest shadow-md select-none pointer-events-none">
                            <span>PAGE {currentMobilePage.pageNum}</span>
                        </div>

                        <PagePanel
                          title={currentMobilePage.title}
                          items={currentMobilePage.items}
                          specialItemIds={specialItemIds}
                          pageNum={currentMobilePage.pageNum}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* DESKTOP 2-PAGE OPEN CAFE MENU BOOK IN ORIGINAL COLOR THEME */}
                <div className="hidden md:block relative max-w-5xl mx-auto [perspective:2200px]">
                  
                  {/* Outer Hardcover Menu Book Binder */}
                  <div className="relative bg-[#090b0d] border-2 border-white/15 rounded-[32px] p-3 sm:p-5 md:p-8 shadow-[0_35px_80px_rgba(0,0,0,0.95)]">
                    
                    {/* Inner Paper Spread Container */}
                    <div className="relative bg-[#090b0d] rounded-[24px] border border-white/10 grid grid-cols-2 shadow-2xl min-h-[580px] overflow-hidden">
                      
                      {/* Central Book Spine Binder */}
                      <div className="flex flex-col justify-between absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-7 bg-gradient-to-r from-black/95 via-primary/20 to-black/95 border-x border-white/15 z-30 pointer-events-none shadow-2xl">
                        <div className="w-full h-4 bg-primary/20 border-b border-primary/30"></div>
                        <div className="w-full h-4 bg-primary/20 border-t border-primary/30"></div>
                      </div>

                      {/* Left Page Paper Spread */}
                      <div className="p-6 md:p-10 border-r border-white/10 relative">
                        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/60 to-transparent pointer-events-none"></div>
                        <PagePanel
                          title={currentSpread.left.title}
                          items={currentSpread.left.items}
                          specialItemIds={specialItemIds}
                          pageNum={currentSpread.left.pageNum}
                        />
                      </div>

                      {/* Right Page Paper Spread */}
                      <div className="p-6 md:p-10 relative">
                        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/60 to-transparent pointer-events-none"></div>
                        <PagePanel
                          title={currentSpread.right.title}
                          items={currentSpread.right.items}
                          specialItemIds={specialItemIds}
                          pageNum={currentSpread.right.pageNum}
                        />
                      </div>

                      {/* ACCURATE FORWARD & REVERSE PHYSICAL 3D PAGE TURN FLIP SHEET */}
                      <AnimatePresence>
                        {isFlipping && (
                          <motion.div
                            key={`spread-flip-${previousSpreadIndex}-${spreadIndex}`}
                            initial={{
                              rotateY: 0,
                            }}
                            animate={{
                              rotateY: flipDir === 'next' ? -180 : 180,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 2.2,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{
                              transformOrigin: flipDir === 'next' ? 'left center' : 'right center',
                              backfaceVisibility: 'hidden',
                            }}
                            className={cn(
                              "absolute top-0 bottom-0 bg-[#090b0d] border border-white/20 p-10 z-40 shadow-2xl overflow-hidden pointer-events-none",
                              flipDir === 'next' ? "left-1/2 right-0 rounded-r-[24px]" : "left-0 right-1/2 rounded-l-[24px]"
                            )}
                          >
                            {/* Page Turning Fold Lighting & Shadow Interpolation */}
                            <motion.div
                              initial={{ opacity: 0.95 }}
                              animate={{ opacity: 0 }}
                              transition={{ duration: 2.2, ease: 'easeInOut' }}
                              className={cn(
                                "absolute inset-0 z-50 pointer-events-none",
                                flipDir === 'next'
                                  ? "bg-gradient-to-r from-black/90 via-black/40 to-transparent"
                                  : "bg-gradient-to-l from-black/90 via-black/40 to-transparent"
                              )}
                            />
                            
                            <div className="opacity-90">
                              <PagePanel
                                title={flipDir === 'next' ? previousSpread.right.title : previousSpread.left.title}
                                items={flipDir === 'next' ? previousSpread.right.items : previousSpread.left.items}
                                specialItemIds={specialItemIds}
                                pageNum={flipDir === 'next' ? previousSpread.right.pageNum : previousSpread.left.pageNum}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Interactive Book Page Turn Click Edges */}
                    {spreadIndex > 0 && (
                      <button
                        onClick={prevSpread}
                        title="Turn to Previous Menu Page"
                        aria-label="Previous page edge"
                        className="absolute left-1 top-1/2 -translate-y-1/2 z-40 group cursor-pointer focus:outline-none"
                      >
                        <div className="p-3 rounded-r-full bg-white/10 group-hover:bg-primary/30 text-white/80 group-hover:text-primary transition-all duration-300 shadow-xl group-hover:scale-110">
                          <ChevronLeft className="w-6 h-6" />
                        </div>
                      </button>
                    )}

                    {spreadIndex < spreads.length - 1 && (
                      <button
                        onClick={nextSpread}
                        title="Turn to Next Menu Page"
                        aria-label="Next page edge"
                        className="absolute right-1 top-1/2 -translate-y-1/2 z-40 group cursor-pointer focus:outline-none"
                      >
                        <div className="p-3 rounded-l-full bg-white/10 group-hover:bg-primary/30 text-white/80 group-hover:text-primary transition-all duration-300 shadow-xl group-hover:scale-110">
                          <ChevronRight className="w-6 h-6" />
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Desktop Bottom Menu Book Controls */}
                <div className="hidden md:flex items-center justify-between mt-8 max-w-3xl mx-auto px-4">
                  <button
                    onClick={prevSpread}
                    disabled={spreadIndex === 0 || isFlipping}
                    className={cn(
                      'flex items-center gap-2 px-6 py-3 rounded-full border text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all duration-200 select-none',
                      spreadIndex === 0 || isFlipping
                        ? 'opacity-30 cursor-not-allowed border-white/10 text-muted-foreground'
                        : 'border-white/20 text-foreground bg-white/5 hover:bg-primary/20 hover:border-primary/40 active:scale-95 shadow-lg'
                    )}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Turn Back</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-xs font-sans text-muted-foreground uppercase tracking-widest font-bold">
                      Spread {spreadIndex + 1} of {spreads.length}
                    </span>
                  </div>

                  <button
                    onClick={nextSpread}
                    disabled={spreadIndex === spreads.length - 1 || isFlipping}
                    className={cn(
                      'flex items-center gap-2 px-6 py-3 rounded-full border text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all duration-200 select-none',
                      spreadIndex === spreads.length - 1 || isFlipping
                        ? 'opacity-30 cursor-not-allowed border-white/10 text-muted-foreground'
                        : 'border-white/20 text-foreground bg-white/5 hover:bg-primary/20 hover:border-primary/40 active:scale-95 shadow-lg'
                    )}
                  >
                    <span>Turn Page</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
            </div>
        </div>
    );
}

