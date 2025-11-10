import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to auth page on load
    navigate("/auth");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Horalix Pulse</h1>
        <p className="text-xl text-muted-foreground mb-8">Loading...</p>
        <Button onClick={() => navigate("/auth")} variant="gradient">
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default Index;
