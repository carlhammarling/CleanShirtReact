import React from "react";
import { Link } from "react-router-dom";
import "./EmptyCart.scss";
import CartBanner from "../Banners/CartBanner/CartBanner";

const EmptyCart = () => {
  return (
    <div className="noCart">
      <section className="cartInfo">
        <h1>
          <i className="fa-solid fa-cart-shopping fa-xl"></i>
        </h1>

        <h2>Your cart is empty.</h2>
        <h4>Once you have added products to the cart they will appear here.</h4>
      </section>
      <Link className="takeMeBack" to="/products">
        TAKE ME TO THE PRODUCTS
      </Link>
    </div>
  );
};

export default EmptyCart;
