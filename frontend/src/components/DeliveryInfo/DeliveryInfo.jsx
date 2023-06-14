import React, { useState, useContext } from "react";
import { Context } from "../../contexts/Context";
import ProfileForm from "../forms/ProfileForm/ProfileForm";
import "./DeliveryInfo.scss";

const DeliveryInfo = () => {
  const { userData } = useContext(Context);
  const [showEdit, setShowEdit] = useState(false);

  if (!userData) {
    return;
  }
  return (
    <section className="deliveryInfo">
      <div className="deliveryInfoHeader">
        <h2>
          Delivery info <i className="fa-solid fa-house fa-xs"></i>
        </h2>

        <button
          className="editBtn"
          onClick={() => setShowEdit((state) => !state)}
        >
          edit <i className="fa-solid fa-pen fa-xs"></i>
        </button>
      </div>

      {showEdit ? (
        <ProfileForm setShowEdit={setShowEdit} />
      ) : (
        <div className="deliveryInfoOptions">
          <p>
            Name: {userData.firstName} {userData.lastName}
          </p>
          <p>Adress: {userData.adress}</p>
          <p>Postal Code: {userData.postalCode}</p>
          <p>City: {userData.city}</p>
          <p>Country: {userData.country}</p>
          <p>Mobile: {userData.mobile}</p>
        </div>
      )}
    </section>
  );
};

export default DeliveryInfo;
