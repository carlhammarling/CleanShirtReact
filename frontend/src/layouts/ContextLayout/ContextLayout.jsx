import React from "react";
import UserContextProvider from "../../contexts/UserContext";
import { Outlet } from "react-router-dom";

const ContextLayout = () => {
  return (
    <>
      <UserContextProvider>
        <Outlet />
      </UserContextProvider>
    </>
  );
};

export default ContextLayout;