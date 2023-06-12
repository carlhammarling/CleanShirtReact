import React from "react";
import { Link } from "react-router-dom";
import "./EmptyCart.scss";

const EmptyCart = () => {
  return (
    <div className="emptyCart">
      <section className="accountInfo">
        <h1>
          <i className="fa-solid fa-cart-shopping"></i>
        </h1>

        <h2>Your cart is empty.</h2>
        <h4>Once you have added products to the cart they will appear here.</h4>
      </section>
      <Link className="bigAddBtn" to="/products">
        TAKE ME TO THE PRODUCTS
      </Link>
    </div>
  );
};

export default EmptyCart;
