import React from 'react'
import insta from '../image/instagram.svg'

function Footer() {
  return (
    <div>
      <div style={{display:"flex"}}>
        <div>
            <h3>ReFeast</h3>
            <p>At Refeast, we believe no food should go to waste while people go hungry. Our platform connects individuals and organizations with surplus food to those in need — efficiently, responsibly, and with dignity. By enabling food sharing at the community level, we help reduce waste, fight hunger, and build a network of care and sustainability. Whether you're an individual with leftovers or an NGO seeking supplies, Refeast makes giving and receiving simple, safe, and impactful.</p>
        </div>
        <div id='contact-us-footer'>
            <h4>Contact Us</h4>
            <p>Email : himanshuparida27@gmail.com</p>
            <a href='https://www.instagram.com/refeastofficial/' style={{position:'absolute',alignItems:'center',display:'flex',cursor:'pointer',textDecoration:'none'}}><img style={{width:'1.2cm',marginLeft:'1cm'}} src={insta} alt='instagram'/>@refeastofficial</a>
        </div>
      </div>
    </div>
  )
}

export default Footer
