import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      {/* LEFT SIDE */}
      <Link to="/" style={styles.logo}>🏠 Home</Link>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <Link to="/cart" style={styles.link}>🛒 Cart</Link>
        <Link to="/orders" style={styles.link}>📦 Orders</Link>
        <Link to="/login" style={styles.link}>👤 Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;

/* ✅ STYLES */
const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#7048deff",
    color: "white"
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold"
  },
  right: {
    marginLeft: "auto",   // 🔥 pushes items to the right
    display: "flex",
    gap: "30px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px"
  }
};
