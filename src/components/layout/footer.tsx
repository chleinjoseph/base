import { Sprout } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">Serleo Globals</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Serleo Globals. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary">Twitter</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">LinkedIn</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
