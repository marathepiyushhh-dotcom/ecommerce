import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";


const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  

  useEffect(() => {
    getProducts().then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2><center>Products</center></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "15px" }}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}


      </div>
    </div>

    

        

  );
};

export default Home;
