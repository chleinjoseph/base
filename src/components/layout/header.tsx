
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const navItems = [
  { href: '/#about', label: 'About' },
  { href: '/#sectors', label: 'Sectors' },
  { href: '/collaborate', label: 'Collaborate' },
  { href: '/resources', label: 'Blog' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check sessionStorage on client
    setIsUserLoggedIn(sessionStorage.getItem('userLoggedIn') === 'true');
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('userLoggedIn');
    setIsUserLoggedIn(false);
    router.push('/');
    router.refresh(); // Forces a re-render to update header state
  };
  
  // Don't render the header on admin pages
  if (pathname.startsWith('/admin')) {
      return null;
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Serleo Globals</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="border-b pb-4">
                    <SheetTitle>
                        <Link href="/" className="flex items-center space-x-2">
                        <Sprout className="h-6 w-6 text-primary" />
                        <span className="font-bold font-headline">Serleo Globals</span>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-lg",
                        pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="font-bold font-headline">Serleo Globals</span>
          </Link>

          <nav className="flex items-center gap-2">
            {isClient && isUserLoggedIn ? (
              <>
                 <Button variant="ghost" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            ) : (
               isClient && (
                <Button asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
               )
            )}
             <Button variant="outline" asChild>
                <Link href="/admin/login">Admin</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
