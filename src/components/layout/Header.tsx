import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Info, Wrench, FileText, Phone, Search, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import nmcLogo from "@/assets/nmc-logo.png";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/about", label: "About", icon: Info },
  { path: "/zones", label: "My Service", icon: Wrench },
  { path: "/complaint", label: "Complaint", icon: FileText },
  { path: "/contact", label: "Contact Us", icon: Phone },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, role, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const displayName = profile 
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email 
    : user?.email;

  return (
    <header className="bg-card shadow-nmc-sm">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={nmcLogo} 
              alt="NMC Logo" 
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-primary font-display">
                Mission Clean Nagpur
              </h1>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent font-medium">स्वच्छता सेवा</span>
                {" | "}Swachhata Sewa
              </p>
            </div>
          </Link>

          {/* Search & Auth - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="nmc-input w-64 pr-10"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
            
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="gap-2 border-primary text-primary">
                        <User className="w-4 h-4" />
                        <span className="max-w-24 truncate">{displayName}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">{displayName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{role || 'citizen'}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate("/my-complaints")}>
                        My Complaints
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/my-events")}>
                        My Events
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/auth">
                    <Button className="nmc-btn-primary gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nmc-nav mx-4 mb-4">
        <div className="container mx-auto px-4">
          <ul className="hidden md:flex items-center justify-center gap-2 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "bg-white/20 font-medium" 
                        : "hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="nmc-input pr-10"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-primary text-primary-foreground">
                <Search className="w-4 h-4" />
              </button>
            </div>
            
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-secondary"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex gap-3 mt-4 pt-4 border-t border-border">
              {!loading && (
                <>
                  {user ? (
                    <Button 
                      variant="outline" 
                      className="flex-1 border-destructive text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <Link to="/auth" className="flex-1">
                      <Button className="w-full nmc-btn-primary">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
