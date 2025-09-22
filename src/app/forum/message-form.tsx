
'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { handleCreateMessage } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/lib/types';
import Link from 'next/link';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="icon" disabled={pending}>
            {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Send Message</span>
        </Button>
    );
}

export function MessageForm() {
    const initialState = { errors: {}, success: false };
    const [state, formAction] = useActionState(handleCreateMessage, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        try {
            const userJson = sessionStorage.getItem('user');
            if (userJson) {
                setCurrentUser(JSON.parse(userJson));
            }
        } catch(e) {
            console.error("Failed to parse user from session storage", e);
        }
    }, []);
    
    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        } else if (state.message) {
            toast({ title: "Error", description: state.message, variant: 'destructive' });
        }
    }, [state, toast]);

    if (!currentUser) {
        return (
            <div className="p-4 border-t bg-background text-center text-sm text-muted-foreground">
                You must be logged in to send messages. <Link href="/login" className="font-semibold text-primary underline">Login</Link>
            </div>
        );
    }
    
    return (
        <form
            ref={formRef}
            action={formAction}
            className="p-4 border-t bg-background flex items-center gap-4"
        >
            <input type="hidden" name="userId" value={currentUser._id?.toString() ?? ''} />
            <input type="hidden" name="userName" value={currentUser.name ?? 'Guest'} />
            <input type="hidden" name="userRole" value={currentUser.role ?? 'user'} />
            <Input
                name="content"
                placeholder="Type your message..."
                autoComplete="off"
                className="flex-1"
                aria-invalid={!!state.errors?.content}
                aria-describedby="content-error"
            />
            <SubmitButton />
            {state.errors?.content && (
              <p id="content-error" className="sr-only text-sm text-destructive">{state.errors.content[0]}</p>
            )}
        </form>
    );
}
