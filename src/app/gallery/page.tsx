'use client';

import { motion } from 'framer-motion';
import TextPressureAnimation from '@/components/ui/text-pressure-animation';
import TiltImageCard from '@/components/ui/tilt-image-card';

import { useIsMobile } from '@/hooks/use-mobile';

const SmokeEffect = () => {
    return (
        <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-transparent" />
            <div id="smoke" className="absolute inset-0">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="smoke-element"></span>
                ))}
            </div>
        </div>
    );
};

const galleryImages = [
  {
    id: 'g-ambience-1',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Warm & Aesthetic Cafe Interior',
    imageHint: 'cafe interior warm',
  },
  {
    id: 'g-ambience-2',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Cozy Corner Coffee Atmosphere',
    imageHint: 'cozy coffee shop',
  },
  {
    id: 'g-ambience-3',
    imageUrl: 'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Sunlit Wooden Cafe Seating',
    imageHint: 'sunlit cafe',
  },
  {
    id: 'g-ambience-4',
    imageUrl: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Artisanal Barista Latte Pour',
    imageHint: 'barista pour',
  },
  {
    id: 'g-ambience-5',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Relaxing Reading Nook & Coffee',
    imageHint: 'coffee reading nook',
  },
  {
    id: 'g-ambience-6',
    imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Rustic Coffee Shop Lounge',
    imageHint: 'rustic cafe lounge',
  },
  {
    id: 'g-ambience-7',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Aromatic Roasted Coffee Beans Display',
    imageHint: 'coffee beans atmosphere',
  },
  {
    id: 'g-ambience-8',
    imageUrl: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Warm Espresso Machine Glow',
    imageHint: 'espresso machine glow',
  },
  {
    id: 'g-ambience-9',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Garden Outdoor Patio Seating',
    imageHint: 'outdoor cafe patio',
  },
  {
    id: 'g-ambience-10',
    imageUrl: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Vintage Armchair Coffee Lounge',
    imageHint: 'vintage cafe corner',
  },
  {
    id: 'g-ambience-11',
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Warm Evening Storefront Glow',
    imageHint: 'evening cafe glow',
  },
  {
    id: 'g-ambience-12',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Fresh Brew & Warm Morning Light',
    imageHint: 'morning coffee light',
  },
];

export default function GalleryPage() {
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#090b0d]">
      <SmokeEffect />
      <div className="container pt-4 md:pt-6 pb-16 relative z-10">
        <div className="text-center mb-8 md:mb-14 max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[60px] md:h-auto">
            {isMobile ? (
              <h1 className="text-4xl font-bold font-sans tracking-tight text-white py-2">
                Gallery
              </h1>
            ) : (
              <TextPressureAnimation text="Gallery" minFontSize={72} />
            )}
          </div>
          <p className="mt-3 md:mt-5 text-xl sm:text-2xl md:text-3xl text-muted-foreground meie-script-regular">
            A collection of moments and memories from our cozy cafe.
          </p>
        </div>

        <motion.div 
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          variants={containerVariants}
          initial={isMobile ? "visible" : "hidden"}
          animate="visible"
          whileInView={isMobile ? undefined : "visible"}
          viewport={isMobile ? undefined : { once: false, amount: 0.1 }}
        >
          {galleryImages.map((image) => (
            <TiltImageCard
              key={image.id}
              src={image.imageUrl}
              alt={image.description}
              width={1000}
              height={750}
              className="object-cover w-full h-auto rounded-2xl border border-white/15 shadow-xl hover:border-primary/50 transition-all duration-300"
              data-ai-hint={image.imageHint}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
