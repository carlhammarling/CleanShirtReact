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
                icon={<i className="fa-solid fa-house fa-xs"></i>}
                text={" Home"}
                setToggleMenu={setToggleMenu}
              />
              <DropDownItem
                link={"/products"}
                icon={<i className="fa-solid fa-shirt fa-xs"></i>}
                text={"Products"}
                setToggleMenu={setToggleMenu}
              />
              <DropDownItem
                link={"/profile"}
                icon={<i className="fa-solid fa-user fa-xs"></i>}

                text={"Profile"}
                setToggleMenu={setToggleMenu}
              />
              <DropDownItem
                link={"/cart"}
                icon={<i className="fa-solid fa-cart-shopping fa-xs"></i>}

                text={"Cart"}
                setToggleMenu={setToggleMenu}
              />
              <DropDownItem
                link={"/contact"}
                icon={<i className="fa-solid fa-paper-plane fa-xs"></i>}
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
