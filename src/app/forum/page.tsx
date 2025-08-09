import { forumMessages, forumTopics } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, ThumbsUp } from 'lucide-react';

export default function ForumPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Networking Forum</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Engage with peers, share insights, and debate the future of taxation.
        </p>
      </div>
      
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold font-headline mb-4">Topics</h2>
          <div className="space-y-4">
            {forumTopics.map((topic) => (
              <Card key={topic.id} className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{topic.name}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex space-x-4">
                        <span>{topic.threads} threads</span>
                        <span>{topic.posts} posts</span>
                    </div>
                    <span>Last post by {topic.lastPost.user}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-12" />

          <div>
            <h3 className="text-xl font-bold font-headline mb-2">Discussion: Blockchain & Crypto</h3>
            <p className="text-muted-foreground mb-6">A thread started by David Chen</p>
            <div className="space-y-6">
              {forumMessages.map((msg, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={msg.avatar} data-ai-hint="person avatar" />
                    <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{msg.user}</p>
                      <p className="text-xs text-muted-foreground">{msg.time}</p>
                    </div>
                    <p className="mt-1 text-sm">{msg.message}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" /> <span>Like</span>
                      </Button>
                       <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                        <MessageSquare className="h-4 w-4" /> <span>Reply</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-start space-x-4 pt-6">
                <Avatar>
                    <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <Textarea placeholder="Write a reply..." rows={4} />
                    <Button className="mt-2">Post Reply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <aside className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Start New Discussion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input placeholder="Thread Title" />
                    <Textarea placeholder="Your message..." />
                    <Button className="w-full">Create Thread</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Community Poll</CardTitle>
                    <CardDescription>What is the biggest hurdle for digital tax adoption?</CardDescription>
                </CardHeader>
                <CardContent>
                    <RadioGroup defaultValue="tech">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="policy" id="r1" />
                            <Label htmlFor="r1">Outdated Policy & Regulation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="tech" id="r2" />
                            <Label htmlFor="r2">Technology & Integration Costs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="skills" id="r3" />
                            <Label htmlFor="r3">Lack of Skilled Personnel</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="privacy" id="r4" />
                            <Label htmlFor="r4">Data Privacy Concerns</Label>
                        </div>
                    </RadioGroup>
                    <Button className="w-full mt-4">Vote</Button>
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  );
}
