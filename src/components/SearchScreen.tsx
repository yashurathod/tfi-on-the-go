import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Bus, MapPin, Filter } from "lucide-react";
import { mockRoutes, mockStops } from "@/data/mockBusData";
import { cn } from "@/lib/utils";

type FilterType = "all" | "Dublin Bus" | "Bus Éireann" | "Go-Ahead";

const operators: { id: FilterType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "Dublin Bus", label: "Dublin Bus" },
  { id: "Bus Éireann", label: "Bus Éireann" },
  { id: "Go-Ahead", label: "Go-Ahead" },
];

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredRoutes = mockRoutes.filter(r => {
    const matchQuery = !query || r.number.toLowerCase().includes(query.toLowerCase()) || r.name.toLowerCase().includes(query.toLowerCase());
    const matchFilter = filter === "all" || r.operator === filter;
    return matchQuery && matchFilter;
  });

  const filteredStops = mockStops.filter(s =>
    !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.routes.some(r => r.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-background safe-area-top">
      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground mb-3">Search</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search routes or stops..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-muted border-0 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Operator filter chips */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
        {operators.map(op => (
          <button
            key={op.id}
            onClick={() => setFilter(op.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
              filter === op.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {op.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* Routes */}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-3 mb-2 flex items-center gap-1.5">
          <Bus className="h-3 w-3" /> Routes ({filteredRoutes.length})
        </p>
        <div className="space-y-2">
          {filteredRoutes.map(route => (
            <div key={route.id} className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm border border-border">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground text-xs font-bold">{route.number}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{route.name}</p>
                <p className="text-[10px] text-muted-foreground">{route.operator} • {route.stops.length} stops</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stops */}
        {query && (
          <>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-4 mb-2 flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> Stops ({filteredStops.length})
            </p>
            <div className="space-y-2">
              {filteredStops.map(stop => (
                <div key={stop.id} className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm border border-border">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{stop.name}</p>
                    <p className="text-[10px] text-muted-foreground">Routes: {stop.routes.join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
