import { ObjectId } from "mongodb";

export type partnershipInquiry = {
    _id: ObjectId;
    name: string;
    email: string;
    company?: string;
    message: string;
    createdAt: Date;
}

export type User = {
    _id: ObjectId;
    name: string;
    email: string;
    password?: string; // Hashed password
    role: 'user' | 'admin';
    createdAt: Date;
}
