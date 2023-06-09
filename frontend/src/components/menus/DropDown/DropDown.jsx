import React, { useRef } from "react";
import "./DropDown.scss";

const DropDown = ({ setToggleMenu, toggleMenu }) => {

const menuWrapper = useRef()

const closeMenu = (e) => {
    e.preventDefault()

    if(e.target == menuWrapper.current) {
        setToggleMenu((state) => !state);
    }
}



  return (
    <div className={`menuWrapper ${toggleMenu ? 'active' : 'inactive'}`} ref={menuWrapper} onClick={closeMenu}>
            <div class={`dropDownMenu ${toggleMenu ? 'active' : 'inactive'}`}>
                <h2>This is a modal.</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium placeat voluptate dignissimos magni eveniet repellendus aliquid alias voluptatum rem aut nulla quos tenetur, incidunt fuga, culpa aperiam quas qui voluptatibus.
                    Iure iusto sapiente ratione pariatur reprehenderit. Enim repudiandae eos quaerat asperiores expedita itaque, nulla autem possimus recusandae, consequuntur, tenetur eum eveniet ad adipisci debitis. Laborum accusantium enim exercitationem architecto officia?
                </p>
                <button onClick={() => {
                  setToggleMenu((state) => !state);
                }}>CLOSE MODAL</button>
            </div>

        </div>
  );
};

export default DropDown;
