
import { useEffect, useState } from "react";
import DishList from "../../Components/DishList/DishList";
import MenuSkeleton from "../../Components/MenuSkeleton/MenuSkeleton";
import { useSearch } from "../../Context/SearchContext";
import useDishStore from "../../store/dishStore";
import "./Menu.css";

function Menu() {
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dishes = useDishStore(
    (state) => state.dishes
  );

  const initialized = useDishStore(
    (state) => state.initialized
  );

  const loadInitialDishes = useDishStore(
    (state) => state.loadInitialDishes
  );

  const { search } = useSearch();

  /* ================================
     Load Dishes
  ================================= */

  useEffect(() => {
    if (initialized) {
      setLoading(false);
      return;
    }

    const fetchDishes = async () => {
      try {
        setLoading(true);
        setError("");

        await loadInitialDishes();
      } catch (err) {
        setError("Unable to load dishes.");
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [
    initialized,
    loadInitialDishes,
  ]);

  const categories = [
    "all",
    "Ethiopian",
    "Pizza",
    "Burgers",
    "Drinks",
  ];

  /* ================================
     Filter Dishes
  ================================= */

  const filteredDishes = dishes.filter((dish) => {

    // Hide finished dishes
    if (!dish.available) {
      return false;
    }

    const matchesCategory =
      category === "all" ||
      dish.category === category;

    const matchesSearch =
      dish.name
        .toLowerCase()
        .includes(search.toLowerCase());

    return (
      matchesCategory &&
      matchesSearch
    );
  });

  return (
    <main className="menu-page">

      <section className="menu-header">

        <div>

          <p className="menu-label">
            ADDIS EATS
          </p>

          <h1>
            Our Menu
          </h1>

          <p className="menu-description">
            Discover delicious Ethiopian dishes
            made for every taste.
          </p>

        </div>

      </section>

      <section className="menu-categories">

        {categories.map((item) => (

          <button
            key={item}
            className={
              category === item
                ? "category-button active"
                : "category-button"
            }
            onClick={() =>
              setCategory(item)
            }
          >
            {item.charAt(0).toUpperCase() +
              item.slice(1)}
          </button>

        ))}

      </section>

      <section className="menu-content">

        {loading && (
          <MenuSkeleton />
        )}

        {error && (
          <p className="menu-message error">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            {filteredDishes.length > 0 ? (
              <DishList
                dishes={filteredDishes}
              />
            ) : (
              <p className="menu-message">
                No dishes found.
              </p>
            )}
          </>
        )}

      </section>

    </main>
  );
}

export default Menu;