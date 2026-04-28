"use client";

import React, { useState } from 'react';
import { Send, User, MessageSquare, CheckCircle2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { sendContactEmail } from '@/app/actions/send-contact-email';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const db = useFirestore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !inquiry) return;

    setLoading(true);
    
    const submissionData = {
      name,
      email,
      message: inquiry,
      status: 'NEW',
      createdAt: serverTimestamp(),
    };

    // 1. Guardamos en Firestore para tener un registro histórico
    addDoc(collection(db, 'contactSubmissions'), submissionData)
      .then(async () => {
        // 2. Enviamos el correo electrónico mediante la Server Action
        try {
          const result = await sendContactEmail({ name, email, message: inquiry });
          
          if (!result.success) {
            console.warn('El email no pudo enviarse (revisa la configuración SMTP), pero el mensaje se guardó en la base de datos.');
          }
        } catch (error) {
          console.error('Error al intentar enviar el correo:', error);
        }

        setLoading(false);
        setSubmitted(true);
        toast({
          title: "¡Mensaje enviado!",
          description: "Gracias por contactar. Te responderé lo antes posible.",
        });
        setName('');
        setEmail('');
        setInquiry('');
      })
      .catch(async (error) => {
        setLoading(false);
        const contextualError = new FirestorePermissionError({
          path: 'contactSubmissions',
          operation: 'create',
          requestResourceData: submissionData,
        });
        errorEmitter.emit('permission-error', contextualError);
      });
  };

  return (
    <section className="px-4 py-20 md:px-12 bg-card/30">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <Send className="h-8 w-8 text-primary" />
            Contáctame
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            ¿Tienes un proyecto en mente o alguna consulta? Escríbeme.
          </p>
        </div>

        <Card className="bg-background/60 border-white/5 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-xl">Enviar una consulta</CardTitle>
            <CardDescription>
              Completa el formulario y me pondré en contacto contigo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                  <div className="rounded-full bg-primary/20 p-4">
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white">¡Gracias, {name}!</h3>
                <p className="text-muted-foreground">Tu mensaje ha sido recibido con éxito.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 border-white/10 hover:bg-white/5"
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nombre Completo
                  </label>
                  <Input
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-background/40 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Correo Electrónico
                  </label>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background/40 border-white/10 text-white placeholder:text-muted-foreground/40 focus-visible:ring-primary h-12"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Tu Consulta
                  </label>
                  <Textarea
                    placeholder="¿En qué puedo ayudarte?"
                    value={inquiry}
                    onChange={(e) => setInquiry(e.target.value)}
                    required
                    className="bg-background/40 border-white/10 text-white min-h-[150px] focus-visible:ring-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || !name || !email || !inquiry}
                  className="w-full h-14 text-lg font-bold gap-3 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
