import { createContext } from "react";
import { Character } from "../types/character";

interface FavoritesContextType {
  favorites: Character[];
  toggleFavorite: (character: Character) => void;
  removeFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  removeFavorite: () => {},
});
