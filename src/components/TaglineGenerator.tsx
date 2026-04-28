"use client";

import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateProjectTagline } from '@/ai/flows/generate-project-tagline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function TaglineGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagline, setTagline] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!title || !description) return;
    setLoading(true);
    try {
      const result = await generateProjectTagline({ title, description });
      setTagline(result.tagline);
    } catch (error) {
      console.error('Error al generar eslogan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-16 md:px-12 bg-card/50">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-accent" />
            Estudio de Eslóganes IA
          </h2>
          <p className="text-muted-foreground mt-2">Crea el pitch perfecto para tu próxima obra maestra.</p>
        </div>

        <Card className="bg-background/40 border-primary/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Detalles del Proyecto</CardTitle>
            <CardDescription>Proporciona un título y una breve descripción de los temas y la trama de tu proyecto.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Título del Proyecto</label>
              <Input
                placeholder="ej. Horizonte de Neón"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background/60 border-white/10 text-white placeholder:text-muted-foreground focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Descripción</label>
              <Textarea
                placeholder="Un viaje de ciencia ficción donde los humanos viven entre robots..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-background/60 border-white/10 text-white min-h-[120px] focus-visible:ring-primary"
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !title || !description}
              className="w-full h-12 text-lg font-bold gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              {loading ? 'Generando...' : 'Generar Eslogan'}
            </Button>

            {tagline && (
              <div className="mt-8 p-6 rounded-lg bg-primary/10 border border-primary/20 animate-in fade-in slide-in-from-bottom-4">
                <h4 className="text-accent font-bold text-sm uppercase tracking-wider mb-2">Eslogan Generado</h4>
                <p className="text-xl italic text-white leading-relaxed">"{tagline}"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
