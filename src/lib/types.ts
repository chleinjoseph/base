import { ObjectId } from "mongodb";

export type partnershipInquiry = {
    _id: ObjectId;
    name: string;
    email: string;
    company?: string;
    message: string;
    createdAt: Date;
}
