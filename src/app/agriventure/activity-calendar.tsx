
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const calendarData = [
    {
        month: "Sep 2025",
        activities: [
            "Launch of Urban Farming Workshops in Lukenya University.",
            "Partnership meeting with local agricultural cooperatives.",
        ],
        revenue: {
            streams: [
                { item: "Training fee", calc: "@ Ksh 300 x 50 youth", total: 15000 },
                { item: "Sell starter seedling packs", calc: "@ Ksh 100 x 100", total: 10000 },
                { item: "Partner with schools for demo plots", calc: "", total: 10000 },
            ],
            total: 35000,
        },
    },
    {
        month: "Oct 2025",
        activities: [
            "Introduction of Organic Farming Training in Kisii.",
            "Field visit to model farms for practical exposure.",
        ],
        revenue: {
            streams: [
                { item: "Garden setup service", calc: "@ Ksh 2,000 x 10 homes", total: 20000 },
                { item: "Tools markup profit", calc: "", total: 15000 },
                { item: "Soil testing fee", calc: "@ Ksh 500 x 20 farms", total: 10000 },
            ],
            total: 45000,
        },
    },
    {
        month: "Nov 2025",
        activities: [
            "Agribusiness Bootcamp for aspiring young farmers.",
            "Collaboration with agricultural extension officers for mentorship programs.",
        ],
        revenue: {
            streams: [
                { item: "Seedling sales", calc: "@ Ksh 50 x 300", total: 15000 },
                { item: "Selling chicks", calc: "@ Ksh 200 x 50", total: 10000 },
                { item: "Exhibition stand fee", calc: "@ Ksh 1,000 x 20 vendors", total: 20000 },
            ],
            total: 45000,
        },
    },
    {
        month: "Dec 2025",
        activities: [
            "End-of-year Agriventure Expo showcasing youth-led projects.",
            "Award ceremony for outstanding agripreneurs.",
        ],
        revenue: {
            streams: [
                { item: "Farm tour ticket", calc: "@ Ksh 500 x 50", total: 25000 },
                { item: "Subscription kits", calc: "@ Ksh 800 x 20", total: 16000 },
                { item: "Training fee", calc: "@ Ksh 500 x 40", total: 20000 },
            ],
            total: 61000,
        },
    },
    {
        month: "Jan 2026",
        activities: [
            "Launch of Greenhouse Farming Initiative.",
            "Training on value addition and agro-processing.",
        ],
        revenue: { streams: [], total: 0 } // No revenue data for this month in prompt
    },
    {
        month: "Feb 2026",
        activities: [
            "Soil health and conservation workshops.",
            "Introduction to agri-financing and micro-loans.",
        ],
        revenue: { streams: [], total: 0 } // No revenue data for this month in prompt
    },
    {
        month: "Mar 2026",
        activities: [
            "Pest and disease management seminars.",
            "Expansion of Agriventure Clubs in local schools.",
        ],
        revenue: {
            streams: [
                { item: "Seminar fee", calc: "@ Ksh 500 x 60", total: 30000 },
                { item: "Facilitation fees from partners", calc: "", total: 10000 },
                { item: "Land lease service & share farming", calc: "", total: 20000 },
            ],
            total: 60000,
        },
    },
    {
        month: "Apr 2026",
        activities: [
            "Water harvesting and irrigation techniques training.",
            "Field trip to successful agribusiness enterprises.",
        ],
        revenue: { streams: [], total: 0 } // No revenue data for this month in prompt
    },
    {
        month: "May 2026",
        activities: [
            "Introduction to export markets and standards.",
            "Collaboration with export agencies for training.",
        ],
        revenue: {
            streams: [
                { item: "Workshop ticket", calc: "@ Ksh 600 x 50", total: 30000 },
                { item: "Juice sales", calc: "@ Ksh 100 x 200", total: 20000 },
                { item: "Banana flour/biscuits packaging", calc: "", total: 15000 },
            ],
            total: 65000,
        },
    },
    {
        month: "Jun 2026",
        activities: [
            "Agribusiness Innovation Challenge for youth.",
            "Mentorship sessions with successful agripreneurs.",
        ],
        revenue: {
            streams: [
                { item: "Aquaponics class", calc: "@ Ksh 1,500 x 20", total: 30000 },
                { item: "Seed sales", calc: "", total: 15000 },
                { item: "Commission-based farm input delivery", calc: "", total: 20000 },
            ],
            total: 65000,
        },
    },
    {
        month: "Jul 2026",
        activities: [
            "Mid-year review and strategy adjustment meeting.",
            "Launch of Agriventure Newsletter.",
        ],
        revenue: {
            streams: [
                { item: "Honey packaging profit", calc: "", total: 20000 },
                { item: "Equipment hire", calc: "@ Ksh 1,000 x 20", total: 20000 },
                { item: "Goat sale profit", calc: "", total: 25000 },
            ],
            total: 65000,
        },
    },
    {
        month: "Aug 2026",
        activities: [
            "Preparation for annual Agriventure Summit.",
            "Stakeholder engagement and feedback sessions.",
        ],
        revenue: {
            streams: [
                { item: "Stall fee", calc: "@ Ksh 1,000 x 30", total: 30000 },
                { item: "Partner sponsor pitch event", calc: "", total: 25000 },
                { item: "Demos ticketed entry", calc: "@ Ksh 500 x 40", total: 20000 },
            ],
            total: 75000,
        },
    },
];

const totalRevenue = calendarData.reduce((acc, month) => acc + month.revenue.total, 0);

export function ActivityCalendar() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="flex flex-row items-center gap-4">
                <Calendar className="h-8 w-8 text-accent" />
                <CardTitle className="text-xl font-headline">12-Month Activity & Revenue Calendar</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue={calendarData[0].month} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 lg:grid-cols-12">
                        {calendarData.map(data => (
                            <TabsTrigger key={data.month} value={data.month}>{data.month}</TabsTrigger>
                        ))}
                    </TabsList>
                    {calendarData.map(data => (
                        <TabsContent key={data.month} value={data.month} className="mt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-primary font-headline mb-2">Activities</h4>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        {data.activities.map((event, index) => (
                                            <li key={index}>&bull; {event}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-secondary/50 p-4 rounded-lg">
                                    <h4 className="font-bold text-primary font-headline mb-2">Revenue Strategy</h4>
                                    {data.revenue.streams.length > 0 ? (
                                        <>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                {data.revenue.streams.map((stream, index) => (
                                                    <li key={index} className="flex justify-between items-baseline">
                                                        <span>
                                                            &bull; {stream.item}
                                                            {stream.calc && <em className="text-xs block opacity-70 ml-4">{stream.calc}</em>}
                                                        </span>
                                                        <span className="font-mono font-semibold text-foreground/80">{stream.total.toLocaleString()}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <hr className="my-2 border-dashed border-border" />
                                            <div className="flex justify-between font-bold text-primary">
                                                <span>Total</span>
                                                <span>Ksh {data.revenue.total.toLocaleString()}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-sm text-muted-foreground italic">No specific revenue activities for this month.</p>
                                    )}
                                </div>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
                <div className="mt-8 text-right font-bold text-xl text-primary font-headline bg-primary/10 p-4 rounded-lg">
                    Total Estimated Annual Revenue: Ksh {totalRevenue.toLocaleString()}
                </div>
            </CardContent>
        </Card>
    );
}
