"use server";

import { serleoAssistant, summarizeSummitContent } from "@/ai/flows";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { partnershipInquiry, User } from "@/lib/types";
import bcrypt from "bcryptjs";
import { redirect } from 'next/navigation';

const partnershipSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required."),
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
        success: false
      };
    }

    const client = await clientPromise;
    const db = client.db("TaxForwardSummit");
    await db.collection<Omit<partnershipInquiry, '_id'>>("partnership_inquiries").insertOne({
      ...validatedFields.data,
      createdAt: new Date(),
    });


    return { message: "Thank you for your inquiry! We will be in touch shortly.", errors: {}, success: true };
  } catch (e) {
    console.error(e);
    return { message: "An unexpected error occurred. Please try again.", errors: {}, success: false };
  }
}

export async function getRecentPartnerships(): Promise<partnershipInquiry[]> {
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const partnerships = await db.collection("partnership_inquiries")
            .find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .toArray();

        return partnerships.map(p => ({ ...p, _id: p._id.toString() })) as partnershipInquiry[];
    } catch(e) {
        console.error("Failed to fetch partnerships", e);
        return [];
    }
}


export async function askChatbot(query: string): Promise<string> {
  if (!query) {
    return "Please provide a query.";
  }
  try {
    const result = await serleoAssistant({ query });
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

export async function handleSignUp(prevState: any, formData: FormData) {
    const validatedFields = signupSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please correct the errors.",
            success: false,
        };
    }
    
    const { name, email, password } = validatedFields.data;

    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const usersCollection = db.collection<User>("users");

        const existingUser = await usersCollection.findOne({ email });
        if(existingUser) {
            return {
                errors: { email: ["User with this email already exists."] },
                message: "User already exists.",
                success: false,
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await usersCollection.insertOne({
            _id: undefined,
            name,
            email,
            password: hashedPassword,
            role: 'user', // Default role
            createdAt: new Date(),
        });

        return { message: "Signup successful! You can now log in.", errors: {}, success: true };

    } catch (e) {
        console.error(e);
        return { message: "An unexpected error occurred.", errors: {}, success: false };
    }
}

export async function handleLogin(prevState: any, formData: FormData) {
    const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid credentials.",
            success: false,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const user = await db.collection<User>("users").findOne({ email });

        if (!user || !user.password) {
             return { message: "Invalid credentials.", errors: {}, success: false };
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return { message: "Invalid credentials.", errors: {}, success: false };
        }
        
        // In a real app, you would set a cookie or session token here.
        // For now, we will just redirect based on role.

    } catch (e) {
        console.error(e);
        return { message: "An unexpected error occurred.", errors: {}, success: false };
    }

    // This is not a secure way to handle sessions.
    // For a real application, use a library like NextAuth.js or Lucia.
    const user = await (await clientPromise).db("TaxForwardSummit").collection<User>("users").findOne({ email });
    if (user?.role === 'admin') {
        redirect('/admin');
    } else {
        // Redirect to a user dashboard if it exists, or home for now.
        redirect('/');
    }
}
