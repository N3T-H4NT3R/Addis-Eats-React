import "./DishList.css";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import useCartStore from "../../store/cartStore";
import useFavoriteStore from "../../store/favoriteStore";

const DishList = ({ dishes }) => {
  const addItem = useCartStore((state) => state.addItem);

  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const addFavorite = useFavoriteStore(
    (state) => state.addFavorite
  );

  const removeFavorite = useFavoriteStore(
    (state) => state.removeFavorite
  );

  const toggleFavorite = (dish) => {
    const isFavorite = favorites.some(
      (item) => item.id === dish.id
    );

    if (isFavorite) {
      removeFavorite(dish.id);
    } else {
      addFavorite(dish);
    }
  };

  if (!dishes || dishes.length === 0) {
    return (
      <p className="menu-message">
        No dishes found.
      </p>
    );
  }

  return (
    <div className="dish-list">

      {dishes.map((dish) => {

        const isFavorite = favorites.some(
          (item) => item.id === dish.id
        );

        return (
          <article
            className="dish-card"
            key={dish.id}
          >

            <div className="dish-image">

              <Link to={`/menu/${dish.id}`}>
                <img
                  src={dish.image}
                  alt={dish.name}
                />
              </Link>

              <button
                className={`favorite-button ${
                  isFavorite ? "active" : ""
                }`}
                onClick={() => toggleFavorite(dish)}
                aria-label={
                  isFavorite
                    ? `Remove ${dish.name} from favorites`
                    : `Add ${dish.name} to favorites`
                }
              >
                <Heart
                  size={22}
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </button>

            </div>

            <div className="dish-info">

              <h2>{dish.name}</h2>

              <p className="dish-description">
                {dish.description}
              </p>

              <div className="dish-bottom">

                <span className="dish-price">
                  {dish.price} ETB
                </span>

                <button
                  className="dish-button"
                  onClick={() => addItem(dish)}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          </article>
        );
      })}

    </div>
  );
};

export default DishList;