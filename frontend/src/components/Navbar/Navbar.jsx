import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import cleanShirtLogo from "../../styles/images/cleanShirtLogo.png";
import { useSelector } from 'react-redux'

const Navbar = () => {

  const { totQty } = useSelector(state => state.cart) 

  return (
    <header>
      <div className="top">
        <div className="topLeft">
          <nav data-dropdown>
            <button aria-label="Menu" className="link" data-dropdown-button>
              <i className="fa-solid fa-bars fa-sm" data-dropdown-button></i>
            </button>
            <div className="dropDownMenu">
              <ul>
                <li>
                  <a href="./index.html">Home</a>
                </li>
                <li>
                  <a href="./products.html">Products</a>
                </li>
                <li>
                  <a href="./references.html">Reviews</a>
                </li>
                <li>
                  <a href="./about.html">About</a>
                </li>
                <li>
                  <a href="./contact.html">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="logo">
            <NavLink to='/'><img src={cleanShirtLogo} alt="Clean Shirt Logo" width="130" /></NavLink>
            {/* <img src={cleanShirtLogo} alt="Clean Shirt Logo" width="130" /> */}
          </div>
        </div>
        <ul className="topRight">
          <li id="heart">
            <NavLink to="/likes" aria-label="Likes">
              <i className="fa-regular fa-heart"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" aria-label="Saved items">
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
            { (totQty > 0) ? <span>{totQty}</span> : <></>
            }
            

          </li>
        </ul>
      </div>
      <div className="search">
        <div className="logo">
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
        </div>
        <input type="search" placeholder="Search" />
      </div>
    </header>
  );
};

export default Navbar;
