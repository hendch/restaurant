import { PowerBIOrgIframe } from "@/components/PowerBIOrgIframe";
import { DashboardLayout } from "@/components/DashboardLayout";

const Franchise = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            🏪 Franquicia Network
          </h1>
          <p className="text-xl text-muted-foreground">
            Cantina Expansion & Network Performance
          </p>
        </div>

        <div className="mb-4">
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
