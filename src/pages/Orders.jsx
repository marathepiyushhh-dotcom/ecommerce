import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";
import "./Orders.css"

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrders()
      .then(data => setOrders(data))
      .catch(() => setError("Failed to load orders"));
  }, []);


  return (
    <div className="orders-container">
      <h2 className="orders-title">🛒 My Orders</h2>

      {error && <p style={{color:"red"}}>{error}</p>}

      {orders.length === 0 && !error && (
        <p>No orders found</p>
      )}

  {orders.map(order => (
    <div className="order-card" key={order.id}>
    
    <div className="order-header">
    <h3>Order #{order.id}</h3>
    <span className={`status ${order.status.toLowerCase()}`}>
    <p>Status: {order.status}</p>
    </span>
    </div>

    <div className="order-summary">
        <p><strong>Total:</strong> ₹{order.totalAmount}</p>
      </div>

    <div className="order-items">  
      <h4>Items:</h4>
    {order.orderItems && order.orderItems.length > 0 ? (
      <ul>
        {order.orderItems.map(item => (
          <li key={item.product.id}>
            {item.product.name} × {item.qty} — ₹{item.price}
          </li>
        ))}
      </ul>
    ) : (
      <p className="empty">No items found</p>
    )};
  </div>
    </div>
  ))};
  </div>
  )
}

export default Orders;
