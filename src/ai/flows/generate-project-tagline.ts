'use server';
/**
 * @fileOverview Una herramienta de IA para ayudar a los creadores de contenido a crear eslóganes convincentes y concisos para sus películas o proyectos.
 *
 * - generateProjectTagline - Una función que gestiona el proceso de generación de eslóganes de proyectos.
 * - GenerateProjectTaglineInput - El tipo de entrada para la función generateProjectTagline.
 * - GenerateProjectTaglineOutput - El tipo de retorno para la función generateProjectTagline.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectTaglineInputSchema = z.object({
  title: z.string().describe('El título de la película o proyecto.'),
  description: z
    .string()
    .describe(
      'Una breve descripción de la película o proyecto, incluyendo su género, temas principales y puntos clave de la trama.'
    ),
});
export type GenerateProjectTaglineInput = z.infer<
  typeof GenerateProjectTaglineInputSchema
>;

const GenerateProjectTaglineOutputSchema = z.object({
  tagline: z
    .string()
    .describe(
      'Un eslogan convincente y conciso para el proyecto, en español, de no más de 20 palabras.'
    ),
});
export type GenerateProjectTaglineOutput = z.infer<
  typeof GenerateProjectTaglineOutputSchema
>;

export async function generateProjectTagline(
  input: GenerateProjectTaglineInput
): Promise<GenerateProjectTaglineOutput> {
  return generateProjectTaglineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectTaglinePrompt',
  input: {schema: GenerateProjectTaglineInputSchema},
  output: {schema: GenerateProjectTaglineOutputSchema},
  prompt: `Como experto en marketing y promoción cinematográfica, tu tarea es generar un eslogan convincente y conciso para una película o proyecto.

El eslogan debe estar en español, tener un máximo de 20 palabras y capturar la esencia, el género y los puntos de venta únicos del proyecto.

Título del Proyecto: {{{title}}}
Descripción del Proyecto: {{{description}}}`,
});

const generateProjectTaglineFlow = ai.defineFlow(
  {
    name: 'generateProjectTaglineFlow',
    inputSchema: GenerateProjectTaglineInputSchema,
    outputSchema: GenerateProjectTaglineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
