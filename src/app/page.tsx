import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Handshake, Lightbulb, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { speakers } from '@/lib/data';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white bg-primary">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Abstract background representing global networks"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-20"
          data-ai-hint="abstract network"
        />
        <div className="z-10 container px-4 md:px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            Redefining the Future of Taxation
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80">
            Join SERLEO GLOBALS at the TaxForward Summit, a digital hub for shaping the future of taxation through innovation, discussion, and strategic partnerships.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/forum">
                Join the Conversation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/partnerships">Explore Partnerships</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary font-headline">About SERLEO GLOBALS</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                SERLEO GLOBALS is at the forefront of tax innovation, dedicated to fostering a global dialogue on creating more efficient, fair, and technology-driven tax systems. Through policy advocacy, research, and our suite of tech solutions, we empower governments and organizations to navigate the complexities of modern taxation. The TaxForward Summit is our flagship initiative to bring together the brightest minds to accelerate this transformation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Lightbulb className="h-8 w-8 text-accent" />
                  <CardTitle>Policy Advocacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Shaping future tax policies through expert analysis and collaboration.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Handshake className="h-8 w-8 text-accent" />
                  <CardTitle>Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Building a global network of partners to drive tax innovation.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <MessageCircle className="h-8 w-8 text-accent" />
                  <CardTitle>Thought Leadership</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Leading discussions on tax trends and digital transformation.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="speakers" className="py-16 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-headline text-primary">Featured Speakers</h2>
            <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
              Hear from global leaders and experts at the forefront of tax policy and technology.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {speakers.slice(0, 4).map((speaker) => (
              <div key={speaker.name} className="text-center">
                <Avatar className="h-32 w-32 mx-auto border-4 border-accent">
                  <AvatarImage src={speaker.imageUrl} alt={speaker.name} data-ai-hint="professional portrait" />
                  <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-xl font-bold">{speaker.name}</h3>
                <p className="text-sm text-accent font-semibold">{speaker.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{speaker.organization}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/summit-info">
                See All Speakers & Agenda
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
