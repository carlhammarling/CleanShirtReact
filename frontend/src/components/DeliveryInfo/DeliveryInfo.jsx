import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ProfileForm from "../forms/ProfileForm/ProfileForm";
import './DeliveryInfo.scss'

const DeliveryInfo = () => {
  const { userData } = useContext(UserContext);
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
        
        <button className="editBtn" onClick={() => setShowEdit(state => !state)}>
          edit <i className="fa-solid fa-pen fa-xs"></i>
        </button>
      </div>


      {showEdit ? (
        <ProfileForm />
      ) : (
        <div className="deliveryInfoOptions">
          <p>
            Name: {userData.firstName} {userData.lastName}
          </p>
          <p>Adress: {userData.adress}</p>
          <p>Postal code: {userData.postalCode}</p>
          <p>City: {userData.city}</p>
          <p>Country: {userData.country}</p>
          <p>Mobile: {userData.mobile}</p>
        </div>
      )}
    </section>
  );
};

export default DeliveryInfo;
