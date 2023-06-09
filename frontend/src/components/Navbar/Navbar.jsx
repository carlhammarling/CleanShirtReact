import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import cleanShirtLogo from "../../styles/images/cleanShirtLogo.png";
import { useSelector } from "react-redux";
import DropDown from "../menus/DropDown/DropDown";
import DropDownItem from "../menus/DropDownItem/DropDownItem";

const Navbar = () => {
  const { totQty } = useSelector((state) => state.cart);

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header>
      <div className="top">
        <div className="topLeft">
            <div
              className="dropDownTrigger"
              onClick={() => {
                setToggleMenu((state) => !state);
              }}
            >
              <i className="dropDownBtn fa-solid fa-bars fa-lg"></i>
            </div>

          <div className="logo">
            <NavLink to="/">
              <img src={cleanShirtLogo} alt="Clean Shirt Logo" width="130" />
            </NavLink>
          </div>
        </div>
        <ul className="topRight">
          <li id="heart">
            <NavLink to="/profile" aria-label="Profile">
              <i className="fa-solid fa-user"></i>
            </NavLink>
          </li>
          {/* <li id="heart">
            <NavLink to="/likes" aria-label="Likes">
              <i className="fa-regular fa-heart"></i>
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/cart" aria-label="Saved items">
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
            {totQty > 0 ? <span>{totQty}</span> : <></>}
          </li>
        </ul>
      </div>
      <div className="search">
        <div className="logo">
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
        </div>
        <input type="search" placeholder="Search" />
      </div>
        <DropDown setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Navbar;
