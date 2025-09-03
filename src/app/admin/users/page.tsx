
"use client";

import { useEffect, useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { getUsers, updateUserRole } from '@/app/actions';
import { User } from '@/lib/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function RoleToggleButton({ user }: { user: User }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const newRole = user.role === 'admin' ? 'user' : 'admin';

    const handleRoleChange = () => {
        if (user.role === 'superadmin') {
            toast({ title: 'Action Forbidden', description: 'Superadmin role cannot be changed.', variant: 'destructive' });
            return;
        }

        startTransition(async () => {
            const result = await updateUserRole(user._id!.toString(), newRole);
             if (result.success) {
                toast({ title: 'Success', description: result.message });
            } else {
                toast({ title: 'Error', description: result.message, variant: 'destructive' });
            }
        });
    }

    return (
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRoleChange} 
            disabled={isPending || user.role === 'superadmin'}
            aria-label={`Change role to ${newRole}`}
        >
            {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : user.role === 'admin' ? (
                <>
                    <ArrowDown className="mr-2 h-4 w-4 text-destructive" /> Demote to User
                </>
            ) : (
                <>
                    <ArrowUp className="mr-2 h-4 w-4 text-primary" /> Promote to Admin
                </>
            )}
        </Button>
    )
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadUsers() {
            setLoading(true);
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
            setLoading(false);
        }
        loadUsers();
    }, []); // Note: This won't auto-refresh on role change, revalidatePath handles it.

    return (
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View all registered users and manage their roles.</CardDescription>
          </CardHeader>
          <CardContent>
             {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user._id?.toString()}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' || user.role === 'superadmin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(user.createdAt), 'PP')}</TableCell>
                    <TableCell className="text-right">
                       <RoleToggleButton user={user} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>
    );
}
