import { Navigation } from "@/components/Navigation";
import { RoleCard } from "@/components/RoleCard";
import { TrendingUp, Megaphone, Store, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <div className="text-7xl mb-4">🌮</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            La Cantina Analytics
          </h1>
          <p className="text-2xl text-secondary-foreground bg-secondary/20 inline-block px-6 py-2 rounded-full mb-4">
            🌶️ Mexican Restaurant Business Intelligence 🌶️
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Authentic insights for Mexican restaurant operations, marketing campaigns, and franchise growth—powered by Power BI embedded analytics.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gap-2">
              <LogIn className="w-5 h-5" />
              Sign In / Sign Up
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <RoleCard
            title="Dueño (Owner)"
            description="Monitor taco quality, salsa freshness, service metrics, and overall cantina performance across your Mexican restaurant empire."
            icon={TrendingUp}
            href="/owner"
            tone="primary"
          />
          <RoleCard
            title="Marketing"
            description="Analyze customer preferences for tacos vs burritos, campaign effectiveness, and trends in authentic Mexican cuisine."
            icon={Megaphone}
            href="/marketing"
            tone="secondary"
          />
          <RoleCard
            title="Franquicia"
            description="Track cantina expansion, franchise taco sales performance, and growth opportunities across locations."
            icon={Store}
            href="/franchise"
            tone="tertiary"
          />
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-card/50 border border-border rounded-xl p-6 max-w-2xl">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Power BI reports require organizational authentication. 
              Please sign in to your Power BI account to view the embedded dashboards.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
