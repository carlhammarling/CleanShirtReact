import React from "react";
import "./CheckoutItem.scss";
import { removeOneProduct, incrementOneProduct, decrementOneProduct } from "../../../store/features/cartSlice";
import { useDispatch } from "react-redux";

const CheckoutItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="cartItem">
      <img src={item.product.imgURL} alt="Shirt" />
      <div className="itemRight">
        <h3>{item.product.name}</h3>
        <p id="price">Price: {item.product.price}.00 €</p>
        <p id="size">Size: {item.product.size}</p>

        {/* Change quantity */}

        <div className="quantity">
          <p id="qty">Quantity:</p>
          <p id="qty">{item.quantity}</p>
        </div>


      </div>
    </div>
  );
};

export default CheckoutItem;
