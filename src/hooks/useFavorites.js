import { useState, useEffect } from 'react';

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('haru-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('haru-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (cakeId) => {
    setFavorites((prev) =>
      prev.includes(cakeId)
        ? prev.filter((id) => id !== cakeId)
        : [...prev, cakeId],
    );
  };

  const isFavorite = (cakeId) => favorites.includes(cakeId);

  return { favorites, toggleFavorite, isFavorite };
}
