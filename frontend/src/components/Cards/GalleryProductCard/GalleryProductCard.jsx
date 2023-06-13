import React from "react";
import "./GalleryProductCard.scss";
import { Link } from "react-router-dom";

const GalleryProductCard = ({ product }) => {
  return (
    <div className="prodCard">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.imgURL}
          alt="Clean blue."
        />
      
      <div className="prodBot">
        <h2>CLEAN SHiRT - {product.name}.</h2>
        <p>XS S M L XL XXL</p>
        <p className="price">{product.price}.00€</p>
      </div>
      </Link>
    </div>
  );
};

export default GalleryProductCard;
