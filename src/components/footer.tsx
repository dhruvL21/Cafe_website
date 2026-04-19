"use client";

import Link from "next/link";
import { Wind, Twitter, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { NAV_LINKS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Separator } from "./ui/separator";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary text-sm">
      <div className="container py-8 md:py-12">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          
          {/* About Section - Hidden on mobile */}
          <div className="hidden md:flex flex-col items-start gap-2">
            <Link href="/" className="flex items-center space-x-2 mb-2">
               <div className="w-8 h-8 rounded-md bg-foreground text-background flex items-center justify-center font-bold text-lg">
                C
              </div>
              <span className="font-bold text-lg">Cup o’ Joy</span>
            </Link>
            <p className="text-sm text-muted-foreground">© {year} Cup o’ Joy. All rights reserved.</p>
            <p className="text-xs text-muted-foreground/50">
              Note: A Google Maps API key is required for full functionality. Please add it to your .env file.
            </p>
          </div>
          
          {/* Navigate Section */}
          <div className="grid gap-4 text-center md:text-left">
            <h3 className="font-semibold uppercase tracking-wider">Navigate</h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Connect Section */}
          <div className="grid gap-4 text-center md:text-left">
            <h3 className="font-semibold uppercase tracking-wider">Connect</h3>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="size-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="size-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="size-5 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
            <div className="text-muted-foreground space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2"><MapPin className="size-4"/><span>123 Coffee Lane, Beanville, CA 90210</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2"><Mail className="size-4"/><span>hello@cupojoy.com</span></div>
              <div className="flex items-center justify-center md:justify-start gap-2"><Phone className="size-4"/><span>(555) 123-4567</span></div>
            </div>
          </div>
        </div>

        {/* Mobile footer */}
        <div className="md:hidden text-center mt-8 pt-8 border-t border-border">
          <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-foreground text-background flex items-center justify-center font-bold text-lg">
              C
            </div>
            <span className="font-bold text-lg">Cup o’ Joy</span>
          </Link>
          <p className="text-xs text-muted-foreground">© {year} Cup o’ Joy. All rights reserved.</p>
           <p className="text-xs text-muted-foreground/50 mt-2">
              Note: A Google Maps API key is required for full functionality.
            </p>
        </div>

      </div>
    </footer>
  );
}
