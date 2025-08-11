"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getRecentPartnerships } from '@/app/actions';
import { partnershipInquiry } from '@/lib/types';
import { format } from 'date-fns';

export default function CollaborationsPage() {
    const [partnerships, setPartnerships] = useState<partnershipInquiry[]>([]);
    const [loading, setLoading] = useState(true);
    
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
        <Card>
          <CardHeader>
            <CardTitle>Collaboration Inquiries</CardTitle>
            <CardDescription>All collaboration requests and partnership inquiries.</CardDescription>
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
                  <TableHead>Message</TableHead>
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
                     <TableCell className="max-w-sm truncate">
                      {partner.message}
                    </TableCell>
                    <TableCell>{format(new Date(partner.createdAt), 'PP')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>
    );
}
