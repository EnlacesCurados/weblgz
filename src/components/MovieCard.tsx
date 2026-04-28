"use client";

import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Project } from '@/app/lib/content';

interface MovieCardProps {
  project: Project;
}

export function MovieCard({ project }: MovieCardProps) {
  const CardContent = (
    <>
      <Image
        src={project.imageUrl}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
      />
      
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:bg-neutral-200">
            <Play className="h-4 w-4 fill-current" />
          </div>
        </div>
        <h3 className="text-sm font-bold text-white lg:text-base">{project.title}</h3>
        <div className="flex items-center gap-2 text-xs font-semibold text-accent mt-1">
          <span>{project.year}</span>
        </div>
      </div>
    </>
  );

  const containerClasses = "group relative aspect-[16/9] w-64 flex-none snap-start overflow-hidden rounded-md bg-card transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-2xl hover:shadow-black/50 sm:w-72 lg:w-80 block";

  if (project.videoUrl) {
    return (
      <a 
        href={project.videoUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={containerClasses}
      >
        {CardContent}
      </a>
    );
  }

  return (
    <div className={containerClasses}>
      {CardContent}
    </div>
  );
}
