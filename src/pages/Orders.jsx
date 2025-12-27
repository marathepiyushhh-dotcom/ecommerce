import { useEffect, useState } from "react";
import { getMyOrders } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(o => (
        <div key={o.id}>
          Order #{o.id} - ₹{o.totalAmount} - {o.status}
        </div>
      ))}
    </div>
  );
};

export default Orders;
