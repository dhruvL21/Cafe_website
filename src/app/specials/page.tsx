'use client';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { menuData as allMenuItems } from '@/lib/full-menu';
import { menuImages } from '@/lib/placeholder-images';
import { useRef, useState } from 'react';
import type { MenuItem as MenuItemType } from '@/lib/full-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SmokeEffect = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/50" />
            <div id="smoke" className="absolute inset-0">
                {Array.from({ length: 12 }).map((_, i) => (
                    <span key={i} className="smoke-element"></span>
                ))}
            </div>
        </div>
    );
};

const VineSVG = ({ className }: { className?: string }) => (
  <svg
    className={`absolute w-full h-full text-border/50 ${className}`}
    preserveAspectRatio="none"
    viewBox="0 0 200 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M100 0 C 150 100, 50 150, 100 250 S 150 350, 100 400"
      stroke="currentColor"
      strokeWidth="0.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    />
  </svg>
);

const MenuItem = ({ item, index }: { item: MenuItemType, index: number }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      className={`relative flex flex-col md:flex-row items-center justify-between mb-20 md:mb-32 ${
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Larger Coffee / Dish Image Container */}
      <div className="relative w-3/4 md:w-1/3 lg:w-2/5 group mb-8 md:mb-0">
        <motion.div
            className="absolute inset-0 -translate-x-1/4 -translate-y-1/4 rounded-full bg-secondary/25 blur-3xl transition-all duration-500 group-hover:opacity-85"
        ></motion.div>
        <motion.div
            whileHover={{ scale: 1.06 }}
            animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
            }}
            transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: 'easeInOut',
                delay: index * 0.5
            }}
        >
            <Image
                src={menuImages[item.imageId]}
                alt={item.name}
                width={600}
                height={600}
                className="rounded-full object-cover aspect-square shadow-2xl shadow-black/50 w-full h-auto"
                data-ai-hint={item.imageId.replace(/-/g, ' ')}
            />
        </motion.div>
      </div>

      {/* Larger Typography & Details */}
      <div
        className={`w-full md:w-1/2 text-center ${
          index % 2 === 0 ? 'md:text-left' : 'md:text-right'
        }`}
      >
        <h3 className="sirivennela-regular text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none">{item.name}</h3>
        <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground mt-5 leading-relaxed">
          {item.description}
        </p>
        <p className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-primary mt-5 tracking-wide">₹{item.price}</p>
      </div>

      <VineSVG className={`hidden md:block ${
          index % 2 === 0
            ? 'left-1/2 -translate-x-1/2 top-full'
            : 'left-1/2 -translate-x-1/2 bottom-full transform -scale-y-100'
        } h-48`} />
    </motion.div>
  )
}

const CategoryHeader = ({ title }: { title: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="text-center my-16 md:my-32"
    >
      <h2 className="text-4xl sm:text-5xl md:text-8xl font-limelight tracking-wider">
        {title}
      </h2>
    </motion.div>
  );
};


export default function SpecialsPage() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const categories = ['All', 'Coffee', 'Pasta', 'Pizza', 'Dessert'] as const;
  type Category = typeof categories[number];
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const excludedFromSpecials = [
    'pasta4', 'pasta5', 'pizza4', 'pizza5', 'dessert4', 'dessert5',
    'coffee10', 'pasta6', 'pizza6', 'dessert6'
  ];
  const menuData = allMenuItems.filter(item => !excludedFromSpecials.includes(item.id));

  const filteredMenu = menuData.filter(item => {
    const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
    const searchMatch = searchQuery === '' || 
                        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const menuByCategory = (
    activeCategory === 'All' && searchQuery === ''
      ? categories.filter(c => c !== 'All').map(category => ({
          category,
          items: filteredMenu.filter(item => item.category === category),
        }))
      : activeCategory === 'All' && searchQuery !== ''
      ? categories.filter(c => c !== 'All').map(category => ({
          category,
          items: filteredMenu.filter(item => item.category === category),
        })).filter(group => group.items.length > 0)
      : [{
          category: activeCategory,
          items: filteredMenu.filter(item => item.category === activeCategory)
        }]
  ).filter(group => group.items.length > 0);


  return (
    <div className="bg-[#090b0d] text-foreground font-sans min-h-screen relative overflow-hidden">
      <SmokeEffect />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
            className="text-center -mt-8 mb-4 md:mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={itemVariants}
        >
          <h2 className="text-2xl md:text-3xl meie-script-regular tracking-wider">
            handpicked just for you.
          </h2>
        </motion.div>

        <div className="mb-4 md:mb-8 max-w-lg mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="search"
              placeholder="Search for a dish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-transparent"
            />
          </div>
        </div>

        <div className="md:hidden mb-4 flex justify-center">
          <Select onValueChange={(value: Category) => setActiveCategory(value)} defaultValue={activeCategory}>
            <SelectTrigger className="w-[240px] bg-transparent">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'Dessert' ? 'Desserts' : category === 'Pizza' ? 'Pizzas' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <motion.div 
          className="hidden md:flex justify-center flex-wrap gap-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 }}
          }}
        >
          {categories.map(category => (
            <motion.div key={category} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }}}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "capitalize transition-all duration-300 rounded-full text-base",
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-transparent border-border hover:bg-accent/50 hover:border-accent'
                )}
              >
                {category === 'Dessert' ? 'Desserts' : category === 'Pizza' ? 'Pizzas' : category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {menuByCategory.length > 0 ? menuByCategory.map(({ category, items }) => (
                <div key={category}>
                  {((activeCategory as string) === 'All' || searchQuery === '') && <CategoryHeader title={category} />}
                  {items.map((item, index) => (
                    <MenuItem key={item.id} item={item} index={index} />
                  ))}
                </div>
              )) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-muted-foreground py-16"
                >
                  <p className="text-2xl">No items found.</p>
                  <p>Try adjusting your search or filter.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
