
"use client";

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { handlePartnershipForm } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Handshake, PenSquare, Briefcase, Gem, Star } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Send Inquiry
    </Button>
  );
}

const InfoCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <div className="flex items-start gap-4">
        <div className="p-3 bg-accent/20 rounded-full">
            <Icon className="h-6 w-6 text-accent" />
        </div>
        <div>
            <h3 className="text-lg font-bold font-headline text-primary">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    </div>
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
    } else if (state.message) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-headline">Collaborate With Us</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We are building a global ecosystem of impact. We invite partners, creatives, investors, and institutions to join our mission to empower youth.
          </p>
        </div>

        {/* Collaboration Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className='space-y-8'>
                <InfoCard icon={Handshake} title="Partner With Us" description="Collaborate on projects, sponsor an event, or integrate your services with our community." />
                <InfoCard icon={PenSquare} title="Create With Us" description="Are you a creative, a performer, or a facilitator? Let's work together to create inspiring content and events." />
                <InfoCard icon={Briefcase} title="Invest In Us" description="Help us scale our impact. We are seeking investors who align with our vision for global youth empowerment." />
            </div>
            
            {/* Strategic Partner Section */}
            <Card className="shadow-lg border-accent/50 flex flex-col">
                <CardHeader className="bg-primary text-primary-foreground text-center p-6">
                    <Gem className="h-12 w-12 mx-auto mb-2" />
                    <h3 className="text-2xl font-bold font-headline">Become a Strategic Partner</h3>
                    <p className="text-4xl font-bold">Ksh 50,000</p>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                    <p className='text-sm text-muted-foreground mb-4'>A one-time investment to fuel our core mission and scale our impact. Benefits include:</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        {[
                            "Prominent logo placement on all materials.",
                            "A dedicated feature in our impact report.",
                            "Opportunity to co-host a workshop or event.",
                            "Exclusive access to our talent pool.",
                            "VIP invitations to all signature events."
                        ].map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <Star className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="p-6 bg-secondary/30">
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full" size="lg">Become a Partner</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>M-Pesa Global Payment</DialogTitle>
                                <DialogDescription>
                                    Thank you for your amazing contribution! Please use the following details to complete your payment for approval.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                 <div className="p-4 bg-secondary rounded-lg">
                                    <h4 className="font-bold text-lg mb-2">Pay to:</h4>
                                    <p className="font-mono"><strong>Name:</strong> Chlein Joseph Odhiambo</p>
                                    <p className="font-mono"><strong>Phone:</strong> 0719595258</p>
                                </div>
                                <p className="text-sm text-muted-foreground">Once payment is complete, it will be reflected in our systems. We appreciate your support.</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>

        {/* Contact Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Get In Touch</CardTitle>
            <CardDescription>Fill out the form below for bookings, sponsorships, and general collaboration inquiries.</CardDescription>
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
    </div>
  );
}
