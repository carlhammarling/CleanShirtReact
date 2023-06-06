import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.scss";
import CartItem from "../../components/Cards/CartItem/CartItem";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Cart = () => {
  const { cart, totAmount } = useSelector((state) => state.cart);
  const { user } = useContext(UserContext)
  const [delivery, setDelivery] = useState('5')


  useEffect(() => {
    if(totAmount > 100) {
      setDelivery(0)
    } else {
      setDelivery(5)
    }
  }, [totAmount])


  return (
    <main className="cart border">
      <article id="output">
        <h1>Shopping cart </h1>

        <section id="cartList">
          {cart &&
            cart.map(item => <CartItem key={item.id} item={item} />)}
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

          <Link className="bigAddBtn" to={ user ? '/checkout' : '/login'}>
            GO TO CHECK OUT <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </section>
      </article>
    </main>
  );
};

export default Cart;
