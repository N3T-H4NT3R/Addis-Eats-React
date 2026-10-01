import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

import "./DishDetails.css";
import DishDetailsSkeleton from "../../Components/DishDetailsSkeleton/DishDetailsSkeleton";

import useCartStore from "../../store/cartStore";
import useFavoriteStore from "../../store/favoriteStore";


const DishDetails = () => {
  const { id } = useParams();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);

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


  useEffect(() => {

    fetch("/db/dishes.json")
      .then((res) => res.json())
      .then((data) => {

        const foundDish = data.find(
          (item) => item.id === Number(id)
        );

        setDish(foundDish);
        setLoading(false);

      })
      .catch(() => {
        setLoading(false);
      });

  }, [id]);


  if (loading) {
    return <DishDetailsSkeleton />;
  }


  if (!dish) {
    return (
      <div className="dish-not-found">

        <h2>Dish Not Found</h2>

        <Link to="/menu">
          Back to Menu
        </Link>

      </div>
    );
  }


  const isFavorite = favorites.some(
    (item) => item.id === dish.id
  );


  const toggleFavorite = () => {

    if (isFavorite) {
      removeFavorite(dish.id);
    } else {
      addFavorite(dish);
    }

  };


  return (
    <div className="dish-details">

      <Link
        to="/menu"
        className="back-link"
      >
        ← Back to Menu
      </Link>


      <div className="dish-details-card">

        <div className="dish-details-image">

          <img
            src={dish.image}
            alt={dish.name}
          />

          <button
            className={`details-favorite-button ${
              isFavorite ? "active" : ""
            }`}
            onClick={toggleFavorite}
            aria-label={
              isFavorite
                ? `Remove ${dish.name} from favorites`
                : `Add ${dish.name} to favorites`
            }
          >
            <Heart
              size={24}
              fill={
                isFavorite
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

        </div>


        <div className="dish-details-content">

          <h1>{dish.name}</h1>

          <p className="dish-details-price">
            {dish.price} ETB
          </p>

          <p className="dish-details-description">
            {dish.description}
          </p>


          <button
            className="add-cart-btn"
            onClick={() => addItem(dish)}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
};


export default DishDetails;