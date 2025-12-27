import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

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

  // ✅ Validation
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

  // ✅ Register submit
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

    } catch (err) {
    alert("❌ Email already exists");
    } finally {
    setLoading(false);
    }
        };

return (
    <div style={{ padding: "20px", maxWidth: "350px" }}>
    <h2>Register</h2>
    
    <input
        placeholder="Name"
        onChange={(e) => setData({ ...data, name: e.target.value })}
    />
    
    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

    <input
        placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
    />
    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

    <input
        placeholder="Contact"
        onChange={(e) => setData({ ...data, contact: e.target.value })}
    />
    {errors.contact && <p style={{ color: "red" }}>{errors.contact}</p>}

    <input
        type="password"
        placeholder="Password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
    />
    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

    <div>
    <button onClick={submit} disabled={loading}>
        {loading ? "Registering..." : "Register"}
    </button>
    </div>
    
    </div>
    );
};

export default Register;
