
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { User } from '@/lib/types';
import Link from 'next/link';

export default function DashboardPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setIsClient(true);
        const userJson = sessionStorage.getItem('user');
        const loggedIn = sessionStorage.getItem('userLoggedIn');
        if (loggedIn !== 'true' || !userJson) {
            router.push('/login');
        } else {
             try {
                setUser(JSON.parse(userJson));
            } catch(e) {
                console.error("Failed to parse user from session storage", e);
                sessionStorage.clear();
                router.push('/login');
            }
        }
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('userLoggedIn');
        sessionStorage.removeItem('user');
        router.push('/');
    };

    if (!isClient || !user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="container py-12 md:py-16">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user.name}!</CardTitle>
                    <CardDescription>This is your personal dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-16 space-y-6">
                    <div className="text-6xl">👤</div>
                    <h2 className="text-2xl font-bold">Your Journey with Serleo Starts Here</h2>
                    <p className="text-muted-foreground max-w-md">
                        Explore our community forum, check out the latest projects, or update your profile. We're glad to have you with us.
                    </p>
                    <div className="flex gap-4">
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
