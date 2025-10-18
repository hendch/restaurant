import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  tone: "primary" | "secondary" | "tertiary";
}

const toneStyles = {
  primary: "border-primary/20 hover:border-primary/50 hover:shadow-primary/20",
  secondary: "border-secondary/20 hover:border-secondary/50 hover:shadow-secondary/20",
  tertiary: "border-tertiary/20 hover:border-tertiary/50 hover:shadow-tertiary/20",
};

const iconStyles = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

export function RoleCard({ title, description, icon: Icon, href, tone }: RoleCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group bg-card rounded-2xl border p-8 transition-all duration-300",
        "hover:shadow-2xl hover:scale-[1.02]",
        toneStyles[tone]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className={cn("w-10 h-10", iconStyles[tone])} />
        <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Link>
  );
}
