import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Swachh Nagpur</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Nagpur Municipal Corporation is committed to providing clean and 
              sustainable waste management services to all citizens of Nagpur.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/zones" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Zone Schedule
                </Link>
              </li>
              <li>
                <Link to="/complaint" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Register Complaint
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Events & Campaigns
                </Link>
              </li>
              <li>
                <Link to="/employees" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Appreciate Workers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-primary-foreground/80">Garbage Collection</li>
              <li className="text-primary-foreground/80">Waste Segregation</li>
              <li className="text-primary-foreground/80">Recycling Programs</li>
              <li className="text-primary-foreground/80">Bulk Waste Pickup</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  NMC Headquarters, Civil Lines, Nagpur - 440001, Maharashtra
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">support@nmc.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Nagpur Municipal Corporation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
