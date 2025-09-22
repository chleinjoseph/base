
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Handshake, LayoutDashboard, FileText, Users, Bot, Sprout, LogOut, Rss, MessageSquare, Briefcase, MessageCircle } from "lucide-react";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<{name: string} | null>(null);

  useEffect(() => {
    setIsClient(true);
    const loggedIn = sessionStorage.getItem('adminLoggedIn');
    const userJson = sessionStorage.getItem('user');

    if (loggedIn === 'true' && userJson) {
        try {
            const parsedUser = JSON.parse(userJson);
            setUser(parsedUser);
        } catch (e) {
            console.error("Failed to parse user data, logging out.", e);
            handleLogout();
        }
    } else if (pathname !== '/admin/login' && pathname !== '/admin/signup') {
      router.push('/admin/login');
    }
  }, [pathname, router]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('user');
    setUser(null);
    router.push('/admin/login');
  };

  // Don't render the layout on login/signup pages
  if (pathname === '/admin/login' || pathname === '/admin/signup') {
    return <>{children}</>;
  }
  
  // Don't render anything until client-side check is complete and user is verified
  if (!isClient || !user) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <SheetHeader>
            <SheetTitle>
              <div className="flex items-center gap-2">
                <Sprout className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline text-lg">Serleo Admin</span>
              </div>
            </SheetTitle>
          </SheetHeader>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link href="/admin"><LayoutDashboard /><span>Dashboard</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Projects & Events">
                <Link href="/admin/projects"><Briefcase /><span>Projects & Events</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Forum">
                <Link href="/forum"><MessageCircle /><span>Forum</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Collaborations">
                <Link href="/admin/collaborations"><Handshake /><span>Collaborations</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Testimonials">
                <Link href="/admin/testimonials"><MessageSquare /><span>Testimonials</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Blog">
                <Link href="/admin/blog"><Rss /><span>Blog</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Users">
                <Link href="/admin/users"><Users /><span>Users</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="AI Tools">
                <Link href="/admin/ai-tools"><Bot /><span>AI Tools</span></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex items-center justify-between border-t border-sidebar-border pt-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/seed/admin/40/40" data-ai-hint="person avatar" />
              <AvatarFallback>{user.name?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-semibold truncate">{user.name}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
        </header>
        <div className="p-4 md:p-6 bg-secondary/50 min-h-screen">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
