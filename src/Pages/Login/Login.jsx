import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import "./Login.css";



const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { signIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Temporary customer login
    signIn({
      email: form.email,
    });

    navigate(from, { replace: true });
  };

  return (
    <main className="login-page">
      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Sign in to your Addis Eats account
        </p>

        <form onSubmit={submitHandler}>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={changeHandler}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>

        </form>

      </div>
    </main>
  );
};

export default Login;