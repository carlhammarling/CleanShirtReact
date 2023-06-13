import React from "react";
import "./CartBanner.scss";

const CartBanner = () => {
  return (
    <article class="aboutBanner">
      <img
        src="https://images.pexels.com/photos/5746087/pexels-photo-5746087.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Clean T-shirt"
        style={{ width: "100%" }}
      />
      <section class="slogan border">
        <h1 class="light">CLEAN STYLE?</h1>
        <h1 class="medium">CLEAN CONSCIENCE?</h1>
        <h1 class="black">
          CHOOSE
          <span>CLEAN SHiRT!</span>
        </h1>
      </section>
    </article>
  );
};

export default CartBanner;
