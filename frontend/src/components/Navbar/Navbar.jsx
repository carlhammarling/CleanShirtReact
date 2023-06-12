import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import cleanShirtLogo from "../../styles/images/cleanShirtLogo.png";
import { useSelector, useDispatch } from "react-redux";
import DropDown from "../menus/DropDown/DropDown";
import axios from "axios";
import { setFilteredResults } from "../../store/features/searchSlice";

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { totQty } = useSelector((state) => state.cart);
  const filteredResults = useSelector((state) => state.search)


  const [toggleMenu, setToggleMenu] = useState(false);
  const [input, setInput] = useState('')

  const fetchData = (value) => {
    axios.get("http://localhost:8080/api/products")
    .then((res) => {
      const results = res.data.filter((data) => {
        const categoryMatches = data.category && data.category.some((category) => {
          return category.toLowerCase().includes(value.toLowerCase());
        });

        return (
          ( data.name && data.name.toLowerCase().includes(value.toLowerCase())) ||
          (data.description && data.description.toLowerCase().includes(value.toLowerCase())) ||
          categoryMatches
        );
      })
      dispatch(setFilteredResults(results))
      navigate('/products');

      console.log(filteredResults)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleChange = (value) => {
    setInput(value)
    fetchData(value)
  }

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
        <input type="search" placeholder="Search" value={input} onChange={(e) => handleChange(e.target.value)} />
      </div>
        <DropDown setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
    </header>
  );
};

export default Navbar;
