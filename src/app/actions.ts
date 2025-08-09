"use server";

import { taxPolicyFAQChatbot, summarizeSummitContent } from "@/ai/flows";
import { z } from "zod";

const partnershipSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function handlePartnershipForm(prevState: any, formData: FormData) {
  try {
    const validatedFields = partnershipSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Please correct the errors below.",
      };
    }

    // Here you would typically send this data to Firebase Firestore, send an email, etc.
    console.log("Partnership inquiry:", validatedFields.data);

    return { message: "Thank you for your inquiry! We will be in touch shortly.", errors: {}, success: true };
  } catch (e) {
    return { message: "An unexpected error occurred. Please try again.", errors: {} };
  }
}

export async function askChatbot(query: string): Promise<string> {
  if (!query) {
    return "Please provide a query.";
  }
  try {
    const result = await taxPolicyFAQChatbot({ query });
    return result.answer;
  } catch (error) {
    console.error("Chatbot error:", error);
    return "Sorry, I was unable to process your request at this time.";
  }
}

export async function handleSummarizeContent(prevState: any, formData: FormData) {
    const content = formData.get('content') as string;
    if (!content || content.length < 50) {
        return { summary: '', error: 'Please provide at least 50 characters of content to summarize.' };
    }

    try {
        const result = await summarizeSummitContent({ content });
        return { summary: result.summary, error: null };
    } catch(error) {
        console.error('Summarization error:', error);
        return { summary: '', error: 'Failed to summarize content. Please try again.' };
    }
}
