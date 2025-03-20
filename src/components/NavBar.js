import React, { use } from 'react'
import logo from '../image/ReFeast.png'
import ReFeast from '../image/ReFeast .png'
import {Link} from 'react-router-dom'
import GoogleLog from './GoogleLog';
import { useAuth } from 'react-oidc-context';

function NavBar() {
  const auth =useAuth()
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
    <button className='login-button login-button-Link'>Login
      <div>
        <ul className='login-dropdown'>
            <li>
                <button className="m-4 signinManually" onClick={() => auth.signinRedirect()}>
                  Sign in Manually
                </button>
              </li>
              <li id='login-dropdown-or'>Or</li>
            <li><GoogleLog/></li>
        </ul>
      </div>
    </button>
      </div>
    </div>
  )
}

export default NavBar
