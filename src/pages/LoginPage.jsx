import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const onChange = (e) => {
    setFormValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formValues.email, formValues.password);
      navigate("/"); // go to home after login
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <p>Log in to manage your guides and interact with the community.</p>

      <form onSubmit={onSubmit} className="auth-form">
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={onChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={onChange}
            required
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn primary">
          Login
        </button>
      </form>
    </section>
  );
}
