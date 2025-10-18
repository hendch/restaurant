import { cn } from "@/lib/utils";

export type KpiTone = "primary" | "secondary" | "tertiary" | "quaternary" | "danger";

interface KpiCardProps {
  title: string;
  value: string | number;
  delta?: string;
  tone?: KpiTone;
  className?: string;
}

const toneStyles: Record<KpiTone, string> = {
  primary: "border-primary/20 hover:border-primary/40",
  secondary: "border-secondary/20 hover:border-secondary/40",
  tertiary: "border-tertiary/20 hover:border-tertiary/40",
  quaternary: "border-quaternary/20 hover:border-quaternary/40",
  danger: "border-destructive/20 hover:border-destructive/40",
};

const deltaStyles: Record<KpiTone, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  quaternary: "text-quaternary",
  danger: "text-destructive",
};

export function KpiCard({ title, value, delta, tone = "primary", className }: KpiCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl border transition-all duration-300",
        "p-6 shadow-lg hover:shadow-xl",
        toneStyles[tone],
        className
      )}
    >
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
        {title}
      </h3>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {delta && (
          <span className={cn("text-sm font-semibold", deltaStyles[tone])}>
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
