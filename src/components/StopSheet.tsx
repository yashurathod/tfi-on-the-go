import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { type BusStop, getArrivalsForStop } from "@/data/mockBusData";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StopSheetProps {
  stop: BusStop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StopSheet = ({ stop, open, onOpenChange }: StopSheetProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!stop) return null;

  const arrivals = getArrivalsForStop(stop.id);
  const favorited = isFavorite(stop.id);

  const toggleFavorite = () => {
    if (favorited) {
      removeFavorite(stop.id);
    } else {
      addFavorite({
        id: stop.id,
        type: "stop",
        name: stop.name,
        subtitle: `${stop.routes.length} routes`,
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[70vh]">
        <SheetHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-secondary" />
              </div>
              <SheetTitle className="text-base">{stop.name}</SheetTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleFavorite} className="h-9 w-9">
              <Heart className={cn("h-5 w-5", favorited ? "fill-destructive text-destructive" : "text-muted-foreground")} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Routes: {stop.routes.join(", ")}</p>
        </SheetHeader>

        <div className="space-y-2 overflow-y-auto pb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="h-3 w-3" /> Upcoming arrivals
          </p>
          {arrivals.map((arrival, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground text-xs font-bold">{arrival.routeNumber}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{arrival.destination}</p>
                <p className="text-[10px] text-muted-foreground">{arrival.operator} • Sched {arrival.scheduled}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold text-foreground">{arrival.minutesAway}</p>
                <p className="text-[10px] text-muted-foreground">min</p>
              </div>
              <div className={cn(
                "h-2 w-2 rounded-full shrink-0",
                arrival.delay > 2 ? "bg-destructive" : arrival.delay > 0 ? "bg-transit-orange" : "bg-primary"
              )} />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StopSheet;
