import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import "./Cart.css";

const Cart = () => {
  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const clear = useCartStore(
    (state) => state.clear
  );

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="cart-empty">

        <h2>Your Cart is Empty</h2>

        <p>
          Add some delicious dishes to your cart.
        </p>

        <Link
          to="/menu"
          className="cart-menu-btn"
        >
          Browse Menu
        </Link>

      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1>Your Cart</h1>

      <div className="cart-items">

        {items.map((item) => (

          <div
            className="cart-item"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-info">

              <h2>{item.name}</h2>

              <p>
                {item.price} ETB
              </p>

              <div className="quantity-control">

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>

              </div>

            </div>

            <div className="cart-item-right">

              <p className="item-total">
                {item.price * item.quantity} ETB
              </p>

              <button
                className="remove-cart-btn"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="cart-summary">

        <h2>
          Total: {total} ETB
        </h2>

        <div className="cart-actions">

          <button
            className="clear-cart-btn"
            onClick={clear}
          >
            Clear Cart
          </button>

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Checkout
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Cart;