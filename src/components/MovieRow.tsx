"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/app/lib/content';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  title: string;
  projects: Project[];
}

export function MovieRow({ title, projects }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const slide = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="group relative space-y-2 px-4 py-6 md:px-12">
      <h2 className="text-xl font-bold tracking-tight text-white lg:text-2xl">{title}</h2>
      
      <div className="relative">
        <button
          onClick={() => slide('left')}
          className="absolute left-0 top-0 bottom-0 z-40 hidden w-12 items-center justify-center bg-black/40 opacity-0 transition-opacity hover:bg-black/60 group-hover:flex group-hover:opacity-100"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>

        <div
          ref={rowRef}
          className="no-scrollbar flex gap-4 overflow-x-auto snap-x-mandatory scroll-smooth pb-4"
        >
          {projects.map((project) => (
            <MovieCard key={project.id} project={project} />
          ))}
        </div>

        <button
          onClick={() => slide('right')}
          className="absolute right-0 top-0 bottom-0 z-40 hidden w-12 items-center justify-center bg-black/40 opacity-0 transition-opacity hover:bg-black/60 group-hover:flex group-hover:opacity-100"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  );
}
