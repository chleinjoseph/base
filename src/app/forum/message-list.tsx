
'use client';

import { useEffect, useRef, useState } from 'react';
import { getMessages } from '@/app/actions';
import { Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { User as UserIcon, Shield } from 'lucide-react';

function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export function MessageList({ initialMessages }: { initialMessages: Message[] }) {
    const [messages, setMessages] = useState(initialMessages);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);

    // This effect runs on mount to get current user and scroll to bottom
    useEffect(() => {
        const userJson = sessionStorage.getItem('user');
        if (userJson) {
            try {
                const parsedUser = JSON.parse(userJson);
                setCurrentUser({ id: parsedUser.id });
            } catch(e) {
                console.error("Failed to parse user from session storage", e);
            }
        }
        
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'auto',
            });
        }
    }, []);

    // This effect runs when messages change to scroll to bottom
    useEffect(() => {
        if (scrollAreaRef.current) {
            const isScrolledToBottom = scrollAreaRef.current.scrollHeight - scrollAreaRef.current.clientHeight <= scrollAreaRef.current.scrollTop + 1;
            if(isScrolledToBottom) {
                 scrollAreaRef.current.scrollTo({
                    top: scrollAreaRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    }, [messages]);

    // Simple polling to refresh messages - in a real app, use WebSockets
    useEffect(() => {
        const interval = setInterval(async () => {
            const newMessages = await getMessages();
            setMessages(newMessages);
        }, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, []);


    return (
        <ScrollArea className="flex-1 p-4 md:p-6" ref={scrollAreaRef}>
            <div className="space-y-6">
                {messages.map((message) => {
                     const isCurrentUser = currentUser?.id === message.userId;
                     const isAdmin = message.userRole === 'admin' || message.userRole === 'superadmin';

                    return (
                        <div key={message._id.toString()} className={cn("flex items-start gap-4", isCurrentUser && "justify-end")}>
                            {!isCurrentUser && (
                                <Avatar className="h-10 w-10 border">
                                    <AvatarFallback>{isAdmin ? <Shield/> : getInitials(message.userName)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn("flex flex-col gap-1 max-w-md", isCurrentUser && "items-end")}>
                                <div className={cn(
                                    "rounded-lg p-3",
                                    isCurrentUser ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none"
                                )}>
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                     {!isCurrentUser && (
                                        <>
                                            <span className="text-xs font-semibold">{message.userName}</span>
                                            {isAdmin && <Badge variant="secondary" className="text-xs">Admin</Badge>}
                                        </>
                                     )}
                                    <span className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                             {isCurrentUser && (
                                 <Avatar className="h-10 w-10 border">
                                    <AvatarFallback>{isAdmin ? <Shield/> : getInitials(message.userName)}</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
    );
}
