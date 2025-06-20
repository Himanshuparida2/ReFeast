import React from 'react'
import insta from '../image/instagram.svg'

function Footer() {
  return (
    <div>
<footer className="footer">
  <div className="footer-container">
    
    <div className="footer-section">
      <h2 className="footer-logo">ReFeast</h2>
      <p>Reducing food waste by connecting those with excess to those in need. Together, we make a difference.</p>
    </div>

    <div className="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about-us">About Us</a></li>
        <li><a href="#donate">Donate Food</a></li>
        <li><a href="#contact-us">Contact</a></li>
      </ul>
    </div>
    <div className="footer-section">
      <h3>Get Involved</h3>
      <ul>
        <li><a href="/partner">Partner with Us</a></li>
        <li><a href="/volunteer">Volunteer</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h3>Contact Us</h3>
      <p>Email: support@refeast.in</p>
      <p>Phone: +91-XXXXXXXXXX</p>
      <div className="footer-socials">
        <a href="/"><img src="facebook-icon.png" alt="Facebook"/></a>
        <a href="/"><img src={insta} alt="Instagram"/></a>
        <a href="/"><img src="twitter-icon.png" alt="Twitter"/></a>
      </div>
    </div>
  </div>

  <div className="footer-bottom">
    © 2025 ReFeast. All rights reserved.
  </div>
</footer>
    
    </div>
  )
}

export default Footer
