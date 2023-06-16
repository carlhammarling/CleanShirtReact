import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";
import { Context } from "../../contexts/Context";

const Login = () => {
  const { setToken, userData } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (formData.email == "" || formData.password == "") {
      setError("You have to fill in all fields!");
      return;
    }

    try {
      const res = await axios.post(
        "/api/users/login",
        formData
      );
      if (res.data) {
        // //Setting user to the data stored in the MongoDB
        setToken(res.data);

        //Save usertoken
        localStorage.setItem("token", res.data);

        //Resets the login-form
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      if (err.response.status == 401) {
        console.log("Wrong email or password");
        setError("Wrong email or password");
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
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <p>Allready have an account? Sign in!</p>
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <p className="error">{error}</p>

        <button>
          LOGIN <i className="fa-solid fa-user"></i>
        </button>
      </form>
    </div>
  );
};

export default Login;
