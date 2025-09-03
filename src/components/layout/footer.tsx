
import { Sprout } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-start space-y-2 mb-4 md:mb-0">
                <Link href="/" className="flex items-center space-x-2">
                    <Sprout className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">Serleo Globals</span>
                </Link>
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Serleo Globals. All rights reserved.
                </p>
            </div>
             <div className="flex flex-col space-y-2">
                <h4 className="font-semibold">Company</h4>
                <Link href="/#about" className="text-muted-foreground hover:text-primary text-sm">About Us</Link>
                <Link href="/projects" className="text-muted-foreground hover:text-primary text-sm">Projects & Events</Link>
                <Link href="/collaborate" className="text-muted-foreground hover:text-primary text-sm">Partner With Us</Link>
                <Link href="/startups" className="text-muted-foreground hover:text-primary text-sm">Startups Blueprint</Link>
                <Link href="/life-insights" className="text-muted-foreground hover:text-primary text-sm">Life Insights Blueprint</Link>
                <Link href="/investment" className="text-muted-foreground hover:text-primary text-sm">Investment Blueprint</Link>
                <Link href="/agriventure" className="text-muted-foreground hover:text-primary text-sm">Agriventure Blueprint</Link>
            </div>
            <div className="flex flex-col space-y-2">
                 <h4 className="font-semibold">Community</h4>
                 <Link href="/signup" className="text-muted-foreground hover:text-primary text-sm">Join Us</Link>
                <Link href="/collaborate" className="text-muted-foreground hover:text-primary text-sm">Contact Us</Link>
            </div>
             <div className="flex flex-col space-y-2">
                 <h4 className="font-semibold">Legal</h4>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary text-sm">Terms of Service</Link>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm">Privacy Policy</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
