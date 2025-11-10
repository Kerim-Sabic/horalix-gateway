import { Minus, Square, X } from "lucide-react";

const WindowControls = () => {
  return (
    <div className="fixed top-6 right-6 flex items-center gap-2 z-50">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-foreground/5 smooth-transition group"
        aria-label="Minimize"
      >
        <Minus className="w-4 h-4 text-muted-foreground group-hover:text-foreground smooth-transition" />
      </button>
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-foreground/5 smooth-transition group"
        aria-label="Maximize"
      >
        <Square className="w-4 h-4 text-muted-foreground group-hover:text-foreground smooth-transition" />
      </button>
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-destructive/10 smooth-transition group"
        aria-label="Close"
      >
        <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive smooth-transition" />
      </button>
    </div>
  );
};

export default WindowControls;
