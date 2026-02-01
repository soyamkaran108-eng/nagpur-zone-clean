import { Zap, Shield, Users, FileText, Calendar, MapPin, Award, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";

const services = [
  {
    title: "Write a Complaint",
    description: "Report issues like garbage overflow, public toilet problems, or drainage issues in your locality.",
    icon: FileText,
    color: "border-t-primary",
    path: "/complaint",
  },
  {
    title: "Arrange A Event",
    description: "Join or organize cleanliness drives, tree plantation events, and awareness programs.",
    icon: Calendar,
    color: "border-t-accent",
    path: "/events",
  },
  {
    title: "Check The Timing",
    description: "Check garbage collection schedules for all 10 zones of Nagpur city.",
    icon: MapPin,
    color: "border-t-primary",
    path: "/zones",
  },
  {
    title: "Encourage a Worker",
    description: "Appreciate and rate our dedicated sanitation workers for their service.",
    icon: Award,
    color: "border-t-accent",
    path: "/employees",
  },
];

const Index = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="text-center py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-relaxed">
            Dear Citizen, together we strive for a cleaner today and a greener tomorrow — 
            <span className="text-primary"> turning waste into a resource</span> for a better future.
          </h1>
          
          {!user && (
            <Link to="/auth" className="nmc-btn-primary inline-flex items-center gap-2">
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
        {[
          { icon: Zap, label: "Fast Response", value: "24-48 hour resolution" },
          { icon: Shield, label: "Secure", value: "Your data is protected" },
          { icon: Users, label: "Community", value: "Join 50,000+ citizens" },
        ].map((stat, index) => {
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

      {/* Services Section */}
      <section className="py-8">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
          Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                to={service.path}
                className={`nmc-service-card border-t-4 ${service.color} animate-slide-up`}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="p-6">
                  <div className="nmc-icon-box-accent mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="nmc-card p-8 my-8 animate-fade-in">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">About Us</h2>
        <p className="text-muted-foreground leading-relaxed">
          At Mission Clean Nagpur, we believe technology can transform the way waste is managed in our communities. 
          Our platform is designed to make waste collection smarter, faster, and more transparent. We empower citizens 
          to schedule pickups with ease, track trends with real-time insights. Through smart scheduling, issue reporting, 
          and data analytics, we bridge the gap between people and municipal systems — creating cleaner neighborhoods 
          and promoting sustainable living.
        </p>
        <p className="text-primary font-medium mt-4 italic">
          "Empowering communities with reliable, accessible, and innovative solutions for a cleaner tomorrow."
        </p>
      </section>
    </MainLayout>
  );
};

export default Index;
