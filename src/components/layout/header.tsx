
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: '/#about', label: 'About' },
  { href: '/#sectors', label: 'Sectors' },
  { href: '/partnerships', label: 'Collaborate' },
  { href: '/resources', label: 'Blog' },
];

export function Header() {
  const pathname = usePathname();
  
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
             <Link
                href="/admin/login"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname.startsWith("/admin") ? "text-foreground" : "text-foreground/60"
                )}
              >
                Admin
              </Link>
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
                   <Link
                      href="/admin/login"
                      className={cn(
                        "text-lg",
                        pathname.startsWith("/admin") ? "text-primary font-semibold" : "text-muted-foreground"
                      )}
                    >
                      Admin
                    </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Sprout className="h-5 w-5 text-primary" />
            <span className="font-bold font-headline">Serleo Globals</span>
          </Link>

          <nav className="flex items-center">
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
