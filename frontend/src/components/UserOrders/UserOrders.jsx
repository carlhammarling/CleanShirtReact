import React from "react";

const UserOrders = ({ shoppingCart }) => {


  return (
    <section>
      <h2>Orders</h2>

      {shoppingCart && shoppingCart.map(order => (
        <p key={order._id}>Date: {order.createdAt}</p> 
      ))}
    </section>
  );
};

export default UserOrders;
