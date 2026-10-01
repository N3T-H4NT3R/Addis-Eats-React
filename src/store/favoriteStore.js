import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFavoriteStore = create(
  persist(
    (set) => ({
      favorites: [],

      addFavorite: (dish) =>
        set((state) => ({
          favorites: [...state.favorites, dish],
        })),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (dish) => dish.id !== id
          ),
        })),

      clearFavorites: () =>
        set({
          favorites: [],
        }),
    }),
    {
      name: "favorites-storage",
    }
  )
);

export default useFavoriteStore;