import React, { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetName: "",
    postalCode: "",
    city: "",
    phoneNr: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const [error, setError] = useState(null);

  const handleChange = () => {};
  return (
    <div className="registerForm">
      <form>
        <p>Allready have a user? Sign in!</p>
        <br />

        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <p className="error">{error}</p>

        <button type="submit" id="btn-submit">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
