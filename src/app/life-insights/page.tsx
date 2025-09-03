
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, DollarSign, Calendar, BookOpen, Heart, Star } from 'lucide-react';
import Link from 'next/link';

const activities = [
    "Mental Health Workshops & Healing Circles",
    "Weekly Self-Mastery Coaching Sessions",
    "Youth Men & Women Empowerment Forums",
    "Journaling, Breathwork, Meditation & Movement Sessions",
    "Life Coaching & Personal Transformation Retreats",
    "Spoken Word Therapy & Inner Voice Activation",
    "Public Speaking on Growth, Purpose & Authenticity",
    "One-on-One Coaching for Clarity & Purpose",
    "Spiritual Growth Series (non-religious, universal)",
    "Life Skills Trainings: Discipline, Time, Habits, Love, Career"
];

const revenueStreams = [
    "Paid Personal Coaching Sessions & Packages",
    "Self-Mastery Programs & Online Courses",
    "Workshops, Retreats, and Wellness Events",
    "Monthly Subscription to “Inner Circle” Tribe",
    "Sales of Journals, Life Planners & Wellness Products",
    "Brand Partnerships in Mental Wellness & Fitness",
    "Donations & Sponsorships for Empowerment Events",
    "Corporate Wellness Contracts & Speaking Gigs",
    "Affiliate Sales (books, tools, supplements)",
    "Merchandise: Mindful Clothing, Mugs, Affirmation Cards"
];

const goals = [
    "Impact 5,000+ youth through life mastery events",
    "Train 500+ youth in emotional intelligence & resilience",
    "Facilitate monthly coaching with 100 recurring clients",
    "Publish 2 eBooks & 1 Self-Mastery Toolkit",
    "Host 12 Serleo Insight Circles (1 monthly)",
    "Develop a physical “Serleo Healing & Insight Studio”"
];

const calendar = {
    "September 2025": ["Launch Event – Awaken the Giant Within", "Weekly Insight Circle Begins (Monday Evenings)", "Journaling for Growth Workshop"],
    "October 2025": ["Men’s Emotional Intelligence Forum", "Women’s Empowerment & Healing Day", "Mental Health Awareness Open Mic"],
    "November 2025": ["Self-Discipline & Consistency Training", "Mindful Morning Practice Launch (Online)", "“Love, Trauma & Truth” Spoken Word Therapy"],
    "December 2025": ["Goal Setting & Vision Alignment Masterclass", "Reset & Realign Wellness Camp", "Reflective Sunset Gratitude Circle"],
    "January 2026": ["New Year Inner Vision Blueprint Workshop", "Build Healthy Habits 7-Day Challenge", "“Your Inner Voice” Spoken Word Circle"],
    "February 2026": ["Conscious Relationship & Love Forum", "Life Purpose Coaching Clinic", "Serleo Insight Retreat – Breathe. Heal. Rise."],
    "March 2026": ["Success Mindset Series (3-part class)", "“Breakthrough Now” Youth Coaching Day", "Full Moon Healing & Journaling Night"],
    "April 2026": ["Leadership Through Inner Work Camp", "Mastering Emotions & Triggers Workshop", "Release & Renewal Full Month Wrap-up"],
    "May 2026": ["“Self Love is Power” Women’s Circle", "Time Mastery for High Achievers", "Life Mapping Workshop"],
    "June 2026": ["Awakened Living 4-Day Youth Retreat", "Silent Day of Stillness & Journaling", "“The Next You” – Future Self Visioning"],
    "July 2026": ["Youth Life Talk @ Local University", "Self-Worth & Inner Abundance Training", "Healing Through Storytelling Session"],
    "August 2026": ["Energy Mastery & Morning Routine Coaching", "Final Annual Insight Retreat “RISE 2026”", "Year Review + Inner Circle Celebration Night"]
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

export default function LifeInsightsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <p className="text-accent font-semibold">The Inner Power & Wellness Wing of Serleo Globals</p>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mt-2">Serleo Life Insights</h1>
            <p className="mt-4 text-lg text-muted-foreground">Sectoral Blueprint | September 2025 – August 2026</p>
        </div>

        <div className="space-y-12">
            <InfoCard icon={BookOpen} title="Purpose">
                <p className="text-muted-foreground">Serleo Life Insights exists to awaken, empower, and align youth with their highest self through mental, emotional, spiritual, and personal development practices. It brings clarity, self-awareness, healing, and deep insight into life, success, health, love, and purpose.</p>
                <div className="mt-4 space-y-2 pl-4 border-l-2 border-accent">
                   <p><strong className="text-primary">Mission:</strong> To nurture holistic well-being and personal evolution in the youth, equipping them with practical life tools, mindset mastery, and inner resilience to thrive in an uncertain world.</p>
                   <p><strong className="text-primary">Vision:</strong> To raise a generation of mentally awakened, spiritually grounded, emotionally intelligent, and purpose-driven youth leaders across Africa.</p>
                </div>
            </InfoCard>

            <InfoCard icon={Heart} title="Activities Carried Out">
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
                    "Serleo Life Insights is a safe space, a mirror, and a compass. It leads the youth into clarity, transformation, and power. It reveals the truth behind their silence, helps them unlearn pain, and unlock a life of intention. By August 2026, Serleo Life Insights will have sparked inner revolutions in thousands, taught youth how to lead from within, and gifted a generation with the emotional maturity to rule their lives, businesses, and dreams with grace and power."
                </p>
                 <p className="mt-4 font-semibold text-primary">We are building awakened leaders. From the inside out.</p>
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
