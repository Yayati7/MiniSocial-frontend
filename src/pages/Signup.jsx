import React, { useState } from "react";
import { signupUser } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupUser(form);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup error");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2 className="auth-title">Signup</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            className="auth-input"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            className="auth-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            className="auth-input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-btn">
            Signup
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
