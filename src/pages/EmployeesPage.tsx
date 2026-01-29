import { useState } from "react";
import { Award, Star, Building, ThumbsUp, Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

interface Employee {
  id: number;
  name: string;
  initials: string;
  role: string;
  zone: string;
  rating: number;
  experience: number;
  appreciations: number;
}

const employees: Employee[] = [
  { id: 1, name: "Rajesh Sharma", initials: "RS", role: "Truck Driver", zone: "Dharampeth", rating: 4.8, experience: 3, appreciations: 156 },
  { id: 2, name: "Herolal Honda", initials: "HH", role: "Sweeper", zone: "Hanuman Nagar", rating: 4.9, experience: 5, appreciations: 203 },
  { id: 3, name: "Saurabh Desai", initials: "SD", role: "Garbage Collector", zone: "Dhantoli", rating: 4.7, experience: 12, appreciations: 312 },
  { id: 4, name: "Ramakant Pandey", initials: "RP", role: "Truck Driver", zone: "Nehru Nagar", rating: 4.6, experience: 7, appreciations: 189 },
  { id: 5, name: "Meena Kumari", initials: "MK", role: "Sweeper", zone: "Sataranjipura", rating: 4.9, experience: 8, appreciations: 267 },
  { id: 6, name: "Bhagwan Das", initials: "BD", role: "Garbage Collector", zone: "Lakadganj", rating: 4.5, experience: 4, appreciations: 134 },
  { id: 7, name: "Priya Thakur", initials: "PT", role: "Supervisor", zone: "Ashi Nagar", rating: 4.8, experience: 10, appreciations: 298 },
  { id: 8, name: "Santosh Yadav", initials: "SY", role: "Truck Driver", zone: "Mangalwari", rating: 4.7, experience: 6, appreciations: 178 },
];

const EmployeesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [appreciatedIds, setAppreciatedIds] = useState<number[]>([]);

  const zones = [...new Set(employees.map((e) => e.zone))];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === "all" || emp.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const totalAppreciations = employees.reduce((sum, emp) => sum + emp.appreciations, 0);
  const avgRating = (employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1);

  const handleAppreciate = (id: number) => {
    if (!appreciatedIds.includes(id)) {
      setAppreciatedIds([...appreciatedIds, id]);
    }
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
              Our Shining Employees
            </h1>
            <p className="text-muted-foreground">
              These dedicated workers keep our city clean every day
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee, index) => {
            const isAppreciated = appreciatedIds.includes(employee.id);
            return (
              <div
                key={employee.id}
                className="nmc-card p-6 text-center animate-slide-up border-t-4 border-t-accent"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {employee.initials}
                </div>

                {/* Info */}
                <h3 className="font-semibold text-foreground text-lg">{employee.name}</h3>
                <span className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground mt-2">
                  {employee.role}
                </span>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(employee.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-border"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">{employee.rating}</span>
                </div>

                {/* Details */}
                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground">
                  <Building className="w-4 h-4" />
                  <span>{employee.experience} years experience</span>
                </div>

                {/* Appreciate Button */}
                <Button
                  onClick={() => handleAppreciate(employee.id)}
                  disabled={isAppreciated}
                  className={`w-full mt-4 gap-2 ${
                    isAppreciated
                      ? "bg-primary/10 text-primary cursor-default"
                      : "nmc-btn-primary"
                  }`}
                  variant={isAppreciated ? "outline" : "default"}
                >
                  <ThumbsUp className="w-4 h-4" />
                  {isAppreciated ? "Appreciated!" : "Appreciate"}
                </Button>

                <p className="text-xs text-muted-foreground mt-2">
                  {employee.appreciations + (isAppreciated ? 1 : 0)} appreciations
                </p>
              </div>
            );
          })}
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No employees found matching your criteria.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default EmployeesPage;
