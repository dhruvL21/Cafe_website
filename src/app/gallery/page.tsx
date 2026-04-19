'use client';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';
import TextPressureAnimation from '@/components/ui/text-pressure-animation';
import TiltImageCard from '@/components/ui/tilt-image-card';

const SmokeEffect = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-transparent" />
            <div id="smoke" className="absolute inset-0">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="smoke-element"></span>
                ))}
            </div>
        </div>
    );
};


const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

export default function GalleryPage() {
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
      <div className="container py-12 md:py-16 relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto -mt-8 md:-mt-16">
          <div className="flex items-center justify-center h-24 md:h-auto">
            <TextPressureAnimation text="Gallery" minFontSize={48} />
          </div>
          <p className="mt-2 md:mt-4 text-lg sm:text-xl md:text-2xl text-muted-foreground meie-script-regular">
            A collection of moments and memories from our cozy cafe.
          </p>
        </div>

        <motion.div 
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {galleryImages.map((image) => (
            <TiltImageCard
              key={image.id}
              src={image.imageUrl}
              alt={image.description}
              width={800}
              height={600}
              className="object-cover w-full h-auto border border-border/20"
              data-ai-hint={image.imageHint}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
