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

  const handleLinkClick = (e) => {
    e.stopPropagation(); // Stop the event from further propagation
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
          <section className="aboutProject">
            <h1>
              <span>
                <i className="fa-solid fa-angles-right fa-xs"></i>
              </span>
              About This Project
              <span>
                <i className="fa-solid fa-angles-left fa-xs"></i>
              </span>
            </h1>

            <p>
              Hi! My name is Carl, a frontend developer student with fullstack
              ambitions. I just completed the first year of KYH's 2 year
              program.
            </p>
            <div className="connect">
              <a
                href="https://www.linkedin.com/in/carl-hammarling-66b084229/"
                target="_blank"
                onClick={handleLinkClick}
              >
                <i className="fa-brands fa-linkedin blue"></i>
              </a>
              <a
                href="https://github.com/carlhammarling"
                target="_blank"
                onClick={handleLinkClick}
              >
                <i className="fa-brands fa-square-github"></i>
              </a>
              <a
                href="https://wa.me/46793393457"
                target="_blank"
                onClick={handleLinkClick}
              >
                <i className="fa-brands fa-square-whatsapp green"></i>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
