
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, DollarSign, BookOpen, Sprout, Star } from 'lucide-react';
import Link from 'next/link';
import { ActivityCalendar } from './activity-calendar';

const activities = [
    "Urban and rural smart farming demos",
    "Agro-processing training",
    "Farm-to-market supply systems",
    "Agribusiness incubation hubs",
    "Organic farming & greenhouse projects",
];

const revenueStreams = [
    "Sale of produce (vegetables, fruits, herbs)",
    "Organic fertilizer & seedlings sales",
    "Paid agribusiness trainings/workshops",
    "Contract farming & farming consultancy",
    "Farm tours and agri-experiences",
];

const goals = [
    "Train 5,000 youth by Dec 2026",
    "Launch 2 large-scale demo farms (Migori & Kisii)",
    "Generate monthly revenue of Ksh 300K by July 2026",
];

const InfoCard = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="flex flex-row items-center gap-4">
            <Icon className="h-8 w-8 text-accent" />
            <CardTitle className="text-xl font-headline">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

export default function AgriventurePage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <p className="text-accent font-semibold">The Agri-Innovation Hub of Serleo Globals</p>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mt-2">Serleo Agriventure</h1>
            <p className="mt-4 text-lg text-muted-foreground">Sectoral Blueprint | September 2025 – August 2026</p>
        </div>

        <div className="space-y-12">
            <InfoCard icon={BookOpen} title="Purpose">
                <p className="text-muted-foreground">To empower youths through sustainable agribusiness initiatives. To revolutionize agribusiness by equipping youth with sustainable agricultural skills and providing innovative food production solutions.</p>
            </InfoCard>

            <InfoCard icon={Sprout} title="Activities Carried Out">
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
                    {activities.map((activity, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                            <span>{activity}</span>
                        </li>
                    ))}
                </ul>
            </InfoCard>

            <InfoCard icon={DollarSign} title="Revenue Streams">
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-muted-foreground">
                    {revenueStreams.map((stream, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                            <span>{stream}</span>
                        </li>
                    ))}
                </ul>
            </InfoCard>

            <InfoCard icon={Target} title="Clear Goals (2025–2026)">
                 <ul className="space-y-2 text-muted-foreground">
                    {goals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <Star className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                            <span>{goal}</span>
                        </li>
                    ))}
                </ul>
            </InfoCard>

            <ActivityCalendar />
            
            <div className="text-center p-8 bg-secondary rounded-lg">
                <h3 className="text-2xl font-bold font-headline text-primary">Impact Statement</h3>
                <p className="mt-4 text-muted-foreground max-w-3xl mx-auto italic">
                    Serleo Agriventure is transforming the agricultural landscape by cultivating a new generation of agripreneurs. We are not just growing crops; we are growing opportunities, fostering innovation, and building a sustainable future for youth in Africa.
                </p>
                 <p className="mt-4 font-semibold text-primary">Planting seeds of change, harvesting a future of prosperity.</p>
            </div>

            <div className="text-center mt-12">
                 <Button asChild>
                    <Link href="/">
                        &larr; Back to Home
                    </Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
