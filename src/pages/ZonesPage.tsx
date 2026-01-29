import { useState } from "react";
import { MapPin, Clock, Calendar, ChevronDown, CheckCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

interface Zone {
  id: number;
  name: string;
  areas: string[];
  schedule: {
    day: string;
    time: string;
    type: "wet" | "dry" | "both";
  }[];
  color: string;
}

const zones: Zone[] = [
  {
    id: 1,
    name: "Dharampeth Zone",
    areas: ["Dharampeth", "Seminary Hills", "Law College Square", "Bajaj Nagar"],
    schedule: [
      { day: "Monday", time: "6:00 AM - 9:00 AM", type: "wet" },
      { day: "Tuesday", time: "6:00 AM - 9:00 AM", type: "dry" },
      { day: "Wednesday", time: "6:00 AM - 9:00 AM", type: "wet" },
      { day: "Thursday", time: "6:00 AM - 9:00 AM", type: "dry" },
      { day: "Friday", time: "6:00 AM - 9:00 AM", type: "both" },
      { day: "Saturday", time: "6:00 AM - 9:00 AM", type: "wet" },
    ],
    color: "bg-zone-1",
  },
  {
    id: 2,
    name: "Hanuman Nagar Zone",
    areas: ["Hanuman Nagar", "Pratap Nagar", "Manewada", "Trimurti Nagar"],
    schedule: [
      { day: "Monday", time: "7:00 AM - 10:00 AM", type: "wet" },
      { day: "Tuesday", time: "7:00 AM - 10:00 AM", type: "dry" },
      { day: "Wednesday", time: "7:00 AM - 10:00 AM", type: "wet" },
      { day: "Thursday", time: "7:00 AM - 10:00 AM", type: "dry" },
      { day: "Friday", time: "7:00 AM - 10:00 AM", type: "both" },
      { day: "Saturday", time: "7:00 AM - 10:00 AM", type: "wet" },
    ],
    color: "bg-zone-2",
  },
  {
    id: 3,
    name: "Dhantoli Zone",
    areas: ["Dhantoli", "Ramdaspeth", "Civil Lines", "Sadar"],
    schedule: [
      { day: "Monday", time: "6:30 AM - 9:30 AM", type: "wet" },
      { day: "Tuesday", time: "6:30 AM - 9:30 AM", type: "dry" },
      { day: "Wednesday", time: "6:30 AM - 9:30 AM", type: "wet" },
      { day: "Thursday", time: "6:30 AM - 9:30 AM", type: "dry" },
      { day: "Friday", time: "6:30 AM - 9:30 AM", type: "both" },
      { day: "Saturday", time: "6:30 AM - 9:30 AM", type: "wet" },
    ],
    color: "bg-zone-3",
  },
  {
    id: 4,
    name: "Nehru Nagar Zone",
    areas: ["Nehru Nagar", "Gayatri Nagar", "Rahate Colony", "Wardhaman Nagar"],
    schedule: [
      { day: "Monday", time: "7:30 AM - 10:30 AM", type: "wet" },
      { day: "Tuesday", time: "7:30 AM - 10:30 AM", type: "dry" },
      { day: "Wednesday", time: "7:30 AM - 10:30 AM", type: "wet" },
      { day: "Thursday", time: "7:30 AM - 10:30 AM", type: "dry" },
      { day: "Friday", time: "7:30 AM - 10:30 AM", type: "both" },
      { day: "Saturday", time: "7:30 AM - 10:30 AM", type: "wet" },
    ],
    color: "bg-zone-4",
  },
  {
    id: 5,
    name: "Sataranjipura Zone",
    areas: ["Sataranjipura", "Mominpura", "Gandhibagh", "Itwari"],
    schedule: [
      { day: "Monday", time: "6:00 AM - 9:00 AM", type: "wet" },
      { day: "Tuesday", time: "6:00 AM - 9:00 AM", type: "dry" },
      { day: "Wednesday", time: "6:00 AM - 9:00 AM", type: "wet" },
      { day: "Thursday", time: "6:00 AM - 9:00 AM", type: "dry" },
      { day: "Friday", time: "6:00 AM - 9:00 AM", type: "both" },
      { day: "Saturday", time: "6:00 AM - 9:00 AM", type: "wet" },
    ],
    color: "bg-zone-5",
  },
  {
    id: 6,
    name: "Lakadganj Zone",
    areas: ["Lakadganj", "Pardi", "Satranjipura", "Tajbagh"],
    schedule: [
      { day: "Monday", time: "6:30 AM - 9:30 AM", type: "wet" },
      { day: "Tuesday", time: "6:30 AM - 9:30 AM", type: "dry" },
      { day: "Wednesday", time: "6:30 AM - 9:30 AM", type: "wet" },
      { day: "Thursday", time: "6:30 AM - 9:30 AM", type: "dry" },
      { day: "Friday", time: "6:30 AM - 9:30 AM", type: "both" },
      { day: "Saturday", time: "6:30 AM - 9:30 AM", type: "wet" },
    ],
    color: "bg-zone-6",
  },
  {
    id: 7,
    name: "Ashi Nagar Zone",
    areas: ["Ashi Nagar", "Jaripatka", "Indora", "Kalamna"],
    schedule: [
      { day: "Monday", time: "7:00 AM - 10:00 AM", type: "wet" },
      { day: "Tuesday", time: "7:00 AM - 10:00 AM", type: "dry" },
      { day: "Wednesday", time: "7:00 AM - 10:00 AM", type: "wet" },
      { day: "Thursday", time: "7:00 AM - 10:00 AM", type: "dry" },
      { day: "Friday", time: "7:00 AM - 10:00 AM", type: "both" },
      { day: "Saturday", time: "7:00 AM - 10:00 AM", type: "wet" },
    ],
    color: "bg-zone-7",
  },
  {
    id: 8,
    name: "Mangalwari Zone",
    areas: ["Mangalwari", "Mahal", "Punapur", "Sitabuldi"],
    schedule: [
      { day: "Monday", time: "6:00 AM - 9:00 AM", type: "wet" },
      { day: "Tuesday", time: "6:00 AM - 9:00 AM", type: "dry" },
      { day: "Wednesday", time: "6:00 AM - 9:00 AM", type: "wet" },
      { day: "Thursday", time: "6:00 AM - 9:00 AM", type: "dry" },
      { day: "Friday", time: "6:00 AM - 9:00 AM", type: "both" },
      { day: "Saturday", time: "6:00 AM - 9:00 AM", type: "wet" },
    ],
    color: "bg-zone-8",
  },
  {
    id: 9,
    name: "Gandhibagh Zone",
    areas: ["Gandhibagh", "Cotton Market", "Maskasath", "Khamla"],
    schedule: [
      { day: "Monday", time: "7:30 AM - 10:30 AM", type: "wet" },
      { day: "Tuesday", time: "7:30 AM - 10:30 AM", type: "dry" },
      { day: "Wednesday", time: "7:30 AM - 10:30 AM", type: "wet" },
      { day: "Thursday", time: "7:30 AM - 10:30 AM", type: "dry" },
      { day: "Friday", time: "7:30 AM - 10:30 AM", type: "both" },
      { day: "Saturday", time: "7:30 AM - 10:30 AM", type: "wet" },
    ],
    color: "bg-zone-9",
  },
  {
    id: 10,
    name: "Laxmi Nagar Zone",
    areas: ["Laxmi Nagar", "Mankapur", "Friends Colony", "Narendra Nagar"],
    schedule: [
      { day: "Monday", time: "6:30 AM - 9:30 AM", type: "wet" },
      { day: "Tuesday", time: "6:30 AM - 9:30 AM", type: "dry" },
      { day: "Wednesday", time: "6:30 AM - 9:30 AM", type: "wet" },
      { day: "Thursday", time: "6:30 AM - 9:30 AM", type: "dry" },
      { day: "Friday", time: "6:30 AM - 9:30 AM", type: "both" },
      { day: "Saturday", time: "6:30 AM - 9:30 AM", type: "wet" },
    ],
    color: "bg-zone-10",
  },
];

const ZonesPage = () => {
  const [expandedZone, setExpandedZone] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("all");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getTypeLabel = (type: "wet" | "dry" | "both") => {
    switch (type) {
      case "wet":
        return { label: "Wet Waste", className: "bg-primary/10 text-primary" };
      case "dry":
        return { label: "Dry Waste", className: "bg-accent/10 text-accent" };
      case "both":
        return { label: "All Waste", className: "bg-secondary text-secondary-foreground" };
    }
  };

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <MainLayout showSidebar>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="nmc-icon-box-primary">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Zone Collection Schedule
            </h1>
            <p className="text-muted-foreground">
              Garbage collection schedules for all 10 zones of Nagpur
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="nmc-stat-card">
            <div className="nmc-icon-box-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">10</p>
              <p className="text-sm text-muted-foreground">Total Zones</p>
            </div>
          </div>
          <div className="nmc-stat-card">
            <div className="nmc-icon-box-accent">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">6 AM</p>
              <p className="text-sm text-muted-foreground">First Collection</p>
            </div>
          </div>
          <div className="nmc-stat-card">
            <div className="nmc-icon-box-primary">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">6</p>
              <p className="text-sm text-muted-foreground">Days/Week</p>
            </div>
          </div>
          <div className="nmc-stat-card">
            <div className="nmc-icon-box-accent">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">100%</p>
              <p className="text-sm text-muted-foreground">Coverage</p>
            </div>
          </div>
        </div>

        {/* Day Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDay("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedDay === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              All Days
            </button>
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDay === day
                    ? "bg-primary text-primary-foreground"
                    : day === todayName
                    ? "bg-accent/10 text-accent border border-accent hover:bg-accent/20"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {day}
                {day === todayName && " (Today)"}
              </button>
            ))}
          </div>
        </div>

        {/* Zone Cards */}
        <div className="space-y-4">
          {zones.map((zone) => {
            const isExpanded = expandedZone === zone.id;
            const filteredSchedule =
              selectedDay === "all"
                ? zone.schedule
                : zone.schedule.filter((s) => s.day === selectedDay);

            return (
              <div
                key={zone.id}
                className="nmc-card overflow-hidden animate-slide-up"
              >
                {/* Zone Header */}
                <button
                  onClick={() => setExpandedZone(isExpanded ? null : zone.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-secondary/30 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl ${zone.color} flex items-center justify-center text-white font-bold`}>
                    {zone.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{zone.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {zone.areas.slice(0, 3).join(", ")}
                      {zone.areas.length > 3 && ` +${zone.areas.length - 3} more`}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-border animate-fade-in">
                    {/* Areas */}
                    <div className="p-4 bg-secondary/30">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Areas Covered:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {zone.areas.map((area) => (
                          <span
                            key={area}
                            className="px-3 py-1 bg-card rounded-full text-sm text-foreground"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="divide-y divide-border">
                      {filteredSchedule.map((schedule) => {
                        const typeInfo = getTypeLabel(schedule.type);
                        return (
                          <div
                            key={schedule.day}
                            className={`nmc-schedule-row ${
                              schedule.day === todayName ? "bg-primary/5" : ""
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium text-foreground">
                                {schedule.day}
                                {schedule.day === todayName && (
                                  <span className="ml-2 text-xs text-primary">(Today)</span>
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">{schedule.time}</span>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${typeInfo.className}`}
                              >
                                {typeInfo.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 p-4 bg-secondary rounded-xl">
          <h4 className="font-semibold text-foreground mb-3">Waste Collection Legend</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              <span className="text-sm text-muted-foreground">Wet Waste (Kitchen waste, food scraps)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent"></span>
              <span className="text-sm text-muted-foreground">Dry Waste (Paper, plastic, metal)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary-foreground"></span>
              <span className="text-sm text-muted-foreground">All Waste (Both types)</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ZonesPage;
