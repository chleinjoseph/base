
"use client";
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Handshake, FileText, Users, MessageSquare, Loader2, Quote } from "lucide-react"
import { handleSummarizeContent, getRecentPartnerships, getDashboardStats } from '../actions';
import { useEffect, useRef, useState } from 'react';
import { partnershipInquiry } from '@/lib/types';
import { format } from 'date-fns';

type DashboardStats = {
    collaborations: { total: number; change: string };
    posts: { total: number; change: string };
    users: { total: number; change: string };
    testimonials: { total: number; change: string };
};

const SummaryCard = ({ title, value, icon: Icon, change }: { title: string, value: string, icon: React.ElementType, change: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{change}</p>
    </CardContent>
  </Card>
);

function SummarizeButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Summarize Content'}
    </Button>
  );
}

export default function AdminPage() {
    const initialState = { summary: null, error: null };
    const [state, dispatch] = useActionState(handleSummarizeContent, initialState);
    const formRef = useRef<HTMLFormElement>(null);
    const [partnerships, setPartnerships] = useState<partnershipInquiry[]>([]);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(state.summary) {
            formRef.current?.reset();
        }
    }, [state.summary]);
    
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const [fetchedPartnerships, fetchedStats] = await Promise.all([
                getRecentPartnerships(),
                getDashboardStats()
            ]);
            setPartnerships(fetchedPartnerships);
            setStats(fetchedStats);
            setLoading(false);
        }
        loadData();
    }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats ? (
            <>
                <SummaryCard title="Total Collaborations" value={stats.collaborations.total.toString()} icon={Handshake} change={stats.collaborations.change} />
                <SummaryCard title="Blog Posts" value={stats.posts.total.toString()} icon={FileText} change={stats.posts.change} />
                <SummaryCard title="Testimonials" value={stats.testimonials.total.toString()} icon={MessageSquare} change={stats.testimonials.change} />
                <SummaryCard title="Active Users" value={stats.users.total.toString()} icon={Users} change={stats.users.change} />
            </>
        ) : (
            Array.from({ length: 4 }).map((_, i) => <Card key={i}><CardContent className="p-6"><div className="h-20 w-full bg-muted animate-pulse rounded-md" /></CardContent></Card>)
        )}
      </div>

       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Collaboration Inquiries</CardTitle>
            <CardDescription>The 5 most recent partnership requests.</CardDescription>
          </CardHeader>
          <CardContent>
             {loading ? (
                <p>Loading inquiries...</p>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization / Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerships.map(partner => (
                  <TableRow key={partner._id.toString()}>
                    <TableCell className="font-medium">{partner.company || partner.name}</TableCell>
                    <TableCell>
                      {partner.email}
                    </TableCell>
                    <TableCell>{format(new Date(partner.createdAt), 'PP')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Founder's Corner</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                    <Image
                        src="https://i.ibb.co/jv0sCQr1/IMG-20250913-WA0006.jpg"
                        alt="Chlein Joseph Odhiambo"
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-primary/20 mb-4"
                    />
                    <h3 className="font-bold">Chlein Joseph Odhiambo</h3>
                    <p className="text-sm text-muted-foreground">CEO & Founder</p>
                    <div className="relative p-4 mt-4 bg-background/50 rounded-lg">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/10" />
                        <p className="text-sm text-muted-foreground z-10 relative italic">
                           "Our mission is to build ecosystems of opportunity. Let's continue to inspire and build the future, together."
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
       <Card>
            <CardHeader>
                <CardTitle>AI Content Summarizer</CardTitle>
                <CardDescription>Paste content from articles or documents to generate a concise summary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form action={dispatch} ref={formRef} className="space-y-4">
                    <Textarea name="content" placeholder="Paste your content here (min. 50 characters)..." rows={8}/>
                    <SummarizeButton />
                    {state.error && <p className="text-sm text-destructive mt-2">{state.error}</p>}
                </form>
                {state.summary && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                        <h4 className="font-bold mb-2">Summary:</h4>
                        <p className="text-sm text-muted-foreground">{state.summary}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  )
}
