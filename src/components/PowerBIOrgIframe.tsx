import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface PowerBIOrgIframeProps {
  src: string;
  title: string;
  className?: string;
}

export function PowerBIOrgIframe({ src, title, className }: PowerBIOrgIframeProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (!src) {
    return (
      <div className="w-full h-[85vh] rounded-2xl border border-destructive/20 bg-card flex items-center justify-center">
        <div className="text-center p-8">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Power BI URL Not Configured
          </h3>
          <p className="text-muted-foreground max-w-md">
            Please set the appropriate VITE_PBI_*_ORG_URL environment variable in your .env file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {loading && (
        <div className="absolute inset-0 w-full h-[85vh] rounded-2xl border border-primary/20 bg-card flex items-center justify-center z-10">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading Power BI Report...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="w-full h-[85vh] rounded-2xl border border-destructive/20 bg-card flex items-center justify-center">
          <div className="text-center p-8">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Failed to Load Report
            </h3>
            <p className="text-muted-foreground max-w-md">
              Please ensure you're signed into Power BI in this browser and have access to this report.
            </p>
          </div>
        </div>
      )}
      {!error && (
        <iframe
          src={src}
          title={title}
          className={className || "w-full h-[85vh] rounded-2xl border border-primary/20 shadow-2xl"}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}
