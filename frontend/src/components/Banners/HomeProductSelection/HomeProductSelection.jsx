import React, { useState } from "react";
import "./HomeProductSelection.scss";
import SelectedProduct from "../../Cards/SelectedProduct/SelectedProduct";

const HomeProductSelection = () => {

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

  return (
    <div className="HomeProductSelection">
      {img && img.map((item) => <SelectedProduct key={item.id} item={item} />)}
    </div>
  );
};

export default HomeProductSelection;
