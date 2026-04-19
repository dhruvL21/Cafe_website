'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  const leftLinks = NAV_LINKS.slice(0, 3);
  const rightLinks = NAV_LINKS.slice(3);

  const mobileMenuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-black/0 backdrop-blur-[2px]">
      <div className="container flex h-20 items-center justify-between">
        
        {/* Mobile-only logo */}
        <div className="md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-splash text-xl tracking-wider uppercase">Cup o’ Joy</span>
            </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1 gap-12">
          <ul className="flex items-center justify-end space-x-12 text-base flex-1">
            {leftLinks.map(link => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  suppressHydrationWarning
                  className={cn(
                    'transition-colors hover:text-primary uppercase tracking-wider font-kranky',
                    pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/')
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="block"
                  >
                    {link.label}
                  </motion.span>
                </Link>
                {pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/') && (
                  <motion.div
                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-primary"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <Link href="/" className="flex-shrink-0">
             <div className="px-6 py-2 border-2 border-primary rounded-full hover:bg-primary/10 transition-colors">
                <span className="font-splash text-xl tracking-wider uppercase">Cup o’ Joy</span>
             </div>
          </Link>
          
          <ul className="flex items-center justify-start space-x-12 text-base flex-1">
            {rightLinks.map(link => (
                <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  suppressHydrationWarning
                  className={cn(
                    'transition-colors hover:text-primary uppercase tracking-wider font-kranky',
                    pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/')
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="block"
                  >
                    {link.label}
                  </motion.span>
                </Link>
                {pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/') && (
                  <motion.div
                    className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-primary"
                    layoutId="underline"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        <div className="flex items-center md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <motion.div
                className="flex flex-col space-y-3 mt-6"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuVariants}
              >
                <AnimatePresence>
                  {isSheetOpen &&
                    NAV_LINKS.map(link => (
                      <motion.div key={link.href} variants={mobileMenuItemVariants}>
                        <Link
                          href={link.href}
                          suppressHydrationWarning
                          onClick={() => setSheetOpen(false)}
                          className={cn(
                            'block transition-colors hover:text-primary p-2 rounded-l-md uppercase tracking-wider text-base font-kranky',
                            pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/')
                              ? 'text-foreground bg-secondary font-bold'
                              : 'text-muted-foreground'
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
