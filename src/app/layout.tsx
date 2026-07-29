'use client';

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';
import { Urbanist, Playfair_Display, Rochester, Splash, Limelight, Suravaram, Belleza, Kranky, Poiret_One } from 'next/font/google'
import { useEffect, useState } from 'react';
import ClickRippleEffect from '@/components/ui/click-ripple-effect';
import { cn } from '@/lib/utils';

const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const rochester = Rochester({
  subsets: ['latin'],
  variable: '--font-rochester',
  weight: '400',
});
const splash = Splash({
  subsets: ['latin'],
  variable: '--font-splash',
  weight: '400',
});
const limelight = Limelight({
  subsets: ['latin'],
  variable: '--font-limelight',
  weight: '400',
});
const suravaram = Suravaram({
  subsets: ['latin'],
  variable: '--font-suravaram',
  weight: '400',
});
const belleza = Belleza({
  subsets: ['latin'],
  variable: '--font-belleza',
  weight: '400',
});
const kranky = Kranky({
  subsets: ['latin'],
  variable: '--font-kranky',
  weight: '400',
});
const poiretOne = Poiret_One({
  subsets: ['latin'],
  variable: '--font-poiret-one',
  weight: '400',
});


// This can't be a client component, so we move the logic to a sub-component
// export const metadata: Metadata = {
//   title: "Cup o' Joy: Immersive Cafe Experience",
//   description: 'An aesthetic and immersive website for the Cup o\' Joy cafe.',
// };

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isIphone, setIsIphone] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Detect iPhone/iPad/iPod
    setIsIphone(/iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isHome = pathname === '/';


  return (
    <>
      <head>
        <title>Cup o&apos; Joy: Immersive Cafe Experience</title>
        <meta name="description" content="An aesthetic and immersive website for the Cup o' Joy cafe." />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2212%22 fill=%22hsl(210 20% 90%)%22 /><text x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dominant-baseline=%22central%22 font-family=%22Urbanist, sans-serif%22 font-size=%2275%22 font-weight=%22bold%22 fill=%22hsl(0 0% 0%)%22>C</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Meie+Script&family=Sirivennela&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          urbanist.variable,
          playfair.variable,
          rochester.variable,
          splash.variable,
          limelight.variable,
          suravaram.variable,
          belleza.variable,
          kranky.variable,
          poiretOne.variable,
          'font-sans transition-colors duration-500',
          isIphone && 'is-iphone'
        )}
      >
        <div className={cn(`relative flex min-h-screen flex-col transition-opacity duration-500 bg-background`, loading ? 'opacity-0' : 'opacity-100')}>
        <Header />
<main className={cn("flex-1", isClient && !isHome && "pt-24 md:pt-28")}>
  {children}
</main>
{isClient && isHome && <Footer />}

        </div>
        <Toaster />
        <ClickRippleEffect />
      </body>
    </>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <LayoutContent>{children}</LayoutContent>
    </html>
  );
}
