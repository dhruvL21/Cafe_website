'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Coffee,
  BookOpen,
  Flame,
  Camera,
  Compass,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

const getNavIcon = (iconName?: string) => {
  switch (iconName) {
    case 'home':
      return Coffee;
    case 'menu':
      return BookOpen;
    case 'specials':
      return Flame;
    case 'gallery':
      return Camera;
    case 'location':
      return Compass;
    default:
      return Coffee;
  }
};

export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  const leftLinks = NAV_LINKS.slice(0, 3); // HOME, MENU, SPECIALS
  const rightLinks = NAV_LINKS.slice(3);  // GALLERY, LOCATION

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const renderNavLink = (link: typeof NAV_LINKS[number]) => {
    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
    const Icon = getNavIcon(link.iconName);

    return (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'relative flex items-center gap-2.5 px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-medium tracking-wider transition-all duration-200 select-none',
          isActive
            ? 'text-primary font-semibold'
            : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
        )}
      >
        {isActive && (
          <motion.div
            layoutId="curvedNavPill"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/25 via-primary/20 to-primary/25 border border-primary/40 shadow-[0_0_20px_rgba(255,255,255,0.15)] backdrop-blur-md"
            transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          />
        )}
        <Icon strokeWidth={2.5} className={cn("w-4.5 h-4.5 md:w-5 md:h-5 relative z-10 transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />
        <motion.span
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="relative z-10 uppercase font-sans font-bold text-xs md:text-sm tracking-wider"
        >
          {link.label}
        </motion.span>
      </Link>
    );
  };

  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl transition-all duration-300">
      {/* Floating Pill Curved Navbar Container */}
      <div className="relative flex items-center justify-between px-5 py-3 md:px-7 md:py-3.5 rounded-full border border-white/15 bg-black/45 dark:bg-black/55 backdrop-blur-3xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
        
        {/* Desktop Navigation Layout: Left Links - Center Logo - Right Links */}
        <div className="hidden lg:flex items-center justify-between w-full">
          {/* Left Side Links */}
          <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-start">
            {leftLinks.map(renderNavLink)}
          </div>

          {/* Center: Brand Logo */}
          <Link href="/" className="flex items-center group px-4 md:px-6 flex-shrink-0">
            <span className="font-splash text-2xl md:text-3xl lg:text-4xl tracking-wider uppercase text-foreground group-hover:text-primary transition-colors text-center leading-none">
              Cup o’ Joy
            </span>
          </Link>

          {/* Right Side Links */}
          <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-end">
            {rightLinks.map(renderNavLink)}
          </div>
        </div>

        {/* Mobile & Tablet Navigation Layout */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <Link href="/" className="flex items-center group pl-2">
            <span className="font-splash text-2xl md:text-3xl tracking-wider uppercase text-foreground group-hover:text-primary transition-colors leading-none">
              Cup o’ Joy
            </span>
          </Link>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 border border-white/15 hover:bg-white/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] border-l border-white/15 bg-background/95 backdrop-blur-3xl p-6 rounded-l-3xl">
              <SheetHeader className="text-left pb-4 border-b border-white/15">
                <SheetTitle className="flex items-center gap-2.5">
                  <span className="font-splash text-xl tracking-wider uppercase text-foreground">Cup o’ Joy</span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-3">
                <motion.div
                  className="flex flex-col gap-2"
                  initial="hidden"
                  animate="visible"
                  variants={mobileMenuVariants}
                >
                  <AnimatePresence>
                    {isSheetOpen &&
                      NAV_LINKS.map(link => {
                        const Icon = getNavIcon(link.iconName);
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                        return (
                          <motion.div key={link.href} variants={mobileMenuItemVariants}>
                            <Link
                              href={link.href}
                              onClick={() => setSheetOpen(false)}
                              className={cn(
                                'flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 text-sm uppercase font-sans font-bold tracking-wider',
                                isActive
                                  ? 'bg-primary/20 text-primary font-bold border border-primary/30 shadow-sm'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                              )}
                            >
                              <Icon strokeWidth={2.5} className={cn('w-5 h-5', isActive ? 'text-primary' : 'text-muted-foreground')} />
                              <span>{link.label}</span>
                            </Link>
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
