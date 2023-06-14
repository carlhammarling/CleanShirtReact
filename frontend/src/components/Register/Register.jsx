import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../contexts/Context";
import "./Register.scss";

const Register = () => {
  const { setToken, userData } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    adress: "",
    postalCode: "",
    city: "",
    country: "",
    mobile: "",
  });

  //Visible errormessage.
  const [error, setError] = useState(null);

  //To be able to change input values.
  const handleChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Send form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    //Checking that passwords are matching
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords does not match.");
      setError("Passwords does not match.");
      return;
    }

    //Reg-ex to ensure that password follows certarin standards.
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (pattern.test(formData.password) == false) {
      setError(
        "The password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/register",
        formData
      );
      if (res.data) {
        // //Setting user
        setToken(res.data);

        //Save usertoken
        localStorage.setItem("token", res.data);

        //Resets the login-form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          adress: "",
          postalCode: "",
          city: "",
          country: "",
          mobile: "",
        });
      }
    } catch (err) {
      if (err.response.status == 409) {
        console.log("User allready exists");
        setError("User allready exists");
      }
    }
  };

  //Waiting for userData to be updated before navigating

  useEffect(() => {
    if (!userData) {
      return;
    }
    navigate(-1);
  }, [userData]);

  return (
    <div className="registerForm">
      <form onSubmit={handleSubmit}>
        <p>Please register a new account.</p>
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

        <button>
          REGISTER NEW USER <i className="fa-solid fa-user"></i>
        </button>
      </form>
    </div>
  );
};

export default Register;
