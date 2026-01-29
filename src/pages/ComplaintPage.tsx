import { useState } from "react";
import { FileText, MapPin, Camera, Send, CheckCircle, AlertCircle } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const complaintTypes = [
  "Garbage Overflow",
  "Missed Collection",
  "Improper Dumping",
  "Public Toilet Issue",
  "Drainage Problem",
  "Street Sweeping",
  "Other",
];

const zones = [
  "Dharampeth Zone",
  "Hanuman Nagar Zone",
  "Dhantoli Zone",
  "Nehru Nagar Zone",
  "Sataranjipura Zone",
  "Lakadganj Zone",
  "Ashi Nagar Zone",
  "Mangalwari Zone",
  "Gandhibagh Zone",
  "Laxmi Nagar Zone",
];

const ComplaintPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    zone: "",
    address: "",
    complaintType: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <MainLayout showSidebar>
        <div className="max-w-2xl mx-auto text-center py-12 animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Complaint Registered Successfully!
          </h2>
          <p className="text-muted-foreground mb-2">
            Your complaint reference number is:
          </p>
          <p className="text-2xl font-bold text-accent mb-6">
            NMC-{Date.now().toString().slice(-8)}
          </p>
          <p className="text-muted-foreground mb-8">
            Our team will address your complaint within 24-48 hours. 
            You will receive updates via SMS and email.
          </p>
          <Button 
            onClick={() => setSubmitted(false)} 
            className="nmc-btn-primary"
          >
            Register Another Complaint
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showSidebar>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="nmc-icon-box-primary">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Register Complaint
            </h1>
            <p className="text-muted-foreground">
              Report issues related to garbage collection and sanitation
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-xl mb-8 border border-accent/20">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">Quick Resolution Guaranteed</p>
            <p className="text-sm text-muted-foreground">
              All complaints are addressed within 24-48 hours. You will receive updates via SMS.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="nmc-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="nmc-input"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="nmc-input"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="nmc-input"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
          </div>

          <div className="nmc-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select Zone *
                </label>
                <select
                  required
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  className="nmc-input"
                >
                  <option value="">Select your zone</option>
                  {zones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Complaint Type *
                </label>
                <select
                  required
                  value={formData.complaintType}
                  onChange={(e) => setFormData({ ...formData, complaintType: e.target.value })}
                  className="nmc-input"
                >
                  <option value="">Select complaint type</option>
                  {complaintTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="nmc-input"
                  placeholder="Enter your complete address with landmark"
                />
              </div>
            </div>
          </div>

          <div className="nmc-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Complaint Details</h3>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="nmc-input resize-none"
                placeholder="Describe your complaint in detail..."
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Attach Photo (Optional)
              </label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="nmc-btn-primary gap-2">
              <Send className="w-4 h-4" />
              Submit Complaint
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ComplaintPage;
