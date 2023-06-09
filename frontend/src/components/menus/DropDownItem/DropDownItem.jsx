import React from 'react'
import { NavLink } from 'react-router-dom'
import './DropDownItem.scss'

const DropDownItem = ({ link, text , setToggleMenu }) => {
  return (
    <li className='menuLink'>  
        <NavLink className='light' to={link} onClick={() => {
            setToggleMenu((state) => !state);
          }}>{text}</NavLink>      
    </li>
  )
}

export default DropDownItem