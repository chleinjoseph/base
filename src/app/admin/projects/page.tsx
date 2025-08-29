
'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { handleCreatePost, getPosts, handleDeletePost } from '@/app/actions';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Create Post
    </Button>
  );
}

function DeleteButton({ postId }: { postId: string }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const onDelete = () => {
        startTransition(async () => {
            const result = await handleDeletePost(postId);
            if(result.success) {
                toast({ title: "Success", description: result.message });
            } else {
                toast({ title: "Error", description: result.message, variant: 'destructive' });
            }
        });
    }

    return (
        <Button variant="destructive" size="icon" onClick={onDelete} disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </Button>
    )
}

export default function ProjectsManagementPage() {
  const initialState = { message: null, errors: {}, success: false };
  const [state, formAction] = useActionState(handleCreatePost, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
        setLoading(true);
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setLoading(false);
    }
    loadPosts();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast({ title: 'Success!', description: state.message });
      formRef.current?.reset();
      getPosts().then(setPosts); // Refresh posts list
    } else if (state.message) {
      toast({ title: 'Error', description: state.message, variant: 'destructive' });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 md:grid-cols-5">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Project/Event Post</CardTitle>
            <CardDescription>Fill out the form to add a new post.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" />
                {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
              </div>
               <div className="space-y-2">
                <Label htmlFor="type">Type / Category</Label>
                <Input id="type" name="type" placeholder="e.g., Business, Creativity" />
                {state.errors?.type && <p className="text-sm text-destructive">{state.errors.type[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={4} />
                 {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" defaultValue="https://picsum.photos/600/400.png" />
                 {state.errors?.imageUrl && <p className="text-sm text-destructive">{state.errors.imageUrl[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="aiHint">AI Hint for Image</Label>
                <Input id="aiHint" name="aiHint" placeholder="e.g., startup blueprint" />
                 {state.errors?.aiHint && <p className="text-sm text-destructive">{state.errors.aiHint[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-3">
        <Card>
            <CardHeader>
                <CardTitle>Existing Posts</CardTitle>
                <CardDescription>Manage and view all current posts.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? <p>Loading posts...</p> : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map(post => (
                                <TableRow key={post._id.toString()}>
                                    <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                                    <TableCell>{post.type}</TableCell>
                                    <TableCell>{format(new Date(post.createdAt), 'PP')}</TableCell>
                                    <TableCell className="text-right">
                                        <DeleteButton postId={post._id.toString()} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
