import React, { useState } from "react";
import './SignIn.scss'
import { NavLink } from "react-router-dom";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

const SignIn = () => {

  const [toggleSignIn, setToggleSignIn] = useState(true)
  return (
    <div className="signInWrapper">
  
      <div className="signInBtns">
        <button className={`userNav ${toggleSignIn ? "active" : ""}`} onClick={() => setToggleSignIn(true)}>
          Login
        </button>
        <button className={`userNav ${toggleSignIn ? "" : "active"}`} onClick={() => setToggleSignIn(false)}>
          Register
        </button>
      </div>
      {toggleSignIn ? 
      <Login />
      : 
      <Register />
      }
    </div>
  );
};

export default SignIn;
