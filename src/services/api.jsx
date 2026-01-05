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

// ================================
// 🔐 REGISTER APIs
// ================================
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

//=================================
// 🛒 Place Order
//=================================
export const placeOrder = async (cart) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8080/api/orders/place", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(cart)
  });

  if (!res.ok) throw new Error("Order failed");
};


//==================================
// 🛒 ADD TO CART (DB)
//==================================
export const addToCart = async (productId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/api/cart/add?productId=${productId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) {
    throw new Error("Add to cart failed");
  }

  return res.text();
};



//==================================
// 📜 GET MY ORDERS
//==================================
export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return res.json();
};



