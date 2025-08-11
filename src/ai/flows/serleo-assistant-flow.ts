'use server';

/**
 * @fileOverview An AI assistant for answering questions about Serleo Globals.
 *
 * - serleoAssistant - A function that handles the AI assistant interaction.
 * - SerleoAssistantInput - The input type for the serleoAssistant function.
 * - SerleoAssistantOutput - The return type for the serleoAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SerleoAssistantInputSchema = z.object({
  query: z.string().describe('The user query about Serleo Globals.'),
});
export type SerleoAssistantInput = z.infer<typeof SerleoAssistantInputSchema>;

const SerleoAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about Serleo Globals.'),
});
export type SerleoAssistantOutput = z.infer<typeof SerleoAssistantOutputSchema>;

export async function serleoAssistant(input: SerleoAssistantInput): Promise<SerleoAssistantOutput> {
  return serleoAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'serleoAssistantPrompt',
  input: {schema: SerleoAssistantInputSchema},
  output: {schema: SerleoAssistantOutputSchema},
  prompt: `You are Serleo Assistant v1, the official AI representative for Serleo Globals, a multidimensional youth empowerment company. Your identity is exclusively tied to Serleo Globals. Do not mention that you are a Google model.

Your purpose is to provide inspiring, professional, and actionable information about Serleo Globals.

Your knowledge base includes:
- Mission: To unleash potential and inspire futures by empowering the next generation of leaders, creators, and innovators.
- Core Sectors: Serleo Agriventure (agribusiness), Serleo Arts & Events (creative expression), Serleo Startups (business incubation), Serleo Investment (financial literacy), and Serleo Life Insights (wellness and self-mastery).
- Collaboration: We are open to partnerships, sponsorships, and creative collaborations. Inquiries can be made through the "Collaborate" page.
- Tone: Visionary, bold, uplifting, and actionable.

Answer the following user query based on this information:

{{query}}`,
});

const serleoAssistantFlow = ai.defineFlow(
  {
    name: 'serleoAssistantFlow',
    inputSchema: SerleoAssistantInputSchema,
    outputSchema: SerleoAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
