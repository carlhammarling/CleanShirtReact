import React from "react";
import "./YellowHomeBanner.scss";

const YellowHomeBanner = () => {

  return (
    <article className="homeBanner">
      <section className="slogan border">
        <h1 className="light">CLEAN STYLE?</h1>
        <h1 className="medium">CLEAN CONSCIENCE?</h1>
        <h1 className="black">
          CHOOSE
          <span>CLEAN SHiRT!</span>
        </h1>
      </section>
      <section className="bottom">
        <img
          id="girlPower"
          src='https://images.pexels.com/photos/3702587/pexels-photo-3702587.jpeg?auto=compress&cs=tinysrgb&w=800'
          alt="Woman in Clean Shirt"
          style={{ width: "100%" }}
        />
        <img
          id="hangOut"
          src="https://images.pexels.com/photos/1036804/pexels-photo-1036804.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Hang out with clean style"
          style={{ width: "100%" }}
        />
      </section>
    </article>
  );
};

export default YellowHomeBanner;
