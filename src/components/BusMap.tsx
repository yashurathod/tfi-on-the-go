import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mockBusPositions, mockStops, type BusPosition, type BusStop } from "@/data/mockBusData";
import { LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import StopSheet from "./StopSheet";

function createBusIcon(routeNumber: string) {
  return L.divIcon({
    className: "",
    html: `<div class="bus-marker-icon">${routeNumber}</div>`,
    iconSize: [40, 24],
    iconAnchor: [20, 12],
  });
}

function createStopIcon() {
  return L.divIcon({
    className: "",
    html: `<div class="stop-marker-icon"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

function LocateButton() {
  const map = useMap();
  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };
  return (
    <div className="absolute bottom-24 right-4 z-[1000]">
      <Button
        size="icon"
        onClick={handleLocate}
        className="h-11 w-11 rounded-full bg-card text-foreground shadow-lg border border-border hover:bg-muted"
      >
        <LocateFixed className="h-5 w-5" />
      </Button>
    </div>
  );
}

const BusMap = () => {
  const [buses, setBuses] = useState<BusPosition[]>(mockBusPositions);
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev =>
        prev.map(bus => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.001,
          lng: bus.lng + (Math.random() - 0.5) * 0.001,
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStopClick = (stop: BusStop) => {
    setSelectedStop(stop);
    setSheetOpen(true);
  };

  return (
    <div className="relative h-full w-full">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] safe-area-top">
        <div className="mx-4 mt-3 bg-card/95 backdrop-blur-md rounded-xl shadow-lg border border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">TFI</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">Live Bus Tracker</h1>
              <p className="text-[10px] text-muted-foreground">{buses.length} buses active • Dublin</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
              <span className="text-[10px] text-primary font-medium">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      <MapContainer
        center={[53.3498, -6.2603]}
        zoom={14}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />

        {buses.map(bus => (
          <Marker key={bus.id} position={[bus.lat, bus.lng]} icon={createBusIcon(bus.routeNumber)}>
            <Popup className="rounded-lg">
              <div className="p-1">
                <p className="font-semibold text-sm">Route {bus.routeNumber}</p>
                <p className="text-xs text-gray-500">{bus.operator}</p>
                <p className="text-xs mt-1">→ {bus.direction}</p>
                <p className="text-xs">Next: {bus.nextStop}</p>
                <p className={`text-xs mt-1 font-medium ${bus.delay > 0 ? "text-red-500" : bus.delay < 0 ? "text-green-600" : "text-gray-500"}`}>
                  {bus.delay > 0 ? `${bus.delay} min late` : bus.delay < 0 ? `${Math.abs(bus.delay)} min early` : "On time"}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {mockStops.map(stop => (
          <Marker
            key={stop.id}
            position={[stop.lat, stop.lng]}
            icon={createStopIcon()}
            eventHandlers={{ click: () => handleStopClick(stop) }}
          />
        ))}

        <LocateButton />
      </MapContainer>

      <StopSheet stop={selectedStop} open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
};

export default BusMap;
