
import { ObjectId } from "mongodb";

export type partnershipInquiry = {
    _id: string | ObjectId;
    name: string;
    email: string;
    company?: string;
    message: string;
    createdAt: Date;
}

export type User = {
    _id?: string | ObjectId;
    name: string;
    email: string;
    password?: string; // Hashed password
    role: 'user' | 'admin' | 'superadmin';
    createdAt: Date;
}

export type Post = {
    _id: string | ObjectId;
    title: string;
    type: string;
    description: string;
    imageUrl: string;
    aiHint: string;
    createdAt: Date;
}

export type Testimonial = {
    _id: string | ObjectId;
    name: string;
    title: string;
    quote: string;
    avatar: string;
    createdAt: Date;
}

export type Message = {
    _id: string | ObjectId;
    content: string;
    userId: string;
    userName: string;
    userRole: 'user' | 'admin' | 'superadmin';
    createdAt: Date;
}

export type HeroImage = {
    _id: string | ObjectId;
    prompt: string;
    imageUrl: string;
    createdAt: Date;
}
