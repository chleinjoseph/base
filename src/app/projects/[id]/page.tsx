
import { getPostById } from '@/app/actions';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, Tag, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function ProjectPostPage({ params }: { params: { id: string } }) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
            <article>
                <div className="space-y-4 text-center mb-12">
                     <Link href="/projects">
                        <Button variant="link" className="text-accent hover:text-accent/80">
                            &larr; Back to Projects & Events
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
                        This is where the main content of the project or event would go. An administrator can add detailed information, including schedules, objectives, outcomes, and more through the admin dashboard. This allows for rich, dynamic content that keeps the community informed and engaged.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                     <h3 className="font-headline text-2xl text-primary mt-8 mb-4">A Deeper Dive</h3>
                     <p>
                        Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.
                     </p>
                </div>
            </article>
        </div>
    </div>
  );
}
