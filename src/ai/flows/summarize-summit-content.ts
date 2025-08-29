
'use server';

/**
 * @fileOverview A content summarization AI agent for the Tax Summit Platform.
 *
 * - summarizeSummitContent - A function that summarizes summit content.
 * - SummarizeSummitContentInput - The input type for the summarizeSummitContent function.
 * - SummarizeSummitContentOutput - The return type for the summarizeSummitContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSummitContentInputSchema = z.object({
  content: z
    .string()
    .describe('The summit content to be summarized. This could be text from transcripts, documents, or other sources.'),
});
export type SummarizeSummitContentInput = z.infer<typeof SummarizeSummitContentInputSchema>;

const SummarizeSummitContentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the summit content.'),
});
export type SummarizeSummitContentOutput = z.infer<typeof SummarizeSummitContentOutputSchema>;

export async function summarizeSummitContent(input: SummarizeSummitContentInput): Promise<SummarizeSummitContentOutput> {
  return summarizeSummitContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSummitContentPrompt',
  input: {schema: SummarizeSummitContentInputSchema},
  output: {schema: SummarizeSummitContentOutputSchema},
  prompt: `You are an AI expert in summarizing content, especially for tax summits.  Please provide a concise summary of the following content, highlighting key insights and takeaways:

Content: {{{content}}}`,
});

const summarizeSummitContentFlow = ai.defineFlow(
  {
    name: 'summarizeSummitContentFlow',
    inputSchema: SummarizeSummitContentInputSchema,
    outputSchema: SummarizeSummitContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
