import React from "react";
import { Outlet } from "react-router-dom";
import "./SignInLayout.scss";
import { NavLink } from "react-router-dom";


const SignInLayout = () => {
  return (
    <div className="signInWrapper">
      <div className="signInBtns">
        <NavLink className="userNav" to='/login' >
          Login
        </NavLink>
        <NavLink className="userNav" to='/register'>
          Register
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default SignInLayout;
