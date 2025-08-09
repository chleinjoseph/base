"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { handlePartnershipForm } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Loader2 } from 'lucide-react';
import { partnershipTiers } from '@/lib/data';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Inquiry
    </Button>
  );
}

export default function PartnershipsPage() {
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(handlePartnershipForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Inquiry Sent!",
        description: state.message,
        variant: 'default'
      });
      formRef.current?.reset();
    } else if (state.message && Object.keys(state.errors ?? {}).length > 0) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Partner with Us</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Join forces with SERLEO GLOBALS to drive innovation in the tax industry. We offer a range of partnership opportunities for NGOs, governments, and fintech leaders.
        </p>
      </div>

      <section id="tiers" className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnershipTiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl text-accent font-headline">{tier.name}</CardTitle>
                <CardDescription className="text-3xl font-bold text-primary pt-2">{tier.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{tier.cta}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-20">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Become a Partner</CardTitle>
              <CardDescription>Fill out the form below, and our partnership team will get in touch with you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={dispatch} ref={formRef} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Your Name" />
                    {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="your@email.com" />
                    {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input id="company" name="company" placeholder="Your Company Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Tell us about your organization and partnership interests." rows={5} />
                  {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
