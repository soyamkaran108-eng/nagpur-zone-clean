import { Mail, Phone, Calendar, Minus, Plus } from "lucide-react";

const TopBar = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="nmc-topbar py-2 px-4">
      <div className="container mx-auto flex items-center justify-between text-sm">
        <div className="flex items-center gap-6">
          <a 
            href="mailto:support@nmc.gov.in" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">support@nmc.gov.in</span>
          </a>
          <a 
            href="tel:1800-XXX-XXXX" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            <span>1800-XXX-XXXX (Toll Free)</span>
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{today}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button 
              className="w-6 h-6 rounded flex items-center justify-center bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
              aria-label="Decrease font size"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-medium w-4 text-center">A</span>
            <button 
              className="w-6 h-6 rounded flex items-center justify-center bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
              aria-label="Increase font size"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
