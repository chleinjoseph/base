
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from 'react-dom';
import { handleLogin } from "@/app/actions";
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
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
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

export default function LoginPage() {
  const initialState = { message: null, errors: {}, success: false, user: null };
  const [state, formAction] = useActionState(handleLogin, initialState);
  const { toast } = useToast();
  const router = useRouter();


  useEffect(() => {
    if (state?.success) {
      sessionStorage.setItem('userLoggedIn', 'true');
      router.push('/dashboard');
    } else if (state?.message && !state.success) {
      toast({
        title: "Login Failed",
        description: state.message,
        variant: "destructive"
      });
    }
  }, [state, toast, router]);

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account.
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
                  placeholder="m@example.com"
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
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary hover:underline"
                  prefetch={false}
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
