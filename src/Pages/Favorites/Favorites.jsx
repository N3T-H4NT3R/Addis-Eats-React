import useFavoriteStore from "../../store/favoriteStore";
import useCartStore from "../../store/cartStore";
import "./Favorites.css";



function Favorites() {
  const favorites = useFavoriteStore(
    (state) => state.favorites
  );

  const removeFavorite = useFavoriteStore(
    (state) => state.removeFavorite
  );

  const addItem = useCartStore(
    (state) => state.addItem
  );

  return (
    <main className="favorites-page">

      <div className="favorites-header">
        <h1>My Favorites</h1>

        <p>
          {favorites.length}{" "}
          {favorites.length === 1 ? "dish" : "dishes"} saved
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h2>No Favorites Yet</h2>

          <p>
            Add your favorite dishes and they will appear here.
          </p>
        </div>
      ) : (
        <div className="favorites-grid">

          {favorites.map((dish) => (
            <article
              className="favorite-card"
              key={dish.id}
            >
              <div className="favorite-image-wrapper">

                <img
                  src={dish.image}
                  alt={dish.name}
                  className="favorite-image"
                />

                <button
                  className="remove-favorite"
                  onClick={() => removeFavorite(dish.id)}
                  aria-label={`Remove ${dish.name} from favorites`}
                >
                  ♥
                </button>

              </div>

              <div className="favorite-content">

                <h2>{dish.name}</h2>

                <p className="favorite-category">
                  {dish.category}
                </p>

                <p className="favorite-description">
                  {dish.description}
                </p>

                <div className="favorite-bottom">

                  <strong>
                    {dish.price} ETB
                  </strong>

                  <button
                    onClick={() => addItem(dish)}
                    className="favorite-cart-button"
                  >
                    Add to Cart
                  </button>

                </div>

              </div>
            </article>
          ))}

        </div>
      )}

    </main>
  );
}

export default Favorites;