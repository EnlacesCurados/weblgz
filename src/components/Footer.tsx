import React from 'react';
import { Instagram, Youtube, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="px-4 py-12 md:px-12 bg-background border-t border-white/5">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
              <span className="text-[11px] font-black leading-none text-black tracking-tighter">LGZ</span>
            </div>
            <h2 className="text-xl font-bold tracking-tighter text-white uppercase">
              LUIS ÁNGEL MENDAÑA / <span className="text-primary">CINE IA</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm text-center md:text-left max-w-md">
            Cineasta con Inteligencia Artificial | Formador en IA Generativa | Director de postgrado de IA Generativa en IEBS
          </p>
        </div>

        <div className="flex gap-8 text-white/60">
          <a 
            href="https://www.linkedin.com/in/luisangelmendana/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a 
            href="https://www.youtube.com/@Lugarzen" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors"
          >
            <Youtube className="h-6 w-6" />
          </a>
          <a 
            href="https://www.instagram.com/lugarzen/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a 
            href="mailto:luisangel@lugarzen.com" 
            className="hover:text-primary transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-white/30 text-xs">© 2026 LUIS ÁNGEL MENDAÑA / CINE IA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
