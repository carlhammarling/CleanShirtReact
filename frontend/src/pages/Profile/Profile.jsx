import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./Profile.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner/ProductsBanner";
import DeliveryInfo from "../../components/DeliveryInfo/DeliveryInfo";
import { Context } from "../../contexts/Context";
import CartItem from "../../components/Cards/CartItem/CartItem";
import UserOrders from "../../components/UserOrders/UserOrders";
import YellowHomeBanner from "../../components/Banners/YellowHomeBanner/YellowHomeBanner";

const Profile = () => {
  const { userData } = useContext(Context);

  if (!userData) {
    return <Navigate to="/signin" />;
  }

  return (
    <main className="profile">
      <YellowHomeBanner />
      <article className="myAccount">
        <section className="accountInfo">
          <h1>
            My account <i className="fa-solid fa-user fa-sm"></i>
          </h1>
          <h4>
            Hi {userData.firstName} {userData.lastName}! Here you can update you
            delivery info, find your orders and leave reviews on products.
          </h4>
        </section>
        <DeliveryInfo />
        <UserOrders shoppingCart={userData.shoppingCart} />
      </article>
    </main>
  );
};

export default Profile;
