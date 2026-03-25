import { useState, useEffect, useCallback } from "react";

export interface FavoriteItem {
  id: string;
  type: "stop" | "route";
  name: string;
  subtitle: string;
}

const STORAGE_KEY = "tfi-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(f => f.id !== id));
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.some(f => f.id === id);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
