
"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from 'react-dom';
import { handleLogin, hasAdminUser } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Sprout } from "lucide-react";
import { useRouter } from 'next/navigation';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
       {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Sign In
    </Button>
  );
}

export default function AdminLoginPage() {
  const initialState = { message: null, errors: {}, success: false, user: null };
  const [state, formAction] = useActionState(handleLogin, initialState);
  const { toast } = useToast();
  const [adminExists, setAdminExists] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    async function checkAdmin() {
        const exists = await hasAdminUser();
        setAdminExists(exists);
        setLoading(false);
    }
    checkAdmin();
  }, []);

  useEffect(() => {
    if (state?.success && state.user?.role === 'admin') {
      // In a real app, you'd set a secure cookie/token here
      sessionStorage.setItem('adminLoggedIn', 'true');
      router.push('/admin');
    } else if (state?.message && !state.success) {
      toast({
        title: "Login Failed",
        description: state.message,
        variant: "destructive"
      });
       if(state.user?.role === 'user') {
          toast({
            title: "Access Denied",
            description: "You are not an administrator.",
            variant: "destructive"
          });
      }
    }
  }, [state, toast, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
         <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Sprout className="h-8 w-8" />
              <span className="font-bold font-headline text-2xl">Serleo Admin</span>
            </Link>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard.
            </CardDescription>
          </CardHeader>
          <form action={formAction}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                />
                 {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                {state?.errors?.password && <p className="text-sm text-destructive">{state.errors.password[0]}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <SubmitButton />
               {!loading && !adminExists && (
                    <p className="text-center text-sm text-muted-foreground">
                        No admin account found.{" "}
                        <Link
                        href="/admin/signup"
                        className="font-medium text-primary hover:underline"
                        prefetch={false}
                        >
                        Create One
                        </Link>
                    </p>
                )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
