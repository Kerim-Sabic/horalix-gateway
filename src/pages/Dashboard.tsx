import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, LogOut, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WindowControls from "@/components/WindowControls";
import horalixLogo from "@/assets/horalix-logo.png";

interface Study {
  id: string;
  patientId: string;
  studyUid: string;
  date: string;
  status: "completed" | "processing";
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "completed" | "processing">("all");

  // Mock data
  const studies: Study[] = [
    {
      id: "1",
      patientId: "fe0000be5dd85f6239a5eaf16e0056b6a4c8de360e7fc0e0ac0cd23395df835a",
      studyUid: "3.3.333.3.3.408080861098328043951744199864990438446541187622018",
      date: "2018-07-20",
      status: "completed",
    },
  ];

  const handleLogout = () => {
    navigate("/auth");
  };

  const filteredStudies = studies.filter((study) => {
    const matchesSearch =
      study.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.studyUid.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || study.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,63,242,0.03),transparent_50%)]" />
      
      <WindowControls />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-8 py-6 border-b border-border/50 pr-48">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4 min-w-0">
              <img 
                src={horalixLogo} 
                alt="Horalix Pulse Logo" 
                className="h-12 w-auto flex-shrink-0"
              />
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Patient Studies
                </h1>
                <p className="text-sm text-muted-foreground font-light tracking-wide">
                  Manage and review echocardiogram analyses
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="glass-card px-4 py-2 rounded-lg">
                <p className="text-sm font-semibold text-foreground">doctor1</p>
                <p className="text-xs text-muted-foreground">doctor</p>
              </div>
              <Button variant="gradient" size="default" className="gap-2">
                <Plus className="w-4 h-4" />
                New Study
              </Button>
              <Button 
                variant="outline" 
                size="default" 
                className="gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full animate-fade-in">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="glass-card rounded-xl p-1">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Search by Patient ID or Study UID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 border-0 bg-transparent text-base h-14"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={activeFilter === "all" ? "default" : "ghost"}
                size="default"
                onClick={() => setActiveFilter("all")}
                className={activeFilter === "all" ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
              >
                All
              </Button>
              <Button
                variant={activeFilter === "completed" ? "default" : "ghost"}
                size="default"
                onClick={() => setActiveFilter("completed")}
                className={activeFilter === "completed" ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
              >
                Completed
              </Button>
              <Button
                variant={activeFilter === "processing" ? "default" : "ghost"}
                size="default"
                onClick={() => setActiveFilter("processing")}
                className={activeFilter === "processing" ? "bg-accent hover:bg-accent/90 text-accent-foreground" : ""}
              >
                Processing
              </Button>
            </div>
          </div>

          {/* Studies List */}
          <div className="space-y-4">
            {filteredStudies.map((study, index) => (
              <div
                key={study.id}
                className="glass-card rounded-xl p-6 hover:shadow-xl smooth-transition group cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <Badge 
                            className="bg-accent/15 text-accent border-0 font-semibold text-xs px-3 py-1 hover:bg-accent/25 smooth-transition"
                          >
                            <span className="mr-1.5">✓</span> Completed
                          </Badge>
                        </div>
                        <h3 className="text-base font-semibold text-foreground mb-2 break-all font-mono">
                          {study.patientId}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="space-y-2 pl-1">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground min-w-0">
                          <User className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="font-medium text-xs">Study UID:</span>
                        </div>
                        <span className="text-foreground font-mono text-xs break-all">{study.studyUid}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="font-medium text-xs">Date:</span>
                        </div>
                        <span className="text-foreground font-medium text-xs">{study.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button 
                      variant="ghost" 
                      size="default"
                      className="hover:bg-primary/10 hover:text-primary smooth-transition"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="default"
                      className="hover:bg-destructive/10 hover:text-destructive smooth-transition"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStudies.length === 0 && (
            <div className="glass-card rounded-xl p-16 text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg font-medium">No studies found</p>
              <p className="text-muted-foreground text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
