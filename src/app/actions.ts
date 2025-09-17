
"use server";

import { serleoAssistant, summarizeSummitContent, generateImage } from "@/ai/flows";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { partnershipInquiry, User, Post, Testimonial, Message, HeroImage } from "@/lib/types";
import bcrypt from "bcryptjs";
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

const messageSchema = z.object({
    content: z.string().min(1, "Message cannot be empty.").max(1000, "Message is too long."),
    userId: z.string(),
    userName: z.string(),
    userRole: z.enum(['user', 'admin', 'superadmin'])
});

const generateImageSchema = z.object({
    prompt: z.string().min(3, "Prompt must be at least 3 characters long."),
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

export async function handleGenerateImage(prevState: any, formData: FormData) {
    const validatedFields = generateImageSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            imageUrl: null,
            error: validatedFields.error.flatten().fieldErrors.prompt?.[0]
        };
    }
    
    try {
        const result = await generateImage({ prompt: validatedFields.data.prompt });
        return { imageUrl: result.imageUrl, error: null };
    } catch (error) {
        console.error('Image generation error:', error);
        return { imageUrl: null, error: 'Failed to generate image. The prompt may have been blocked.' };
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
    
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const user = await db.collection<User>("users").findOne({ email });

        if (!user || !user.password) {
             return { message: "Invalid credentials.", errors: {}, success: false, user: null };
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return { message: "Invalid credentials.", errors: {}, success: false, user: null };
        }
        
        const safeUser = { id: user._id.toString(), name: user.name, email: user.email, role: user.role };

        return { message: "Login successful!", errors: {}, success: true, user: safeUser };
        
    } catch (e) {
        console.error(e);
        return { message: "An unexpected error occurred.", errors: {}, success: false, user: null };
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
        revalidatePath('/projects');
        revalidatePath('/admin/projects');

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
        revalidatePath('/projects');
        revalidatePath('/admin/projects');
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
        const users = await db.collection<User>("users")
            .find({})
            .sort({ createdAt: -1 })
            .toArray();

        // Find the first admin to determine the superadmin
        const firstAdmin = await db.collection<User>("users").findOne({ role: 'admin' }, { sort: { createdAt: 1 } });
        
        return users.map(u => {
            const isSuperAdmin = u.role === 'admin' && firstAdmin?._id.equals(u._id as any);
            return {
                _id: u._id.toString(),
                name: u.name,
                email: u.email,
                role: isSuperAdmin ? 'superadmin' : u.role,
                createdAt: u.createdAt,
            }
        }) as User[];
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


export async function updateUserRole(userId: string, newRole: 'user' | 'admin'): Promise<{ success: boolean; message: string }> {
  try {
    const { ObjectId } = await import('mongodb');
    const client = await clientPromise;
    const db = client.db("TaxForwardSummit");
    const usersCollection = db.collection<User>("users");

    // Prevent the first admin (superadmin) from being demoted
    const firstAdmin = await usersCollection.findOne({ role: 'admin' }, { sort: { createdAt: 1 } });
    if (firstAdmin && firstAdmin._id.equals(new ObjectId(userId))) {
      return { success: false, message: "The primary admin (superadmin) cannot be demoted." };
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: newRole } }
    );

    if (result.modifiedCount === 0) {
      return { success: false, message: "User not found or role is already set." };
    }

    revalidatePath('/admin/users');
    return { success: true, message: `User role updated to ${newRole}.` };

  } catch (error) {
    console.error("Failed to update user role:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

// Forum Actions
export async function getMessages(): Promise<Message[]> {
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const messages = await db.collection("forum_messages")
            .find({})
            .sort({ createdAt: -1 })
            .limit(200) // Fetch the latest 200 messages
            .toArray();

        // The sort is descending, so reverse to show oldest first.
        return messages.reverse().map(m => ({ ...m, _id: m._id.toString() })) as Message[];
    } catch(e) {
        console.error("Failed to fetch messages", e);
        return [];
    }
}

export async function handleCreateMessage(prevState: any, formData: FormData) {
    const validatedFields = messageSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }
    
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const collection = db.collection<Omit<Message, '_id'>>("forum_messages");

        await collection.insertOne({
            ...validatedFields.data,
            createdAt: new Date(),
        });

        // Capping mechanism: keep only the newest 200 messages
        const count = await collection.countDocuments();
        if (count > 200) {
            const oldestDocs = await collection.find().sort({ createdAt: 1 }).limit(count - 200).toArray();
            const idsToDelete = oldestDocs.map(doc => doc._id);
            await collection.deleteMany({ _id: { $in: idsToDelete } });
        }

        revalidatePath('/forum');
        return { errors: {}, success: true };
    } catch (e) {
        console.error(e);
        return { message: "Failed to send message.", errors: {}, success: false };
    }
}

export async function getOrGenerateAboutImage(): Promise<string> {
    try {
        const client = await clientPromise;
        const db = client.db("TaxForwardSummit");
        const siteImagesCollection = db.collection("site_images");

        const existingImage = await siteImagesCollection.findOne({ key: 'about_us_image' });

        if (existingImage && existingImage.imageUrl) {
            return existingImage.imageUrl;
        }

        console.log("Generating new 'About Us' image...");
        // If it doesn't exist, generate it
        const result = await generateImage({ 
            prompt: "A stylized, abstract wireframe globe representing global connection and growth, professional logo style, clean background." 
        });

        if (result.imageUrl) {
            await siteImagesCollection.updateOne(
                { key: 'about_us_image' },
                { $set: { imageUrl: result.imageUrl, createdAt: new Date() } },
                { upsert: true }
            );
            return result.imageUrl;
        }

        // Fallback to a default placeholder if generation fails
        return "https://picsum.photos/seed/about/800/600";

    } catch (error) {
        console.error("Error in getOrGenerateAboutImage:", error);
        // Fallback to a default placeholder on error
        return "https://picsum.photos/seed/about_error/800/600";
    }
}

    