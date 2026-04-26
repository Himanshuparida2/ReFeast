import React from 'react'
import logo from '../image/ReFeast.png'
import ReFeast from '../image/ReFeast with outline.png'
import {Link, Route} from 'react-router-dom'
import GoogleLog from './GoogleLog';
import { useAuth } from 'react-oidc-context';
import {useCurrentPage} from '../context/currentpage';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const auth =useAuth()
  const [isOpen, setIsOpen] = React.useState(false);
  // eslint-disable-next-line
  let {currentPage,setCurrentPage} = useCurrentPage();
  const navigate = useNavigate();
  return (
    <div>
      <div className='navbar' onMouseLeave={()=>setIsOpen(false)}>
        <img src={logo} className='logo' onClick={()=>navigate('/')} alt="logo" />
        <img src={ReFeast} className='ReFeast' onClick={()=>{navigate('/')}} alt="ReFeast" />
        <ul className='navbar-list'>
            <li><Link className='nav-ele nav-ele-1' onClick={()=>{setCurrentPage('home')}} to='/'>Home</Link></li>
            <li><Link className='nav-ele nav-ele-2' to='/foodlist'>Menu</Link></li>
            <li><Link className='nav-ele nav-ele-3' onClick={()=>{setCurrentPage('about-us')}} to='/'>About Us</Link></li>
            <li><Link className='nav-ele nav-ele-4' onClick={()=>{setCurrentPage('contact-us')}} to='/'>Contact Us</Link></li>
        </ul>
    <button className='login-button login-button-Link' onMouseEnter={() => { setIsOpen(true) }}>Login
      <div>
        <ul className='login-dropdown' style={{ display: isOpen ? 'block' : 'none' }} onMouseOver={() => { setIsOpen(true) }} onMouseLeave={() => { setIsOpen(false) }}>
            <li style={{cursor:"pointer"}}>
                <div className="m-4 signinManually" onClick={() => auth.signinRedirect()}>
                  Sign in Manually
                </div>
              </li>
            <li><GoogleLog/></li>
        </ul>
      </div>
    </button>
      </div>
    </div>
  )
}

export default NavBar
