"use server";

import { serleoAssistant, summarizeSummitContent } from "@/ai/flows";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { partnershipInquiry, User, Post } from "@/lib/types";
import bcrypt from "bcryptjs";
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";

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

const postSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters.'),
    type: z.string().min(3, 'Type must be at least 3 characters.'),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
    imageUrl: z.string().url('Please enter a valid image URL.'),
    aiHint: z.string().min(3, 'AI Hint must be at least 3 characters.'),
});

interface ChatMessage {
    role: 'user' | 'bot';
    content: string;
}

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


export async function askChatbot(query: string, history: ChatMessage[]): Promise<string> {
  if (!query) {
    return "Please provide a query.";
  }
  try {
    const aiHistory = history.map(msg => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        content: msg.content
    }));

    const result = await serleoAssistant({ query, history: aiHistory });
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

async function seedPosts() {
    const client = await clientPromise;
    const db = client.db("TaxForwardSummit");
    const postsCollection = db.collection("posts");
    const count = await postsCollection.countDocuments();
    if (count === 0) {
        console.log("Seeding initial posts...");
        const initialPosts = [
          {
            title: '5 Steps to Validate Your Startup Idea',
            type: 'Business',
            description: 'A practical guide to testing your business concept before you build.',
            imageUrl: 'https://placehold.co/600x400.png',
            aiHint: 'startup blueprint'
          },
          {
            title: 'The Art of Financial Freedom: A Youth Guide',
            type: 'Finance',
            description: 'Learn the fundamentals of budgeting, saving, and investing for a secure future.',
            imageUrl: 'https://placehold.co/600x400.png',
            aiHint: 'financial planning'
          },
          {
            title: 'Unlocking Creativity: Overcoming Creative Blocks',
            type: 'Creativity',
            description: 'Techniques and exercises to help you break through creative barriers and find your flow.',
            imageUrl: 'https://placehold.co/600x400.png',
            aiHint: 'artist thinking'
          },
            {
            title: 'Mindfulness for Young Leaders',
            type: 'Wellness',
            description: 'Discover how mindfulness practices can improve focus, reduce stress, and enhance leadership.',
            imageUrl: 'https://placehold.co/600x400.png',
            aiHint: 'person meditating'
          },
          {
            title: 'From Farm to Table: Youth in Agribusiness',
            type: 'Business',
            description: 'Exploring the opportunities for young entrepreneurs in the modern agricultural sector.',
            imageUrl: 'https://placehold.co/600x400.png',
            aiHint: 'modern agriculture'
          },
          {
            title: 'Building Your Personal Brand as a Creative',
            type: 'Creativity',
            description: 'A workshop on how to market yourself and your art in the digital age.',
            imageUrl: 'https://placehold.co/600x400.png',
            aiHint: 'personal branding'
          },
        ];
        await postsCollection.insertMany(initialPosts.map(p => ({...p, createdAt: new Date() })));
    }
}

export async function getPosts(): Promise<Post[]> {
    try {
        await seedPosts(); // Seed database if empty
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const posts = await db.collection("posts")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return posts.map(p => ({ ...p, _id: p._id.toString() })) as Post[];
    } catch (e) {
        console.error("Failed to fetch posts", e);
        return [];
    }
}

export async function handleCreatePost(prevState: any, formData: FormData) {
    const validatedFields = postSchema.safeParse(Object.fromEntries(formData.entries()));
    
    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Please correct the errors.",
            success: false,
        };
    }
    
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        await db.collection("posts").insertOne({
            ...validatedFields.data,
            createdAt: new Date(),
        });

        revalidatePath('/resources');
        revalidatePath('/admin/blog');
        return { message: "Post created successfully.", errors: {}, success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create post.", errors: {}, success: false };
    }
}

export async function handleDeletePost(postId: string) {
    try {
        const { ObjectId } = await import('mongodb');
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        await db.collection("posts").deleteOne({ _id: new ObjectId(postId) });
        
        revalidatePath('/resources');
        revalidatePath('/admin/blog');
        return { message: "Post deleted successfully.", success: true };
    } catch(e) {
        console.error(e);
        return { message: "Failed to delete post.", success: false };
    }
}
