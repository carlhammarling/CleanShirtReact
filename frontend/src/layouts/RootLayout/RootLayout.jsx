import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import './RootLayout.scss'

const RootLayout = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="siteFlex">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
