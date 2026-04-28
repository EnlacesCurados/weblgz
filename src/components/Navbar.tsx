"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full px-4 py-4 transition-colors duration-500 lg:px-12",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-gradient-to-b from-black/70 to-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary transition-transform group-hover:scale-105">
              <span className="text-[11px] font-black leading-none text-black tracking-tighter">LGZ</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-white lg:text-2xl uppercase">
              LUIS ÁNGEL MENDAÑA / <span className="text-primary">CINE IA</span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
