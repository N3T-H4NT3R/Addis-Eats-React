import useOrderStore from "../../store/orderStore";
import "./Orders.css";

const Orders = () => {
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <main className="orders-page">

        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your orders here.</p>
        </div>

        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>
            Your completed orders will appear here.
          </p>
        </div>

      </main>
    );
  }

  return (
    <main className="orders-page">

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track your orders here.</p>
      </div>

      <div className="orders-list">

        {orders.map((order) => (

          <article
            className="order-card"
            key={order.id}
          >

            <div className="order-top">

              <div>
                <h2>
                  Order #{order.id}
                </h2>

                <p>
                  {order.name}
                </p>
              </div>

              <span
                className={`order-status ${order.status.toLowerCase()}`}
              >
                {order.status}
              </span>

            </div>


            <div className="order-info">

              <p>
                <strong>Phone:</strong>{" "}
                {order.phone}
              </p>

              <p>
                <strong>Area:</strong>{" "}
                {order.area}
              </p>

            </div>


            <div className="order-items">

              <h3>Items</h3>

              {order.items.map((item) => (

                <div
                  className="order-item"
                  key={item.id}
                >

                  <span>
                    {item.name}
                  </span>

                  <span>
                    {item.quantity || 1} × {item.price} ETB
                  </span>

                </div>

              ))}

            </div>


            <div className="order-total">

              <strong>Total</strong>

              <strong>
                {order.items.reduce(
                  (total, item) =>
                    total +
                    item.price * (item.quantity || 1),
                  0
                )}{" "}
                ETB
              </strong>

            </div>


            <div className="order-progress">

              <div
                className={
                  order.status === "Pending" ||
                  order.status === "Preparing" ||
                  order.status === "Delivering" ||
                  order.status === "Delivered"
                    ? "progress-step active"
                    : "progress-step"
                }
              >
                <span>1</span>
                <p>Pending</p>
              </div>

              <div
                className={
                  order.status === "Preparing" ||
                  order.status === "Delivering" ||
                  order.status === "Delivered"
                    ? "progress-step active"
                    : "progress-step"
                }
              >
                <span>2</span>
                <p>Preparing</p>
              </div>

              <div
                className={
                  order.status === "Delivering" ||
                  order.status === "Delivered"
                    ? "progress-step active"
                    : "progress-step"
                }
              >
                <span>3</span>
                <p>Delivering</p>
              </div>

              <div
                className={
                  order.status === "Delivered"
                    ? "progress-step active"
                    : "progress-step"
                }
              >
                <span>4</span>
                <p>Delivered</p>
              </div>

            </div>

          </article>

        ))}

      </div>

    </main>
  );
};

export default Orders;