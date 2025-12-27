import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    password: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await loginUser({
        email: data.email,
        password: data.password
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("email",data.email);

      if (res.role.includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // 📝 REGISTER
  const handleRegister = async () => {
    try {
      setLoading(true);
      await registerUser(data);
      alert("Registration successful! Please login.");
      setIsRegister(false);
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "350px" }}>
      <h1>{isRegister ? "Register" : "Login"}</h1>

      <h1>
      {isRegister && (
        <>
          
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          

          <input
            name="contact"
            placeholder="Contact"
            onChange={handleChange}
          />
        </>
        
      )}

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      
      <button
        onClick={isRegister ? handleRegister : handleLogin}
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : isRegister
          ? "Register"
          : "Login"}
      </button>

      <p style={{ marginTop: "10px" }}>
        {isRegister ? "Already have an account?" : "New user?"}{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Login here" : "Register here"}
        </span>
      </p>
      </h1>
    </div>
  );
};

export default Login;
