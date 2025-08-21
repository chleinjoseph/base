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
    role: 'user' | 'admin';
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
