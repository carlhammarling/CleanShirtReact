import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./SelectedProduct.scss";
import { Context } from "../../../contexts/Context";

const SelectedProduct = ({ item }) => {

  const { setGender, setSelectedSort } = useContext(Context)

  const categoryHandler = () => {
    if(item.id % 2 == 0) {
      setGender(true)
      setSelectedSort("")
    } else {
      setGender(false)
      setSelectedSort("")
    }
  }
  return (
    <article id={item.id} className="shopNow" onClick={categoryHandler}>
      <Link className="blocklink" to="/products"></Link>
      <img
        src={item.imgURL}
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
