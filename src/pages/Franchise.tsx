import { KpiCard } from "@/components/KpiCard";
import { PowerBIOrgIframe } from "@/components/PowerBIOrgIframe";
import { DashboardLayout } from "@/components/DashboardLayout";

const Franchise = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Franchise Network
          </h1>
          <p className="text-xl text-muted-foreground">
            Growth Metrics & Network Performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <KpiCard
            title="% Franchise"
            value="68%"
            delta="+5%"
            tone="quaternary"
          />
          <KpiCard
            title="# Consumers"
            value="8,234"
            delta="+12%"
            tone="secondary"
          />
          <KpiCard
            title="Total Restaurants"
            value="156"
            delta="+4"
            tone="primary"
          />
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Report</h2>
          <PowerBIOrgIframe
            src={import.meta.env.VITE_PBI_FRANCHISE_ORG_URL || ""}
            title="Franchise Dashboard Report"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Franchise;
