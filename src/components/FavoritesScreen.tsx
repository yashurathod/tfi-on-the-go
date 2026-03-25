import { useFavorites } from "@/hooks/useFavorites";
import { Heart, MapPin, Bus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArrivalsForStop } from "@/data/mockBusData";

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="flex flex-col h-full bg-background safe-area-top">
      <div className="px-4 pt-4 pb-2">
        <h1 className="text-xl font-bold text-foreground">Favorites</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Your saved stops and routes</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No favorites yet</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-48">
              Tap the heart icon on any stop or route to save it here for quick access.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {favorites.map(fav => {
              const arrivals = fav.type === "stop" ? getArrivalsForStop(fav.id) : [];
              const nextArrival = arrivals[0];

              return (
                <div key={fav.id} className="rounded-xl bg-card p-4 shadow-sm border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                        {fav.type === "stop" ? (
                          <MapPin className="h-4 w-4 text-secondary" />
                        ) : (
                          <Bus className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{fav.name}</p>
                        <p className="text-[10px] text-muted-foreground">{fav.subtitle}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFavorite(fav.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {nextArrival && (
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2 mt-1">
                      <div className="h-7 w-7 rounded bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-[10px] font-bold">{nextArrival.routeNumber}</span>
                      </div>
                      <p className="text-xs text-muted-foreground flex-1">→ {nextArrival.destination}</p>
                      <p className="text-sm font-bold text-foreground">{nextArrival.minutesAway} min</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesScreen;
