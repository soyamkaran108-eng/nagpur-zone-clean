import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We're here to help. Reach out to us through 
            any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <div className="nmc-card p-6">
              <div className="nmc-icon-box-primary mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm mb-1">Toll Free: 1800-XXX-XXXX</p>
              <p className="text-muted-foreground text-sm">Office: 0712-XXXXXXX</p>
            </div>

            <div className="nmc-card p-6">
              <div className="nmc-icon-box-accent mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm mb-1">support@nmc.gov.in</p>
              <p className="text-muted-foreground text-sm">complaints@nmc.gov.in</p>
            </div>

            <div className="nmc-card p-6">
              <div className="nmc-icon-box-primary mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground text-sm">
                NMC Headquarters<br />
                Civil Lines, Nagpur - 440001<br />
                Maharashtra, India
              </p>
            </div>

            <div className="nmc-card p-6">
              <div className="nmc-icon-box-accent mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
              <p className="text-muted-foreground text-sm mb-1">Mon - Fri: 10:00 AM - 5:00 PM</p>
              <p className="text-muted-foreground text-sm">Sat: 10:00 AM - 2:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="nmc-card p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="nmc-input"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="nmc-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="nmc-input"
                    placeholder="What is this regarding?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="nmc-input resize-none"
                    placeholder="Type your message here..."
                  />
                </div>

                <Button type="submit" className="nmc-btn-primary gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
