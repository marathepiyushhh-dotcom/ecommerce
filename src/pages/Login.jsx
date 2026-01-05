import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";
import "./Login.css";

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

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await loginUser({
        email: data.email,
        password: data.password
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      localStorage.setItem("email", data.email);

      navigate(res.role.includes("ADMIN") ? "/admin" : "/");
    } catch {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

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

  const logout = () => {
    localStorage.clear();
  navigate("/");
    alert("Logout Succesful!!!")
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>
        <p className="subtitle">
          {isRegister ? "Sign up to continue" : "Login to your account"}
        </p>

        {isRegister && (
          <>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="contact" placeholder="Contact" onChange={handleChange} />
          </>
        )}

        <input name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />

        <button
          className="primary-btn"
          onClick={isRegister ? handleRegister : handleLogin}
          disabled={loading}
        >
          {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
        </button>

        <button className="secondary-btn" onClick={logout}>Logout</button>

        <p className="switch-text">
          {isRegister ? "Already have an account?" : "New user?"}
          <span onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? " Login here" : " Register here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
