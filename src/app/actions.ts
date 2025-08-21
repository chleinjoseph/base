"use server";

import { serleoAssistant, summarizeSummitContent } from "@/ai/flows";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { partnershipInquiry, User, Post, Testimonial } from "@/lib/types";
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

const testimonialSchema = z.object({
    name: z.string().min(2, 'Name is required.'),
    title: z.string().min(3, 'Title is required.'),
    quote: z.string().min(10, 'Quote must be at least 10 characters.'),
    avatar: z.string().url('Please enter a valid image URL.'),
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
    const collection = db.collection<Omit<partnershipInquiry, '_id'>>("partnership_inquiries");
    await collection.insertOne({
      ...validatedFields.data,
      createdAt: new Date(),
    });

    // Capping the collection to the latest 100 entries.
    const count = await collection.countDocuments();
    if (count > 100) {
      const oldestDocs = await collection.find().sort({ createdAt: 1 }).limit(count - 100).toArray();
      const idsToDelete = oldestDocs.map(doc => doc._id);
      await collection.deleteMany({ _id: { $in: idsToDelete } });
    }

    revalidatePath('/admin/collaborations');
    revalidatePath('/admin');
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
            .limit(5)
            .toArray();

        return partnerships.map(p => ({ ...p, _id: p._id.toString() })) as partnershipInquiry[];
    } catch(e) {
        console.error("Failed to fetch partnerships", e);
        return [];
    }
}

export async function getDashboardStats() {
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        
        const collaborationsCount = await db.collection("partnership_inquiries").countDocuments();
        const postsCount = await db.collection("posts").countDocuments();
        const usersCount = await db.collection("users").countDocuments({ role: 'user' });
        const testimonialsCount = await db.collection("testimonials").countDocuments();


        // Placeholder for monthly/weekly changes. A more complex query would be needed.
        return {
            collaborations: { total: collaborationsCount, change: "+5 this month" },
            posts: { total: postsCount, change: "+3 this week" },
            users: { total: usersCount, change: "+10% since last month" },
            testimonials: { total: testimonialsCount, change: "2 new this week" },
        };

    } catch (e) {
        console.error("Failed to fetch dashboard stats", e);
        return {
            collaborations: { total: 0, change: "N/A" },
            posts: { total: 0, change: "N/A" },
            users: { total: 0, change: "N/A" },
            testimonials: { total: 0, change: "N/A" },
        };
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
            role: 'user', // Default role for general sign-up
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
    let user: User | null;

    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        user = await db.collection<User>("users").findOne({ email });

        if (!user || !user.password) {
             return { message: "Invalid credentials.", errors: {}, success: false };
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return { message: "Invalid credentials.", errors: {}, success: false };
        }
        
    } catch (e) {
        console.error(e);
        return { message: "An unexpected error occurred.", errors: {}, success: false };
    }

    if (user?.role === 'admin') {
        redirect('/admin');
    } else {
        redirect('/');
    }
}

export async function getPosts(filter?: { type: string }): Promise<Post[]> {
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const query = filter && filter.type !== 'All' ? { type: filter.type } : {};
        const posts = await db.collection("posts")
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();

        return posts.map(p => ({ ...p, _id: p._id.toString() })) as Post[];
    } catch (e) {
        console.error("Failed to fetch posts", e);
        return [];
    }
}


export async function getPostById(postId: string): Promise<Post | null> {
    try {
        const { ObjectId } = await import('mongodb');
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const post = await db.collection("posts").findOne({ _id: new ObjectId(postId) });

        if (!post) {
            return null;
        }

        return { ...post, _id: post._id.toString() } as Post;
    } catch (e) {
        console.error("Failed to fetch post", e);
        return null;
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

export async function getUsers(): Promise<User[]> {
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const users = await db.collection("users")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return users.map(u => ({ 
            _id: u._id.toString(),
            name: u.name,
            email: u.email,
            role: u.role,
            createdAt: u.createdAt,
        })) as User[];
    } catch (e) {
        console.error("Failed to fetch users", e);
        return [];
    }
}

export async function hasAdminUser(): Promise<boolean> {
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const admin = await db.collection("users").findOne({ role: 'admin' });
        return !!admin;
    } catch (e) {
        console.error("Failed to check for admin user", e);
        return false;
    }
}

export async function handleAdminSignUp(prevState: any, formData: FormData) {
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

        const adminExists = await usersCollection.findOne({ role: 'admin' });
        if(adminExists) {
            return {
                errors: {},
                message: "An admin account already exists. New admin signups are disabled.",
                success: false,
            };
        }

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
            role: 'admin',
            createdAt: new Date(),
        });

        return { message: "Admin account created successfully! You can now log in.", errors: {}, success: true };

    } catch (e) {
        console.error(e);
        return { message: "An unexpected error occurred.", errors: {}, success: false };
    }
}

export async function getTestimonials(): Promise<Testimonial[]> {
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const testimonials = await db.collection("testimonials")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        return testimonials.map(t => ({ ...t, _id: t._id.toString() })) as Testimonial[];
    } catch (e) {
        console.error("Failed to fetch testimonials", e);
        return [];
    }
}

export async function handleCreateTestimonial(prevState: any, formData: FormData) {
    const validatedFields = testimonialSchema.safeParse(Object.fromEntries(formData.entries()));
    
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
        await db.collection("testimonials").insertOne({
            ...validatedFields.data,
            createdAt: new Date(),
        });

        revalidatePath('/');
        revalidatePath('/admin/testimonials');
        return { message: "Testimonial created successfully.", errors: {}, success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to create testimonial.", errors: {}, success: false };
    }
}


export async function handleDeleteTestimonial(testimonialId: string) {
    try {
        const { ObjectId } = await import('mongodb');
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        await db.collection("testimonials").deleteOne({ _id: new ObjectId(testimonialId) });
        
        revalidatePath('/');
        revalidatePath('/admin/testimonials');
        return { message: "Testimonial deleted successfully.", success: true };
    } catch(e) {
        console.error(e);
        return { message: "Failed to delete testimonial.", success: false };
    }
}
