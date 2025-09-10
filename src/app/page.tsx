
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Leaf, Mic, Rocket, Banknote, BrainCircuit, X, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getTestimonials } from './actions';
import { Testimonial } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const coreSectors = [
  { 
    title: 'Serleo Agriventure', 
    description: 'Pioneering youth engagement in agribusiness and promoting food sustainability.',
    icon: Leaf
  },
  { 
    title: 'Serleo Arts & Events',
    description: 'Championing creative expression through spoken word, modeling, and impactful events.',
    icon: Mic
  },
  { 
    title: 'Serleo StartUps',
    description: 'Incubating and mentoring the next generation of youth-led businesses.',
    icon: Rocket
  },
  { 
    title: 'Serleo Investment & Wealth Circle',
    description: 'Fostering financial literacy and building youth investment circles for a prosperous future.',
    icon: Banknote
  },
  {
    title: 'Serleo Life Insights (Wellness & Empowerment)',
    description: 'Nurturing mental wellness, balanced lifestyles, and the journey to self-mastery.',
    icon: BrainCircuit
  }
];

const SvgSlide = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full flex items-center justify-center p-8">{children}</div>
);

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
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center text-white bg-primary overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-20">
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                       <SvgSlide>
                         <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="%23fff" d="M37.6-45.5C47-36.8,51.8-24.3,56-12.2C60.2-0.1,63.9,11.5,60.2,21.9C56.5,32.3,45.4,41.5,34.4,49.5C23.4,57.5,12.5,64.3-1.1,66.1C-14.7,67.9-29.3,64.7-41.2,56.5C-53,48.3,-62.1,35.1,-65.8,21.1C-69.5,7.1,-67.8-7.7,-60.8-20.1C-53.8-32.5,-41.5-42.5,-29.3-51.1C-17.1-59.7,-5-66.9,6.7-68.5C18.4-70.1,30.1-66.1,37.6-58.5C45.1-50.9,49.4-40.7,37.6-45.5Z" transform="translate(100 100) scale(0.7)" /></svg>
                       </SvgSlide>
                    </CarouselItem>
                    <CarouselItem>
                         <SvgSlide>
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="%23fff" d="M48.1,-66.1C62.4,-57.4,74.2,-43.5,79.8,-27.5C85.4,-11.6,84.9,6.3,78.2,21.2C71.5,36.1,58.7,48,44.7,56.9C30.7,65.8,15.3,71.7,1.2,70.6C-13,69.5,-25.9,61.4,-39.8,52.8C-53.7,44.2,-68.6,35.1,-75.4,21.5C-82.2,7.9,-81,-10.1,-74.6,-25.5C-68.2,-40.8,-56.6,-53.4,-43.3,-62.1C-30,-70.8,-15,-75.6,0.9,-76.3C16.8,-77,33.7,-74.7,48.1,-66.1Z" transform="translate(100 100) scale(0.9)" /></svg>
                        </SvgSlide>
                    </CarouselItem>
                    <CarouselItem>
                         <SvgSlide>
                           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="%23fff" d="M49.3,-43.4C63.6,-28.9,74.7,-8,72.5,10.6C70.3,29.3,54.8,45.8,36.9,56.2C19,66.6,-1.3,71,-21.8,66.2C-42.3,61.4,-63,47.4,-70.1,28.9C-77.2,10.3,-70.7,-12.9,-58.5,-30.2C-46.3,-47.5,-28.4,-58.9,-9.1,-58.1C10.2,-57.4,20.4,-44.5,33.7,-38.4C47,-32.3,60.3,-33.1,49.3,-43.4Z" transform="translate(100 100) scale(0.9)"/></svg>
                        </SvgSlide>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <div className="absolute inset-0 bg-black/30" />
         </div>
         <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />
         
         <div className="z-20 container px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            Welcome to Serleo Globals
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            A multidimensional youth-driven enterprise committed to empowering the next generation through innovation, creativity, investment, and purpose. Serleo Globals is not just a brand; it's a global youth movement.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
              <Link href="/collaborate">
                Partner With Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
             <Button asChild size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white">
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
                <CardHeader className="items-center">
                  <div className="p-4 bg-accent/20 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/30">
                    <sector.icon className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="mt-4">{sector.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{sector.description}</p>
                </CardContent>
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
