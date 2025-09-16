
'use client';

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X, Info } from 'lucide-react';

export function WelcomeTour() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const siteFacts = [
    { title: 'Our Mission', description: 'Serleo Globals aims to unleash potential and inspire futures for youth leaders.' },
    { title: 'Did you know?', description: 'We have programs spanning across 5 core sectors, from Agriventure to Wellness.' },
    { title: 'Community Goal', description: 'We aim to train over 5,000 youth by the end of 2026.' },
    { title: 'We are hiring!', description: 'Serleo is looking for a Personal Assistant and a General Manager. Contact us to apply.' },
    { title: 'Get Involved!', description: 'Visit our "Partner With Us" page to see how you can collaborate.' },
  ];

  useEffect(() => {
    const hasBeenWelcomed = localStorage.getItem('serleoWelcomeDismissed');
    if (hasBeenWelcomed !== 'true') {
      setIsOpen(true);
    }

    const notificationInterval = setInterval(() => {
      const randomFact = siteFacts[Math.floor(Math.random() * siteFacts.length)];
      toast(randomFact);
    }, 20000); // every 20 seconds

    return () => clearInterval(notificationInterval);
  }, [toast]);

  const handleDismiss = () => {
    localStorage.setItem('serleoWelcomeDismissed', 'true');
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Alert className="container my-4 relative bg-primary/10 border-primary/20 text-primary-foreground">
       <Info className="h-4 w-4 !text-primary" />
      <AlertTitle className="font-bold text-primary">Welcome to Serleo Globals!</AlertTitle>
      <AlertDescription className="text-primary/80">
        Explore our <a href="#sectors" className="font-semibold underline">Core Sectors</a>, learn about our <a href="/projects" className="font-semibold underline">Projects & Events</a>, or <a href="/signup" className="font-semibold underline">Join the Community</a> to get started.
      </AlertDescription>
      <button onClick={handleDismiss} className="absolute top-2 right-2 p-1 rounded-full hover:bg-primary/20 transition-colors">
        <X className="h-4 w-4 text-primary" />
        <span className="sr-only">Dismiss</span>
      </button>
    </Alert>
  );
}
