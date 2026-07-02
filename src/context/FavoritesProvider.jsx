import { useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";

export function FavoritesProvider({ children }) {
    
  const [favorites, setFavorites] = useState(() => {

    const saved = localStorage.getItem("favorites");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  useEffect(() => {

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggleFavorite(character) {

    const exists = favorites.some(

      fav => fav.id === character.id
    );

    if(exists){

      setFavorites(

        favorites.filter(

          fav => fav.id !== character.id
        )
      );

    } else {

      setFavorites([
        ...favorites,
        character
      ]);
    }
  }

  function removeFavorite(id){

    setFavorites(

      favorites.filter(
        fav => fav.id !== id
      )
    );
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