import React from "react";
import { BeatLoader } from "react-spinners";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <BeatLoader color="#767676" />
    </div>
  );
};

export default Loading;
