
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
                        At Serleo Globals, every project is more than just an event; it's a living laboratory for growth, collaboration, and impact. We believe in learning by doing. This initiative was designed to address a specific community need while providing a platform for young innovators to apply their skills in a real-world context. Participants gained hands-on experience, from initial planning and strategy to execution and post-event analysis.
                    </p>
                    <p>
                        Our methodology focuses on sustainable outcomes. We measure success not only by the immediate results of the project but by the long-term empowerment of the individuals involved. Through mentorship from industry experts and peer-to-peer collaboration, we foster an environment where creativity flourishes and leadership skills are forged. This project is a testament to what is possible when passion is paired with purpose and opportunity.
                    </p>
                     <h3 className="font-headline text-2xl text-primary mt-8 mb-4">Key Takeaways & Future Scope</h3>
                     <p>
                        The insights gathered from this initiative have been invaluable. They inform our future strategies and help us refine our empowerment models. The connections made and the skills developed will continue to ripple throughout the community, creating a lasting legacy of positive change. We are excited to build on this success and continue creating platforms that turn potential into tangible, world-changing action.
                     </p>
                </div>
            </article>
        </div>
    </div>
  );
}
