
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, DollarSign, Calendar, BookOpen, Star, Rocket } from 'lucide-react';
import Link from 'next/link';

const activities = [
    "Startup Bootcamps – 3–5-day training camps teaching business ideation, validation, lean startup methodology.",
    "Business Model Clinics– Help youth refine and validate startup ideas.",
    "Pitching Events & Competitions– Awarding winners with startup seed capital, mentorship, or incubation support.",
    "Mentorship Programs – Pairing young founders with experienced entrepreneurs and investors.",
    "StartUp Market Days – Allowing startups to showcase and sell products/services physically.",
    "Founders’ Circles – Monthly strategy and accountability meetups for entrepreneurs.",
    "Seed & Angel Investor Linkage Forums",
    "Training on Grant Writing, Proposal & Financial Literacy",
    "Co-working and Ideation Sessions",
    "Rural Startup Expansion Tours– Taking startup knowledge to less accessible communities."
];

const revenueStreams = [
    "Startup Training Fees (from institutions/individuals)",
    "Membership Subscription for Access to Resources",
    "Commission from Investment Facilitation (5–10%)",
    "Revenue Share in Incubated Startups (Equity or Revenue Split)",
    "Corporate Sponsored Bootcamps & Pitch Events",
    "Sales from Startup Products During Market Days",
    "Paid Speaking and Training Engagements",
    "Co-working Desk Rentals",
    "Business Documentation & Proposal Services",
    "Franchise Model for Regional Startup Hubs (Future)"
];

const goals = [
    "Launch 50 youth-led businesses across 8 counties.",
    "Host 12 startup incubation bootcamps.",
    "Train 500 young aspiring entrepreneurs.",
    "Facilitate Ksh 5M+ in investment linkage and support.",
    "Create 3 fully functional revenue-generating startup hubs.",
    "Publish “The Serleo Startup Blueprint” guidebook."
];

const calendar = {
    "September 2025": ["Startup Bootcamp (Migori)", "Ideation Clinic: Turning Ideas into Business Models", "Startup Market Day (Annex Grounds)"],
    "October 2025": ["Founders’ Circle Meetup", "University Innovation Week (with Kisii University)", "Serleo Pitch Day (Top 3 Win Seed Funding)"],
    "November 2025": ["Grant Writing & Proposal Training", "Women Founders Bootcamp", "Startups Showcase & Networking Night"],
    "December 2025": ["Year-End Evaluation: Business Health Check Workshop", "Joint Venture Matchmaking (with investors)", "Youth Startup End Year RoundTable"],
    "January 2026": ["Startup LaunchPad Accelerator Program", "Business Model Canvas Mastery", "Vision Setting & Strategy Workshop for Founders"],
    "February 2026": ["Strategic Marketing for Startups", "Creative Startups Camp – Agritech & Arts Focus", "Founders Hot Seat (Live Pitch Review Session)"],
    "March 2026": ["Policy & Legal Structure Training", "Rural Business Roadshow (Rongo, Awendo, Kehancha)", "Youth-Led Ventures Exhibition"],
    "April 2026": ["Finance & Budgeting Clinic for Startups", "Mini Startup Competition (Ksh 50K prize pool)", "Founders Appreciation Dinner"],
    "May 2026": ["Sector-Specific Startup Labs (Fashion, Agri, Tech)", "Investor Roundtable Forum", "Public Launch of 10 New Serleo Incubatees"],
    "June 2026": ["Grant Winning Blueprint Masterclass", "Monthly Founders Check-In", "Rural Youth Pitch Festival"],
    "July 2026": ["Train the Trainer Bootcamp (Build Future Mentors)", "Business Registration & Compliance Drive", "Serleo Startup League Semi-Finals"],
    "August 2026": ["National Startup Tour Kickoff (Nairobi, Nakuru, Kisumu)", "Youth Founders Impact Forum", "Serleo Startup League Grand Finale"]
};


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

export default function StartupsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <p className="text-accent font-semibold">The Innovation Engine of Serleo Globals</p>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mt-2">Serleo Startups</h1>
            <p className="mt-4 text-lg text-muted-foreground">CEO Sectoral Report | September 2025 – August 2026</p>
        </div>

        <div className="space-y-12">
            <InfoCard icon={BookOpen} title="Purpose">
                <p className="text-muted-foreground">Serleo Startups is the innovation powerhouse of Serleo Globals, designed to incubate, accelerate and launch youth-driven entrepreneurial ventures. This sector provides tools, knowledge, mentorship, and capital-linkage to help young innovators transform ideas into thriving, sustainable businesses.</p>
                <div className="mt-4 space-y-2 pl-4 border-l-2 border-accent">
                   <p><strong className="text-primary">Mission:</strong> To ignite and nurture entrepreneurial spirit in the youth by providing real-time support systems, exposure, and hands-on growth experiences through startup development.</p>
                   <p><strong className="text-primary">Vision:</strong> To develop a pipeline of scalable youth-led businesses across Kenya and beyond, positioning Serleo as the leading youth enterprise movement.</p>
                </div>
            </InfoCard>

            <InfoCard icon={Rocket} title="Activities Carried Out">
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

            <InfoCard icon={Calendar} title="12-Month Deep Activity Calendar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(calendar).map(([month, events]) => (
                        <div key={month}>
                            <h4 className="font-bold text-primary font-headline mb-2">{month}</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                {events.map((event, index) => (
                                    <li key={index}>&bull; {event}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </InfoCard>

            <div className="text-center p-8 bg-secondary rounded-lg">
                <h3 className="text-2xl font-bold font-headline text-primary">Summary Impact Statement</h3>
                <p className="mt-4 text-muted-foreground max-w-3xl mx-auto italic">
                    "Serleo Startups is not just a department—it’s an economic revolution engine. We are crafting an army of thinkers, builders, and innovators, pushing the boundaries of unemployment and poverty. This sector is meant to unlock economic freedom for hundreds of youth by helping them build and own income-generating vehicles of their own design. By August 2026, Serleo Startups will be a recognized national youth enterprise brand, transforming ideas into ventures, and dreams into industries."
                </p>
                 <p className="mt-4 font-semibold text-primary">Let’s build the future — startup by startup.</p>
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
