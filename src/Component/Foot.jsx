import React from 'react'
import '../Css/Foot.css'

export default function Foot() {
  return (
    <div>
      <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h2> Diet-Mate </h2>
                    <p>Diet-Mate is dedicated to helping you reach your wellness goals by providing delicious, nutrient-rich meals that fuel your body and energize your life.</p>
                </div>
                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Healthy Food</h4>
                        <h6>
                        Healthy eating has never been this easy!<br/> With Diet-Mate, enjoy nutritious, <br/>delicious meals delivered right to your doorstep,<br/> saving you time and effort.
                        </h6>
                    </div>
                    <div className="footer-column">
                        <h4>HEALTHY LIVING</h4>
                        <ul>
                            <li>Fitness</li>
                            <li>Health</li>
                            <li>Healthy Recipes</li>
                            <li>Status</li>
                        </ul>
                    </div>
                    {/* <div className="footer-column">
                        <h4>MEMBERSHIP</h4>
                        <ul>
                            <li>FB Plus</li>
                            <li>Community</li>
                            <li>Referral Program</li>
                            <li>Blog</li>
                            <li>Contact Us</li>
                            <li>FAQ</li>
                            <li>Store</li>
                        </ul>
                    </div> */}
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Diet-Mate. All rights reserved. <a href="#">Terms of Use</a> <a href="#">Privacy Policy</a></p>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
            </div>
        </footer>

    </div>
  )
}


