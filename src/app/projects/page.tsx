
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

const categories = ['All', 'Business', 'Creativity', 'Wellness', 'Finance', 'Agriventure', 'Events'];

export default function ProjectsPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      const fetchedPosts = await getPosts();
      setAllPosts(fetchedPosts);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return allPosts
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
  }, [allPosts, activeCategory, searchTerm]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };
  
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Projects & Events</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore our latest initiatives, events, and insights from the Serleo Globals team and community.
        </p>
      </div>
      
      <div className="mt-12 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
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
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-muted-foreground py-16">
            <h3 className="text-xl font-semibold">No posts found.</h3>
            <p>Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post._id.toString()} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 group bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      objectFit="cover"
                      data-ai-hint={post.aiHint}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                      <Badge variant="secondary" className="mb-2">{post.type}</Badge>
                      <CardTitle className="text-xl font-headline">{post.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 px-6">
                  <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                </CardContent>
                <CardFooter className="px-6 pb-6 mt-auto">
                  <Button asChild className="w-full">
                    <Link href={`/projects/${post._id}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
