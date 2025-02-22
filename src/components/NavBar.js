import React from 'react'
import logo from '../image/ReFeast.png'
import ReFeast from '../image/ReFeast .png'
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <div className='navbar'>
        <img src={logo} className='logo' alt="logo" />
        <img src={ReFeast} className='ReFeast' alt="ReFeast" />
        <ul className='navbar-list'>
            <li><Link className='nav-ele nav-ele-1' to='/'>Home</Link></li>
            <li><Link className='nav-ele nav-ele-2' to='/menu'>Menu</Link></li>
            <li><Link className='nav-ele nav-ele-3' to='/about-us'>About Us</Link></li>
            <li><Link className='nav-ele nav-ele-4' to='/contact-us'>Contact Us</Link></li>
        </ul>
    <button>Login</button>
      </div>
    </div>
  )
}

export default NavBar
