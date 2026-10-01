
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import useOrderStore from "../../store/orderStore";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);

  const addOrder = useOrderStore(
    (state) => state.addOrder
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!form.area.trim()) {
      newErrors.area = "Delivery area is required.";
    }

    return newErrors;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (items.length === 0) {
      return;
    }

    const order = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      area: form.area.trim(),
      notes: form.notes.trim(),

      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
      })),

      total,
    };

    addOrder(order);

    clearCart();

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="checkout-page">
        <div className="checkout-success">
          <h1>Order Placed</h1>

          <p>
            Your order has been placed successfully.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">

      <div className="checkout-container">

        <div className="checkout-header">
          <h1>Checkout</h1>

          <p>
            Complete your order details.
          </p>
        </div>


        {items.length === 0 ? (
          <div className="checkout-empty">
            <h2>Your cart is empty</h2>

            <button
              type="button"
              onClick={() => navigate("/menu")}
            >
              Go to Menu
            </button>
          </div>
        ) : (
          <form
            className="checkout-form"
            onSubmit={submitHandler}
          >

            <div className="checkout-form-group">

              <label htmlFor="name">
                Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={changeHandler}
              />

              {errors.name && (
                <p className="checkout-error">
                  {errors.name}
                </p>
              )}

            </div>


            <div className="checkout-form-group">

              <label htmlFor="phone">
                Phone
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={changeHandler}
              />

              {errors.phone && (
                <p className="checkout-error">
                  {errors.phone}
                </p>
              )}

            </div>


            <div className="checkout-form-group">

              <label htmlFor="area">
                Delivery Area
              </label>

              <input
                id="area"
                type="text"
                name="area"
                placeholder="Enter delivery area"
                value={form.area}
                onChange={changeHandler}
              />

              {errors.area && (
                <p className="checkout-error">
                  {errors.area}
                </p>
              )}

            </div>


            <div className="checkout-form-group">

              <label htmlFor="notes">
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                placeholder="Optional notes"
                value={form.notes}
                onChange={changeHandler}
                rows="4"
              />

            </div>


            <div className="checkout-summary">

              <div>
                <span>Items</span>

                <strong>
                  {items.length}
                </strong>
              </div>

              <div>
                <span>Total</span>

                <strong>
                  ETB {total.toFixed(2)}
                </strong>
              </div>

            </div>


            <button
              type="submit"
              className="checkout-submit"
            >
              Place Order
            </button>

          </form>
        )}

      </div>

    </main>
  );
};

export default Checkout;
