"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PROJECTS } from '@/app/lib/content';

export function Hero() {
  const mainProject = PROJECTS[0];
  const backgroundImages = mainProject.gallery || [mainProject.imageUrl];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (backgroundImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Intervalo de 6 segundos solicitado

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Fondo con imágenes en loop */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={img}
              alt={`${mainProject.title} shot ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              data-ai-hint="medieval cinematic"
            />
          </div>
        ))}
        {/* Capas de degradado fijas */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-80 z-10" />
      </div>

      {/* Contenido fijo del Hero */}
      <div className="relative z-20 flex h-full flex-col justify-end px-4 pb-32 md:px-12 md:pb-44 max-w-3xl">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            {mainProject.title}
          </h1>
          <p className="mb-8 max-w-xl text-lg text-muted-foreground md:text-xl line-clamp-3 leading-relaxed">
            {mainProject.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            {mainProject.videoUrl ? (
              <Button asChild size="lg" className="h-14 px-8 text-lg font-bold gap-2 shadow-lg shadow-primary/20 transition-transform active:scale-95">
                <a href={mainProject.videoUrl} target="_blank" rel="noopener noreferrer">
                  <Play className="h-6 w-6 fill-current" />
                  Ver
                </a>
              </Button>
            ) : (
              <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 shadow-lg shadow-primary/20 transition-transform active:scale-95">
                <Play className="h-6 w-6 fill-current" />
                Ver
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
