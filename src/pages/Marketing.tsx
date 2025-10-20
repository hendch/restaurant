import { PowerBIOrgIframe } from "@/components/PowerBIOrgIframe";
import { DashboardLayout } from "@/components/DashboardLayout";

const Marketing = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            🌶️ Marketing Analytics
          </h1>
          <p className="text-xl text-muted-foreground">
            Taco Lovers Insights & Campaign Performance
          </p>
        </div>

        <div className="mb-4">
          <PowerBIOrgIframe
            src={import.meta.env.VITE_PBI_MARKETING_ORG_URL || ""}
            title="Marketing Dashboard Report"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Marketing;
