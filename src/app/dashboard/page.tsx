
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const loggedIn = sessionStorage.getItem('userLoggedIn');
        if (loggedIn !== 'true') {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        sessionStorage.removeItem('userLoggedIn');
        router.push('/');
    };

    if (!isClient) {
        return null; // Or a loading spinner
    }

    return (
        <div className="container py-12 md:py-16">
            <Card>
                <CardHeader>
                    <CardTitle>User Dashboard</CardTitle>
                    <CardDescription>Welcome to your personal dashboard.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center p-16 space-y-4">
                    <div className="text-6xl">👤</div>
                    <h2 className="text-2xl font-bold">Content Coming Soon!</h2>
                    <p className="text-muted-foreground max-w-md">
                        This area is under construction. We are building personalized tools and resources for our community members.
                    </p>
                    <Button onClick={handleLogout}>Log Out</Button>
                </CardContent>
            </Card>
        </div>
    );
}
