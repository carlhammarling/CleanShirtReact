import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.scss";
import CartItem from "../../components/Cards/CartItem/CartItem";
import { Link } from "react-router-dom";
import EmptyCart from "../../components/EmptyCart/EmptyCart";

const Cart = () => {
  const { cart, totAmount } = useSelector((state) => state.cart);
  const [delivery, setDelivery] = useState("5");

  useEffect(() => {
    if (totAmount > 100) {
      setDelivery(0);
    } else {
      setDelivery(5);
    }
  }, [totAmount]);

  useEffect(() => {
    console.log(cart);
  }, []);

  return (
    <main className="cart">
      {cart.length == 0 ? (
        <EmptyCart />
      ) : (
        <article id="output">
          <h1>Shopping cart </h1>

          <section id="cartList">
            {cart && cart.length > 0 ? (
              cart.map((item) => <CartItem key={item.id} item={item} />)
            ) : (
              <p>It seems like your cart is empty.</p>
            )}
          </section>

          <section id="checkout">
            <h2>Total</h2>
            <div className="priceSum">
              <p>Sub-total</p>
              <p>{totAmount}.00 €</p>
            </div>
            <div className="priceSum">
              <p>Delivery</p>
              <p id="deliveryCost">{delivery}.00 €</p>
            </div>
            <div className="priceSum total">
              <p>Total amount (incl. VAT)</p>
              <p>{totAmount + delivery}.00 €</p>
            </div>

            <Link className="bigAddBtn" to={"/checkout"}>
              GO TO CHECK OUT <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </section>
        </article>
      )}
    </main>
  );
};

export default Cart;
