
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, DollarSign, Calendar, BookOpen, Star } from 'lucide-react';
import Link from 'next/link';

const activities = [
    "Investment Clubs & Circles Formation",
    "Group Real Estate Investments (land/apartments)",
    "Micro-Investment Trainings & Challenges",
    "Youth Investment Forums & Masterclasses",
    "Partnerships with Financial Institutions & Saccos",
    "Low-Capital Business Ventures (stock, agribusiness, reselling)",
    "Trading Knowledge Sessions (Forex, Crypto, NSE)",
    "Investment Book Clubs & Mentorship",
    "Business Due Diligence Services",
    "Public Speaking on Wealth Creation & Money Psychology"
];

const revenueStreams = [
    "Return on Pooled Investments (dividends, interest, property gains)",
    "Paid Financial Literacy Workshops & Masterclasses",
    "Commission from Partnered Financial Institutions (affiliate/agent model)",
    "Project Management Fees for Investment Ventures",
    "Real Estate Flipping/Property Resale Profits",
    "Sacco & Group Savings Advisory Services",
    "Subscriptions to Investment Circles & Premium Insights",
    "E-Books, Guides & Digital Products on Wealth Building",
    "Franchise or Licensing of Serleo Investment Clubs",
    "Equity Stake in Partner Startups"
];

const goals = [
    "Train 1,000 youth on financial literacy and smart investing",
    "Launch 10 functional youth investment circles",
    "Facilitate Ksh 10M+ in youth-driven investments",
    "Own 2+ plots/properties under Serleo",
    "Create an investment podcast & eBook series",
    "Host at least 15 high-impact investment events"
];

const calendar = {
    "September 2025": ["Launch “Wealth Begins With Mindset” Workshop", "Form Serleo Migori Investment Circle (pilot)", "Launch “Ksh 500 Investment Challenge”"],
    "October 2025": ["Youth Investment Masterclass (Migori Town Hall)", "Serleo Micro-Investment Bootcamp", "Site Visit & Property Analysis Training"],
    "November 2025": ["Real Estate Investment Panel with Industry Leaders", "Group Investment Pitch Forum", "Launch 'Money Game Book Club'"],
    "December 2025": ["Investor Networking Lunch", "First Investment Circle Earnings Report", "Year-End “Wealth Circle” Retreat & Planning"],
    "January 2026": ["Youth Forex & Crypto Awareness Seminar", "Serleo Investment School (short course)", "Investment in High-Yield Agribusiness Project"],
    "February 2026": ["Money Psychology & Financial Habits Session", "Launch 2nd Investment Circle (Kisii Branch)", "“Invest Before You Flex” Youth Challenge"],
    "March 2026": ["Introduction to Nairobi Stock Exchange Workshop", "Virtual Investment Week", "Mini Property Expo (Migori Grounds)"],
    "April 2026": ["Peer-to-Peer Lending & Group Capital Model", "Serleo Wealth Mindset Podcast Launch", "Quarterly Earnings Review + Bonus Event"],
    "May 2026": ["“Ladies Who Invest” Women Finance Series", "Business Opportunity Spotting Forum", "Launch Monthly Serleo Investment Digest"],
    "June 2026": ["Investment & Financial Freedom Bootcamp", "Investment Partnerships with Saccos Launch", "Real Estate Profit Share Celebration"],
    "July 2026": ["Angel Investor & Venture Capital Fireside Chat", "National Youth Finance Summit (Kisumu)", "Launch of Serleo Property Web Portal"],
    "August 2026": ["“The 5 Streams” Youth Wealth Conference", "Launch Youth Property Ownership Program", "End-Year Impact Report & New Strategy Briefing"]
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

export default function InvestmentPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <p className="text-accent font-semibold">The Wealth Engine of Serleo Globals</p>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mt-2">Serleo Investment</h1>
            <p className="mt-4 text-lg text-muted-foreground">Sectoral Blueprint | September 2025 – August 2026</p>
        </div>

        <div className="space-y-12">
            <InfoCard icon={BookOpen} title="Purpose">
                <p className="text-muted-foreground">Serleo Investment exists to create, manage, and scale long-term and short-term wealth through smart financial ventures for both Serleo Globals and the wider youth community. It empowers young people with financial literacy, investment skills, and access to real-world investment opportunities.</p>
                <div className="mt-4 space-y-2 pl-4 border-l-2 border-accent">
                   <p><strong className="text-primary">Mission:</strong> To cultivate a financially literate and economically empowered generation through structured, accessible and diversified investment platforms.</p>
                   <p><strong className="text-primary">Vision:</strong> To become a leading youth investment group in Africa by developing multiple wealth-generation channels and teaching the principles of responsible investing.</p>
                </div>
            </InfoCard>

            <InfoCard icon={CheckCircle} title="Activities Carried Out">
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
                <h3 className="text-2xl font-bold font-headline text-primary">Impact Statement</h3>
                <p className="mt-4 text-muted-foreground max-w-3xl mx-auto italic">
                    "Serleo Investment is not just about money—it’s about building a culture of conscious wealth in young Africans. It teaches that investment is a lifestyle, a mindset, and a pathway to freedom. It breaks the chains of generational poverty by planting seeds of collective power, discipline, and financial wisdom. By August 2026, Serleo Investment will have turned hundreds of dreamers into investors, and the streets of Migori and beyond will bear the fruit of youth-led wealth."
                </p>
                 <p className="mt-4 font-semibold text-primary">We are building young shareholders of the future—starting today.</p>
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
