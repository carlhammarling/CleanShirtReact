import React, { useState } from "react";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import './SignIn.scss'

const SignIn = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <div className="selectSignIn">
        <button className="toggleSignInBtn" onClick={() => setShowLogin(false)}>
          Login
        </button>
        <button className="toggleSignInBtn" onClick={() => setShowLogin(true)}>
          Register
        </button>
      </div>
      {
        showLogin ?  <Register />: <Login />
      }
      
    </div>
  );
};

export default SignIn;
