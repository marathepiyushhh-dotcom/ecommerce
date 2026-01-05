import { makePayment } from "../services/Payment";

const Checkout = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>
      <h3>Total Amount: ₹{total}</h3>
      <button onClick={() => makePayment(cart)}>Pay Now</button>
    </div>
  );
};

export default Checkout;
