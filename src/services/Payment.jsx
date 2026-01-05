import { placeOrder } from "./api";

export const makePayment = async (cart) => {
  const payload = cart.map(item => ({
    id: item.id,
    qty: item.qty
  }));

  await placeOrder(payload);

  localStorage.removeItem("cart");
  
  alert("Order placed successfully");
};
