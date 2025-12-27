const ProductCard = ({ product }) => {

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(p => p.id === product.id);

    if (index !== -1) {
      cart[index].qty += 1;   // 🔥 increase quantity
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Product added to cart successfully");
    window.dispatchEvent(new Event("cartUpdated")); // 🔔 notify navbar
  };


  return (
    <div className="card">
      <img src={product.url} alt={product.name} />
      <h3>{product.name}</h3>
      <h4>₹{product.price}</h4>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
