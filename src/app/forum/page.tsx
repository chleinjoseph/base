
'use server';

import { getMessages } from '@/app/actions';
import { MessageForm } from './message-form';
import { MessageList } from './message-list';

export default async function ForumPage() {
    const initialMessages = await getMessages();

    return (
        <div className="container py-12 md:py-16 flex flex-col h-[calc(100vh-4rem)]">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Networking Forum</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Connect with the Serleo Globals community. Share ideas, ask questions, and collaborate.
                </p>
            </div>
            
            <div className="flex-1 flex flex-col bg-card border rounded-lg shadow-sm overflow-hidden">
                <MessageList initialMessages={initialMessages} />
                <MessageForm />
            </div>
        </div>
    );
}
