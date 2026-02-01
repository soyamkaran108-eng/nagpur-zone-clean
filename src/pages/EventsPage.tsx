import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ChevronRight, 
  Plus,
  X,
  Upload,
  CheckCircle
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const eventSchema = z.object({
  name: z.string().min(3, "Event name is required"),
  organizer: z.string().min(2, "Organizer name is required"),
  venue: z.string().min(5, "Venue is required"),
  date: z.string().min(1, "Date is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

interface Event {
  id: string;
  name: string;
  organizer: string;
  description: string | null;
  date: string;
  venue: string;
  category: string | null;
  poster_url: string | null;
  is_approved: boolean;
  created_by: string;
}

interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  status: string;
}

const categories = [
  "Cleanliness Drive",
  "Tree Plantation",
  "Awareness Campaign",
  "Workshop",
  "Community Event",
];

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeringEventId, setRegisteringEventId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      organizer: "",
      venue: "",
      date: "",
      category: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchRegistrations();
    }
  }, [user]);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    
    if (data) {
      setEvents(data);
    }
  };

  const fetchRegistrations = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('event_registrations')
      .select('*')
      .eq('user_id', user.id);
    
    if (data) {
      setRegistrations(data);
    }
  };

  const handleCreateEvent = async (data: EventFormData) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to create an event.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('events')
      .insert({
        created_by: user.id,
        name: data.name,
        organizer: data.organizer,
        venue: data.venue,
        date: data.date,
        category: data.category,
        description: data.description,
        is_approved: false,
      });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Failed to Create Event",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Event Created!",
      description: "Your event has been submitted for approval.",
    });
    setIsDialogOpen(false);
    form.reset();
    fetchEvents();
  };

  const handleRegister = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to register for events.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setRegisteringEventId(eventId);

    const { error } = await supabase
      .from('event_registrations')
      .insert({
        user_id: user.id,
        event_id: eventId,
        status: 'registered',
      });

    setRegisteringEventId(null);

    if (error) {
      if (error.message.includes('duplicate')) {
        toast({
          title: "Already Registered",
          description: "You have already registered for this event.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
      }
      return;
    }

    toast({
      title: "Registration Successful!",
      description: "You have been registered for the event.",
    });
    fetchRegistrations();
  };

  const handleUnregister = async (eventId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('event_registrations')
      .delete()
      .eq('user_id', user.id)
      .eq('event_id', eventId);

    if (error) {
      toast({
        title: "Failed to Cancel",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Registration Cancelled",
      description: "Your registration has been cancelled.",
    });
    fetchRegistrations();
  };

  const isRegistered = (eventId: string) => {
    return registrations.some(r => r.event_id === eventId);
  };

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());

  return (
    <MainLayout showSidebar>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="nmc-icon-box-accent">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Event Section
              </h1>
              <p className="text-muted-foreground">
                Join or organize community events
              </p>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="nmc-btn-primary gap-2">
                <Plus className="w-4 h-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">
                  Event Registration Form
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={form.handleSubmit(handleCreateEvent)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Event Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter event name"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizer">Organizer</Label>
                  <Input
                    id="organizer"
                    placeholder="Organizer name"
                    {...form.register("organizer")}
                  />
                  {form.formState.errors.organizer && (
                    <p className="text-sm text-destructive">{form.formState.errors.organizer.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="date">Choose Date</Label>
                    <Input
                      id="date"
                      type="date"
                      {...form.register("date")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => form.setValue("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    placeholder="Enter a Event venue"
                    {...form.register("venue")}
                  />
                  {form.formState.errors.venue && (
                    <p className="text-sm text-destructive">{form.formState.errors.venue.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Write a short description..."
                    rows={3}
                    {...form.register("description")}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Poster</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Choose File</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 nmc-btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
              <p className="text-2xl font-bold text-accent">{registrations.length}</p>
              <p className="text-sm text-muted-foreground">My Registrations</p>
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
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-foreground">
              All Events
            </h2>
            <Button variant="link" className="text-primary">
              See All Events
            </Button>
          </div>

          {events.length === 0 ? (
            <div className="nmc-card p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No Events Yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to create a community event!
              </p>
              <Button onClick={() => setIsDialogOpen(true)} className="nmc-btn-primary">
                Create Event
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {events.map((event, index) => {
                const eventDate = new Date(event.date);
                const isPast = eventDate < new Date();
                const registered = isRegistered(event.id);

                return (
                  <div
                    key={event.id}
                    className={`nmc-card p-6 animate-slide-up ${isPast ? "opacity-60" : ""}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex gap-4">
                      {/* Date Badge */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-primary rounded-xl flex flex-col items-center justify-center text-primary-foreground">
                          <span className="text-xl font-bold">
                            {eventDate.getDate()}
                          </span>
                          <span className="text-xs uppercase">
                            {eventDate.toLocaleDateString("en-US", { month: "short" })}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {event.category && (
                          <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent mb-1">
                            {event.category}
                          </span>
                        )}
                        <h3 className="font-display text-lg font-bold text-foreground truncate">
                          {event.name}
                        </h3>
                        
                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <p><span className="font-medium">Organizer:</span> {event.organizer}</p>
                          <p className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.venue}
                          </p>
                        </div>

                        {!isPast && (
                          <div className="mt-3">
                            {registered ? (
                              <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-sm text-primary">
                                  <CheckCircle className="w-4 h-4" />
                                  Registered
                                </span>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUnregister(event.id)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                size="sm" 
                                className="nmc-btn-primary gap-1"
                                onClick={() => handleRegister(event.id)}
                                disabled={registeringEventId === event.id}
                              >
                                {registeringEventId === event.id ? "Registering..." : "Register"}
                                <ChevronRight className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
