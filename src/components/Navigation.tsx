import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, TrendingUp, Megaphone, Store, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getAllowedPages } from "@/lib/roles";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Owner", href: "/owner", icon: TrendingUp },
  { label: "Marketing", href: "/marketing", icon: Megaphone },
  { label: "Franchise", href: "/franchise", icon: Store },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { toast } = useToast();

  // Get allowed pages for the current user
  const allowedPages = user ? getAllowedPages(user.email) : [];

  // Filter navigation items based on user's allowed pages
  const allowedNavItems = navItems.filter(item => 
    allowedPages.includes(item.href)
  );

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Error",
          description: `Failed to sign out: ${error.message}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed out",
          description: "You have been successfully signed out",
        });
        // Navigate to auth page after successful sign out
        navigate('/auth');
      }
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl">🌮</div>
            <span className="font-bold text-lg text-foreground">La Cantina Analytics</span>
          </Link>
          <div className="flex items-center space-x-1">
            {allowedNavItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                    "hover:bg-accent/50",
                    isActive && "bg-accent text-accent-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* User info and sign out */}
            {user && (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
