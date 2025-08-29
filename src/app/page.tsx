import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Leaf, Mic, Rocket, Banknote, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getTestimonials } from './actions';
import { Testimonial } from '@/lib/types';


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

export default async function Home() {
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-col">
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center text-center text-white bg-primary overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src="https://picsum.photos/1920/1080.png"
              alt="Diverse group of empowered youth"
              fill
              objectFit="cover"
              className="opacity-50"
              data-ai-hint="empowered youth community"
            />
            <div className="absolute inset-0 bg-black/30" />
         </div>
         <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />
         <div className="absolute -bottom-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-primary/50 via-primary/10 to-transparent animate-[spin_20s_linear_infinite]" />
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
