
"use client";

import { useEffect, useState, useMemo } from 'react';
import { getPosts } from '@/app/actions';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

const categories = ['All', 'Business', 'Creativity', 'Wellness', 'Finance'];

export default function ResourcesPage() {
  const [allResources, setAllResources] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      const fetchedPosts = await getPosts();
      setAllResources(fetchedPosts);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const filteredResources = useMemo(() => {
    return allResources
      .filter(post => {
        // Category filter
        if (activeCategory === 'All') return true;
        return post.type.toLowerCase() === activeCategory.toLowerCase();
      })
      .filter(post => {
        // Search term filter
        if (!searchTerm) return true;
        const lowercasedTerm = searchTerm.toLowerCase();
        return (
          post.title.toLowerCase().includes(lowercasedTerm) ||
          post.description.toLowerCase().includes(lowercasedTerm)
        );
      });
  }, [allResources, activeCategory, searchTerm]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };
  
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Blog & Insights</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Empowering content, business tips, and creative growth tools from the Serleo Globals team and community.
        </p>
      </div>
      
      <div className="mt-12 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search articles..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-center flex-wrap gap-2 mt-4">
            {categories.map(category => (
                <Button 
                    key={category} 
                    variant={activeCategory === category ? 'secondary' : 'ghost'}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
      </div>
      
      <section id="resource-grid" className="mt-16">
        {loading ? (
           <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
           </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            <h3 className="text-xl font-semibold">No articles found.</h3>
            <p>Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
               <Card key={resource._id.toString()} className="group relative flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Link href={`/resources/${resource._id}`}>
                    <div className="relative h-56 w-full">
                        <Image
                            src={resource.imageUrl}
                            alt={resource.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            data-ai-hint={resource.aiHint}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                        <Badge variant="secondary" className="mb-2 bg-white/20 text-white backdrop-blur-sm border-0">{resource.type}</Badge>
                        <h3 className="text-xl font-bold font-headline">{resource.title}</h3>
                    </div>
                 </Link>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
