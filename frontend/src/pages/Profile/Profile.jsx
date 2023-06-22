import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Profile.scss";
import DeliveryInfo from "../../components/DeliveryInfo/DeliveryInfo";
import { Context } from "../../contexts/Context";
import UserOrders from "../../components/UserOrders/UserOrders";
import YellowHomeBanner from "../../components/Banners/YellowHomeBanner/YellowHomeBanner";

const Profile = () => {
  const { userData, setToken, setUserData } = useContext(Context);
  const navigate = useNavigate();

  if (!userData) {
    return <Navigate to="/signin" />;
  }

  const logOut = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <main className="profile">
      <YellowHomeBanner />
      <article className="myAccount">
          <section className="accountInfo">
            <h1>
              
              My account <i className="fa-solid fa-user fa-sm"></i>
              
            </h1>
            
            <button className="logOut" onClick={logOut}>
              SIGN OUT
            </button>
          </section>
          <DeliveryInfo />

        <UserOrders shoppingCart={userData.shoppingCart} />
      </article>
    </main>
  );
};

export default Profile;
