import React, { useContext, useState } from "react";
import "./ProfileForm.scss";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";

const ProfileForm = ({ setShowEdit }) => {
  const { userData, setUserData, token } = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  const [updatedProfile, setUpdateProfile] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    adress: userData.adress,
    postalCode: userData.postalCode,
    city: userData.city,
    country: userData.country,
    mobile: userData.mobile,
  });

  const changeHandler = (e) => {
    e.preventDefault();

    setUpdateProfile((prevProfile) => {
      return { ...prevProfile, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field was updated
    const hasUpdates = Object.keys(updatedProfile).some((field) => {
      return updatedProfile[field] !== userData[field];
    });

    if (!hasUpdates) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setShowEdit((state) => !state);
      }, 1000);
      return;
    }
    //If it has updates, do the patch
    axios
      .patch("http://localhost:8080/api/users/update", updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setUserData(res.data);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setShowEdit((state) => !state);
          }, 1000);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="label" htmlFor="firstName">
          First name:
        </label>
        <input
          className="input"
          type="text"
          name="firstName"
          onChange={changeHandler}
          value={updatedProfile.firstName}
        />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="lastName">
          Last name:
        </label>
        <input
          className="input"
          type="text"
          name="lastName"
          onChange={changeHandler}
          value={updatedProfile.lastName}
        />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="adress">
          Adress:
        </label>
        <input
          className="input"
          type="text"
          name="adress"
          onChange={changeHandler}
          value={updatedProfile.adress}
        />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="postalCode">
          Postal Code:
        </label>
        <input
          className="input"
          type="text"
          name="postalCode"
          onChange={changeHandler}
          value={updatedProfile.postalCode}
        />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="city">
          City:
        </label>
        <input
          className="input"
          type="text"
          name="city"
          onChange={changeHandler}
          value={updatedProfile.city}
        />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="country">
          Country:
        </label>
        <input
          className="input"
          type="text"
          name="country"
          onChange={changeHandler}
          value={updatedProfile.country}
        />
      </div>
      <div className="input-group">
        <label className="label" htmlFor="mobile">
          Mobile:
        </label>
        <input
          className="input"
          type="text"
          name="mobile"
          onChange={changeHandler}
          value={updatedProfile.mobile}
        />
      </div>

      {success ? (
        <button>
          UPDATED <i className="fa-solid fa-circle-check"></i>
        </button>
      ) : (
        <button className="btnShop" id="send">
          UPDATE PROFILE
        </button>
      )}
    </form>
  );
};

export default ProfileForm;
