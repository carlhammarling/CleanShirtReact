import React, { useRef } from "react";
import "./DropDown.scss";
import DropDownItem from "../DropDownItem/DropDownItem";

const DropDown = ({ setToggleMenu, toggleMenu }) => {
  const menuWrapper = useRef();

  const closeMenu = (e) => {
    e.preventDefault();

    if (e.target == menuWrapper.current) {
      setToggleMenu((state) => !state);
    }
  };

  return (
    <div
      className={`menuWrapper ${toggleMenu ? "active" : "inactive"}`}
      ref={menuWrapper}
      onClick={closeMenu}
    >
      <div className={`dropDownMenu ${toggleMenu ? "active" : "inactive"}`}>
        <button
          onClick={() => {
            setToggleMenu((state) => !state);
          }}
        >
          <i className="fa-solid fa-xmark fa-2xl"></i>
        </button>
        <div className="leftMenu">
          <nav>
            <ul>
              <DropDownItem
                link={"/"}
                text={"Home"}
                setToggleMenu={setToggleMenu}
              />
              <DropDownItem
                link={"/products"}
                text={"Products"}
                setToggleMenu={setToggleMenu}
              />
              <DropDownItem
                link={"/profile"}
                text={"Profile"}
                setToggleMenu={setToggleMenu}
              />
              <DropDownItem
                link={"/cart"}
                text={"Cart"}
                setToggleMenu={setToggleMenu}
              />
              <DropDownItem
                link={"/contact"}
                text={"Contact"}
                setToggleMenu={setToggleMenu}
              />
            </ul>
          </nav>
          <p>
            Are you lean? Are you real? Then you should go clean! When you
            choose Clean Shirt you choose an environmentaly friendly product
            that brings back wealth to the comunity where it is produced. The
            company shares are equally divided between all employees which means
            that when the company grows, our employees benefits economically as
            well. An attempt to make the world a little more fair.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
