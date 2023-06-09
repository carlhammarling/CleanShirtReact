import React from 'react'
import { NavLink } from 'react-router-dom'

const DropDownItem = (props) => {
  return (
    <li>
        <NavLink to='/'>{props.text}</NavLink>
    </li>
  )
}

export default DropDownItem