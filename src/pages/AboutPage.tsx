import { CheckCircle, Target, Users, Leaf } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Swachh Nagpur
          </h1>
          <p className="text-lg text-muted-foreground">
            Nagpur Municipal Corporation's initiative for a cleaner, greener, and healthier city
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="nmc-card p-8 border-t-4 border-t-primary">
            <div className="nmc-icon-box-primary mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide efficient, transparent, and citizen-centric waste management 
              services that ensure a clean and healthy environment for all residents 
              of Nagpur.
            </p>
          </div>

          <div className="nmc-card p-8 border-t-4 border-t-accent">
            <div className="nmc-icon-box-accent mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground">
              To transform Nagpur into India's cleanest metropolitan city through 
              sustainable waste management practices and active citizen participation.
            </p>
          </div>
        </div>

        {/* Key Initiatives */}
        <div className="nmc-card p-8 mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            Key Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "100% door-to-door garbage collection",
              "Segregated waste collection system",
              "Scientific waste processing plants",
              "Zero-waste community programs",
              "Digital complaint management",
              "Worker welfare programs",
              "Citizen awareness campaigns",
              "Green belt development",
            ].map((initiative, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{initiative}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: "10", label: "Zones" },
            { value: "2.5M+", label: "Citizens Served" },
            { value: "500+", label: "Collection Vehicles" },
            { value: "5000+", label: "Sanitation Workers" },
          ].map((stat, index) => (
            <div key={index} className="nmc-card p-6 text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center">
          <div className="nmc-icon-box-accent mx-auto mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Our Dedicated Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Behind every clean street in Nagpur is a dedicated team of over 5,000 
            sanitation workers, supervisors, and administrators working tirelessly 
            to keep our city clean. We salute their commitment and service.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
