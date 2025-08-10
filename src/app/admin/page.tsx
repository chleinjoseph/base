"use client";
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Handshake, FileText, Users, MessageSquare, Loader2 } from "lucide-react"
import { handleSummarizeContent, getRecentPartnerships } from '../actions';
import { useEffect, useRef, useState } from 'react';
import { partnershipInquiry } from '@/lib/types';
import { format } from 'date-fns';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(state.summary) {
            formRef.current?.reset();
        }
    }, [state.summary]);
    
    useEffect(() => {
        async function loadPartnerships() {
            setLoading(true);
            const fetchedPartnerships = await getRecentPartnerships();
            setPartnerships(fetchedPartnerships);
            setLoading(false);
        }
        loadPartnerships();
    }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total Partnerships" value="78" icon={Handshake} change="+5 this month" />
        <SummaryCard title="New Resources" value="12" icon={FileText} change="+3 this week" />
        <SummaryCard title="Active Users" value="1,245" icon={Users} change="+10% since last month" />
        <SummaryCard title="Forum Posts Today" value="89" icon={MessageSquare} change="25 new threads" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Partnership Inquiries</CardTitle>
            <CardDescription>Track and manage new partnership requests.</CardDescription>
          </CardHeader>
          <CardContent>
             {loading ? (
                <p>Loading inquiries...</p>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company / Name</TableHead>
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

        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>AI Content Summarizer</CardTitle>
                <CardDescription>Paste content from transcripts or documents to generate a concise summary.</CardDescription>
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
    </div>
  )
}
