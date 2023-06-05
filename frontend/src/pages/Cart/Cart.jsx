import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.scss";
import CartItem from "../../components/Cards/CartItem/CartItem";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);

  console.log(cart);

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
            <p id="subTotal">24.00€</p>
          </div>
          <div className="priceSum">
            <p>Delivery</p>
            <p id="deliveryCost">5</p>
          </div>
          <div className="priceSum total">
            <p>Total amount (incl. VAT)</p>
            <p id="totalSum">29.00€</p>
          </div>

          <button>
            GO TO CHECK OUT <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </section>
      </article>
    </main>
  );
};

export default Cart;
