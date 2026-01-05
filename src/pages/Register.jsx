import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let temp = {};

    if (!data.name.trim()) temp.name = "Name is required";

    if (!data.email.trim()) {
      temp.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)
    ) {
      temp.email = "Invalid email format";
    }

    if (!data.contact.trim()) {
      temp.contact = "Contact number is required";
    } else if (!/^[0-9]{10}$/.test(data.contact)) {
      temp.contact = "Contact must be 10 digits";
    }

    if (!data.password.trim()) {
      temp.password = "Password is required";
    } else if (data.password.length < 6) {
      temp.password = "Password must be at least 6 characters";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await registerUser({
        name: data.name,
        email: data.email,
        contact: Number(data.contact),
        password: data.password
      });

      alert("✅ Registration successful. Please login.");
      navigate("/login");
    } catch {
      alert("❌ Email already exists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>✨ Create Your Account</h2>
        <p className="subtitle">Join us and get started 🚀</p>

        <div className="form-group">
          <input
            type="text"
            placeholder="👤 Full Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="📧 Email Address"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="📞 Contact Number"
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="🔒 Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button className="register-btn" onClick={submit} disabled={loading}>
          {loading ? "⏳ Registering..." : "🚀 Register"}
        </button>

        <p className="login-text">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
