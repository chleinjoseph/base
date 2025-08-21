
'use client';

import { useActionState, useEffect, useRef, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { handleCreateTestimonial, getTestimonials, handleDeleteTestimonial } from '@/app/actions';
import { Testimonial } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Create Testimonial
    </Button>
  );
}

function DeleteButton({ testimonialId }: { testimonialId: string }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const onDelete = () => {
        startTransition(async () => {
            const result = await handleDeleteTestimonial(testimonialId);
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

export default function TestimonialsManagementPage() {
  const initialState = { message: null, errors: {}, success: false };
  const [state, formAction] = useActionState(handleCreateTestimonial, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
        setLoading(true);
        const fetchedTestimonials = await getTestimonials();
        setTestimonials(fetchedTestimonials);
        setLoading(false);
    }
    loadTestimonials();
  }, []);

  useEffect(() => {
    if (state.success) {
      toast({ title: 'Success!', description: state.message });
      formRef.current?.reset();
      getTestimonials().then(setTestimonials); // Refresh list
    } else if (state.message) {
      toast({ title: 'Error', description: state.message, variant: 'destructive' });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-8 md:grid-cols-5">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Create New Testimonial</CardTitle>
            <CardDescription>Add a new testimonial to the landing page.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" />
                {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
              </div>
               <div className="space-y-2">
                <Label htmlFor="title">Title / Role</Label>
                <Input id="title" name="title" placeholder="e.g., Founder, Eco-Threads" />
                {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote">Quote</Label>
                <Textarea id="quote" name="quote" rows={4} />
                 {state.errors?.quote && <p className="text-sm text-destructive">{state.errors.quote[0]}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input id="avatar" name="avatar" defaultValue="https://placehold.co/100x100.png" />
                 {state.errors?.avatar && <p className="text-sm text-destructive">{state.errors.avatar[0]}</p>}
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-3">
        <Card>
            <CardHeader>
                <CardTitle>Existing Testimonials</CardTitle>
                <CardDescription>Manage and view all current testimonials.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? <p>Loading testimonials...</p> : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Author</TableHead>
                                <TableHead>Quote</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonials.map(testimonial => (
                                <TableRow key={testimonial._id.toString()}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span>{testimonial.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate italic">"{testimonial.quote}"</TableCell>
                                    <TableCell>{format(new Date(testimonial.createdAt), 'PP')}</TableCell>
                                    <TableCell className="text-right">
                                        <DeleteButton testimonialId={testimonial._id.toString()} />
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
