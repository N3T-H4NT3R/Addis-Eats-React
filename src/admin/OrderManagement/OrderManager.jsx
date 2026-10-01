
import { useState } from "react";
import useOrderStore from "../../store/orderStore";
import "./OrderManager.css";

const OrderManager = () => {
  const orders = useOrderStore(
    (state) => state.orders
  );

  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  );

  const deleteOrder = useOrderStore(
    (state) => state.deleteOrder
  );

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const handleStatusChange = (id, status) => {
    updateOrderStatus(id, status);

    if (selectedOrder?.id === id) {
      setSelectedOrder((prev) => ({
        ...prev,
        status,
      }));
    }
  };

  const handleDelete = (id) => {
    deleteOrder(id);

    if (selectedOrder?.id === id) {
      setSelectedOrder(null);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString();
  };

  return (
    <section className="order-manager">

      <div className="order-manager-header">

        <div>
          <h1>Order Management</h1>

          <p>
            Manage customer orders and their status.
          </p>
        </div>

        <span className="order-count">
          {orders.length} Orders
        </span>

      </div>


      {orders.length === 0 ? (
        <div className="empty-orders">

          <h2>No Orders</h2>

          <p>
            There are no customer orders yet.
          </p>

        </div>
      ) : (
        <div className="orders-table-wrapper">

          <table className="orders-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Area</th>
                <th>Total</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order.id}>

                  <td>
                    #{order.id}
                  </td>

                  <td>
                    {order.name}
                  </td>

                  <td>
                    {order.phone}
                  </td>

                  <td>
                    {order.area}
                  </td>

                  <td>
                    ETB{" "}
                    {Number(order.total).toFixed(2)}
                  </td>

                  <td>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value
                        )
                      }
                      className="order-status"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Preparing">
                        Preparing
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>

                  </td>

                  <td>
                    {formatDate(order.createdAt)}
                  </td>

                  <td>

                    <div className="order-actions">

                      <button
                        type="button"
                        className="view-order-button"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                      >
                        View
                      </button>

                      <button
                        type="button"
                        className="delete-order-button"
                        onClick={() =>
                          handleDelete(order.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}


      {/* ================================
          Order Details
      ================================= */}

      {selectedOrder && (

        <div
          className="order-details-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="order-details"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="order-details-header">

              <div>
                <h2>
                  Order Details
                </h2>

                <p>
                  Order #{selectedOrder.id}
                </p>
              </div>

              <button
                type="button"
                className="close-details-button"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ×
              </button>

            </div>


            <div className="order-customer-info">

              <div>
                <span>Customer</span>

                <strong>
                  {selectedOrder.name}
                </strong>
              </div>

              <div>
                <span>Phone</span>

                <strong>
                  {selectedOrder.phone}
                </strong>
              </div>

              <div>
                <span>Delivery Area</span>

                <strong>
                  {selectedOrder.area}
                </strong>
              </div>

              <div>
                <span>Status</span>

                <strong>
                  {selectedOrder.status}
                </strong>
              </div>

              <div>
                <span>Created</span>

                <strong>
                  {formatDate(
                    selectedOrder.createdAt
                  )}
                </strong>
              </div>

            </div>


            {/* Items */}

            <div className="order-items-section">

              <h3>Items</h3>

              <div className="order-detail-items">

                {selectedOrder.items.map(
                  (item) => (

                    <div
                      className="order-detail-item"
                      key={item.id}
                    >

                      <div>

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          Qty: {item.quantity}
                        </span>

                      </div>

                      <strong>
                        ETB{" "}
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toFixed(2)}
                      </strong>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* Notes */}

            {selectedOrder.notes && (

              <div className="order-notes">

                <h3>Notes</h3>

                <p>
                  {selectedOrder.notes}
                </p>

              </div>

            )}


            {/* Total */}

            <div className="order-total">

              <span>Total</span>

              <strong>
                ETB{" "}
                {Number(
                  selectedOrder.total
                ).toFixed(2)}
              </strong>

            </div>

          </div>

        </div>

      )}

    </section>
  );
};

export default OrderManager;