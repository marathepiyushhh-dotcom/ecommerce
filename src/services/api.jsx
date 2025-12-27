const BASE_URL = "http://localhost:8080";

// ================================
// 🟢 PRODUCT APIs
// ================================

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// ================================
// 🔐 AUTH APIs
// ================================

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  });

  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
};

// ================================
// 📦 ORDER APIs
// ================================

// 🛒 Place Order
export const placeOrder = async () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const res = await fetch(
    `${BASE_URL}/api/orders/place?email=${email}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) throw new Error("Order failed");
  return res.text();
};

// 📜 Order History
export const getMyOrders = async () => {
  const token = localStorage.getItem("token");


  const res = await fetch(
    `${BASE_URL}/api/orders/my-orders?email=${email}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};
