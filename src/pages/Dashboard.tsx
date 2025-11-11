import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Plus, 
  LogOut, 
  Activity, 
  Clock, 
  CheckCircle2, 
  FileText,
  X,
  Eye,
  Edit,
  Trash2,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import horalixLogo from "@/assets/horalix-logo.png";

interface Study {
  id: string;
  patientId: string;
  patientName: string;
  studyUid: string;
  studyType: string;
  date: string;
  status: "completed" | "processing";
  progress?: number;
  estimatedTime?: string;
}

interface Stat {
  label: string;
  value: string;
  icon: typeof Activity;
  trend?: string;
  isAnimated?: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const doctorName = "doctor1";
  const doctorTitle = "Dr. " + doctorName;

  const handleLogout = () => {
    navigate("/auth");
  };

  // Mock data with patient names and study types
  const studies: Study[] = [
    {
      id: "1",
      patientId: "PT-2024-001",
      patientName: "Sarah Johnson",
      studyUid: "1.2.840.113619.2.1",
      studyType: "Transthoracic Echo",
      date: "2024-03-15",
      status: "completed",
    },
    {
      id: "2",
      patientId: "PT-2024-002",
      patientName: "Michael Chen",
      studyUid: "1.2.840.113619.2.2",
      studyType: "Stress Echo",
      date: "2024-03-14",
      status: "processing",
      progress: 67,
      estimatedTime: "5 min",
    },
    {
      id: "3",
      patientId: "PT-2024-003",
      patientName: "Emma Rodriguez",
      studyUid: "1.2.840.113619.2.3",
      studyType: "Transthoracic Echo",
      date: "2024-03-14",
      status: "completed",
    },
    {
      id: "4",
      patientId: "PT-2024-004",
      patientName: "James Wilson",
      studyUid: "1.2.840.113619.2.4",
      studyType: "3D Echo",
      date: "2024-03-13",
      status: "completed",
    },
    {
      id: "5",
      patientId: "PT-2024-005",
      patientName: "Olivia Brown",
      studyUid: "1.2.840.113619.2.5",
      studyType: "Transesophageal Echo",
      date: "2024-03-13",
      status: "processing",
      progress: 34,
      estimatedTime: "12 min",
    },
  ];

  // Statistics
  const completedCount = studies.filter(s => s.status === "completed").length;
  const processingCount = studies.filter(s => s.status === "processing").length;
  const completedToday = studies.filter(s => s.date === "2024-03-15" && s.status === "completed").length;

  const stats: Stat[] = [
    { label: "Total Studies", value: studies.length.toString(), icon: FileText, trend: "+12% this week" },
    { label: "Completed Today", value: completedToday.toString(), icon: CheckCircle2, trend: "On track" },
    { label: "Processing", value: processingCount.toString(), icon: Clock, isAnimated: true },
  ];

  const filteredStudies = studies.filter((study) => {
    const matchesSearch =
      study.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.studyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.studyUid.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "completed" && study.status === "completed") ||
      (activeFilter === "processing" && study.status === "processing");

    return matchesSearch && matchesFilter;
  });

  const filterButtons = [
    { id: "all", label: "All", count: studies.length },
    { id: "completed", label: "Completed", count: completedCount },
    { id: "processing", label: "Processing", count: processingCount },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header Section */}
      <header className="glass-card border-b border-border/50 px-10 py-6 h-18">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-6">
            <img src={horalixLogo} alt="Horalix Pulse" className="h-12 w-12" />
            <div>
              <h1 className="text-ios-title1 font-bold text-gradient">Patient Studies</h1>
              <p className="text-ios-footnote text-muted-foreground mt-0.5">AI-Powered Cardiac Precision</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Doctor Info */}
            <div className="glass-card px-5 py-3 flex items-center gap-3">
              <Avatar className="h-11 w-11 gradient-brand">
                <AvatarFallback className="bg-transparent text-white font-semibold">
                  {doctorName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-ios-headline text-foreground">{doctorTitle}</p>
                <p className="text-ios-footnote text-muted-foreground">Cardiologist</p>
              </div>
            </div>

            {/* Action Buttons */}
            <Button variant="gradient" className="gap-2" onClick={() => navigate("/new-study")}>
              <Plus className="w-5 h-5" />
              New Study
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-10 py-8 space-y-8">
        {/* Statistics Cards - iOS style solid cards */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="ios-card rounded-2xl p-6 hover-lift animate-spring-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl gradient-brand flex items-center justify-center ${stat.isAnimated ? 'animate-glow' : ''}`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {stat.trend && (
                    <span className="text-ios-caption text-foreground/40">{stat.trend}</span>
                  )}
                </div>
                <div>
                  <p className="text-ios-large-title text-foreground mb-1">{stat.value}</p>
                  <p className="text-ios-footnote text-foreground/60">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filters - iOS Segmented Control */}
        <div className="flex items-center gap-4">
          <div className="flex-1 ios-card rounded-full p-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by patient ID, name, or study type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 border-0 bg-transparent focus-visible:ring-2 focus-visible:ring-primary/20 h-11 rounded-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="segmented-control">
            {filterButtons.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "segmented-control-item",
                  activeFilter === filter.id && "active"
                )}
              >
                {filter.label}
                <span className="ml-2 text-ios-caption text-foreground/50">{filter.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Studies List */}
        <div className="space-y-4">
          {filteredStudies.length > 0 ? (
            filteredStudies.map((study, index) => (
              <div
                key={study.id}
                className="ios-card rounded-2xl p-6 hover-lift animate-spring-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    {/* Patient Avatar */}
                    <div className="w-16 h-16 rounded-xl gradient-brand flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>

                    {/* Study Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-ios-title2 text-foreground">
                          {study.patientId}
                        </h3>
                        <span
                          className={cn(
                            "h-6 px-3 rounded-full text-ios-caption font-semibold uppercase tracking-wide flex items-center gap-1.5",
                            study.status === "completed"
                              ? "bg-accent/10 text-accent"
                              : "bg-primary/10 text-primary"
                          )}
                        >
                          {study.status === "completed" ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 animate-glow" />
                          )}
                          {study.status === "completed" ? "Completed" : "Processing"}
                        </span>
                      </div>
                      <p className="text-ios-headline text-foreground mb-1">
                        {study.patientName}
                      </p>
                      <p className="text-ios-subhead text-foreground/60">
                        {study.studyType} • {study.date}
                      </p>
                      {study.status === "processing" && study.progress && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-ios-caption text-foreground/60 mb-1">
                            <span>Processing: {study.progress}%</span>
                            <span>Est. {study.estimatedTime} remaining</span>
                          </div>
                          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full gradient-brand transition-all duration-300"
                              style={{ width: `${study.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons - Always Visible */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-primary/10 hover:text-primary">
                      <Eye className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-accent/10 hover:text-accent">
                      <Edit className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="ios-card rounded-2xl p-16 text-center animate-spring-in">
              <div className="w-24 h-24 rounded-full gradient-brand/10 flex items-center justify-center mx-auto mb-10">
                <Activity className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-ios-title2 text-foreground mb-2">No studies found</h3>
              <p className="text-ios-subhead text-muted-foreground mb-10">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="gradient" size="lg" className="gap-2" onClick={() => navigate("/new-study")}>
                <Plus className="w-5 h-5" />
                Upload Your First Study
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
