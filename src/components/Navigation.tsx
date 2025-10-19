import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, Megaphone, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Owner", href: "/owner", icon: TrendingUp },
  { label: "Marketing", href: "/marketing", icon: Megaphone },
  { label: "Franchise", href: "/franchise", icon: Store },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-3xl">🌮</div>
            <span className="font-bold text-lg text-foreground">La Cantina Analytics</span>
          </Link>
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
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
          </div>
        </div>
      </div>
    </nav>
  );
}
