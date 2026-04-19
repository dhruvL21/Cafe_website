'use client';
import { motion } from 'framer-motion';
import { menuData } from '@/lib/full-menu';
import type { MenuItem as MenuItemType } from '@/lib/full-menu';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.1 }}
            className="bg-transparent"
        >
            <div className="flex justify-between items-baseline gap-2">
                <h3 className="text-xl sm:text-2xl font-poiret-one tracking-wider text-foreground uppercase flex items-center gap-2">
                    <span>{name}</span>
                    {isSpecial && <Sparkles className="size-4 text-primary shrink-0" />}
                </h3>
                <div className="flex-grow border-b border-dotted border-border/50"></div>
                <span className="text-lg sm:text-xl font-sans text-foreground">{price}</span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
        </motion.div>
    );
};

const MenuCategory = ({ title, items, specialItemIds }: { title: string; items: MenuItemType[], specialItemIds: string[] }) => {
    if (items.length === 0) return null;

    return (
        <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-limelight tracking-wider mb-8 text-center text-primary/80">{title.toUpperCase()}</h2>
            <div className="relative grid grid-cols-1 md:grid-cols-2 md:gap-x-24 gap-y-12">
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border/50"></div>
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
        </div>
    );
};


export default function MenuPage() {
    const specialItemIds = [
      'coffee1', 'coffee2', 'coffee3', 'coffee4', 'coffee5', 'coffee6', 'coffee7', 'coffee8', 'coffee9',
      'pasta1', 'pasta2', 'pasta3',
      'pizza1', 'pizza2', 'pizza3',
      'dessert1', 'dessert2', 'dessert3'
    ];

    const coffeeItems = menuData.filter(item => item.category === 'Coffee');
    const pastaItems = menuData.filter(item => item.category === 'Pasta');
    const pizzaItems = menuData.filter(item => item.category === 'Pizza');
    const dessertItems = menuData.filter(item => item.category === 'Dessert');

    return (
        <div className="bg-[#090b0d] text-foreground min-h-screen py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl xl:max-w-7xl">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-muted-foreground text-2xl md:text-3xl meie-script-regular">
                        Handcrafted with passion, from our kitchen to your table.
                    </p>
                    <div className="flex justify-center my-4">
                        <div className="w-20 h-px bg-primary/50"></div>
                        <CoffeeBeansIcon className="h-6 w-9 text-primary/80 mx-4" />
                        <div className="w-20 h-px bg-primary/50"></div>
                    </div>
                </motion.div>

                <div className="bg-transparent border border-border/50 rounded-2xl p-8 md:p-12 space-y-16">
                   <MenuCategory title="Coffee" items={coffeeItems} specialItemIds={specialItemIds} />
                   <MenuCategory title="Pasta" items={pastaItems} specialItemIds={specialItemIds} />
                   <MenuCategory title="Pizza" items={pizzaItems} specialItemIds={specialItemIds} />
                   <MenuCategory title="Desserts" items={dessertItems} specialItemIds={specialItemIds} />
                </div>
            </div>
        </div>
    );
}
