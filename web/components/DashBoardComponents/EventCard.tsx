import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface Event {
  id: string;
  title: string;
  date: Date;
}

interface EventProps {
  scheduledEvents: Event[];
}

const EventCard: React.FC<EventProps> = ({ scheduledEvents }) => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Scheduled Events
        </CardTitle>
        <Calendar className="text-muted-foreground" size={20} />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-32">
          {scheduledEvents.map((event) => (
            <div key={event.id} className="mb-3 pb-3 border-b last:border-b-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.date.toString()} </p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventCard;
