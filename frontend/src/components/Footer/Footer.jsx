import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.scss'
import cleanShirtLogo from '../../styles/images/cleanShirtLogo.png';


const Footer = () => {
  return (
    <footer>
        <div className="footTop">
            <ul>
                <li>
                    <Link to='/'>Home</Link> 
                </li>
                <li>
                    <Link to='/products'>Products</Link>
                </li>
                {/* <li>
                    <Link to='/references'>Reviews</Link>
                </li> */}
                <li>
                    <Link to='/profile'>Profile</Link>
                </li>
                <li>
                    <Link to='/cart'>Cart</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
                
            </ul>
            <img src={cleanShirtLogo} alt="Clean Shirt Logo" width="120" />
            <p>Free shipping over 100€ |  Terms & Conditions Security & Cookies |  Sign up for our newspaper.</p>
            
        </div>
        <div className="footBottom">
            
            <p>Ⓒ CLEAN SHiRT 2023</p>
        </div>

    </footer>
  )
}

export default Footer