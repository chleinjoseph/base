import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Leaf, Mic, Rocket, ShieldCheck, Banknote, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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
    title: 'Serleo Startups',
    description: 'Incubating and mentoring the next generation of youth-led businesses.',
    icon: Rocket
  },
  { 
    title: 'Serleo Investment',
    description: 'Fostering financial literacy and building youth investment circles for a prosperous future.',
    icon: Banknote
  },
  {
    title: 'Serleo Life Insights',
    description: 'Nurturing mental wellness, balanced lifestyles, and the journey to self-mastery.',
    icon: BrainCircuit
  }
];

const testimonials = [
  {
    quote: "Serleo Globals didn't just give me a platform; it gave me a voice. The mentorship in the Startups sector was pivotal for my business.",
    name: "Aisha Bello",
    title: "Founder, Eco-Threads",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "The financial literacy workshops by Serleo Investment were a game-changer. I finally feel in control of my financial future.",
    name: "Kwame Asante",
    title: "University Student",
    avatar: "https://placehold.co/100x100.png"
  },
  {
    quote: "Through Serleo Arts, I found a community that values my creativity and pushes me to grow as a spoken word artist.",
    name: "Priya Sharma",
    title: "Poet & Performer",
    avatar: "https://placehold.co/100x100.png"
  }
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white bg-primary">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Diverse group of empowered youth"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-20"
          data-ai-hint="empowered youth community"
        />
        <div className="z-10 container px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            Unleashing Potential, Inspiring Futures.
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            Serleo Globals is more than a company—it's a movement dedicated to empowering the next generation of leaders, creators, and innovators.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/collaborate">
                Get Involved <ArrowRight className="ml-2 h-5 w-5" />
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
                Serleo Globals is a multidimensional youth empowerment brand committed to transforming lives through creativity, entrepreneurship, health, and innovation. Born from a blend of artistry, business acumen, and a deep-seated purpose, our mission is to build a world where every young person has the tools and opportunities to realize their full potential. We champion scalable, grassroots solutions that create lasting impact.
              </p>
            </div>
            <div className="relative h-80 w-full">
               <Image
                  src={"https://placehold.co/600x400.png"}
                  alt="Founder of Serleo Globals"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-md"
                  data-ai-hint="inspirational founder portrait"
                />
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
               <Card key={sector.title}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <sector.icon className="h-8 w-8 text-accent" />
                  <CardTitle>{sector.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{sector.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="impact" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline text-primary">Our Impact</h2>
            <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
              Hear from the lives we've touched and the communities we've transformed.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col justify-between">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </CardContent>
                <CardHeader className="flex-row items-center gap-4">
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
    </div>
  );
}
