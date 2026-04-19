'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const RotatingText = ({
  texts,
  className,
  interval = 3000,
}: {
  texts: string[];
  className?: string;
  interval?: number;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts.length, interval]);

  const currentText = texts[index];
  const letters = currentText.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: i * 0.08 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={index}
        className={cn('flex overflow-hidden', className)}
        variants={container}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={child}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.h1>
    </AnimatePresence>
  );
};

export default RotatingText;
