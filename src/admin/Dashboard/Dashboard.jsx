import useOrderStore from "../../store/orderStore";
import "./Dashboard.css";



const Dashboard = () => {
  const orders = useOrderStore((state) => state.orders);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const preparingOrders = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce(
      (total, order) => total + Number(order.total || 0),
      0
    );

  return (
    <section className="admin-dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of Addis Eats orders.</p>
        </div>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <span className="dashboard-card-label">
            Total Orders
          </span>

          <strong className="dashboard-card-value">
            {totalOrders}
          </strong>
        </div>

        <div className="dashboard-card">
          <span className="dashboard-card-label">
            Pending
          </span>

          <strong className="dashboard-card-value">
            {pendingOrders}
          </strong>
        </div>

        <div className="dashboard-card">
          <span className="dashboard-card-label">
            Preparing
          </span>

          <strong className="dashboard-card-value">
            {preparingOrders}
          </strong>
        </div>

        <div className="dashboard-card">
          <span className="dashboard-card-label">
            Delivered
          </span>

          <strong className="dashboard-card-value">
            {deliveredOrders}
          </strong>
        </div>

      </div>

      <div className="dashboard-revenue">

        <div>
          <span>Total Revenue</span>

          <strong>
            ETB {totalRevenue.toFixed(2)}
          </strong>
        </div>

      </div>

      <div className="dashboard-recent">

        <div className="dashboard-section-header">
          <h2>Recent Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div className="dashboard-empty">
            <p>No orders yet.</p>
          </div>
        ) : (
          <div className="recent-orders">

            {orders
              .slice()
              .reverse()
              .slice(0, 5)
              .map((order) => (
                <div
                  className="recent-order"
                  key={order.id}
                >
                  <div>
                    <strong>
                      #{order.id}
                    </strong>

                    <span>
                      {order.name}
                    </span>
                  </div>

                  <div>
                    <strong>
                      ETB {Number(order.total || 0).toFixed(2)}
                    </strong>

                    <span className="recent-order-status">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}

          </div>
        )}

      </div>

    </section>
  );
};

export default Dashboard;