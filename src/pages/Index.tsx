import { Zap, Shield, Users, FileText, Calendar, MapPin, Award } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const services = [
  {
    title: "Register Complaint",
    description: "Report issues like garbage overflow, public toilet problems, or drainage issues in your locality.",
    icon: FileText,
    color: "border-t-nmc-green",
    path: "/complaint",
  },
  {
    title: "Events & Campaigns",
    description: "Join or organize cleanliness drives, tree plantation events, and awareness programs.",
    icon: Calendar,
    color: "border-t-nmc-orange",
    path: "/events",
  },
  {
    title: "Zone Schedule",
    description: "Check garbage collection schedules for all 10 zones of Nagpur city.",
    icon: MapPin,
    color: "border-t-zone-2",
    path: "/zones",
  },
];

const stats = [
  { icon: Zap, label: "Fast Response", value: "24-48 hour resolution time" },
  { icon: Shield, label: "Secure", value: "Your data is protected" },
  { icon: Users, label: "Community", value: "Join 50,000+ citizens" },
];

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="text-center py-8 animate-fade-in">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
          <Zap className="w-4 h-4" />
          Quick & Easy Services
        </span>
        
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-4">
          How Can We Help You?
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive range of services designed to keep your 
          community clean and healthy.
        </p>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index} 
              className="nmc-card p-6 flex items-center gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="nmc-icon-box-primary">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Service Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link
              key={index}
              to={service.path}
              className={`nmc-service-card ${service.color} animate-slide-up`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="p-6">
                <div className="nmc-icon-box-accent mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Employee Appreciation CTA */}
      <section className="nmc-card p-8 text-center my-8 animate-fade-in">
        <div className="nmc-icon-box-accent mx-auto mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Appreciate Our Workers
        </h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Our dedicated sanitation workers keep our city clean every day. 
          Show your appreciation for their hard work!
        </p>
        <Link 
          to="/employees" 
          className="nmc-btn-primary inline-flex items-center gap-2"
        >
          <Award className="w-4 h-4" />
          View Our Heroes
        </Link>
      </section>
    </MainLayout>
  );
};

export default Index;
