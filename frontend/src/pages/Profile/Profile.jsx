import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import "./Profile.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner/ProductsBanner";
import DeliveryInfo from "../../components/DeliveryInfo/DeliveryInfo";
import { UserContext } from "../../contexts/UserContext";
import CartItem from "../../components/Cards/CartItem/CartItem";

const Profile = () => {
  const { userData } = useContext(UserContext);

  if (!userData) {
    //replace removes history
    return <Navigate to="/login" />;
  }

  return (
    <main className="profile">
      <ProductsBanner />
      <article className="myAccount">
        <section>
          <h1>My account</h1>
          <p>
            Hi {userData.firstName} {userData.lastName}! Here you can find your
            orders and update you delivery info.
          </p>
        </section>
        <DeliveryInfo />
        <section>
          <h2>Orders</h2>
        </section>
      </article>
    </main>
  );
};

export default Profile;
