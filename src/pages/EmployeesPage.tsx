import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Award, 
  Star, 
  MapPin, 
  User,
  Send,
  Search,
  Building
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
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Employee {
  id: string;
  employee_id: string;
  name: string;
  job: string;
  age: number | null;
  zone: string;
  main_area: string | null;
  photo_url: string | null;
  rating: number;
  total_ratings: number;
}

interface EncouragementForm {
  username: string;
  address: string;
  rating: number;
  description: string;
}

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [formData, setFormData] = useState<EncouragementForm>({
    username: "",
    address: "",
    rating: 5,
    description: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        username: `${profile.first_name || ''} ${profile.last_name || ''}`.trim(),
        address: profile.address || "",
      }));
    }
  }, [profile]);

  const fetchEmployees = async () => {
    const { data } = await supabase
      .from('employees')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });
    
    if (data) {
      setEmployees(data);
    }
  };

  const zones = [...new Set(employees.map((e) => e.zone))];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.job.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === "all" || emp.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const totalAppreciations = employees.reduce((sum, emp) => sum + emp.total_ratings, 0);
  const avgRating = employees.length > 0 
    ? (employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1)
    : "0.0";

  const handleOpenEncouragement = (employee: Employee) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to encourage employees.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedEmployee) return;

    if (formData.rating < 1 || formData.rating > 5) {
      toast({
        title: "Invalid Rating",
        description: "Please select a rating between 1 and 5 stars.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from('employee_encouragements')
      .insert({
        user_id: user.id,
        employee_id: selectedEmployee.id,
        username: formData.username,
        address: formData.address,
        rating: formData.rating,
        description: formData.description,
      });

    setIsSubmitting(false);

    if (error) {
      if (error.message.includes('duplicate')) {
        toast({
          title: "Already Encouraged",
          description: "You have already encouraged this employee.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: error.message,
          variant: "destructive",
        });
      }
      return;
    }

    // Update employee rating
    const newTotalRatings = selectedEmployee.total_ratings + 1;
    const newRating = ((selectedEmployee.rating * selectedEmployee.total_ratings) + formData.rating) / newTotalRatings;
    
    await supabase
      .from('employees')
      .update({
        rating: newRating,
        total_ratings: newTotalRatings,
      })
      .eq('id', selectedEmployee.id);

    toast({
      title: "Thank You!",
      description: "Your encouragement has been submitted.",
    });
    setIsDialogOpen(false);
    setFormData({
      username: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "",
      address: profile?.address || "",
      rating: 5,
      description: "",
    });
    fetchEmployees();
  };

  const renderStars = (rating: number, interactive = false, onSelect?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onSelect?.(star)}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
            disabled={!interactive}
          >
            <Star 
              className={`w-5 h-5 ${
                star <= rating 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "text-muted-foreground"
              }`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <MainLayout showSidebar>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="nmc-icon-box-accent">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Encourage the Employee
            </h1>
            <p className="text-muted-foreground">
              Our Shining Employees, At your Service!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="nmc-card p-6 text-center">
            <p className="text-3xl font-bold text-primary">{employees.length}</p>
            <p className="text-sm text-muted-foreground">Active Workers</p>
          </div>
          <div className="nmc-card p-6 text-center">
            <p className="text-3xl font-bold text-accent">{totalAppreciations.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Appreciations</p>
          </div>
          <div className="nmc-card p-6 text-center">
            <p className="text-3xl font-bold text-primary">{avgRating}</p>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="nmc-input pl-10"
            />
          </div>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="nmc-input w-full md:w-48"
          >
            <option value="all">All Zones</option>
            {zones.map((zone) => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>

        {/* Employee Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map((employee, index) => (
            <div
              key={employee.id}
              className="nmc-card p-6 text-center animate-slide-up border-t-4 border-t-accent"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-4">
                {employee.photo_url ? (
                  <img 
                    src={employee.photo_url} 
                    alt={employee.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10" />
                )}
              </div>

              {/* Info */}
              <h3 className="font-semibold text-foreground text-lg">{employee.name}</h3>
              <span className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground mt-2">
                {employee.job}
              </span>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mt-3">
                {renderStars(Math.round(employee.rating))}
                <span className="text-sm text-muted-foreground ml-1">{employee.rating.toFixed(1)}</span>
              </div>

              {/* Details */}
              <div className="text-sm text-muted-foreground mt-3 space-y-1">
                <p className="flex items-center justify-center gap-1">
                  <Building className="w-4 h-4" />
                  ID: {employee.employee_id}
                </p>
                <p className="flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {employee.zone}
                </p>
              </div>

              {/* Appreciate Button */}
              <Button
                onClick={() => handleOpenEncouragement(employee)}
                className="w-full mt-4 nmc-btn-accent"
              >
                Encouragement Form
              </Button>

              <p className="text-xs text-muted-foreground mt-2">
                {employee.total_ratings} appreciations
              </p>
            </div>
          ))}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="nmc-card p-8 text-center">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No Employees Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Encouragement Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                Encouragement Form
              </DialogTitle>
            </DialogHeader>
            
            {selectedEmployee && (
              <div className="mb-4 p-4 bg-secondary rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    {selectedEmployee.photo_url ? (
                      <img 
                        src={selectedEmployee.photo_url} 
                        alt={selectedEmployee.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Employee ID: {selectedEmployee.employee_id}</p>
                    <p className="font-bold text-foreground">{selectedEmployee.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.job}</p>
                    <p className="text-sm text-muted-foreground">{selectedEmployee.zone}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Your name"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Your address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Rate the Employee</Label>
                <div className="flex items-center gap-2">
                  {renderStars(formData.rating, true, (rating) => 
                    setFormData({ ...formData, rating })
                  )}
                  <span className="text-sm text-muted-foreground ml-2">
                    {formData.rating}/5
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Write a short description..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full nmc-btn-primary gap-2"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default EmployeesPage;
