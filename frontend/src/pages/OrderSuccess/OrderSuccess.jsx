import React from "react";
import { Link } from 'react-router-dom'
import "./OrderSuccess.scss";

const OrderSuccess = () => {
  return (
    <div className="emptyCart">
      <section className="accountInfo">
        <h1>
          <i class="fa-solid fa-truck "></i>
          {/* <i class="fa-solid fa-truck fa-beat"></i>     */}
        </h1>

        <h2>Your order is on its way!</h2>
        <h4>
          Since this is a demo site I sugest you go your user page where you can
          view your orders and also leave a review for the products that you
          have bought.
        </h4>
      </section>
      <Link className="bigAddBtn" to="/profile">
        TAKE ME TO THE USER PAGE
      </Link>
    </div>
  );
};

export default OrderSuccess;
