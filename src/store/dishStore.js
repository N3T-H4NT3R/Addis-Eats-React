
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { loadDishes } from "../api/dishes";

const useDishStore = create(
  persist(
    (set) => ({
      dishes: [],
      initialized: false,

      loadInitialDishes: async () => {
        const data = await loadDishes();

        const dishesWithAvailability = data.map((dish) => ({
          ...dish,
          available: true,
        }));

        set({
          dishes: dishesWithAvailability,
          initialized: true,
        });
      },

      addDish: (dish) =>
        set((state) => ({
          dishes: [
            ...state.dishes,
            {
              ...dish,
              id: Date.now(),
              available: true,
            },
          ],
        })),

      updateDish: (id, updatedDish) =>
        set((state) => ({
          dishes: state.dishes.map((dish) =>
            dish.id === id
              ? {
                  ...dish,
                  ...updatedDish,
                }
              : dish
          ),
        })),

      toggleAvailability: (id) =>
        set((state) => ({
          dishes: state.dishes.map((dish) =>
            dish.id === id
              ? {
                  ...dish,
                  available: !dish.available,
                }
              : dish
          ),
        })),

      deleteDish: (id) =>
        set((state) => ({
          dishes: state.dishes.filter(
            (dish) => dish.id !== id
          ),
        })),
    }),
    {
      name: "dishes-storage",
    }
  )
);

export default useDishStore;