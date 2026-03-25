import { Info, ExternalLink, Bell, MapPin, Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const SettingsScreen = () => {
  return (
    <div className="flex flex-col h-full bg-background safe-area-top">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* App info card */}
        <div className="rounded-xl bg-card p-4 shadow-sm border border-border mt-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">TFI</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">TFI Bus Tracker</p>
              <p className="text-[10px] text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Track TFI Ireland buses in real-time across Dublin Bus, Bus Éireann, and Go-Ahead Ireland services.
          </p>
        </div>

        {/* Preferences */}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-5 mb-2">Preferences</p>
        <div className="rounded-xl bg-card shadow-sm border border-border divide-y divide-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Push Notifications</p>
                <p className="text-[10px] text-muted-foreground">Alerts for delays on favorites</p>
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Auto-locate</p>
                <p className="text-[10px] text-muted-foreground">Center map on your location</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-[10px] text-muted-foreground">Switch to dark theme</p>
              </div>
            </div>
            <Switch />
          </div>
        </div>

        {/* About */}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-5 mb-2">About</p>
        <div className="rounded-xl bg-card shadow-sm border border-border divide-y divide-border">
          <a href="https://www.transportforireland.ie" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">TFI Website</p>
            </div>
          </a>
          <div className="flex items-center gap-3 p-4">
            <Info className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Data: TFI GTFS-Realtime feeds. Map: OpenStreetMap + CARTO.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
