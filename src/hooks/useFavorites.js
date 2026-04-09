// Persists favorites to AsyncStorage so they survive app restarts.
// Each favorite is a full snapshot: { id, source, name, thumb, category, area }

import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setFavorites(JSON.parse(raw));
      } catch (e) {
        console.error('useFavorites load error:', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Persist whenever favorites change (skip the initial empty load)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(e =>
      console.error('useFavorites save error:', e),
    );
  }, [favorites, loaded]);

  const toggleFavorite = useCallback((id, source, snapshot = {}) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === id && f.source === source);
      if (exists) {
        return prev.filter(f => !(f.id === id && f.source === source));
      }
      return [{ id, source, ...snapshot }, ...prev];
    });
  }, []);

  const isFavorited = useCallback(
    (id, source) => favorites.some(f => f.id === id && f.source === source),
    [favorites],
  );

  return { favorites, toggleFavorite, isFavorited };
}
