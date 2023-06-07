import React from "react";
import "./Profile.scss";
import ProductsBanner from "../../components/Banners/ProductsBanner/ProductsBanner";
import ProfileForm from "../../components/forms/ProfileForm/ProfileForm";

const Profile = () => {
  return (
    <div className="products">
      <ProductsBanner />
      <article>
        <h1>My account</h1>
        <ProfileForm />
      </article>
    </div>
  );
};

export default Profile;
