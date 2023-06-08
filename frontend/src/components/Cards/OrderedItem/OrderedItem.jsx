import React from "react";
import "./OrderedItem.scss";
import { Link } from "react-router-dom";

const OrderedItem = ({ product }) => {
  return (
    <div className="orderedProdCard">
      <div className="imageContainer">
        <Link className="blocklink" to={`/reviewproduct/${product.product._id}`}></Link>
        <img src={product.product.imgURL} alt={product.product.name} />
        <div className="reviewBtn">
          review <i className="fa-solid fa-pen fa-xs"></i>
        </div>
      </div>
      <div className="prodBot">
        <div className="prodInfo">
          <p>Quantity: {product.quantity}</p>
          <p>{product.size}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderedItem;
