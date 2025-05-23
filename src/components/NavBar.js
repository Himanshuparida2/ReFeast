import React from 'react'
import logo from '../image/ReFeast.png'
import ReFeast from '../image/ReFeast with outline.png'
import {Link} from 'react-router-dom'
import GoogleLog from './GoogleLog';
import { useAuth } from 'react-oidc-context';
import {useCurrentPage} from '../context/currentpage';

function NavBar() {
  const auth =useAuth()
  const [isOpen, setIsOpen] = React.useState(false);
  // eslint-disable-next-line
  let {currentPage,setCurrentPage} = useCurrentPage();
  return (
    <div>
      <div className='navbar'>
        <img src={logo} className='logo' alt="logo" />
        <img src={ReFeast} className='ReFeast' alt="ReFeast" />
        <ul className='navbar-list'>
            <li><Link className='nav-ele nav-ele-1' onClick={()=>{setCurrentPage('home')}} to='/'>Home</Link></li>
            <li><Link className='nav-ele nav-ele-2' to='/menu'>Menu</Link></li>
            <li><Link className='nav-ele nav-ele-3' onClick={()=>{setCurrentPage('about-us')}} to='/'>About Us</Link></li>
            <li><Link className='nav-ele nav-ele-4' onClick={()=>{setCurrentPage('contact-us')}} to='/'>Contact Us</Link></li>
        </ul>
    <button className='login-button login-button-Link' onClick={() => { isOpen?setIsOpen(false):setIsOpen(true) }}>Login
      <div>
        <ul className='login-dropdown' style={{ display: isOpen ? 'block' : 'none' }}>
            <li style={{cursor:"pointer"}}>
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
