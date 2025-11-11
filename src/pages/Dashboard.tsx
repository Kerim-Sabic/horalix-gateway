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
  Minus,
  Square,
  X,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Upload,
  BarChart3,
  Heart,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  const [showWelcome, setShowWelcome] = useState(true);

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
  const successRate = ((completedCount / studies.length) * 100).toFixed(0);

  const stats: Stat[] = [
    { label: "Total Studies", value: studies.length.toString(), icon: FileText, trend: "+12% this week" },
    { label: "Completed Today", value: completedToday.toString(), icon: CheckCircle2, trend: "On track" },
    { label: "Processing", value: processingCount.toString(), icon: Clock, isAnimated: true },
    { label: "Success Rate", value: successRate + "%", icon: TrendingUp, trend: "+5% vs last month" },
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
      <header className="glass-card border-b border-border/50 px-8 py-6 relative">
        {/* Window Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted/50 fast-transition group"
            aria-label="Minimize"
          >
            <Minus className="w-4 h-4 text-muted-foreground group-hover:text-foreground fast-transition" />
          </button>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted/50 fast-transition group"
            aria-label="Maximize"
          >
            <Square className="w-4 h-4 text-muted-foreground group-hover:text-foreground fast-transition" />
          </button>
          <button
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-destructive/10 fast-transition group"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive fast-transition" />
          </button>
        </div>

        <div className="flex items-center justify-between pr-36">
            <div className="flex items-center gap-6">
              <img src={horalixLogo} alt="Horalix Pulse" className="h-12 w-12" />
              <div>
                <h1 className="text-2xl font-bold text-gradient">Patient Studies</h1>
                <p className="text-sm text-muted-foreground mt-0.5">AI-Powered Cardiac Precision</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Doctor Info */}
              <div className="glass-card px-5 py-3 flex items-center gap-3">
                <Avatar className="h-10 w-10 gradient-brand">
                  <AvatarFallback className="bg-transparent text-white font-semibold">
                    {doctorName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">{doctorTitle}</p>
                  <p className="text-xs text-muted-foreground">Cardiologist</p>
                </div>
              </div>

              {/* Action Buttons */}
              <Button variant="gradient" className="gap-2">
                <Plus className="w-4 h-4" />
                New Study
              </Button>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
      </header>

      <div className="container mx-auto px-8 py-8 space-y-8">
          {/* Welcome Banner */}
          {showWelcome && (
            <div className="glass-card p-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-brand flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Welcome back, {doctorTitle} 👋
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      You have {processingCount} studies in progress and {completedToday} completed today
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Study
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <BarChart3 className="w-4 h-4" />
                    View Analytics
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowWelcome(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="glass-card p-6 hover:shadow-xl fast-transition group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl gradient-brand flex items-center justify-center ${stat.isAnimated ? 'animate-glow' : ''}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {stat.trend && (
                      <span className="text-xs text-muted-foreground">{stat.trend}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="flex-1 glass-card p-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by patient ID, name, or study type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 border-0 bg-transparent focus-visible:ring-2 focus-visible:ring-primary/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground fast-transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {filterButtons.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium fast-transition ${
                    activeFilter === filter.id
                      ? "gradient-brand text-white shadow-lg"
                      : "glass-card text-foreground hover:bg-muted/50"
                  }`}
                >
                  {filter.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeFilter === filter.id
                      ? "bg-white/20"
                      : "bg-muted"
                  }`}>
                    {filter.count}
                  </span>
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
                  className="glass-card p-6 hover:shadow-xl hover:-translate-y-1 smooth-transition group animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      {/* Patient Avatar */}
                      <div className="w-14 h-14 rounded-xl gradient-brand flex items-center justify-center">
                        <User className="w-7 h-7 text-white" />
                      </div>

                      {/* Study Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-foreground">
                            {study.patientId}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                              study.status === "completed"
                                ? "bg-accent/10 text-accent"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {study.status === "completed" ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 animate-glow" />
                            )}
                            {study.status === "completed" ? "Completed" : "Processing"}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          {study.patientName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {study.studyType} • {study.date}
                        </p>
                        {study.status === "processing" && study.progress && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>Processing: {study.progress}%</span>
                              <span>Est. {study.estimatedTime} remaining</span>
                            </div>
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full gradient-brand smooth-transition"
                                style={{ width: `${study.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 fast-transition">
                      <Button variant="outline" size="icon" className="hover:bg-primary/10 hover:text-primary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-accent/10 hover:text-accent">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-card p-16 text-center animate-fade-in">
                <div className="w-20 h-20 rounded-full gradient-brand/10 flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No studies found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="gradient" className="gap-2">
                  <Plus className="w-4 h-4" />
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
