
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Leaf, Mic, Rocket, Banknote, BrainCircuit, X, Info } from 'lucide-react';
import Link from 'next/link';
import { getTestimonials } from './actions';
import { Testimonial } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const coreSectors = [
  { 
    title: 'Serleo Agriventure', 
    description: 'Pioneering youth engagement in agribusiness and promoting food sustainability.',
    icon: Leaf,
    href: '/agriventure'
  },
  { 
    title: 'Serleo Arts & Events',
    description: 'Championing creative expression through spoken word, modeling, and impactful events.',
    icon: Mic,
    href: '/arts-and-events'
  },
  { 
    title: 'Serleo StartUps',
    description: 'Incubating and mentoring the next generation of youth-led businesses.',
    icon: Rocket,
    href: '/startups'
  },
  { 
    title: 'Serleo Investment & Wealth Circle',
    description: 'Fostering financial literacy and building youth investment circles for a prosperous future.',
    icon: Banknote,
    href: '/investment'
  },
  {
    title: 'Serleo Life Insights (Wellness & Empowerment)',
    description: 'Nurturing mental wellness, balanced lifestyles, and the journey to self-mastery.',
    icon: BrainCircuit,
    href: '/life-insights'
  }
];

function WelcomeTour() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const siteFacts = [
    { title: 'Our Mission', description: 'Serleo Globals aims to unleash potential and inspire futures for youth leaders.' },
    { title: 'Did you know?', description: 'We have programs spanning across 5 core sectors, from Agriventure to Wellness.' },
    { title: 'Community Goal', description: 'We aim to train over 5,000 youth by the end of 2026.' },
    { title: 'Get Involved!', description: 'Visit our "Partner With Us" page to see how you can collaborate.' },
  ];

  useEffect(() => {
    const hasBeenWelcomed = localStorage.getItem('serleoWelcomeDismissed');
    if (hasBeenWelcomed !== 'true') {
      setIsOpen(true);
    }

    const notificationInterval = setInterval(() => {
      const randomFact = siteFacts[Math.floor(Math.random() * siteFacts.length)];
      toast(randomFact);
    }, 20000); // every 20 seconds

    return () => clearInterval(notificationInterval);
  }, [toast]);

  const handleDismiss = () => {
    localStorage.setItem('serleoWelcomeDismissed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Alert className="container my-4 relative bg-primary/10 border-primary/20 text-primary-foreground">
       <Info className="h-4 w-4 !text-primary" />
      <AlertTitle className="font-bold text-primary">Welcome to Serleo Globals!</AlertTitle>
      <AlertDescription className="text-primary/80">
        Explore our <a href="#sectors" className="font-semibold underline">Core Sectors</a>, learn about our <a href="/projects" className="font-semibold underline">Projects & Events</a>, or <a href="/signup" className="font-semibold underline">Join the Community</a> to get started.
      </AlertDescription>
      <button onClick={handleDismiss} className="absolute top-2 right-2 p-1 rounded-full hover:bg-primary/20 transition-colors">
        <X className="h-4 w-4 text-primary" />
        <span className="sr-only">Dismiss</span>
      </button>
    </Alert>
  );
}


export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  return (
    <div className="flex flex-col">
      <WelcomeTour />
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center text-primary-foreground bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0 bg-background">
           <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div className="h-screen w-full flex items-center justify-center bg-blue-100">
                    <svg viewBox="0 0 100 50" className="w-full h-full"><text x="50" y="25" textAnchor="middle" dy=".3em" fontSize="10">Agriventure</text></svg>
                  </div>
                </CarouselItem>
                <CarouselItem>
                   <div className="h-screen w-full flex items-center justify-center bg-orange-100">
                    <svg viewBox="0 0 100 50" className="w-full h-full"><text x="50" y="25" textAnchor="middle" dy=".3em" fontSize="10">Arts & Events</text></svg>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="h-screen w-full flex items-center justify-center bg-green-100">
                    <svg viewBox="0 0 100 50" className="w-full h-full"><text x="50" y="25" textAnchor="middle" dy=".3em" fontSize="10">Startups</text></svg>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
        </div>
         <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />
         
         <div className="z-20 container px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter text-primary">
            Welcome to Serleo Globals
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
            A multidimensional youth-driven enterprise committed to empowering the next generation through innovation, creativity, investment, and purpose. Serleo Globals is not just a brand; it's a global youth movement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
              <Link href="/collaborate">
                Partner With Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
             <Button asChild size="lg" variant="secondary" className="shadow-lg">
                <Link href="/signup">
                  Join Our Community
                </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary font-headline">About Serleo Globals</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Rooted in transformational leadership and strategic execution, Serleo operates across key sectors to inspire growth, financial independence, and personal mastery. We blend creativity with business, impact with sustainability, and vision with execution.
              </p>
            </div>
             <div className="relative h-80 w-full flex items-center justify-center bg-secondary rounded-lg shadow-md p-8 overflow-hidden">
                <div className="absolute -inset-2 bg-gradient-to-br from-accent/20 via-primary/20 to-transparent animate-[spin_10s_linear_infinite]"/>
                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-32 w-32 text-primary opacity-20 relative z-10"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM12 12c-5.523 0-10-4.477 0-10S22 6.477 12 12zM2 12c5.523 0 10 4.477 0 10S-3.523 16.477 2 12z"/></svg>
            </div>
          </div>
        </div>
      </section>
      
      <section id="sectors" className="py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
           <div className="text-center">
            <h2 className="text-3xl font-bold font-headline text-primary">Our Core Sectors</h2>
            <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
              We empower youth across a diverse range of interconnected sectors.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreSectors.map((sector) => (
               <Card key={sector.title} className="text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group bg-card/50 backdrop-blur-sm border-border/50">
                 <Link href={sector.href} className="flex flex-col h-full">
                    <CardHeader className="items-center">
                      <div className="p-4 bg-accent/20 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/30">
                        <sector.icon className="h-8 w-8 text-accent" />
                      </div>
                      <CardTitle className="mt-4">{sector.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{sector.description}</p>
                    </CardContent>
                 </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section id="impact" className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold font-headline text-primary">Our Impact</h2>
              <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
                Hear from the lives we've touched and the communities we've transformed.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial: Testimonial) => (
                <Card key={testimonial._id.toString()} className="flex flex-col justify-between transition-all duration-300 hover:shadow-lg bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardHeader className="flex-row items-center gap-4 mt-auto pt-4 border-t">
                     <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person portrait" />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{testimonial.name}</CardTitle>
                        <p className="text-sm text-accent font-semibold">{testimonial.title}</p>
                      </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
