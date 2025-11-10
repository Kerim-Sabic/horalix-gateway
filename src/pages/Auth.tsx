import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Fingerprint } from "lucide-react";
import WindowControls from "@/components/WindowControls";
import horalixLogo from "@/assets/horalix-logo.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(123,63,242,0.03),transparent_50%)]" />
      
      <WindowControls />

      <div className="w-full max-w-md px-6 animate-fade-in">
        {/* Logo and tagline */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-block mb-4 relative">
            <img 
              src={horalixLogo} 
              alt="Horalix Pulse Logo" 
              className="h-24 w-auto mx-auto drop-shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-semibold mb-2 tracking-tight text-foreground">
            Horalix Pulse
          </h1>
          <p className="text-muted-foreground font-light text-sm tracking-wide">
            AI-Powered Cardiac Precision
          </p>
        </div>

        {/* Glassmorphic login card */}
        <div className="glass-card rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-base"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-base"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full text-base font-semibold tracking-wide"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Sign up and biometric options */}
          <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
            <a
              href="/signup"
              className="text-sm text-muted-foreground hover:text-foreground smooth-transition underline-offset-4 hover:underline"
            >
              Sign Up
            </a>
            
            <button
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary smooth-transition"
              aria-label="Biometric login"
            >
              <Fingerprint className="w-5 h-5 group-hover:animate-glow" />
              <span className="text-xs">Biometric</span>
            </button>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Secure hospital-grade authentication
        </p>
      </div>
    </div>
  );
};

export default Auth;
