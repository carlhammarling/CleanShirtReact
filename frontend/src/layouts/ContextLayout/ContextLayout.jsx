import React from "react";
import ContextProvider from "../../contexts/Context";
import { Outlet } from "react-router-dom";

const ContextLayout = () => {
  return (
    <>
      <ContextProvider>
        <Outlet />
      </ContextProvider>
    </>
  );
};

export default ContextLayout;
