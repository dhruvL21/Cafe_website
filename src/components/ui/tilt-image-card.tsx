'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

const springConfig = {
  stiffness: 150,
  damping: 20,
};

export default function TiltImageCard({
  src,
  alt,
  width,
  height,
  className,
  'data-ai-hint': dataAiHint,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  'data-ai-hint': string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (for SSR) and then check for touch support.
    const hasTouch = 'ontouchstart' in window;
    setIsMobile(hasTouch);
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [15, -15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const desktopHover = {
    scale: 1.05,
    boxShadow: '0px 15px 30px -5px rgba(0, 0, 0, 0.3)',
  };

  const mobileTap = {
    scale: 0.95,
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      className="relative overflow-hidden rounded-lg break-inside-avoid group"
    >
      <motion.div
        style={!isMobile ? {
          rotateX,
          rotateY,
          scale: 1,
        } : {}}
        whileHover={!isMobile ? desktopHover : {}}
        whileTap={isMobile ? mobileTap : {}}
        transition={springConfig}
        className="relative w-full h-full rounded-lg overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          data-ai-hint={dataAiHint}
          priority={priority}
        />
      </motion.div>
    </motion.div>
  );
}
