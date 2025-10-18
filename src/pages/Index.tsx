import { Navigation } from "@/components/Navigation";
import { RoleCard } from "@/components/RoleCard";
import { TrendingUp, Megaphone, Store } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-secondary to-tertiary flex items-center justify-center mb-6 mx-auto shadow-2xl">
              <TrendingUp className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Restaurant Analytics Platform
          </h1>
          <p className="text-2xl text-muted-foreground mb-4">
            AI-Powered Business Intelligence
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive insights for restaurant operations, marketing campaigns, and franchise growth—all powered by Power BI embedded analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <RoleCard
            title="Owner"
            description="Monitor operations, food quality, service metrics, and overall performance across your restaurant network."
            icon={TrendingUp}
            href="/owner"
            tone="primary"
          />
          <RoleCard
            title="Marketing"
            description="Analyze consumer behavior, campaign effectiveness, and market trends to drive growth."
            icon={Megaphone}
            href="/marketing"
            tone="secondary"
          />
          <RoleCard
            title="Franchise"
            description="Track network expansion, franchise performance, and growth opportunities."
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
