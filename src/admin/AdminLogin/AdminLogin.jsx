import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../hooks/useAdminAuth";
import "./AdminLogin.css";



const AdminLogin = () => {
  const navigate = useNavigate();

  const { login } = useAdminAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    const success = login(
      form.email,
      form.password
    );

    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-header">
          <h1>Admin Login</h1>

          <p>
            Sign in to manage Addis Eats
          </p>
        </div>

        <form
          onSubmit={submitHandler}
          className="admin-login-form"
        >

          <div className="admin-form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter admin email"
              value={form.email}
              onChange={changeHandler}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={changeHandler}
            />
          </div>

          {error && (
            <p className="admin-login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-login-button"
          >
            Login
          </button>

        </form>

      </div>
    </main>
  );
};

export default AdminLogin;