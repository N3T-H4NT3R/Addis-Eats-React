export const loadDishes = async (signal) => {
  const response = await fetch("/menu-data.json", {
    signal,
  });

  if (!response.ok) {
    throw new Error("Failed to load dishes");
  }

  return response.json();
};