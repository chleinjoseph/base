
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setIsClient(true);
        try {
            const userJson = sessionStorage.getItem('user');
            const loggedIn = sessionStorage.getItem('userLoggedIn');
            if (loggedIn !== 'true' || !userJson) {
                router.push('/login');
                return;
            }
            const parsedUser = JSON.parse(userJson);
            // Basic validation to ensure user object has expected properties
            if (parsedUser && parsedUser.name && parsedUser.email) {
                 setUser(parsedUser);
            } else {
                throw new Error("Invalid user data in session storage");
            }
        } catch(e) {
            console.error("Failed to parse user from session storage", e);
            sessionStorage.clear();
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('userLoggedIn');
        sessionStorage.removeItem('user');
        setUser(null);
        router.push('/');
    };

    if (!isClient || !user) {
        // You can render a loading spinner here while the client-side check completes
        return null;
    }

    return (
        <div className="container py-12 md:py-16">
            <Card>
                <CardHeader className="text-center pb-4">
                    <CardTitle className="text-3xl">Welcome to the Serleo Community, {user.name}!</CardTitle>
                    <CardDescription>We're glad to have you with us on this journey.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-8 md:p-16 space-y-6 bg-secondary/30">
                    <Image
                        src="https://i.ibb.co/jv0sCQr1/IMG-20250913-WA0006.jpg"
                        alt="Chlein Joseph Odhiambo, CEO of Serleo Globals"
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-primary/20 shadow-lg"
                        data-ai-hint="professional portrait ceo"
                    />
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-bold font-headline text-primary">A Message From Our Founder</h2>
                        <p className="text-muted-foreground mt-2 italic">
                            "Your journey with Serleo starts here. We're building a global ecosystem of impact, and you are now a vital part of it. Explore, connect, and grow with us. Together, we are not just inspiring futures—we are building them."
                        </p>
                        <p className="font-semibold mt-2">- Chlein Joseph Odhiambo, CEO</p>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button asChild>
                            <Link href="/forum">Go to Forum</Link>
                        </Button>
                        <Button onClick={handleLogout} variant="outline">Log Out</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
