'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import SlideToUnlock from '@/components/ui/slide-to-unlock';
import BubbleText from '@/components/ui/bubble-text';
import { Button } from '@/components/ui/button';
import { ArrowRight, Utensils, Coffee } from 'lucide-react';
import { menuData, type MenuItem } from '@/lib/menu';
import { menuImages } from '@/lib/placeholder-images';
import { motion, AnimatePresence } from 'framer-motion';
import RotatingText from '@/components/ui/rotating-text';
import { useNearScreenEnd } from '@/hooks/use-near-screen-end';
import MobileHeroSwiper from '@/components/mobile-hero-swiper';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: 'easeOut',
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const heroContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: i * 0.15,
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const HeroSection = () => {
  const router = useRouter();
  const showFloatingButton = !useNearScreenEnd(380);

  return (
  <motion.div 
    className="relative w-full min-h-[100svh]"
    variants={heroContainerVariants}
    initial="hidden"
    animate="visible"
  >
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden text-white">
      
      <motion.div 
        className="absolute inset-0 bg-black/50 z-0"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Desktop Content */}
      <div className="hidden md:flex absolute inset-0 pt-20 md:pt-24 lg:pt-28 items-center justify-start z-10">
        <div className="container">
          <motion.div 
            className="flex flex-col w-full max-w-xl" 
            variants={heroContentVariants}
          >
            <div className="flex flex-col">
              <BubbleText className="text-7xl lg:text-9xl font-bold tracking-tighter" text="WAKE UP" />
              <BubbleText className="text-7xl lg:text-9xl font-bold tracking-tighter" text="YOUR" />
              <RotatingText 
                texts={['SENSES', 'MOOD', 'TASTE', 'ENERGY']}
                className="text-7xl lg:text-9xl font-bold tracking-tighter text-muted-foreground" 
                interval={2000}
              />
            </div>

            <motion.div 
              className="mt-6 flex flex-col items-start gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.7 }}
            >
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-transparent rounded-full"></div>
              <p className="text-2xl lg:text-3xl font-normal text-primary/95 meie-script-regular tracking-wide max-w-xl leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                Artisanal brews & handcrafted delicacies — where every sip is pure velvet and every bite, a luxury.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Auto-Swiping Hero Box Banner - Mobile Only */}
      <div className="block md:hidden absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center">
        <MobileHeroSwiper />
      </div>

      
      {/* ✅ MOBILE BOTTOM CTA — FIXED & VISIBLE */}
        <AnimatePresence>
        {showFloatingButton && (
          <motion.div
            className="
              fixed
              bottom-[max(1.5rem,env(safe-area-inset-bottom))]
              inset-x-0
              mx-auto
              z-50
              w-[280px]
              md:hidden
              rounded-full
              shadow-[0_8px_40px_rgba(0,0,0,0.6)]
            "
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24, transition: { duration: 0.3 } }}
            transition={{ 
              duration: 0.6, ease: 'easeOut', delay: 0.4
            }}
          >
            <SlideToUnlock />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
)};

const ExploreMenuSection = () => {
    const featuredItems = menuData.filter(item => ['s3', 's4', 'd1'].includes(item.id));

    return (
        <section className="py-16 sm:py-24 bg-transparent">
            <div className="container mx-auto px-4">
                <motion.div 
                    className="text-center mb-12 md:mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={textVariants}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-limelight tracking-tight">Taste Our Passion</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground meie-script-regular">
                        From rich, aromatic coffees to delightful savory and sweet treats, there's something to satisfy every craving.
                    </p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
                >
                    {featuredItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          variants={cardVariants}
                          custom={index}
                          whileHover={{ y: -10 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            <div className="bg-[#11161a] border border-white/15 rounded-2xl p-6 h-full flex flex-col shadow-2xl shadow-black/80">
                                <div className="flex-grow mb-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        {item.category === "Savory" && <Utensils className="size-5 text-primary" />}
                                        {item.category === "Drinks" && <Coffee className="size-5 text-primary" />}
                                        <h3 className="text-2xl font-headline text-foreground">{item.name}</h3>
                                    </div>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                                <div className="mt-auto flex flex-col items-start">
                                  <p className="text-xl font-light text-primary">₹{item.price}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div 
                    className="text-center mt-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={textVariants}
                >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="inline-block"
                    >
                      <Button asChild size="lg" variant="outline">
                          <Link href="/menu">
                              Explore Full Menu
                              <ArrowRight className="ml-2" />
                          </Link>
                      </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const imageSrc = menuImages[item.imageId] ?? '/pizza.png';

  return (
    <div className="flex h-full">
      <div className="relative bg-[#11161a] border border-white/15 rounded-3xl px-6 md:px-8 pt-24 md:pt-28 pb-8 shadow-2xl shadow-black/80 flex flex-col flex-1">
        <div className="absolute -top-20 md:-top-28 left-1/2 -translate-x-1/2">
            <motion.div
              className="transform-origin-center"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              }}
            >
              <Image
                  src={imageSrc}
                  alt={item.name}
                  width={256}
                  height={256}
                  className="object-contain w-48 h-48 md:w-64 md:h-64"
              />
            </motion.div>
        </div>
        
        <div className="text-center mt-8 md:mt-12 flex-grow">
            <h2 className="text-3xl sm:text-4xl md:text-5xl sirivennela-regular">{item.name}</h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base">{item.longDescription}</p>
        </div>
        
        <div className="flex flex-col justify-center items-center mt-auto pt-4">
          <p className="text-2xl md:text-3xl font-light">
            ₹{item.price}
          </p>
        </div>
      </div>
    </div>
  );
};


const SpecialsSection = () => {
    const specialsCardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
                delay: i * 0.1,
            },
        }),
    };

    return (
        <section className="py-16 sm:py-24 bg-transparent">
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={textVariants}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-limelight tracking-tight">Top Picks from the Kitchen</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-xl md:text-2xl text-muted-foreground meie-script-regular">
                        Chef-curated recipes, loved by many.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 md:gap-y-28">
                    {menuData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="py-12"
                            custom={index}
                            variants={specialsCardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.1 }}
                        >
                            <MenuItemCard item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const AboutUsSection = () => {
    return (
        <section className="pb-16 sm:pb-24 bg-transparent">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.1 }}
                        variants={textVariants}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-limelight tracking-tight">Our Story</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Cup o' Joy was born from a simple idea: to create a warm, inviting space where the community could gather over a cup of exceptional coffee. Our journey started with a passion for sourcing the finest beans and perfecting the art of the brew.
                        </p>
                        <p className="mt-4 text-lg text-muted-foreground">
                            We believe that every cup tells a story, and we're excited to share ours with you.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default function Home() {
  return (
    <div className="homepage-bg">
      <motion.div 
          variants={pageVariants}
          initial="hidden"
          animate="visible"
      >
        <HeroSection />
        <ExploreMenuSection />
        <SpecialsSection />
        <AboutUsSection />
      </motion.div>
    </div>
  );
}
