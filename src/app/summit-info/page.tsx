import { speakers, agenda, timelineEvents } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pin, Calendar, Clock } from 'lucide-react';

export default function SummitInfoPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Summit Information Hub</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          All you need to know about the TaxForward Summit. Explore the agenda, get to know our speakers, and see our journey.
        </p>
      </div>
      
      <section id="agenda" className="mt-16">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">Agenda</h2>
        <Tabs defaultValue="day1" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="day1">Day 1</TabsTrigger>
            <TabsTrigger value="day2">Day 2</TabsTrigger>
          </TabsList>
          <TabsContent value="day1">
            <AgendaList day={agenda.day1} />
          </TabsContent>
          <TabsContent value="day2">
            <AgendaList day={agenda.day2} />
          </TabsContent>
        </Tabs>
      </section>

      <section id="speakers" className="mt-20">
        <h2 className="text-3xl font-bold text-center font-headline mb-8">Our Speakers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {speakers.map((speaker) => (
            <Card key={speaker.name} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Avatar className="h-24 w-24 mx-auto border-4 border-accent">
                  <AvatarImage src={speaker.imageUrl} alt={speaker.name} data-ai-hint="professional portrait" />
                  <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{speaker.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-accent font-semibold">{speaker.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{speaker.organization}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section id="timeline" className="mt-20">
        <h2 className="text-3xl font-bold text-center font-headline mb-12">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2"></div>
          {timelineEvents.map((event, index) => (
            <div key={event.year} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <p className="text-accent font-bold text-lg">{event.year}</p>
                <h3 className="text-xl font-bold text-primary mt-1">{event.title}</h3>
                <p className="text-muted-foreground mt-2">{event.description}</p>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <div className="bg-primary rounded-full h-6 w-6 flex items-center justify-center">
                  <Calendar className="h-3 w-3 text-primary-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AgendaList({ day }: { day: { time: string; title: string; speaker: string }[] }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flow-root">
          <ul className="-mb-8">
            {day.map((item, itemIdx) => (
              <li key={item.time}>
                <div className="relative pb-8">
                  {itemIdx !== day.length - 1 ? (
                    <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3 items-center">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ring-8 ring-background">
                        <Clock className="h-4 w-4 text-primary-foreground" />
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-md font-medium">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{item.speaker}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
