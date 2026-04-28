import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MovieRow } from '@/components/MovieRow';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';
import { PROJECTS, CATEGORIES } from '@/app/lib/content';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  const heroProject = PROJECTS[0];
  const featuredProjects = PROJECTS.filter(p => p.category === 'Premiados' && p.id !== heroProject.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <Hero />

      <div className="relative z-20 -mt-2 sm:-mt-4 md:-mt-8 pb-24 space-y-12">
        <MovieRow 
          title="Cortos premiados" 
          projects={featuredProjects} 
        />
        
        {CATEGORIES.filter(cat => cat !== 'Premiados').map(category => (
          <MovieRow 
            key={category} 
            title={category} 
            projects={PROJECTS.filter(p => p.category === category)} 
          />
        ))}
      </div>

      <ContactForm />

      <Footer />
      <Toaster />
    </main>
  );
}
