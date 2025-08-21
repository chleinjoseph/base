
"use client";

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { handlePartnershipForm } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Handshake, PenSquare, Briefcase } from 'lucide-react';
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

const CollaborationCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="items-center">
            <div className="p-4 bg-accent/20 rounded-full">
                <Icon className="h-8 w-8 text-accent" />
            </div>
            <CardTitle className="text-2xl font-headline mt-4">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
            {children}
        </CardContent>
    </Card>
);


export default function CollaboratePage() {
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(handlePartnershipForm, initialState);
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
    } else if (state.message && !state.success) {
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
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Collaborate With Us</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We are building a global ecosystem of impact. We invite partners, creatives, investors, and institutions to join our mission to empower youth.
        </p>
      </div>

      <section id="tiers" className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CollaborationCard icon={Handshake} title="Partner With Us">
                <p>Collaborate with us on projects, sponsor an event, or integrate your services with our community.</p>
            </CollaborationCard>
             <CollaborationCard icon={PenSquare} title="Create With Us">
              <p>Are you a creative, a performer, or a facilitator? Let's work together to create inspiring content and events.</p>
            </CollaborationCard>
             <CollaborationCard icon={Briefcase} title="Invest In Us">
              <p>Help us scale our impact. We are seeking investors who align with our vision for global youth empowerment.</p>
            </CollaborationCard>
        </div>
      </section>

      <section id="contact" className="mt-20">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Get In Touch</CardTitle>
              <CardDescription>Fill out the form below for bookings, sponsorships, and collaboration inquiries. Let's make an impact together.</CardDescription>
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
                  <Label htmlFor="company">Organization (Optional)</Label>
                  <Input id="company" name="company" placeholder="Your Company or Organization" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">How can we collaborate?</Label>
                  <Textarea id="message" name="message" placeholder="Tell us about your ideas..." rows={5} />
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
