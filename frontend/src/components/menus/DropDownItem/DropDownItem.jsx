import React from 'react'
import { NavLink } from 'react-router-dom'
import './DropDownItem.scss'

const DropDownItem = ({ link, text ,icon, setToggleMenu }) => {
  return (
    <li className='menuLink'>  
        <NavLink className='light ' to={link} onClick={() => {
            setToggleMenu((state) => !state);
          }}>{icon} {text}</NavLink>      
    </li>
  )
}

export default DropDownItem