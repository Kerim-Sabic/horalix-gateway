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
        <header className="px-8 py-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={horalixLogo} 
                alt="Horalix Pulse Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                  Patient Studies
                </h1>
                <p className="text-sm text-muted-foreground font-light tracking-wide">
                  Manage and review echocardiogram analyses
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
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
          <div className="mb-8 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by Patient ID or Study UID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                size="default"
                onClick={() => setActiveFilter("all")}
                className={activeFilter === "all" ? "bg-accent hover:bg-accent/90" : ""}
              >
                All
              </Button>
              <Button
                variant={activeFilter === "completed" ? "default" : "outline"}
                size="default"
                onClick={() => setActiveFilter("completed")}
                className={activeFilter === "completed" ? "bg-accent hover:bg-accent/90" : ""}
              >
                Completed
              </Button>
              <Button
                variant={activeFilter === "processing" ? "default" : "outline"}
                size="default"
                onClick={() => setActiveFilter("processing")}
                className={activeFilter === "processing" ? "bg-accent hover:bg-accent/90" : ""}
              >
                Processing
              </Button>
            </div>
          </div>

          {/* Studies List */}
          <div className="space-y-4">
            {filteredStudies.map((study) => (
              <div
                key={study.id}
                className="glass-card rounded-xl p-6 animate-slide-up hover:shadow-lg smooth-transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 break-all">
                        {study.patientId}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4 text-accent" />
                        <span className="break-all">Study UID: {study.studyUid}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>{study.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <Badge 
                      variant="outline" 
                      className="bg-accent/10 text-accent border-accent/30 font-medium"
                    >
                      ✓ Completed
                    </Badge>
                    <Button variant="ghost" size="default">
                      Edit
                    </Button>
                    <Button variant="destructive" size="default">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStudies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No studies found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
