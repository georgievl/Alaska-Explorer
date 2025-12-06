import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formValues.password !== formValues.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register(formValues.email, formValues.password, formValues.displayName);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed.");
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <p>Create an account to share and manage your Alaska guides.</p>

      <form onSubmit={onSubmit} className="auth-form">
        <label>
          Display name
          <input
            type="text"
            name="displayName"
            value={formValues.displayName}
            onChange={onChange}
            required
          />
        </label>

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
            minLength={6}
          />
        </label>

        <label>
          Confirm password
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={onChange}
            required
            minLength={6}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" className="btn primary">
          Create account
        </button>
      </form>
    </section>
  );
}
