import React, { useState } from "react";
import './SignIn.scss'
import { NavLink } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <div className="selectSignIn">
        <NavLink className="toggleSignInBtn" to='/login' >
          Login
        </NavLink>
        <NavLink className="toggleSignInBtn" to='/register'>
          Register
        </NavLink>
      </div>
      
    </div>
  );
};

export default SignIn;
