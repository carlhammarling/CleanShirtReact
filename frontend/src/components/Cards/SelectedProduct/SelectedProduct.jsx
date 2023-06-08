import React from "react";
import { Link } from "react-router-dom";
import "./SelectedProduct.scss";

const SelectedProduct = ({ item }) => {
  return (
    <article id={item.id} className="shopNow">
      <Link className="blocklink" to="/products"></Link>
      <img
        src={item.imgURL}
        alt="Man in Clean Shirt"
        style={{ width: "100%" }}
      />

      {/* <div className="btnShop"> */}
        <Link className="btnShop" to="/products">
          SHOP NOW <i className="fa-solid fa-angles-right"></i>
        </Link>
      {/* </div> */}
    </article>
  );
};

export default SelectedProduct;
