import { Link, useLocation } from "react-router-dom";
import { Mic, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  variant?: "default" | "auth" | "dashboard";
}

export const Header = ({ variant = "default" }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  if (variant === "dashboard") return null; // Dashboard has its own layout

  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
            <Mic className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold">VoiceReach AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <a href="/#features" className="text-sm font-medium hover:text-primary">Features</a>
          <a href="/#how-it-works" className="text-sm font-medium hover:text-primary">How it Works</a>
          <a href="/#pricing" className="text-sm font-medium hover:text-primary">Pricing</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {variant === "auth" ? (
             <Link to="/" className="text-sm font-medium hover:text-primary">Back to Home</Link>
          ) : (
            <>
              <Link to="/auth?view=signin" className="text-sm font-medium hover:text-primary">Sign In</Link>
              <Link to="/auth?view=signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <a href="/#features" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="/#how-it-works" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>How it Works</a>
            <a href="/#pricing" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            
             {variant === "auth" ? (
                <Link to="/" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Back to Home</Link>
             ) : (
                <>
                  <Link to="/auth?view=signin" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  <Link to="/auth?view=signup" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Link>
                </>
             )}
          </nav>
        </div>
      )}
    </header>
  );
};
