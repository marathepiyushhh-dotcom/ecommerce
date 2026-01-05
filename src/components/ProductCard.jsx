const ProductCard = ({ product }) => {

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(p => p.id === product.id);

    if (index !== -1) {
      cart[index].qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Product added to cart successfully");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div
      className="card"
      style={{
        width: "230px",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "center"
      }}
    >   

      

      <img
        src={product.url}
        alt={product.name}
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          borderRadius: "6px",
          marginBottom: "10px"
        }}
        onError={(e) => {
          e.target.src = "/images/placeholder.jpg";
        }}
      />

      <h3 style={{ fontSize: "16px" }}>{product.name}</h3>
      <h4 style={{ margin: "6px 0" }}>₹{product.price}</h4>

      <button
        onClick={addToCart}
        style={{
          padding: "6px 12px",
          cursor: "pointer"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
