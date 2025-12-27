import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // 🔹 Load cart safely
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // ✅ Ensure qty exists
    const normalizedCart = storedCart.map(item => ({
      ...item,
      qty: item.qty ? item.qty : 1
    }));

    setCart(normalizedCart);
    localStorage.setItem("cart", JSON.stringify(normalizedCart));
  }, []);

  // 🔹 Update quantity
  const updateQty = (index, type) => {
    const updatedCart = [...cart];

    if (type === "inc") {
      updatedCart[index].qty += 1;
    } else if (type === "dec" && updatedCart[index].qty > 1) {
      updatedCart[index].qty -= 1;
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // 🔹 Remove item
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ SAFE SUBTOTAL
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🛒 Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "20px",
            borderBottom: "1px solid #ddd",
            padding: "15px 0"
          }}
        >
          <img
            src={item.url}
            alt={item.name}
            style={{ width: "120px", height: "150px", objectFit: "cover" }}
          />

          <div style={{ flex: 1 }}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <strong>₹{item.price}</strong>

            <div style={{ marginTop: "10px" }}>
              <button onClick={() => updateQty(index, "dec")}>−</button>
              <span style={{ margin: "0 10px" }}>{item.qty}</span>
              <button onClick={() => updateQty(index, "inc")}>+</button>

              <button
                style={{ marginLeft: "20px", color: "red" }}
                onClick={() => removeItem(index)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ✅ SUBTOTAL */}
      {cart.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <h3>
            Subtotal ({totalItems} items): ₹{subtotal}
          </h3>

          <Link to="/checkout">
            <button style={{ padding: "10px 20px" }}>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
