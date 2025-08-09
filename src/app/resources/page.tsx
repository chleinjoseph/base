import { resources } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Search } from 'lucide-react';
import Image from 'next/image';

export default function ResourcesPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Resource Library</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Access exclusive whitepapers, case studies, and video content curated by the experts at SERLEO GLOBALS.
        </p>
      </div>
      
      <div className="mt-12 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search resources..." className="pl-10" />
        </div>
        <div className="flex justify-center gap-2 mt-4">
            <Button variant="secondary">All</Button>
            <Button variant="ghost">Whitepapers</Button>
            <Button variant="ghost">Videos</Button>
            <Button variant="ghost">Case Studies</Button>
        </div>
      </div>
      
      <section id="resource-grid" className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <Card key={resource.title} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={resource.imageUrl}
                    alt={resource.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={resource.aiHint}
                  />
                </div>
                <div className="p-6">
                    <Badge variant="secondary" className="mb-2">{resource.type}</Badge>
                    <CardTitle className="text-xl font-headline">{resource.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 px-6">
                <p className="text-muted-foreground">{resource.description}</p>
              </CardContent>
              <CardFooter className="px-6 pb-6">
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  {resource.type === 'Video' ? 'Watch Now' : 'Download'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
