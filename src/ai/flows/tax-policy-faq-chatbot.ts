'use server';

/**
 * @fileOverview An AI chatbot for answering tax policy FAQs.
 *
 * - taxPolicyFAQChatbot - A function that handles the tax policy FAQ chatbot interaction.
 * - TaxPolicyFAQChatbotInput - The input type for the taxPolicyFAQChatbot function.
 * - TaxPolicyFAQChatbotOutput - The return type for the taxPolicyFAQChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaxPolicyFAQChatbotInputSchema = z.object({
  query: z.string().describe('The user query about tax policy.'),
});
export type TaxPolicyFAQChatbotInput = z.infer<typeof TaxPolicyFAQChatbotInputSchema>;

const TaxPolicyFAQChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the tax policy question.'),
});
export type TaxPolicyFAQChatbotOutput = z.infer<typeof TaxPolicyFAQChatbotOutputSchema>;

export async function taxPolicyFAQChatbot(input: TaxPolicyFAQChatbotInput): Promise<TaxPolicyFAQChatbotOutput> {
  return taxPolicyFAQChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'taxPolicyFAQChatbotPrompt',
  input: {schema: TaxPolicyFAQChatbotInputSchema},
  output: {schema: TaxPolicyFAQChatbotOutputSchema},
  prompt: `You are an AI chatbot expert in tax policy.

  Answer the following question about tax policy:

  {{query}}`,
});

const taxPolicyFAQChatbotFlow = ai.defineFlow(
  {
    name: 'taxPolicyFAQChatbotFlow',
    inputSchema: TaxPolicyFAQChatbotInputSchema,
    outputSchema: TaxPolicyFAQChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
