
'use server';

/**
 * @fileOverview An AI agent for generating images from text prompts.
 *
 * - generateImage - A function that handles the image generation process.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageUrl: z.string().describe("The generated image as a URL."),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;


export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
    return generateImageFlow(input);
}

// Simple hash function to create a numeric seed from a string
function simpleHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}


const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async ({ prompt }) => {
    try {
        const { media } = await ai.generate({
            model: 'googleai/imagen-4.0-fast-generate-001',
            prompt,
        });

        if (!media?.url) {
            throw new Error("Image generation failed to return a URL.");
        }
        
        // The Imagen model returns a data URI.
        // For simplicity, we will assume it's always a data URI and return it.
        // In a real-world scenario, you might want to upload this to a bucket
        // and get a public URL, but that's out of scope here.
        return { imageUrl: media.url };

    } catch (error) {
        console.warn("AI image generation failed. Falling back to placeholder.", error);
        
        // WORKAROUND: Use a placeholder image service instead of Imagen
        // if the API call fails (e.g., no billing account).
        const seed = simpleHash(prompt);
        const imageUrl = `https://picsum.photos/seed/${seed}/1024/768`;

        return { imageUrl };
    }
  }
);

    