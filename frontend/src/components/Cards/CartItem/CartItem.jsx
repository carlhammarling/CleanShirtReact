import React from "react";
import "./CartItem.scss";
import { removeOneProduct, incrementOneProduct, decrementOneProduct } from "../../../store/features/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="cartItem">
      <img src={item.product.imgURL} alt="Shirt" />
      <div className="itemRight">
        <h3>{item.product.name}</h3>
        <p>{item.product.description}</p>
        <p id="price">Price: {item.product.price}.00 €</p>
        <p id="size">Size: {item.product.size}</p>

        {/* Change quantity */}

        <div className="quantity">
          <p id="qty">Quantity:</p>
          <button onClick={() => dispatch(decrementOneProduct(item))}>
          <i class="fa-solid fa-minus"></i>
          </button>
          <p id="qty">{item.quantity}</p>

          <button onClick={() => dispatch(incrementOneProduct(item))}>
          <i class="fa-solid fa-plus"></i>
          </button>
        </div>


      </div>
      <button onClick={() => dispatch(removeOneProduct(item))}>
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
};

export default CartItem;
