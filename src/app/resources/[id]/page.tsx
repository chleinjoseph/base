
import { getPostById } from '@/app/actions';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, Tag, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ResourcePostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
            <article>
                <div className="space-y-4 text-center mb-12">
                     <Link href="/resources">
                        <Button variant="link" className="text-accent hover:text-accent/80">
                            &larr; Back to Blog
                        </Button>
                    </Link>
                    <div className="flex justify-center items-center gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <Tag className="h-4 w-4" />
                             <Badge variant="secondary">{post.type}</Badge>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                        {post.title}
                    </h1>
                </div>

                 <Card className="relative h-96 w-full mb-12 rounded-lg overflow-hidden shadow-lg bg-secondary">
                   <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      objectFit="cover"
                      data-ai-hint={post.aiHint}
                    />
                </Card>

                <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground">
                    <p className="lead text-xl text-muted-foreground mb-8">{post.description}</p>
                    <p>
                        The journey from a fleeting idea to a tangible, impactful venture is one of the most challenging yet rewarding paths an individual can take. At Serleo Globals, we champion the spirit of innovation and provide the tools to navigate this journey. This article delves into the core principles that can transform a simple concept into a successful enterprise. It’s about more than just business plans and funding; it’s about mindset, resilience, and the courage to begin.
                    </p>
                    <p>
                        We explore practical strategies for validating your ideas, understanding your target audience, and building a minimum viable product (MVP). These steps are crucial in minimizing risk and maximizing your chances of success. By adopting a lean approach, you can learn, iterate, and adapt quickly, ensuring that your final product truly meets a market need. Every failure is a lesson, and every pivot is a step closer to a breakthrough.
                    </p>
                     <h3 className="font-headline text-2xl text-primary mt-8 mb-4">A Deeper Dive into Execution</h3>
                     <p>
                        Beyond the initial stages, effective execution is what separates a dream from a reality. This involves building a strong team, fostering a culture of excellence, and mastering the art of storytelling to connect with customers and investors. We believe that every young person possesses the potential to create something extraordinary. Our goal is to unlock that potential and provide a roadmap for turning ambitious visions into a powerful, lasting impact.
                     </p>
                </div>
            </article>
        </div>
    </div>
  );
}
