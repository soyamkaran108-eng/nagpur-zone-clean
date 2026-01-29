import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  zone: string;
  participants: number;
  type: "drive" | "plantation" | "awareness" | "workshop";
}

const events: Event[] = [
  {
    id: 1,
    title: "Mega Cleanliness Drive",
    description: "Join us for a city-wide cleanliness drive covering major public areas and markets.",
    date: "2026-02-05",
    time: "7:00 AM - 11:00 AM",
    location: "Sitabuldi Market",
    zone: "Dhantoli Zone",
    participants: 250,
    type: "drive",
  },
  {
    id: 2,
    title: "Tree Plantation Campaign",
    description: "Be part of our green initiative. Plant trees and contribute to a greener Nagpur.",
    date: "2026-02-10",
    time: "6:30 AM - 10:00 AM",
    location: "Futala Lake",
    zone: "Dharampeth Zone",
    participants: 180,
    type: "plantation",
  },
  {
    id: 3,
    title: "Waste Segregation Workshop",
    description: "Learn the importance of waste segregation and how to properly sort your household waste.",
    date: "2026-02-15",
    time: "10:00 AM - 1:00 PM",
    location: "NMC Community Hall",
    zone: "Civil Lines",
    participants: 100,
    type: "workshop",
  },
  {
    id: 4,
    title: "School Awareness Program",
    description: "Interactive session for students about cleanliness, hygiene, and environmental conservation.",
    date: "2026-02-20",
    time: "9:00 AM - 12:00 PM",
    location: "Government High School",
    zone: "Hanuman Nagar Zone",
    participants: 500,
    type: "awareness",
  },
  {
    id: 5,
    title: "Community Clean-up Day",
    description: "Monthly community clean-up event. Bring your family and neighbors for a cleaner locality.",
    date: "2026-02-25",
    time: "6:00 AM - 9:00 AM",
    location: "Multiple Locations",
    zone: "All Zones",
    participants: 1000,
    type: "drive",
  },
];

const getTypeStyles = (type: Event["type"]) => {
  switch (type) {
    case "drive":
      return { bg: "bg-primary/10", text: "text-primary", label: "Cleanliness Drive" };
    case "plantation":
      return { bg: "bg-green-100", text: "text-green-700", label: "Tree Plantation" };
    case "awareness":
      return { bg: "bg-accent/10", text: "text-accent", label: "Awareness" };
    case "workshop":
      return { bg: "bg-blue-100", text: "text-blue-700", label: "Workshop" };
  }
};

const EventsPage = () => {
  const upcomingEvents = events.filter(
    (e) => new Date(e.date) >= new Date()
  );

  return (
    <MainLayout showSidebar>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="nmc-icon-box-accent">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Events & Campaigns
            </h1>
            <p className="text-muted-foreground">
              Join our community initiatives for a cleaner Nagpur
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="nmc-stat-card">
            <div className="nmc-icon-box-primary">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{upcomingEvents.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
            </div>
          </div>
          <div className="nmc-stat-card">
            <div className="nmc-icon-box-accent">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {events.reduce((sum, e) => sum + e.participants, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Participants</p>
            </div>
          </div>
          <div className="nmc-stat-card">
            <div className="nmc-icon-box-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">10</p>
              <p className="text-sm text-muted-foreground">Zones Covered</p>
            </div>
          </div>
          <div className="nmc-stat-card">
            <div className="nmc-icon-box-accent">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">Weekly</p>
              <p className="text-sm text-muted-foreground">Activities</p>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event, index) => {
            const typeStyles = getTypeStyles(event.type);
            const eventDate = new Date(event.date);
            const isPast = eventDate < new Date();

            return (
              <div
                key={event.id}
                className={`nmc-card p-6 animate-slide-up ${isPast ? "opacity-60" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Date Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-primary rounded-xl flex flex-col items-center justify-center text-primary-foreground">
                      <span className="text-2xl font-bold">
                        {eventDate.getDate()}
                      </span>
                      <span className="text-xs uppercase">
                        {eventDate.toLocaleDateString("en-US", { month: "short" })}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${typeStyles.bg} ${typeStyles.text} mb-2`}>
                          {typeStyles.label}
                        </span>
                        <h3 className="font-display text-xl font-bold text-foreground">
                          {event.title}
                        </h3>
                      </div>
                      {!isPast && (
                        <Button className="nmc-btn-primary hidden md:flex gap-2">
                          Register
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <p className="text-muted-foreground mt-2 mb-4">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.participants} participants</span>
                      </div>
                    </div>

                    {!isPast && (
                      <Button className="nmc-btn-primary mt-4 md:hidden gap-2">
                        Register
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 bg-secondary rounded-xl text-center">
          <h3 className="font-display text-xl font-bold text-foreground mb-2">
            Want to Organize an Event?
          </h3>
          <p className="text-muted-foreground mb-4">
            Partner with NMC to organize cleanliness drives in your locality
          </p>
          <Link to="/contact">
            <Button className="nmc-btn-accent gap-2">
              Contact Us
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
