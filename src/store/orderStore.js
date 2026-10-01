
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
    (set) => ({
      orders: [],

      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: Date.now(),
              status: "Pending",
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  status,
                }
              : order
          ),
        })),

      deleteOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter(
            (order) => order.id !== id
          ),
        })),

      clearOrders: () =>
        set({
          orders: [],
        }),
    }),
    {
      name: "orders-storage",
    }
  )
);

export default useOrderStore;