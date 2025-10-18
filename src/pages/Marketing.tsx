import { KpiCard } from "@/components/KpiCard";
import { PowerBIOrgIframe } from "@/components/PowerBIOrgIframe";
import { Navigation } from "@/components/Navigation";

const Marketing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Marketing Analytics
          </h1>
          <p className="text-xl text-muted-foreground">
            Consumer Insights & Campaign Performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="Active Consumers"
            value="12,547"
            delta="+8.5%"
            tone="secondary"
          />
          <KpiCard
            title="Top Price Level"
            value="Mid-Range"
            delta="42%"
            tone="tertiary"
          />
          <KpiCard
            title="Average Overall"
            value="4.2"
            delta="+0.3"
            tone="primary"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Report</h2>
          <PowerBIOrgIframe
            src={import.meta.env.VITE_PBI_MARKETING_ORG_URL || ""}
            title="Marketing Dashboard Report"
          />
        </div>
      </main>
    </div>
  );
};

export default Marketing;
