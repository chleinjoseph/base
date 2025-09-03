
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, DollarSign, Calendar, BookOpen, Star, Mic } from 'lucide-react';
import Link from 'next/link';

const activities = [
    "Open Mic Events",
    "Youth Creative Expos",
    "Poetry & Music Showcases",
    "Modeling & Fashion Nights",
    "Spoken Word Coaching Workshops",
    "Event Hosting Services for Corporate & Private Clients",
    "Digital Content Creation (YouTube, TikTok)",
    "Artistic Retreats & Wellness Events",
    "Creative Branding & Design Services",
    "Collaborative Events with Schools, Universities, Churches, & Organizations"
];

const revenueStreams = [
    "Event Ticket Sales (Ksh 200–1000 pp)",
    "Content Monetization (YouTube, Socials, Live streaming)",
    "Sponsorships & Partnerships",
    "Creative Coaching Fees (Spoken word, stage presence, fashion)",
    "Modeling & Hosting Gigs",
    "Corporate Event Contracts",
    "Merchandise Sales (Books, T-shirts, Art)",
    "Vendor Slots at Events",
    "Private Performances",
    "Workshops & Training Sessions"
];

const goals = [
    "Host 36 signature events in 12 months.",
    "Train at least 300 youth through creative workshops.",
    "Generate Ksh 1.5M in direct revenue.",
    "Establish partnerships with 10 institutions or brands.",
    "Create and monetize 20+ digital content pieces.",
    "Develop Serleo Arts Alumni Network.",
    "Publish the first Serleo Anthology from spoken word alumni."
];

const calendar = {
    "September 2025": ["Serleo Open Mic: \"Voices of Fire\"", "Spoken word Coaching Bootcamp", "Youth Creatives Fireside Night"],
    "October 2025": ["Serleo Fashion Night + Art Auction", "Campus Talent Tour – Migori/Kisii Uni", "Creative Wellness Workshop + Meditation"],
    "November 2025": ["“Healing Through Words” – Poetry Showcase", "Modeling & Branding Training", "Serleo Monthly Creatives Networking"],
    "December 2025": ["Holiday Talent Festival", "Creative Business Talk (w/ Guests)", "End Year Creative Awards Night"],
    "January 2026": ["Vision Board & Creative Planning Workshop", "Rap & Flow Cypher Night", "Serleo Music & Spoken Word ChillOut"],
    "February 2026": ["Valentine’s Creative Showcase", "Photography + Modeling Skills Day", "“My Voice, My Power” Youth SpeakUp"],
    "March 2026": ["Women in Art – Creative Sisters Night", "The Business of Events Training", "Migori Regional Arts & Culture Expo"],
    "April 2026": ["Youth Creative Retreat – Rongo Edition", "Visual Art & Digital Expression Workshop", "Battle of Poets Open Mic"],
    "May 2026": ["Sound of the Streets – Urban Music Jam", "Talent to Income Bootcamp", "Serleo Art Festival & Mini Market"],
    "June 2026": ["Winter Words & Chill Showcase", "Film & Creative Media Night", "Monthly Creatives RoundTable"],
    "July 2026": ["Mid-Year Creative Review", "Youth Artists Collab Night", "Migori Inter-School Talent Battle"],
    "August 2026": ["Art of Love: Relationship & Creativity Talk", "Youth Creative Expo (Main Event of Year)", "Serleo Alumni Creatives Gala Night"]
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

export default function ArtsAndEventsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <p className="text-accent font-semibold">The Creative & Cultural Hub of Serleo Globals</p>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mt-2">Serleo Arts & Events</h1>
            <p className="mt-4 text-lg text-muted-foreground">Sectoral Blueprint | September 2025 – August 2026</p>
        </div>

        <div className="space-y-12">
            <InfoCard icon={BookOpen} title="Purpose">
                <p className="text-muted-foreground">To provide a platform where youth talents are showcased, empowered, and monetized. This sector taps into the artistic and creative genius in young people, creating space for storytelling, performance, expression, healing, and entrepreneurship through events and artistic engagements.</p>
                <div className="mt-4 space-y-2 pl-4 border-l-2 border-accent">
                   <p><strong className="text-primary">Aims:</strong></p>
                    <ul className="list-disc list-inside text-muted-foreground">
                        <li>Amplify youth voices through spoken word, poetry, music, modeling, art & drama.</li>
                        <li>Host community-centered, income-generating events.</li>
                        <li>Foster cultural preservation and modern expression.</li>
                        <li>Train youth in creative entrepreneurship.</li>
                    </ul>
                </div>
            </InfoCard>

            <InfoCard icon={Mic} title="Key Activities">
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

            <InfoCard icon={Calendar} title="12-Month Activity Calendar (3 Events per Month)">
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
                <h3 className="text-2xl font-bold font-headline text-primary">Impact Statement</h3>
                <p className="mt-4 text-muted-foreground max-w-3xl mx-auto italic">
                   This sector is the heartbeat of youth culture. It’s where stories are born, confidence is built, and movements begin. We are not just hosting events; we are engineering experiences that transform lives, build communities, and create sustainable income for young creatives.
                </p>
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
