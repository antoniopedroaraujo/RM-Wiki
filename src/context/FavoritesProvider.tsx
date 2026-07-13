import { useEffect, useState, ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { Character } from "../types/character";

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Character[]>(() => {
    const saved = localStorage.getItem("favorites");

    return saved ? JSON.parse(saved) as Character[] : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(character: Character) {
    const exists = favorites.some((fav) => fav.id === character.id);

    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== character.id));
    } else {
      setFavorites([...favorites, character]);
    }
  }

  function removeFavorite(id: number) {
    setFavorites(favorites.filter((fav) => fav.id !== id));
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
