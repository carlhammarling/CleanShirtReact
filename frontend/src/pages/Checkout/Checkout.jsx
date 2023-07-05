import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Checkout.scss";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Context } from "../../contexts/Context";
import CheckoutItem from "../../components/Cards/CheckoutItem/CheckoutItem";
import DeliveryInfo from "../../components/DeliveryInfo/DeliveryInfo";
import axios from "axios";
import { clearCart } from "../../store/features/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, totAmount, totQty } = useSelector((state) => state.cart);
  const { userData, token, getUserData } = useContext(Context);

  if (!userData) {
    return <Navigate to="/signin" />;
  }

  //setting payment
  const [activePayment, setActivePayment] = useState(null);
  const [showMsg, setShowMsg] = useState(null);
  const handlePaymentMethod = (paymentMethod) => {
    setActivePayment(paymentMethod);
  };

  //Free delivery over 5€
  const [delivery, setDelivery] = useState("5");
  useEffect(() => {
    if (totAmount > 100) {
      setDelivery(0);
    } else {
      setDelivery(5);
    }
  }, [totAmount]);

  //Structuring order before sending to API
  const [order, setOrder] = useState({
    orderLine: [],
  });

  //Updating order when cart is updated
  useEffect(() => {
    const orderLineInfo = cart.map((item) => ({
      product: item.product._id,
      size: item.product.size,
      price: item.product.price,
      quantity: item.quantity,
    }));

    setOrder((prevOrder) => ({
      ...prevOrder,
      orderLine: orderLineInfo,
      subTotal: totAmount,
      delivery,
      totalPrice: totAmount + delivery,
      payment: activePayment,
    }));
  }, [cart, activePayment]);

  //Placing order
  const [success, setSuccess] = useState(false);

  const placeOrder = async (e) => {
    e.preventDefault();

    if (order.orderLine.length == 0) {
      console.log("You can not place and empty order");
      return;
    }

    //Checking that a payment method is choosen
    if (activePayment == null) {
      setShowMsg("Please choose a payment method.");
      console.log("You have to choose a payment method");
      return;
    }

    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.adress ||
      !userData.postalCode ||
      !userData.city ||
      !userData.country ||
      !userData.mobile
    ) {
      setShowMsg("Please update your delivery info.");
      console.log("You have to update your profile");
      return;
    }

    try {
      const res = await axios.post("/api/cart", order, {
      // const res = await axios.post("http://localhost:8080/api/cart", order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) {
        setShowMsg(null);
        dispatch(clearCart());
        setSuccess(true);
        getUserData();
        setTimeout(() => {
          setSuccess(false);
          navigate("/ordersuccess");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!userData) {
    return;
  }
  return (
    <main className="checkout">
      <article id="output">
        <section className="myOrderList">
          <div className="myOrderHeader">
            <h1>
              My order <i className="fa-solid fa-cart-shopping fa-xs"></i>
            </h1>
            <Link to="/cart" className="editBtn">
              edit <i className="fa-solid fa-pen fa-xs"></i>
            </Link>
          </div>
          {cart &&
            cart.map((item) => <CheckoutItem key={item.id} item={item} />)}
          <div className="orderSum">
            <p>{totQty} products</p>
            <p>{totAmount}.00 €</p>
          </div>
        </section>

        <DeliveryInfo />

        <section className="paymentMethod">
          <h2>
            Payment method <i className="fa-solid fa-credit-card fa-xs"></i>
          </h2>
          <div className="paymentOptions">
            <img
              src="data:image/png;base64,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"
              alt="Visa"
              className={activePayment === "visaMastercard" ? "active" : ""}
              onClick={() => handlePaymentMethod("visaMastercard")}
            />
            <img
              src="data:image/png;base64,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"
              alt="Paypal"
              className={activePayment === "paypal" ? "active" : ""}
              onClick={() => handlePaymentMethod("paypal")}
            />
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZ4AAAB6CAMAAAC4AMUdAAAAYFBMVEX///8FwMcAvMP4/f7i9faj4uW46OrV8fKH2d1p0NUaw8rp+fk5xs3D6uxMy9AAusJ61trx+/taztNj0NVDyc/a8/SZ3uKO29+t5Oe+6uzW8vPL7vB+19up4+a66Ovt+vrgFxb8AAAMr0lEQVR4nO1d6YKyMAyUersoHojnfvv+b/m5umCmTUqxFHW381OwlE6PZJqGXu+K+TJNkvx86kW8Hg6JUsk31CwS9HI437i5IiueXZsIBGUn8vNqmAM7lwlu/OwaRRAkOtJn1yjiDn3wXKa3aB68DpYGPcnk2XWKqJAb7CT5s+sUUcFkJ5kZN61Oo9G4/4Ta/Xk40HPIM3VBto6LUudgJrcF3LDKq9Up2zypkn8XZ5OeHb3+hQMrznDd4mQa1lt6Ha+p6BR1jJnVcNtoF1XUfLrFKdMIGJCLe2NsqadV9I+iAH6yPbn0YfqsavS0iv5RDAkJirJjTnyXG6bPquafxTb9GUBZTmc2TvCJiukzcNwtZul6BzZb75Ax7Jiawmh6GWT5ZKv/HhEUK27sGKPns9wIzxYf3o/cnvN0s6+/j8F8maabT+8avA9Slh1t7VnTjfCD5xOX1+GqZs15/kqv9VDJ3LMKb4MdP3jQdljgRrhf40yrwlYN/3m3MLM/Yljq7lBFD71Jp1A1bVfhieuGfyUWZjaov/390efJQdXgaAwwH810QZ7y1eif1HlWf0K2XfBTG9pt5uWsWbsCaBv/a1ZZ6EB/QLUdCuwoumqvmeuP2059MpuqYaO/QmXV77fwtxI71C74ZG5Sy4efCfQ0Yxnp+f2bhoyYcwWd1wcshQuxzDp4jB6o7u+3DaYCOwm9iafwKfQsxUr+Rog2NY0fZfW41ia3ZvRs6V9//YYULxckim5y83rck0wD6CsPV+BNMBAGD91FFfS4JHvcL/Whh2hLHpb9e4CzyBJNEWDie654fG7zo+fiCVxqrbLp73d6Jvy4oHqnoMcliUfr+NHT682LYvTrh05Pt4O4cTGWbAcfl8OXnr8CdvTUiDm3Rj37PDbS4wZu7QFfjxFzrvDb5o70uIGx3KC5BNOhqcysI9LjCMPvUVQLkOxu342wSI8jTNWAGmSSHucbYBXpccUUpy84zciLOYm/tx7pcQZsxmVUqBHEHC1u/hFEetxBch0o6o9KYk4LQiTQ80Aw1WlYjFrTDA7DYU1Yy2BffDpsXXwd54d/h/lYDD4anC43zE/bZnbVcX09EaeSCbyyIOaox/cRKlB6kllKsZieh3O7mvcvuVZ3Z145nad1mGju9PD26pYd9dX6cl2ptbVS80mubq34jfR80HrPaj+dVdczlevVsKI/HxZ7LQVFCDGnep4wbf50AJXNLBmZCiX0k35uLfb2p0SltHeXy2smTrH3M2lipx8sld5YSk2P9xsOi0y/QyVnn73EsTS1tbF/bKfnp/pCg91VJn38SHamgXsHG1WFiQvq3fUQXPGvNfs2Klv8tP98xrdlNn1c85darZVECA70fBPEeldkzsVAHSmkxfYO5Fch3m4urMz3x2bic28P2sgv+8i6e0UYMaeEEz2X2jNN1qcxWNBe0saHiUpUhK1XvqpENGbD6ja2TqHS/pfl8vcAeqj9Aok5JRzpuTSkMfxpVAra5I5FJoQJmsVG8UsBjaszk0D0cvuQVXUTLtcDaxFKzCnhTI9piMj0OC89d7fam56164Qq4pEjbqHEnBIN6NFnU5kefu+KQ2Xy+dJTeLOjKQFOCCbmlGhAj26LyPR8uBZ6/5snPXz4X1M0XTDCiTklGtCjN5tMD7GSa1D9w5Med2PEhobLjyjmtCeOAT0KYTwXa2+hpzfOM8VBe4+7NetHj6H2X5/EvcL9TbnrzSLFA4o5JVBzGxAcD4V+YAIjdW30XAoecMDyiHnsRw8clri4acXxascM9ilLULb+d53G+qcJXm9kHYQUc0oAPYYeuVpit4TVx04PCy1OmVzxogfXugwCN5nmm5Ex0sdtnMy9aYOKOVX1rPQYWTXppeb04JIE0cle9BTQwuhyfJjsYLEwgNzFA/GkXKtZLevo6Y1gE4o2XGN6cClFnc6LHogD0AOXjJzHunkGS4jzKb+wYk6JWnqg9tC5GtOD0RT4Hj70oPVp/V+iJWa7vof97zwCizkl6uk50IrQrtmUHlxKtffwoQeyr5lzCw4f5qAndEC3vYXQYk6Jenqo8gkHiRrSg0Gu+nv40APZiZh07fBgZvKB/7tliQgt5pSopweqQpulIT329/Chh6aW5NRuWFyYnV2wwZziAyTVilFq/eBAD10E6ds3o0fLIKhf9qFnLV34AW1MLvPaig4vl9Me4cWcEg70UM/gYXowg6DpnfvQQ00OzvKidjf7rQpVU4CGDsScEg700M5H3bYm9GAGQSbCyIceMvuyxzg/68qm07eDItOBmFOiIT00w0ITetCmZhLe+9BDi+aOa4zqyqa1q0/GL4k5ITJvdEMPSltcDqC26OF8dqCHC32j9NS6lZ2IOSU6oQfTQrMZzt6Gnm7EnOppHdCjvRFrG70NPd2IOSW6oAffiPcNXoaemrWnIzGnRAf04BsJ2V3ehJ6uxJwS4enRbGrhxjehpysxp0R4euCNRN/gPejpTMwpEZwe/ACouNH7FvT8k6a2YOm4QtOj2dSib/Ay9Fhcf1cxZ3U6HFpS3wLT08eFR07B8A70SEmpMIBplN6ClJZtDKnA9GCsj2WKfgN6nCJzPu6xQdyptKYISw+eJMksicxfnx7zi1g/JdIJG/KNPhRUj2hKD/G+6ulBL8Gadc6BHioUd0+Pk5ijrU4tfDeG0sNv5MJ+TyN60Euw9iWgh19XRemlVXqkWjqJOfpWg2eCfnw3oXvTSaXRfo8Wv2/V2+nUIWi/tKxcuhCKHjGHNRVzzNXJ2yGiPZwXXaE25Pc6euYY+2HX26EwNhYQjECYNTqgRxRz6DlyZnXy3t6m45Gdd2E+bRAKogUd1ujtEKvG2t+w6kJpHdDjIuawq5Nv5glY+LkbIM5NSqnN0IPRf7V6O72ZnRIgYmAv/TUMPVIOa6go94UFb+MANuI52wBCbGhnsNODx9Xq9Xa69LJTAu3ASvzIaxB6nMQcfnXy/fQHzBlMH4dZFxZtKz1btKnr9XZKJ9fnYGLHYd4qPUx7Ook5W5ZCf9MaSjMXZbAVoVms9OBk7dCH4LM3mRnuBAViFw9Nj3AiH71OYXXyznoEIrnhcqDgDHW30SMf5BGB/9CjRcDt0HpRYHqkk7IQmSOsTmxYXSOgOagtP3g4CWUFCz04WatjzwE7fDH4Tx+XXS1kKTA9cHqIlEQn+r1AYQsbQTgs1bp6bH9ofZhMjzZZuwVPap00m1YD+Us/Fa8Fk9BLAejh9QIQPJnvNN9uamGPe6SVrZL1pCiKZaqnqNHmFJkeTdtY8JhqddemeKWSzaUeu+lM75m6tEqvBaCHX1XS+lva0ETFws0OoY1UkR7HFBBKYSIYYY43C9O9VnqtK3rAUzhLL9xK3KiUXl6vkbbMSfSs3Ir7BhIubqho0OtPrwWghwuphsicuWQ7tBQ3OnFpF0OWkeiRQsG4MtHuFLYjEaZ4R68GoIceHypB3RnRLWphO+6GBf8AgCHISfS4Z9TR/WDpRSky05OglwPQwyidMOqljCQtxo3W91szgkWiZ+o+enSVrz41Tsa0P73uSw/n5huLj4OYk/h97FdHTb4tzgahfZ1akDu5GBNamWYWAq0enBdOm4+7Trf62LwSdPJg1HLj6D2YqULDeX/KHGFdl5kZpYcfZSaGjPQRPAZmVsO+tZ/wi+2y5gbaj1g/kXQo1lNBywwrrbsl5U0en7xiseXzz1yQ5fzmPzmQCDV2Tw+VMXrCiDGly1fmDVWiRvJe+l1x4Xf6vu5P5BNl0tw12kQiTOUB4kZPbHpjlYv24b2nQ7v1hXy3Jju8YPjJ/V9lSzHQp+rdHN0XrKpShBjQonxxKThgVCavUrq6yK/atqCkx/FR5N9ZtG5V+c7orfLC9qBbNIFK9VXwzGYL05DNxOl5PPnOBF4No8vN673Nxbvxo0RH4+NalMpEL35348dy0GC/SLJM5UO9Giw72iDd7hbpbLFrI3K0P97vputFvlhPd/txndu7nawXS67Hbce1sHew1Wk4udZjsyxGtS92nM6SvLDU9jNPZhtL3MxgOUvSnd3Y6nPls5oCKvvlpJTlv//D4q+GDUcPveFT8D8iugDj9sBePGookZ+OYSod4Jvpe9zMPnBESOgaFp4wMwy7YCe1Injo9FAD4mi4KkHSH0TIQCEKozWYr9F6fWY2ojm+yJmeGQosjIASJgFChAX72ffGvzK/dMR4RcL3VSJCYrAvir3pdZrstPd9hQhvMIpcnNxeB8xGeNs7DRGPw9wIF06IRjwFhm0Q3dJXgj58olf6WthhuHmQpHwRj4MGcUR2Xg+nn735i9cazYJXxOmcJ0l+juS0g/9lRJUXBhggugAAAABJRU5ErkJggg=="
              alt="Bizum"
              className={activePayment === "bizum" ? "active" : ""}
              onClick={() => handlePaymentMethod("bizum")}
            />
          </div>
        </section>

        <section className="placeOrder">
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
          {showMsg ? (
            <div className="errorMsg">
              <p>{showMsg}</p>
            </div>
          ) : (
            <></>
          )}

          {success ? (
            <button className="bigAddBtn">
              ORDER PLACED <i className="fa-solid fa-circle-check"></i>
            </button>
          ) : (
            <button className="bigAddBtn" onClick={placeOrder}>
              PLACE ORDER <i className="fa-solid fa-cart-shopping"></i>
            </button>
          )}
        </section>
      </article>
    </main>
  );
};

export default Checkout;
