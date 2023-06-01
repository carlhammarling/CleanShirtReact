import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.scss'
import cleanShirtLogo from '../../styles/images/cleanShirtLogo.png';


const Footer = () => {
  return (
    <footer>
        <div className="footTop">
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink> 
                </li>
                <li>
                    <NavLink to='/products'>Products</NavLink>
                </li>
                {/* <li>
                    <NavLink to='/references'>Reviews</NavLink>
                </li> */}
                <li>
                    <NavLink to='/about'>About</NavLink>
                </li>
                <li>
                    <NavLink to='/contact'>Contact</NavLink>
                </li>
                <li>
                    <NavLink to='/cart'>Cart</NavLink>
                </li>
            </ul>
            <img src={cleanShirtLogo} alt="Clean Shirt Logo" width="120" />
            <p>Free shipping over 100$ |  Terms & Conditions Security & Cookies |  Sign up for our newspaper.</p>
        </div>
        <div className="footBottom">
            
            <p>Ⓒ CLEAN SHiRT 2022</p>
        </div>

    </footer>
  )
}

export default Footer