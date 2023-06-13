import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SelectedProduct2.scss";

const SelectedProduct2 = ({ gender, setGender }) => {
  //Create a fetch and setImg to that array to be avble to loop different products.
  const [img, setImg] = useState([
    {
      id: "shopBanner1",
      imgURL:
        "https://images.pexels.com/photos/1550049/pexels-photo-1550049.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "shopBanner2",
      imgURL:
        "https://images.pexels.com/photos/6930504/pexels-photo-6930504.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "shopBanner3",
      imgURL:
        "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if(!gender) {
      setSelectedImage(img[1]);

    } else {
      setSelectedImage(img[2]);
    }
  }, [gender]);

  if (!selectedImage) {
    return;
  }
  return (
    <button className="shopNow2" onClick={() => setGender(state => !state)}>
      <img
        src={selectedImage.imgURL}
        style={{ width: "100%" }}
      />

      <div className="btnShop" to="/products">
        {/* SHOP NOW  */}
        SHOP FOR {gender ? 'WOMEN' : 'MEN' } <i className="fa-solid fa-angles-right"></i>
      </div>
    </button>
  );
};

export default SelectedProduct2;
