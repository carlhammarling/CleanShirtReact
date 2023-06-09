import React from "react";
import "./CartItem.scss";
import {
  removeOneProduct,
  incrementOneProduct,
  decrementOneProduct,
} from "../../../store/features/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="cartItem">
      <img src={item.product.imgURL} alt="Shirt" />
      <div className="itemRight">
        <h3>{item.product.name}</h3>
        <p>{item.product.description.slice(0, 65)}</p>
        <p id="price">Price: {item.product.price}.00 €</p>
        <p id="size">Size: {item.product.size}</p>

        {/* Change quantity */}

        <div className="quantity">
          <p>Quantity: </p>
          <div className="qtySelect">
            <button onClick={() => dispatch(decrementOneProduct(item))}>
              -
            </button>
            <div className="qty">
              <p>{item.quantity}</p>
            </div>

            <button onClick={() => dispatch(incrementOneProduct(item))}>
              +
            </button>
          </div>
        </div>
      </div>
      <button
        className="removeProduct"
        onClick={() => dispatch(removeOneProduct(item))}
      >
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default CartItem;
