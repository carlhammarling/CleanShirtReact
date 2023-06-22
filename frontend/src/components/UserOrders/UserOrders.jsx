import React from "react";
import OrderedItem from "../Cards/OrderedItem/OrderedItem";
import "./UserOrders.scss";

const UserOrders = ({ shoppingCart }) => {
  console.log(shoppingCart);

  return (
    <section className="userOrders">
      <h2>
        My orders <i className="fa-solid fa-cart-shopping fa-xs"></i>
      </h2>

      <div className="orderWrapper">
        {shoppingCart &&
          shoppingCart.map((order) => (
            <div className="oneOrder" key={order._id}>
              <div>
                <h3>Order number: </h3>
                <p>{order._id}</p>
              </div>

              <div className="orderInfo">
                <div>
                  <h4>Order date:</h4>
                  <p>{order.createdAt && order.createdAt.slice(0, 10)}</p>
                </div>
                <div>
                  <h4>Total price: </h4>
                  <p>{order.totalPrice}.00€</p>
                </div>
                <div>
                  <h4>Status: </h4>
                  <p>Delivered</p>
                </div>
              </div>
              <div className="orderedItems">
                {order.orderLine &&
                  order.orderLine.map((line) => (
                    <OrderedItem key={line._id} product={line} />
                    // <p>{line.product}</p>
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UserOrders;
