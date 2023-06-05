import React, { useState } from "react";
import "./Register.scss";

const Register = () => {
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
        <p>Please Register Your New Account</p>
        <br />

        <label htmlFor="firstName">First Name*</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name*</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

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

        <label htmlFor="confirmPassword">Confirm password*</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <p className="error">{error}</p>

        <button type="submit" id="btn-submit">
          REGISTER NEW USER
        </button>
      </form>
    </div>
  );
};

export default Register;
